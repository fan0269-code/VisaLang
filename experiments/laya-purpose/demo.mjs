import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { createHash } from 'node:crypto';

const directory = new URL('./', import.meta.url);
const args = process.argv.slice(2);
const valid = args.length === 0 || (args[0] === '--text' && args.length === 2)
  || (args[0] === '--evaluate' && (args.length === 1 || (args.length === 3 && args[1] === '--output')));
if (!valid || !process.env.LAYA_PYTHON) {
  console.error('设置 LAYA_PYTHON 后运行：node experiments/laya-purpose/demo.mjs [--text "文本" | --evaluate [--output 文件.json]]');
  process.exit(1);
}
const started = performance.now();
const worker = spawn(process.env.LAYA_PYTHON, ['-u', fileURLToPath(new URL('worker.py', directory))], {
  stdio: ['pipe', 'pipe', 'inherit'], env: process.env,
});
const lines = createInterface({ input: worker.stdout });
const queue = [];
let pending;
let failure;
function fail(error) {
  failure = error;
  if (pending) { clearTimeout(pending.timer); pending.reject(error); pending = undefined; }
}
worker.on('error', fail);
worker.stdin.on('error', fail);
worker.on('exit', (code) => fail(new Error(`Laya 进程已退出 (${code})`)));
lines.on('line', (line) => {
  try {
    const value = JSON.parse(line);
    if (pending) { clearTimeout(pending.timer); pending.resolve(value); pending = undefined; }
    else queue.push(value);
  } catch { fail(new Error('Laya 返回了非 JSON 协议输出')); }
});
function receive() {
  if (queue.length) return Promise.resolve(queue.shift());
  if (failure) return Promise.reject(failure);
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { fail(new Error('Laya 等待超过 180 秒')); worker.kill(); }, 180000);
    pending = { resolve, reject, timer };
  });
}
async function predict(text) {
  const start = performance.now();
  worker.stdin.write(`${JSON.stringify({ text })}\n`);
  const result = await receive();
  if (result.error) throw new Error(result.error);
  return { ...result, roundtrip_ms: performance.now() - start };
}
try {
  const runtime = { ...await receive(), startup_ms: performance.now() - started };
  if (!runtime.ready) throw new Error('模型未就绪');
  console.error(JSON.stringify({ runtime }, null, 2));
  console.error('实验意图分类；概率不是正确率。不会修改表单、判断资格或执行操作。');
  if (args[0] === '--evaluate') {
    const fixtureBytes = await readFile(new URL('samples.json', directory));
    const questionBytes = await readFile(new URL('questions.json', directory));
    const samples = JSON.parse(fixtureBytes);
    const rows = [];
    for (const sample of samples) {
      const result = await predict(sample.text);
      const row = { ...sample, ...result, correct: sample.expected === result.actual,
        selected_probability: result.probabilities[result.actual],
        existing_flow: 'requires_manual_purpose_selection' };
      rows.push(row);
      console.log(JSON.stringify(row));
    }
    const warm = rows.slice(1).map((row) => row.inference_ms).sort((a, b) => a - b);
    const groups = Object.fromEntries([...new Set(rows.map((row) => row.group))].map((group) => {
      const subset = rows.filter((row) => row.group === group);
      return [group, { correct: subset.filter((row) => row.correct).length, total: subset.length }];
    }));
    const report = { generated_at: new Date().toISOString(),
      dataset: '人工构造中文冒烟测试；非生产分布，包含前期 MCP 探针，不是独立验证集',
      samples_sha256: createHash('sha256').update(fixtureBytes).digest('hex'),
      questions_sha256: createHash('sha256').update(questionBytes).digest('hex'),
      runtime, summary: { total: rows.length, correct: rows.filter((row) => row.correct).length,
        accuracy: rows.filter((row) => row.correct).length / rows.length, groups,
        first_inference_ms: rows[0].inference_ms, warm_count: warm.length,
        warm_mean_ms: warm.reduce((a, b) => a + b, 0) / warm.length,
        warm_median_ms: warm[Math.floor(warm.length / 2)],
        warm_p95_ms: warm[Math.ceil(warm.length * 0.95) - 1],
        existing_classifier_accuracy: null,
        comparison: '现有流程只接受手动 purpose 选项，没有同任务文本分类器；不能把手动选择或路由规则评分成分类准确率。' }, rows };
    if (args[1] === '--output') await writeFile(args[2], `${JSON.stringify(report, null, 2)}\n`);
    console.log(JSON.stringify({ summary: report.summary }, null, 2));
  } else if (args[0] === '--text') {
    console.log(JSON.stringify(await predict(args[1]), null, 2));
  } else {
    console.error('逐行输入中文；输入 /quit 或 Ctrl-D 退出。多次输入复用同一模型。');
    const input = createInterface({ input: process.stdin });
    for await (const text of input) {
      if (text === '/quit') { input.close(); break; }
      try { console.log(JSON.stringify(await predict(text), null, 2)); }
      catch (error) { console.error(error.message); if (failure) break; }
    }
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  worker.stdin.end();
  worker.kill();
  lines.close();
}
