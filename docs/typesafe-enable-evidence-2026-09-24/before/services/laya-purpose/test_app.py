import asyncio
import json
import threading
import unittest
from app import PurposeApp, public_result, validate_input


def prediction(choice='university'):
    return {'answers': {'purpose': {'choice': choice, 'confidence': 1.0}},
            'usage': {'input_tokens': 240}}


async def request(app, payload=None, method='POST', path='/api/purpose-suggestion/', raw=None, headers=None):
    events = []
    async def send(event):
        events.append(event)
    async def receive():
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
