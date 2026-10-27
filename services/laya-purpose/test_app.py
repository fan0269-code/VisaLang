import asyncio
import json
import threading
import time
import unittest
from unittest.mock import patch
from app import PurposeApp, TypeSafePredictor, TYPESAFE_OPTIONS, load_predictor, public_result, validate_input


class TypesafeReader:
    def __init__(self, payload, delay=0, blocked=None, chunked=False):
        self.lines = [b'HTTP/1.1 200 OK\r\n']
        if chunked:
            self.lines.extend([b'Transfer-Encoding: chunked\r\n', b'\r\n',
                               f'{len(payload):x}\r\n'.encode()])
        else:
            self.lines.extend([f'Content-Length: {len(payload)}\r\n'.encode(), b'\r\n'])
        self.payload = payload
        self.offset = 0
        self.delay = delay
        self.blocked = blocked
        self.chunked = chunked
        self.chunk_ending_read = False
        if chunked: self.lines.extend([b'0\r\n', b'\r\n'])

    async def readline(self):
        if self.delay: await asyncio.sleep(self.delay)
        return self.lines.pop(0)

    async def readexactly(self, size):
        if self.chunked and self.offset == len(self.payload) and size == 2 and not self.chunk_ending_read:
            self.chunk_ending_read = True
            return b'\r\n'
        if self.blocked is not None:
            self.blocked.started.set()
            try:
                await self.blocked.wait()
            except asyncio.CancelledError:
                self.blocked.cancelled.set()
                raise
        if self.delay:
            for _ in range(size):
                await asyncio.sleep(self.delay)
        chunk = self.payload[self.offset:self.offset + size]
        self.offset += len(chunk)
        if len(chunk) != size:
            raise asyncio.IncompleteReadError(chunk, size)
        return chunk


class TypesafeWriter:
    def __init__(self): self.data=bytearray(); self.closed=asyncio.Event()
    def write(self, data): self.data.extend(data)
    async def drain(self): pass
    def close(self): self.closed.set()
    async def wait_closed(self): await self.closed.wait()


def wire_response(value, delay=0, blocked=None, chunked=False):
    return TypesafeReader(json.dumps(value).encode(), delay, blocked, chunked), TypesafeWriter()


def typesafe_response(choice='university', tokens=240):
    return {
        'model': 'jev-1.13.0',
        'answers': {'purpose': {
            'type': 'choice', 'choice': choice, 'confidence': 0.82,
            'probabilities': {key: (1.0 if key == choice else 0.0) for key in TYPESAFE_OPTIONS},
        }},
        'usage': {'input_tokens': tokens, 'output_tokens': 24},
    }


