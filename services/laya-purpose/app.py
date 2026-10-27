"""Bounded, non-persistent ASGI purpose suggestions; one resident model per worker."""
import asyncio
import json
import math
import os
import resource
import ssl
import sys
import time
from urllib.parse import urlsplit
from pathlib import Path

QUESTIONS = json.loads(Path(__file__).with_name('questions.json').read_text())
PURPOSES = {
    'family_reunion': 'family-reunion',
    'settlement_citizenship': 'b1',
    'vocational_training': 'ausbildung',
    'nursing_recognition': 'nursing',
    'university': 'university',
    'other': 'other',
}
MAX_BYTES = 4096
MAX_CHARS = 300
TYPESAFE_ENDPOINT = 'https://api.typesafe.ai/v1/systemone'
TYPESAFE_TIMEOUT_SECONDS = 8
INFERENCE_TIMEOUT_SECONDS = 10
TYPESAFE_MAX_RESPONSE_BYTES = 65536
TYPESAFE_MAX_INPUT_TOKENS = 2048
TYPESAFE_OPTIONS = {
    'family-reunion': 'The person currently wants to prepare a German family reunion route, including an A1 language proof if applicable.',
    'b1': 'The person currently wants to prepare B1 language proof for German settlement or citizenship.',
    'ausbildung': 'The person currently wants to pursue vocational training in Germany.',
    'nursing': 'The person currently wants to work in nursing or seek nursing recognition in Germany.',
    'university': 'The person currently wants to study at a university in Germany.',
    'other': 'The person clearly states another current Germany-related purpose that is not covered by the listed options.',
    'unclear': 'There is no single clear current purpose, the text is hypothetical, negated, conflicting, or only asks about an exam without stating the broader purpose.',
}
TYPESAFE_TO_INTERNAL = {
    'family-reunion': 'family_reunion',
    'b1': 'settlement_citizenship',
    'ausbildung': 'vocational_training',
    'nursing': 'nursing_recognition',
    'university': 'university',
    'other': 'other',
    'unclear': 'unclear',
}


