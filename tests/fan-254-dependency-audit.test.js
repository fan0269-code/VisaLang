const assert = require('node:assert/strict');
const fs = require('node:fs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const packageLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
const auditRecord = fs.readFileSync('docs/security/FAN-254-dependency-audit-2026-08-18.md', 'utf8');
const taskLog = fs.readFileSync('docs/TASK_LOG.md', 'utf8');
const lockPackages = packageLock.packages;
const astroPackage = lockPackages['node_modules/astro'];
const markdownRemarkPackage = lockPackages['node_modules/@astrojs/markdown-remark'];
const markdownSatteriPackage = lockPackages['node_modules/@astrojs/markdown-satteri'];
const internalHelpersPackage = lockPackages['node_modules/@astrojs/internal-helpers'];
const vitePackage = lockPackages['node_modules/vite'];
const postcssPackage = lockPackages['node_modules/postcss'];

assert.equal(packageJson.dependencies.astro, '^7.0.7', 'manifest keeps the original Astro range');
assert.equal(packageLock.name, 'VisaLang', 'lockfile preserves the project name');
assert.equal(packageLock.packages[''].dependencies.astro, '^7.0.7', 'lockfile root mirrors the original Astro range');
assert.equal(astroPackage.dependencies['@astrojs/internal-helpers'], '0.10.1', 'Astro pins its internal helpers');
assert.equal(astroPackage.optionalDependencies.sharp, '^0.34.0 || ^0.35.0', 'Astro reaches sharp through its optional dependency');
assert.equal(astroPackage.dependencies['js-yaml'], '^4.1.1', 'Astro reaches js-yaml directly');
assert.equal(astroPackage.dependencies.svgo, '^4.0.1', 'Astro reaches svgo through its dependency');
assert.equal(markdownRemarkPackage.dependencies['@astrojs/internal-helpers'], '0.10.1', 'root Markdown integration reaches js-yaml through internal helpers');
assert.equal(markdownSatteriPackage.dependencies['@astrojs/internal-helpers'], '0.10.1', 'Astro Markdown integration reaches js-yaml through internal helpers');
assert.equal(internalHelpersPackage.dependencies['js-yaml'], '^4.1.1', 'Astro internal helpers reach js-yaml');
assert.equal(vitePackage.dependencies.postcss, '^8.5.16', 'Astro Vite reaches postcss');
assert.equal(postcssPackage.dependencies.nanoid, '^3.3.17', 'PostCSS reaches nanoid');
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
assert.match(auditRecord, /root -> astro -> js-yaml/);
assert.match(auditRecord, /root -> astro -> @astrojs\/internal-helpers -> js-yaml/);
assert.match(auditRecord, /root -> astro -> @astrojs\/markdown-satteri -> @astrojs\/internal-helpers -> js-yaml/);
assert.match(auditRecord, /root -> @astrojs\/markdown-remark -> @astrojs\/internal-helpers -> js-yaml/);
assert.match(auditRecord, /astro -> sharp/);
assert.match(auditRecord, /astro -> svgo/);
for (const name of Object.keys(remediatedVersions)) {
  assert.match(auditRecord, new RegExp(`node_modules/${name}`), `audit record names ${name}`);
}
assert.match(auditRecord, /astro -> vite -> postcss -> nanoid/);
assert.match(auditRecord, /astro -> @astrojs\/internal-helpers -> js-yaml/);
assert.match(auditRecord, /astro@7\.1\.1/);
for (const [name, version] of Object.entries(remediatedVersions)) {
  const tableRow = '| `' + name + '` | `' + version + '` |';
  assert.ok(auditRecord.includes(tableRow), `audit record records ${name} ${version}`);
}
assert.match(auditRecord, /`npm ci`: exit `0`/);
assert.match(auditRecord, /`npm audit --json`: exit `0`/);
assert.match(auditRecord, /`info: 0`, `low: 0`, `moderate: 0`, `high: 0`, `critical: 0`, `total: 0`/);
assert.match(auditRecord, /astro@7\.1\.0.*withdrawn/i);
assert.match(auditRecord, /conservative supply-chain screening decision/);
assert.match(auditRecord, /`for f in deploy\/\*\.sh; do bash -n/);
const taskLogUpdatedDate = taskLog.match(/^Updated: (\d{4}-\d{2}-\d{2})$/m)?.[1];
assert.ok(taskLogUpdatedDate && taskLogUpdatedDate >= '2026-08-18', 'task log keeps an ISO update date at or after the FAN-254 maintenance window');
assert.equal(fs.existsSync('docs/security/audit.json'), false, 'generic audit output is excluded from the deliverable');

console.log('FAN-254 dependency audit contract passed');