class TypeSafeAdapterTests(unittest.IsolatedAsyncioTestCase):
    async def test_request_is_typed_bounded_and_maps_to_existing_contract(self):
        reader, writer = wire_response(typesafe_response())
        async def fake_open(*_args, **_kwargs): return reader, writer
        predictor = TypeSafePredictor('test-only-key')
        with patch('app.asyncio.open_connection', side_effect=fake_open) as connect:
            result = await predictor('I want to study for a master’s degree in Germany.')
        self.assertEqual(result, {
            'answers': {'purpose': {'choice': 'university', 'confidence': 0.82}},
            'usage': {'input_tokens': 240, 'input_token_limit': 2048},
        })
        self.assertEqual(connect.call_args.args[:2], ('api.typesafe.ai', 443))
        self.assertIn(b'POST /v1/systemone HTTP/1.1', writer.data)
        self.assertIn(b'Authorization: Bearer test-only-key', writer.data)
        body = bytes(writer.data).split(b'\r\n\r\n', 1)[1]
        payload = json.loads(body)
        self.assertEqual(payload['model'], 'jev-latest')
        self.assertEqual(set(payload['questions']['purpose']['criteria']), set(TYPESAFE_OPTIONS))
        self.assertTrue(writer.closed.is_set())

    async def test_bounded_chunked_response_body_is_parsed(self):
        reader, writer = wire_response(typesafe_response(tokens=1200), chunked=True)
        async def fake_open(*_args, **_kwargs): return reader, writer
        with patch('app.asyncio.open_connection', side_effect=fake_open):
            result = await TypeSafePredictor('test-only-key')('synthetic input')
        self.assertEqual(result['usage'], {'input_tokens': 1200, 'input_token_limit': 2048})

    async def test_total_deadline_bounds_slow_phases_and_dripping_body(self):
        reader, writer = wire_response(typesafe_response(), delay=0.008)
        async def slow_open(*_args, **_kwargs):
            await asyncio.sleep(0.035)
            return reader, writer
        predictor = TypeSafePredictor('test-only-key', timeout=0.10)
        started = time.monotonic()
        with patch('app.asyncio.open_connection', side_effect=slow_open):
            with self.assertRaisesRegex(RuntimeError, '^TypeSafe request failed$'):
                await predictor('synthetic input')
        self.assertLess(time.monotonic() - started, 0.3)
        self.assertTrue(writer.closed.is_set())

    async def test_unknown_or_unbounded_outputs_fail_closed(self):
        cases = [
            typesafe_response('invented'),
            typesafe_response(tokens=2048),
        ]
        malformed = typesafe_response()
        malformed['answers']['purpose']['probabilities'].pop('other')
        cases.append(malformed)
        malformed_usage = typesafe_response()
        malformed_usage['usage']['input_tokens'] = True
        cases.append(malformed_usage)
        mismatched_choice = typesafe_response()
        mismatched_choice['answers']['purpose']['probabilities']['university'] = 0.2
        mismatched_choice['answers']['purpose']['probabilities']['family-reunion'] = 0.8
        cases.append(mismatched_choice)
        for response in cases:
            with self.subTest(response=response):
                reader, writer = wire_response(response)
                async def fake_open(*_args, **_kwargs): return reader, writer
                predictor = TypeSafePredictor('test-only-key')
                with patch('app.asyncio.open_connection', side_effect=fake_open):
                    with self.assertRaises(ValueError): await predictor('synthetic input')

    async def test_provider_errors_do_not_expose_credentials_or_request_text(self):
        async def fail_open(*_args, **_kwargs): raise OSError('sensitive diagnostic')
        predictor = TypeSafePredictor('test-only-key')
        with patch('app.asyncio.open_connection', side_effect=fail_open):
            with self.assertRaisesRegex(RuntimeError, '^TypeSafe request failed$') as raised:
                await predictor('private synthetic marker')
        self.assertNotIn('test-only-key', str(raised.exception))
        self.assertNotIn('private synthetic marker', str(raised.exception))

    def test_api_key_cannot_inject_http_headers(self):
        with self.assertRaisesRegex(ValueError, 'invalid TypeSafe API key'):
            TypeSafePredictor('test-only-key\r\nX-Injected: yes')

    @patch.dict('app.os.environ', {'PURPOSE_PROVIDER': 'typesafe', 'TYPESAFE_API_KEY': 'test-only-key'})
    def test_typesafe_provider_does_not_load_local_laya(self):
        with patch('app.load_model', side_effect=AssertionError('Laya must not load')):
            self.assertIsInstance(load_predictor(), TypeSafePredictor)


def prediction(choice='university'):
    return {'answers': {'purpose': {'choice': choice, 'confidence': 1.0}},
            'usage': {'input_tokens': 240}}


async def request(app, payload=None, method='POST', path='/api/purpose-suggestion/', raw=None, headers=None):
    events = []
    delivered = False
    async def send(event):
        events.append(event)
    async def receive():
        nonlocal delivered
        if delivered:
            await asyncio.Future()
        delivered = True
        return {'type': 'http.request', 'body': raw if raw is not None else json.dumps(payload).encode()}
    scope = {'type': 'http', 'method': method, 'path': path, 'query_string': b'',
             'headers': headers if headers is not None else [(b'content-type', b'application/json')]}
    await app(scope, receive, send)
    return events[0]['status'], json.loads(events[1]['body']), events[0]['headers']