class TypeSafePredictor:
    """Send one bounded purpose judgment to TypeSafe without logging its input or key."""

    def __init__(self, api_key, model='jev-latest', timeout=TYPESAFE_TIMEOUT_SECONDS):
        if not isinstance(api_key, str) or not api_key.strip():
            raise ValueError('TypeSafe API key is required')
        if any(char in api_key for char in '\r\n'):
            raise ValueError('invalid TypeSafe API key')
        if not isinstance(model, str) or not model.strip() or len(model) > 100:
            raise ValueError('invalid TypeSafe model')
        self.api_key = api_key.strip()
        self.model = model.strip()
        if isinstance(timeout, bool) or not isinstance(timeout, (int, float)) or timeout <= 0:
            raise ValueError('invalid TypeSafe timeout')
        self.timeout = float(timeout)

    async def __call__(self, text):
        endpoint = urlsplit(TYPESAFE_ENDPOINT)
        deadline = time.monotonic() + self.timeout
        payload = {
            'state': {'description': text},
            'model': self.model,
            'questions': {
                'purpose': {
                    'type': 'choice',
                    'instructions': {
                        'question': 'Which single current purpose does the person explicitly describe in `description`? Classify intent only. Do not decide eligibility, acceptance, rights, or outcomes. Ignore negated, hypothetical, quoted, or merely mentioned purposes. If no single current purpose is clear, choose unclear.',
                    },
                    'criteria': TYPESAFE_OPTIONS,
                },
            },
        }
        body = json.dumps(payload, ensure_ascii=False).encode('utf-8')
        response_body = bytearray()
        writer = None

        def remaining():
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                raise TimeoutError('TypeSafe deadline exceeded')
            return remaining

        async def within_deadline(awaitable):
            return await asyncio.wait_for(awaitable, timeout=remaining())

        async def read_line(reader, budget):
            line = await within_deadline(reader.readline())
            if len(line) > budget or not line.endswith(b'\n'):
                raise ValueError('invalid TypeSafe response headers')
            return line

        try:
            context = ssl.create_default_context()
            context.set_alpn_protocols(['http/1.1'])
            reader, writer = await within_deadline(asyncio.open_connection(
                endpoint.hostname, endpoint.port or 443, ssl=context,
                server_hostname=endpoint.hostname,
            ))
            request = (
                f'POST {endpoint.path} HTTP/1.1\r\n'
                f'Host: {endpoint.hostname}\r\n'
                f'Authorization: Bearer {self.api_key}\r\n'
                'Content-Type: application/json\r\n'
                f'Content-Length: {len(body)}\r\n'
                'Connection: close\r\n\r\n'
            ).encode('ascii') + body
            writer.write(request)
            await within_deadline(writer.drain())

            status_line = await read_line(reader, 8192)
            pieces = status_line.rstrip(b'\r\n').split(b' ', 2)
            if len(pieces) < 2 or not pieces[0].startswith(b'HTTP/1.'):
                raise ValueError('invalid TypeSafe response status')
            try:
                status = int(pieces[1])
            except ValueError:
                raise ValueError('invalid TypeSafe response status') from None
            if not 200 <= status < 300:
                raise RuntimeError('TypeSafe returned a non-success status')

            headers = {}
            header_bytes = len(status_line)
            while True:
                line = await read_line(reader, 8192)
                header_bytes += len(line)
                if header_bytes > 16384:
                    raise ValueError('oversized TypeSafe response headers')
                if line in (b'\r\n', b'\n'):
                    break
                name, separator, value = line.partition(b':')
                if not separator:
                    raise ValueError('invalid TypeSafe response headers')
                key = name.strip().lower()
                if key in headers:
                    if key in (b'content-length', b'transfer-encoding'):
                        raise ValueError('duplicate TypeSafe response framing header')
                else:
                    headers[key] = value.strip().lower()

            transfer_encoding = headers.get(b'transfer-encoding')
            content_length = headers.get(b'content-length')
            if transfer_encoding and content_length:
                raise ValueError('ambiguous TypeSafe response framing')
            if transfer_encoding:
                if transfer_encoding != b'chunked':
                    raise ValueError('unsupported TypeSafe response framing')
                while True:
                    line = await read_line(reader, 8192)
                    try:
                        chunk_size = int(line.split(b';', 1)[0].strip(), 16)
                    except ValueError:
                        raise ValueError('invalid TypeSafe chunk framing') from None
                    if chunk_size < 0 or len(response_body) + chunk_size > TYPESAFE_MAX_RESPONSE_BYTES:
                        raise ValueError('oversized TypeSafe response')
                    if chunk_size == 0:
                        while await read_line(reader, 8192) not in (b'\r\n', b'\n'):
                            pass
                        break
                    response_body.extend(await within_deadline(reader.readexactly(chunk_size)))
                    if await within_deadline(reader.readexactly(2)) != b'\r\n':
                        raise ValueError('invalid TypeSafe chunk framing')
            elif content_length is not None:
                try:
                    length = int(content_length)
                except ValueError:
                    raise ValueError('invalid TypeSafe content length') from None
                if length < 0 or length > TYPESAFE_MAX_RESPONSE_BYTES:
                    raise ValueError('oversized TypeSafe response')
                response_body.extend(await within_deadline(reader.readexactly(length)))
            else:
                while len(response_body) <= TYPESAFE_MAX_RESPONSE_BYTES:
                    chunk = await within_deadline(reader.read(
                        TYPESAFE_MAX_RESPONSE_BYTES + 1 - len(response_body)
                    ))
                    if not chunk:
                        break
                    response_body.extend(chunk)
            if len(response_body) > TYPESAFE_MAX_RESPONSE_BYTES:
                raise ValueError('oversized TypeSafe response')
            result = json.loads(response_body)
        except (TimeoutError, OSError, ssl.SSLError, asyncio.IncompleteReadError,
                asyncio.LimitOverrunError, UnicodeError, json.JSONDecodeError):
            # Never propagate provider response bodies, headers or credentials to app logs.
            raise RuntimeError('TypeSafe request failed') from None
        finally:
            if writer is not None:
                writer.close()
                close_budget = min(0.25, max(0, deadline - time.monotonic()))
                if close_budget:
                    try:
                        await asyncio.wait_for(writer.wait_closed(), timeout=close_budget)
                    except (Exception, asyncio.CancelledError):
                        pass

        answer = result.get('answers', {}).get('purpose') if isinstance(result, dict) else None
        usage = result.get('usage') if isinstance(result, dict) else None
        if not isinstance(answer, dict) or answer.get('type') != 'choice':
            raise ValueError('invalid TypeSafe answer')
        choice = answer.get('choice')
        confidence = answer.get('confidence')
        probabilities = answer.get('probabilities')
        if (not isinstance(choice, str) or choice not in TYPESAFE_OPTIONS
                or isinstance(confidence, bool)
                or not isinstance(confidence, (int, float))
                or not math.isfinite(confidence) or not 0 <= confidence <= 1
                or not isinstance(probabilities, dict)
                or set(probabilities) != set(TYPESAFE_OPTIONS)):
            raise ValueError('invalid TypeSafe answer')
        if any(isinstance(value, bool) or not isinstance(value, (int, float))
                   or not math.isfinite(value) or not 0 <= value <= 1
                   for value in probabilities.values()):
            raise ValueError('invalid TypeSafe probabilities')
        if abs(sum(probabilities.values()) - 1) > 0.02:
            raise ValueError('invalid TypeSafe probabilities')
        if probabilities[choice] + 1e-9 < max(probabilities.values()):
            raise ValueError('invalid TypeSafe choice distribution')
        input_tokens = usage.get('input_tokens') if isinstance(usage, dict) else None
        if (isinstance(input_tokens, bool) or not isinstance(input_tokens, int)
                or input_tokens < 0 or input_tokens >= TYPESAFE_MAX_INPUT_TOKENS):
            raise ValueError('invalid TypeSafe usage')
        return {
            'answers': {'purpose': {'choice': TYPESAFE_TO_INTERNAL[choice], 'confidence': confidence}},
            'usage': {'input_tokens': input_tokens, 'input_token_limit': TYPESAFE_MAX_INPUT_TOKENS},
        }


