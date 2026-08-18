const assert = require('node:assert/strict');
const fs = require('node:fs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const packageLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
const auditRecord = fs.readFileSync('docs/security/FAN-254-dependency-audit-2026-08-18.md', 'utf8');
const taskLog = fs.readFileSync('docs/TASK_LOG.md', 'utf8');

assert.equal(packageJson.dependencies.astro, '^7.0.7', 'manifest keeps the original Astro range');
assert.equal(packageLock.packages[''].dependencies.astro, '^7.0.7', 'lockfile root mirrors the original Astro range');
assert.equal(packageLock.packages['node_modules/astro'].version, '7.2.2', 'lockfile keeps the remediated Astro resolution');
assert.equal(packageLock.packages['node_modules/sharp'].version, '0.35.3', 'lockfile keeps the remediated sharp resolution');
assert.equal(packageLock.packages['node_modules/svgo'].version, '4.0.2', 'lockfile keeps the remediated svgo resolution');
assert.match(auditRecord, /1 moderate and 5 high vulnerable package entries/);
assert.match(auditRecord, /1 moderate plus 7 high GHSA IDs/);
assert.match(auditRecord, /`npm ci`: exit `0`/);
assert.match(auditRecord, /`npm audit --json`: exit `0`/);
assert.match(auditRecord, /`for f in deploy\/\*\.sh; do bash -n/);
assert.match(taskLog, /^Updated: 2026-08-18$/m);
assert.equal(fs.existsSync('docs/security/audit.json'), false, 'generic audit output is excluded from the deliverable');

console.log('FAN-256 dependency audit contract passed');
