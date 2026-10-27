import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const base = new URL('./', import.meta.url);
const report = JSON.parse(readFileSync(new URL('evidence/results.json', base)));
const samples = readFileSync(new URL('samples.json', base));
const questions = readFileSync(new URL('questions.json', base));
for (const [bytes, key] of [[samples, 'samples_sha256'], [questions, 'questions_sha256']]) {
  assert.equal(createHash('sha256').update(bytes).digest('hex'), report[key], 'Results must bind current fixtures and prompt');
}
assert.deepEqual(report.rows.map(({ id, group, text, expected }) => ({ id, group, text, expected })), JSON.parse(samples));
assert.ok(report.rows.length >= 20);
assert.equal(new Set(report.rows.map((row) => row.id)).size, report.rows.length);
assert.deepEqual(new Set(report.rows.map((row) => row.group)), new Set(['common', 'negation', 'ambiguous', 'boundary']));
const labels = Object.keys(JSON.parse(questions).purpose.criteria);
for (const row of report.rows) {
  assert.ok(labels.includes(row.expected) && labels.includes(row.actual));
  assert.deepEqual(Object.keys(row.probabilities), labels);
  assert.ok(Object.values(row.probabilities).every((p) => Number.isFinite(p) && p >= 0 && p <= 1));
  assert.ok(Math.abs(Object.values(row.probabilities).reduce((a, b) => a + b, 0) - 1) < 0.001);
  assert.equal(row.selected_probability, row.probabilities[row.actual]);
  assert.equal(row.correct, row.expected === row.actual);
  assert.ok(row.inference_ms > 0 && row.roundtrip_ms >= row.inference_ms);
}
assert.equal(report.summary.correct, report.rows.filter((row) => row.correct).length);
assert.equal(report.summary.warm_count, report.rows.length - 1);
assert.equal(report.summary.existing_classifier_accuracy, null);
const env = { ...process.env };
delete env.LAYA_PYTHON;
const missing = spawnSync(process.execPath, [new URL('demo.mjs', base).pathname], { env, encoding: 'utf8' });
assert.equal(missing.status, 1);
assert.match(missing.stderr, /LAYA_PYTHON/);
const absent = spawnSync(process.execPath, [new URL('demo.mjs', base).pathname], {
  env: { ...env, LAYA_PYTHON: new URL('nonexistent-python', base).pathname }, encoding: 'utf8', timeout: 5000,
});
assert.equal(absent.status, 1);
assert.match(absent.stderr, /ENOENT/);
console.log('PASS: report integrity, probabilities/timings, fixture coverage, missing runtime and failed worker startup.');
