import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { summarize } from './analyze.mjs';
const dir = new URL('./', import.meta.url);
const read = async p => JSON.parse(await readFile(new URL(p, dir)));
for (const file of ['freeze.json', 'candidate-freeze.json']) {
  for (const [p, hash] of Object.entries((await read(file)).sha256)) {
    assert.equal(createHash('sha256').update(await readFile(new URL(p, dir))).digest('hex'), hash, p);
  }
}
assert.deepEqual(await read('questions-a.json'), await read('../laya-purpose/questions.json'));
assert.deepEqual(await read('development.json'), await read('../laya-purpose/samples.json'));
const report = await read('evidence/results.json');
const summary = await read('evidence/summary.json');
assert.equal(report.runtime.model_load_count, 1);
assert.equal(report.runtime.offline, true);
assert.equal(report.rows.length, 76);
assert.equal(new Set(report.rows.map(r=>r.pid)).size, 1);
assert.deepEqual(report.rows.map(r=>r.request_count), Array.from({length:76},(_,i)=>i+1));
for (const ds of ['development', 'frozen']) {
  const rows = report.rows.filter(r=>r.dataset===ds);
  const fixture = await read(ds === 'frozen' ? 'frozen.json' : 'development.json');
  assert.deepEqual(rows.map(({id,group,text,expected})=>({id,group,text,expected})), fixture.map(({id,group,text,expected})=>({id,group,text,expected})));
  assert.deepEqual(summarize(rows), summary[ds]);
  for (const row of rows) for (const [v,result] of Object.entries(row.results)) {
    assert.equal(result.correct, result.actual===row.expected);
    assert(result.total_ms >= 0);
    assert(!('action' in result));
    if (v==='C' || v==='D') { assert.equal(result.probabilities,null); assert.equal(result.confidence,null); }
    if (v==='C') {
      assert.equal(result.stages.length,result.stages[0].choice==='明确单一当前目的'?2:1);
      if(result.stages.length===1) assert.equal(result.actual,'unclear');
    }
    for (const stage of result.stages) {
      assert.equal(stage.token_audit.input_truncated,false);
      assert.equal(stage.input_tokens, stage.token_audit.sequence_tokens);
      assert(Math.abs(Object.values(stage.probabilities).reduce((a,b)=>a+b,0)-1)<0.002);
      assert(stage.confidence>=0 && stage.confidence<=1);
      assert(stage.total_ms>=stage.inference_ms);
      assert(!('action' in stage));
    }
  }
}
const baseline = await read('evidence/baseline.json');
for (const [path,hash] of Object.entries(baseline.protected_files)) {
  assert.equal(createHash('sha256').update(await readFile(new URL('../../'+path,dir))).digest('hex'),hash,`protected ${path}`);
}
console.log('PASS: freeze hashes, 76 rows, exact datasets, recomputed metrics, stages, probabilities, one model, preserved v1/src/public');