class ContractTests(unittest.IsolatedAsyncioTestCase):
    async def test_suggestion_only(self):
        code, body, headers = await request(PurposeApp(lambda _: prediction()), {'text': '读硕士'})
        self.assertEqual(code, 200)
        self.assertEqual(body, {'status': 'suggestion', 'purpose': 'university', 'requiresConfirmation': True})
        self.assertIn((b'cache-control', b'no-store'), headers)

    async def test_invalid_inputs_never_reach_model(self):
        def unexpected(_):
            self.fail('Invalid input reached model')
        app = PurposeApp(unexpected)
        for value in [None, [], {}, {'text': ''}, {'text': ' '}, {'text': 123},
                      {'text': '字' * 301}, {'text': 'a', 'questions': {}}, {'text': '\0'}]:
            self.assertEqual((await request(app, value))[0], 400)
        self.assertEqual((await request(app, raw=b'broken'))[0], 400)
        self.assertEqual((await request(app, raw=b'x' * 4097))[0], 413)
        self.assertEqual((await request(app, {}, headers=[]))[0], 415)
        self.assertEqual((await request(app, {}, method='GET'))[0], 405)
        self.assertEqual((await request(app, {}, path='/predict'))[0], 404)

    async def test_unavailable_and_unknown_output(self):
        self.assertEqual((await request(PurposeApp(), {'text': '大学'}))[0], 503)
        self.assertEqual((await request(PurposeApp(lambda _: prediction('invented')), {'text': '大学'}))[0], 503)
        def fails(_):
            raise RuntimeError('secret text must not leak')
        result = await request(PurposeApp(fails), {'text': '大学'})
        self.assertEqual(result[1], {'error': 'temporarily_unavailable'})

    async def test_no_concurrent_inference_queue(self):
        started, finish = threading.Event(), threading.Event()
        def slow(_):
            started.set()
            finish.wait(3)
            return prediction()
        app = PurposeApp(slow)
        first = asyncio.create_task(request(app, {'text': '大学'}))
        await asyncio.to_thread(started.wait, 2)
        try:
            self.assertEqual((await request(app, {'text': '护士'}))[0], 503)
        finally:
            finish.set()
        self.assertEqual((await first)[0], 200)

    async def test_laya_timeout_keeps_single_inference_slot_until_worker_exits(self):
        started, finish = threading.Event(), threading.Event()
        state_lock = threading.Lock()
        state = {'active': 0, 'maximum': 0}

        def slow(_):
            with state_lock:
                state['active'] += 1
                state['maximum'] = max(state['maximum'], state['active'])
                started.set()
            try:
                finish.wait(3)
                return prediction()
            finally:
                with state_lock:
                    state['active'] -= 1

        app = PurposeApp(slow)
        response_started = asyncio.Event()
        events = []
        delivered = False

        async def send(event):
            events.append(event)
            if event['type'] == 'http.response.start':
                response_started.set()

        async def receive():
            nonlocal delivered
            if delivered:
                await asyncio.Future()
            delivered = True
            return {'type': 'http.request', 'body': json.dumps({'text': '大学'}).encode()}

        scope = {'type': 'http', 'method': 'POST', 'path': '/api/purpose-suggestion/',
                 'query_string': b'', 'headers': [(b'content-type', b'application/json')]}
        with patch('app.INFERENCE_TIMEOUT_SECONDS', 0.02):
            first = asyncio.create_task(app(scope, receive, send))
            try:
                self.assertTrue(await asyncio.to_thread(started.wait, 1))
                await asyncio.wait_for(response_started.wait(), 1)
                self.assertEqual(events[0]['status'], 503)
                self.assertTrue(app.lock.locked())
                self.assertEqual(state['active'], 1)
                self.assertEqual((await request(app, {'text': '护士'}))[0], 503)
                self.assertEqual(state['maximum'], 1)
            finally:
                finish.set()
            await asyncio.wait_for(first, 1)
        self.assertFalse(app.lock.locked())
        self.assertEqual(state['active'], 0)

    async def test_cancelled_laya_request_keeps_single_inference_slot_until_worker_exits(self):
        started, finish = threading.Event(), threading.Event()
        active = {'count': 0, 'maximum': 0}
        state_lock = threading.Lock()

        def slow(_):
            with state_lock:
                active['count'] += 1
                active['maximum'] = max(active['maximum'], active['count'])
                started.set()
            try:
                finish.wait(3)
                return prediction()
            finally:
                with state_lock:
                    active['count'] -= 1

        app = PurposeApp(slow)
        first = asyncio.create_task(request(app, {'text': '大学'}))
        try:
            self.assertTrue(await asyncio.to_thread(started.wait, 1))
            first.cancel()
            await asyncio.sleep(0.02)
            self.assertFalse(first.done())
            self.assertTrue(app.lock.locked())
            self.assertEqual(active['count'], 1)
            self.assertEqual((await request(app, {'text': '护士'}))[0], 503)
            self.assertEqual(active['maximum'], 1)
        finally:
            finish.set()
        with self.assertRaises(asyncio.CancelledError):
            await asyncio.wait_for(first, 1)
        self.assertFalse(app.lock.locked())
        self.assertEqual(active['count'], 0)

    def test_clarification_mapping_and_bad_confidence(self):
        self.assertEqual(public_result(prediction('unclear'))['status'], 'needs_clarification')
        self.assertEqual(public_result(prediction('settlement_citizenship'))['purpose'], 'b1')
        result = prediction()
        result['usage']['input_tokens'] = 1024
        self.assertIsNone(public_result(result)['purpose'])
        for invalid in [float('nan'), float('inf'), True, -1, 2]:
            result = prediction()
            result['answers']['purpose']['confidence'] = invalid
            with self.assertRaises(ValueError):
                public_result(result)

    def test_laya_1024_guard_does_not_apply_to_typesafe_budget(self):
        laya_result = prediction()
        laya_result['usage']['input_tokens'] = 1024
        self.assertEqual(public_result(laya_result)['status'], 'needs_clarification')
        typesafe_result = prediction()
        typesafe_result['usage'].update(input_tokens=1200, input_token_limit=2048)
        self.assertEqual(public_result(typesafe_result)['status'], 'suggestion')

    def test_unicode_limit(self):
        self.assertEqual(len(validate_input({'text': '学' * 300})), 300)


