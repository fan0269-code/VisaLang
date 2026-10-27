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
  console.error('设置 LAYA_PYTHON 后运行：node experiments/laya-purpose-v2/demo.mjs [--text "文本" | --evaluate [--output 文件.json]]');
  process.exit(1);
}
if (args[0] === '--evaluate') {
  for (const file of ['freeze.json', 'candidate-freeze.json']) {
    const manifest = JSON.parse(await readFile(new URL(file, directory)));
    for (const [path, expected] of Object.entries(manifest.sha256)) {
      const actual = createHash('sha256').update(await readFile(new URL(path, directory))).digest('hex');
      if (actual !== expected) throw new Error(`冻结文件已改变: ${path}`);
    }
  }
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
    const rows = [];
    for (const [dataset, file] of [['development', 'development.json'], ['frozen', 'frozen.json']]) {
      for (const sample of JSON.parse(await readFile(new URL(file, directory)))) {
        const result = await predict(sample.text);
        for (const value of Object.values(result.results)) value.correct = value.actual === sample.expected;
        const row = { dataset, ...sample, ...result };
        rows.push(row);
        console.log(JSON.stringify(row));
      }
    }
    const report = { generated_at: new Date().toISOString(), runtime,
      node: process.version, order: 'development then frozen; each row A B C D; single process, no warmup',
      freezes: Object.fromEntries(await Promise.all(['freeze.json', 'candidate-freeze.json'].map(async file =>
        [file, createHash('sha256').update(await readFile(new URL(file, directory))).digest('hex')]))), rows };
    if (args[1] === '--output') await writeFile(args[2], `${JSON.stringify(report, null, 2)}\n`);
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