def load_model():
    os.environ.update(HF_HUB_OFFLINE='1', TRANSFORMERS_OFFLINE='1',
                      HF_HUB_DISABLE_TELEMETRY='1', TOKENIZERS_PARALLELISM='false',
                      USE_TF='0')
    import laya
    return laya.load(os.environ.get('LAYA_MODEL', 'convaiinnovations/laya'),
                     subfolder=os.environ.get('LAYA_SUBFOLDER', 'multilingual') or None,
                     device=os.environ.get('LAYA_DEVICE', 'cpu'))


def load_predictor():
    provider = os.environ.get('PURPOSE_PROVIDER', 'typesafe').strip().lower()
    if provider == 'typesafe':
        return TypeSafePredictor(
            os.environ.get('TYPESAFE_API_KEY', ''),
            os.environ.get('TYPESAFE_MODEL', 'jev-latest'),
        )
    if provider == 'laya':
        model = load_model()
        return lambda text: model.predict(text, QUESTIONS)
    raise ValueError('unsupported purpose provider')


def validate_input(body):
    if not isinstance(body, dict) or set(body) != {'text'}:
        raise ValueError('invalid input')
    text = body['text']
    if not isinstance(text, str) or not 1 <= len(text.strip()) <= MAX_CHARS:
        raise ValueError('invalid input')
    if any(ord(char) < 32 and char not in '\n\r\t' for char in text):
        raise ValueError('invalid input')
    return text.strip()


def public_result(result):
    """Never expose model actions, probabilities, raw text, or unbounded labels."""
    answer = result['answers']['purpose']
    choice = answer['choice']
    confidence = answer['confidence']
    if (choice not in {*PURPOSES, 'unclear'} or isinstance(confidence, bool)
            or not isinstance(confidence, (int, float))
            or not math.isfinite(confidence) or not 0 <= confidence <= 1):
        raise ValueError('invalid model output')
    # A truncation signal cannot yield a suggestion. Scores never authorize actions.
    usage = result.get('usage', {})
    input_limit = usage.get('input_token_limit', 1024) if isinstance(usage, dict) else 1024
    if (isinstance(input_limit, bool) or not isinstance(input_limit, int) or input_limit <= 0):
        raise ValueError('invalid input token limit')
    if choice == 'unclear' or usage.get('input_tokens', input_limit) >= input_limit:
        return {'status': 'needs_clarification', 'purpose': None, 'requiresConfirmation': True}
    return {'status': 'suggestion', 'purpose': PURPOSES[choice], 'requiresConfirmation': True}