if __name__ == '__main__':
    unittest.main()

class MetricsTests(unittest.IsolatedAsyncioTestCase):
    async def test_metrics_count_failures_without_text_or_high_cardinality(self):
        app = PurposeApp(lambda _: prediction())
        await request(app, {'text': 'private example not in metrics'})
        await request(app, {'text': ''})
        await request(app, {}, path='/untrusted-path-personal-data')
        code, body, _ = await request(app, method='GET', path='/internal/metrics')
        self.assertEqual(code, 200)
        self.assertEqual(body['requests'], 2)
        self.assertEqual(body['statusCounts'], {'200': 1, '400': 1})
        self.assertGreaterEqual(body['inferenceSecondsTotal'], 0)
        self.assertGreater(body['maxRssBytes'], 0)
        self.assertNotIn('private', json.dumps(body))
        self.assertNotIn('untrusted-path', json.dumps(body))


class CancellationTests(unittest.IsolatedAsyncioTestCase):
    async def test_disconnect_closes_typesafe_transport_and_releases_inference_lock(self):
        class BlockedRead:
            def __init__(self):
                self.started=asyncio.Event()
                self.cancelled=asyncio.Event()
                self.never=asyncio.Event()
            async def wait(self): await self.never.wait()
        blocked = BlockedRead()
        reader, writer = wire_response(typesafe_response(), blocked=blocked)
        async def fake_open(*_args, **_kwargs): return reader, writer
        predictor = TypeSafePredictor('test-only-key')
        app = PurposeApp(predictor)
        events = []
        incoming = asyncio.Queue()
        await incoming.put({'type': 'http.request', 'body': b'{"text":"synthetic input"}'})
        async def receive(): return await incoming.get()
        async def send(event): events.append(event)
        scope = {'type': 'http', 'method': 'POST', 'path': '/api/purpose-suggestion/',
                 'query_string': b'', 'headers': [(b'content-type', b'application/json')]}
        with patch('app.asyncio.open_connection', side_effect=fake_open):
            request_task = asyncio.create_task(app(scope, receive, send))
            await asyncio.wait_for(blocked.started.wait(), 1)
            await incoming.put({'type': 'http.disconnect'})
            await asyncio.wait_for(request_task, 1)
        self.assertTrue(blocked.cancelled.is_set())
        self.assertTrue(writer.closed.is_set())
        self.assertFalse(app.lock.locked())
        self.assertEqual(events, [])
