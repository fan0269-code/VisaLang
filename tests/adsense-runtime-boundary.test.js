const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const site = fs.readFileSync('src/data/site.ts', 'utf8');
assert.match(site, /advertisingRuntimeEnabled:\s*false/, 'advertising runtime stays fail-closed');

const reminders = fs.readFileSync('src/pages/tools/email-reminders.astro', 'utf8');
assert.doesNotMatch(reminders, /fetch\s*\(|mailto:|new\s+WebSocket|sendMail|nodemailer/i, 'reminder planner does not send mail');
assert.match(reminders, /No email service is connected/, 'reminder planner states that no mail service is connected');

const toolPages = [
  'src/pages/tools/route-finder.astro',
  'src/pages/tools/exam-comparison.astro',
  'src/pages/tools/checklist-generator.astro',
  'src/pages/tools/timeline-calculator.astro',
  'src/pages/tools/email-reminders.astro',
];
for (const file of toolPages) {
  const source = fs.readFileSync(file, 'utf8');
  assert.doesNotMatch(source, /adsbygoogle|pagead|doubleclick|data-ad-slot/i, `${file} has no ad slot`);
}

const builtTool = 'dist/tools/route-finder/index.html';
assert.ok(
  fs.existsSync(builtTool),
  'Built HTML ad scan did not run because dist/tools/route-finder/index.html is absent. A missing build is not evidence that ads are absent.',
);
{
  const roots = ['dist/tools', 'dist/pricing', 'dist/partners', 'dist/route-review', 'dist/404.html'];
  const files = [];
  const walk = (target) => {
    if (!fs.existsSync(target)) return;
    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
      for (const name of fs.readdirSync(target)) walk(path.join(target, name));
    } else if (target.endsWith('.html')) files.push(target);
  };
  roots.forEach(walk);
  assert.ok(files.length >= 6, 'built tool and commercial screens are present for the ad scan');
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(html, /adsbygoogle|pagead2\.googlesyndication|googleads\.g\.doubleclick|data-ad-slot/i, `${file} renders no ad request`);
  }
}

const guideText = ['src/content/guides', 'src/pages']
  .flatMap((dir) => {
    const out = [];
    const walk = (target) => {
      for (const name of fs.readdirSync(target)) {
        const next = path.join(target, name);
        if (fs.statSync(next).isDirectory()) walk(next);
        else if (/\.(md|astro)$/.test(name)) out.push(fs.readFileSync(next, 'utf8'));
      }
    };
    walk(dir);
    return out;
  })
  .join('\n');
assert.doesNotMatch(guideText, /Only the nationality authority can say whether that sentence is yours/);
assert.doesNotMatch(guideText, /ask the authority to apply the special-integration/);
assert.doesNotMatch(guideText, /states no “within one year” rule/);
assert.doesNotMatch(guideText, /都没有写出全国统一/);
assert.doesNotMatch(guideText, /Beijing page also distinguishes/);
assert.doesNotMatch(guideText, /publishes its own current exam products, dates, prices/);
assert.match(guideText, /oldest passed module/);
assert.match(guideText, /does not itself delete subsection 3a/);

console.log('ad runtime boundary checks passed');