class PurposeApp:
    def __init__(self, predictor=None):
        self.predictor = predictor
        self.lock = asyncio.Lock()
        self.requests = 0
        self.status_counts = {}
        self.inference_seconds = 0.0

    async def respond(self, send, status, body):
        data = json.dumps(body, ensure_ascii=False).encode()
        await send({'type': 'http.response.start', 'status': status, 'headers': [
            (b'content-type', b'application/json; charset=utf-8'),
            (b'cache-control', b'no-store'),
            (b'x-content-type-options', b'nosniff'),
        ]})
        await send({'type': 'http.response.body', 'body': data})

    async def __call__(self, scope, receive, send):
        # Fixed aggregate keys only; no paths, bodies, IPs, identifiers or labels.
        measured = scope['type'] == 'http' and scope['path'] == '/api/purpose-suggestion/'
        async def measured_send(event):
            if measured and event['type'] == 'http.response.start':
                self.requests += 1
                key = str(event['status'])
                self.status_counts[key] = self.status_counts.get(key, 0) + 1
            await send(event)
        await self.dispatch(scope, receive, measured_send)

    async def dispatch(self, scope, receive, send):
        if scope['type'] == 'lifespan':
            while True:
                event = await receive()
                if event['type'] == 'lifespan.startup':
                    try:
                        if self.predictor is None:
                            self.predictor = await asyncio.to_thread(load_predictor)
                        await send({'type': 'lifespan.startup.complete'})
                    except Exception:
                        await send({'type': 'lifespan.startup.failed', 'message': 'Purpose classifier could not start; check provider configuration.'})
                        return
                elif event['type'] == 'lifespan.shutdown':
                    await send({'type': 'lifespan.shutdown.complete'})
                    return
        if scope['type'] != 'http':
            return
        path, method = scope['path'], scope['method']
        if path == '/internal/metrics' and method == 'GET':
            rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
            await self.respond(send, 200, {
                'requests': self.requests, 'statusCounts': dict(self.status_counts),
                'inferenceSecondsTotal': round(self.inference_seconds, 6),
                'inferenceBusy': self.lock.locked(),
                'maxRssBytes': rss if sys.platform == 'darwin' else rss * 1024,
            })
            return
        if path == '/healthz' and method == 'GET':
            await self.respond(send, 200 if self.predictor else 503, {'ready': self.predictor is not None})
            return
        if path != '/api/purpose-suggestion/':
            await self.respond(send, 404, {'error': 'not_found'})
            return
        if method != 'POST':
            await self.respond(send, 405, {'error': 'method_not_allowed'})
            return
        headers = dict(scope.get('headers', []))
        if headers.get(b'content-type', b'').split(b';')[0].strip().lower() != b'application/json':
            await self.respond(send, 415, {'error': 'json_required'})
            return
        if scope.get('query_string'):
            await self.respond(send, 400, {'error': 'query_not_allowed'})
            return
        if not self.predictor or self.lock.locked():
            await self.respond(send, 503, {'error': 'temporarily_unavailable'})
            return
        try:
            data = bytearray()
            async with asyncio.timeout(5):
                while True:
                    event = await receive()
                    if event['type'] == 'http.disconnect':
                        return
                    data.extend(event.get('body', b''))
                    if len(data) > MAX_BYTES:
                        await self.respond(send, 413, {'error': 'input_too_large'})
                        return
                    if not event.get('more_body', False):
                        break
            text = validate_input(json.loads(data))
        except TimeoutError:
            await self.respond(send, 408, {'error': 'request_timeout'})
            return
        except (ValueError, UnicodeError):
            await self.respond(send, 400, {'error': 'invalid_input'})
            return
        # Recheck after receiving the body; reject concurrent inference without a queue.
        if self.lock.locked():
            await self.respond(send, 503, {'error': 'temporarily_unavailable'})
            return
        async with self.lock:
            started = time.monotonic()
            cancellable = isinstance(self.predictor, TypeSafePredictor)

            async def run_predictor():
                if cancellable:
                    return await self.predictor(text)
                return await asyncio.to_thread(self.predictor, text)

            inference = asyncio.create_task(run_predictor())

            async def wait_for_disconnect():
                while True:
                    event = await receive()
                    if event['type'] == 'http.disconnect':
                        return

            disconnect = asyncio.create_task(wait_for_disconnect()) if cancellable else None
            try:
                watched = {inference}
                if disconnect:
                    watched.add(disconnect)
                done, _ = await asyncio.wait(
                    watched, timeout=INFERENCE_TIMEOUT_SECONDS,
                    return_when=asyncio.FIRST_COMPLETED,
                )
                if disconnect and disconnect in done:
                    inference.cancel()
                    await asyncio.gather(inference, return_exceptions=True)
                    return
                if inference not in done:
                    if cancellable:
                        inference.cancel()
                        await asyncio.gather(inference, return_exceptions=True)
                        raise TimeoutError('purpose inference deadline exceeded')
                    # Cancelling asyncio.to_thread cannot stop its worker. Report the
                    # timeout now, but keep the single-inference lock until Laya exits.
                    await self.respond(send, 503, {'error': 'temporarily_unavailable'})
                    try:
                        await asyncio.shield(inference)
                    except Exception:
                        pass
                    return
                result = inference.result()
                output = public_result(result)
            except asyncio.CancelledError:
                if cancellable:
                    inference.cancel()
                    await asyncio.gather(inference, return_exceptions=True)
                else:
                    # The request task may be cancelled while its Laya thread is still
                    # running. Keep the slot occupied until that thread has finished.
                    try:
                        await asyncio.shield(inference)
                    except Exception:
                        pass
                raise
            except Exception:
                await self.respond(send, 503, {'error': 'temporarily_unavailable'})
                return
            finally:
                if disconnect:
                    disconnect.cancel()
                    await asyncio.gather(disconnect, return_exceptions=True)
                self.inference_seconds += time.monotonic() - started
        await self.respond(send, 200, output)


app = PurposeApp()
