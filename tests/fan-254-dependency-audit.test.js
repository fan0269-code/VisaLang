const assert = require('node:assert/strict');
const fs = require('node:fs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const packageLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
const auditRecord = fs.readFileSync('docs/security/FAN-254-dependency-audit-2026-08-18.md', 'utf8');
const taskLog = fs.readFileSync('docs/TASK_LOG.md', 'utf8');

assert.equal(packageJson.dependencies.astro, '^7.0.7', 'manifest keeps the original Astro range');
assert.equal(packageLock.packages[''].dependencies.astro, '^7.0.7', 'lockfile root mirrors the original Astro range');
const remediatedVersions = {
  astro: '7.1.1',
  sharp: '0.35.3',
  svgo: '4.0.2',
  'js-yaml': '4.3.1',
  postcss: '8.5.26',
  nanoid: '3.3.18',
};

for (const [name, version] of Object.entries(remediatedVersions)) {
  assert.equal(
    packageLock.packages[`node_modules/${name}`].version,
    version,
    `lockfile keeps the remediated ${name} resolution`,
  );
}

assert.match(auditRecord, /1 moderate and 5 high vulnerable package entries/);
assert.match(auditRecord, /1 moderate plus 7 high GHSA IDs/);
for (const name of Object.keys(remediatedVersions)) {
  assert.match(auditRecord, new RegExp(`node_modules/${name}`), `audit record names ${name}`);
}
assert.match(auditRecord, /astro -> vite -> postcss -> nanoid/);
assert.match(auditRecord, /Astro's internal helpers/);
assert.match(auditRecord, /astro@7\.1\.1/);
for (const [name, version] of Object.entries(remediatedVersions)) {
  const tableRow = '| `' + name + '` | `' + version + '` |';
  assert.ok(auditRecord.includes(tableRow), `audit record records ${name} ${version}`);
}
assert.match(auditRecord, /`npm ci`: exit `0`/);
assert.match(auditRecord, /`npm audit --json`: exit `0`/);
assert.match(auditRecord, /`info: 0`, `low: 0`, `moderate: 0`, `high: 0`, `critical: 0`, `total: 0`/);
assert.match(auditRecord, /`for f in deploy\/\*\.sh; do bash -n/);
assert.match(taskLog, /^Updated: 2026-08-18$/m);
assert.equal(fs.existsSync('docs/security/audit.json'), false, 'generic audit output is excluded from the deliverable');

console.log('FAN-254 dependency audit contract passed');
