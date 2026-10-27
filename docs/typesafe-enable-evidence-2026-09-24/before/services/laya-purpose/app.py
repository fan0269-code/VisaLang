"""Bounded, non-persistent ASGI purpose suggestions; one resident model per worker."""
import asyncio
import json
import math
import os
import resource
import sys
import time
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


def load_model():
    os.environ.update(HF_HUB_OFFLINE='1', TRANSFORMERS_OFFLINE='1',
                      HF_HUB_DISABLE_TELEMETRY='1', TOKENIZERS_PARALLELISM='false',
                      USE_TF='0')
    import laya
    return laya.load(os.environ.get('LAYA_MODEL', 'convaiinnovations/laya'),
                     subfolder=os.environ.get('LAYA_SUBFOLDER', 'multilingual') or None,
                     device=os.environ.get('LAYA_DEVICE', 'cpu'))


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
    if choice == 'unclear' or result.get('usage', {}).get('input_tokens', 1024) >= 1024:
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
                            model = await asyncio.to_thread(load_model)
                            self.predictor = lambda text: model.predict(text, QUESTIONS)
                        await send({'type': 'lifespan.startup.complete'})
                    except Exception:
                        await send({'type': 'lifespan.startup.failed', 'message': 'Laya model could not start; check offline cache and configuration.'})
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
            try:
                result = await asyncio.to_thread(self.predictor, text)
                output = public_result(result)
            except Exception:
                await self.respond(send, 503, {'error': 'temporarily_unavailable'})
                return
            finally:
                self.inference_seconds += time.monotonic() - started
        await self.respond(send, 200, output)


app = PurposeApp()
