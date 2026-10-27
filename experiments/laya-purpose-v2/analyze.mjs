import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const dir = new URL('./', import.meta.url);
const labels = ['family-reunion', 'b1', 'ausbildung', 'nursing', 'university', 'other', 'unclear'];
const variants = ['A', 'B', 'C', 'D'];
const ratio = (n, d) => ({ numerator: n, denominator: d, rate: d ? n / d : null });
export function summarize(rows) {
  return Object.fromEntries(variants.map(v => {
    const matrix = Object.fromEntries(labels.map(x => [x, Object.fromEntries(labels.map(y => [y, 0]))]));
    for (const r of rows) matrix[r.expected][r.results[v].actual]++;
    const classes = Object.fromEntries(labels.map(x => {
      const tp = matrix[x][x];
      return [x, { precision: ratio(tp, labels.reduce((s, y) => s + matrix[y][x], 0)),
        recall: ratio(tp, labels.reduce((s, y) => s + matrix[x][y], 0)) }];
    }));
    const unclear = rows.filter(x => x.expected === 'unclear');
    const clear = rows.filter(x => x.expected !== 'unclear');
    const highConfidenceErrors = rows.filter(r => {
      if (r.results[v].correct || v === 'D') return false;
      // C: every executed stage must meet the reporting threshold; not a joint confidence.
      return r.results[v].stages.every(s => s.confidence >= 0.9);
    }).map(r => ({ id: r.id, text: r.text, expected: r.expected, actual: r.results[v].actual,
      stages: r.results[v].stages.map(s => ({ stage: s.stage, choice: s.choice, confidence: s.confidence })) }));
    const times = rows.map(r => r.results[v].total_ms);
    const warm = times.slice(1).sort((a,b) => a-b);
    return [v, { accuracy: ratio(rows.filter(r => r.results[v].correct).length, rows.length),
      classes, confusion_matrix: matrix,
      forced_specific: ratio(unclear.filter(r => r.results[v].actual !== 'unclear').length, unclear.length),
      rejected_clear: ratio(clear.filter(r => r.results[v].actual === 'unclear').length, clear.length),
      high_confidence_errors: highConfidenceErrors,
      fixed_vs_A: rows.filter(r => !r.results.A.correct && r.results[v].correct).map(r => r.id),
      regressed_vs_A: rows.filter(r => r.results.A.correct && !r.results[v].correct).map(r => r.id),
      timing_ms: { first: times[0], mean: times.reduce((a,b)=>a+b,0)/times.length,
        subsequent_mean: warm.reduce((a,b)=>a+b,0)/warm.length,
        subsequent_p50: warm[Math.floor(warm.length/2)], subsequent_p95: warm[Math.ceil(warm.length*.95)-1] } }];
  }));
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const report = JSON.parse(await readFile(new URL('evidence/results.json', dir)));
  const summary = Object.fromEntries(['development', 'frozen'].map(ds => [ds, summarize(report.rows.filter(r => r.dataset === ds))]));
  await writeFile(new URL('evidence/summary.json', dir), JSON.stringify(summary, null, 2)+'\n');
  let md = '# 四方案对比（实际运行）\n\n人工小样本；新集预先冻结，不是独立盲测。confidence ≥ 0.9仅用于高置信错误统计，C要求每个已执行阶段均达到阈值；不代表整体概率。规则概率为null。矩阵行=预期、列=实际。完整每类precision/recall、分母和错误列表见summary.json；原始阶段概率、裁剪与耗时见results.json。\n';
  const fmt = x => `${x.numerator}/${x.denominator} (${(100*x.rate).toFixed(1)}%)`;
  for (const [ds, values] of Object.entries(summary)) {
    md += `\n## ${ds}\n\n|方案|正确率|unclear被强分类|明确被拒识|高置信错误|相对A修正/回归|完整请求均值ms|\n|---|---|---|---|---|---|---|\n`;
    for (const [v,s] of Object.entries(values)) md += `|${v}|${fmt(s.accuracy)}|${fmt(s.forced_specific)}|${fmt(s.rejected_clear)}|${s.high_confidence_errors.length}|${s.fixed_vs_A.length}/${s.regressed_vs_A.length}|${s.timing_ms.mean.toFixed(2)}|\n`;
    for (const [v,s] of Object.entries(values)) {
      md += `\n### ${v} 各类与混淆矩阵\n\n|类别|precision|recall|\n|---|---|---|\n`;
      for (const [label,c] of Object.entries(s.classes)) md += `|${label}|${c.precision.denominator ? fmt(c.precision) : 'null（无预测）'}|${fmt(c.recall)}|\n`;
      md += '\n|预期 / 实际|'+labels.join('|')+'|\n|---|'+labels.map(()=>'---').join('|')+'|\n';
      for (const [x,cols] of Object.entries(s.confusion_matrix)) md += `|${x}|${labels.map(y=>cols[y]).join('|')}|\n`;
      md += `\n修正：${s.fixed_vs_A.join(', ') || '无'}。回归：${s.regressed_vs_A.join(', ') || '无'}。\n`;
    }
    md += '\n### 逐条对比\n\n|ID/分组|文本|预期|A|B|C|D|\n|---|---|---|---|---|---|---|\n';
    for (const r of report.rows.filter(r=>r.dataset===ds)) md += `|${r.id}/${r.group}|${r.text}|${r.expected}|${variants.map(v=>r.results[v].actual+(r.results[v].correct?' ✓':' ✗')).join('|')}|\n`;
  }
  await writeFile(new URL('evidence/results.md', dir), md);
  console.log(JSON.stringify(Object.fromEntries(Object.entries(summary).map(([ds,vs])=>[ds,Object.fromEntries(Object.entries(vs).map(([v,s])=>[v,s.accuracy]))])),null,2));
}
