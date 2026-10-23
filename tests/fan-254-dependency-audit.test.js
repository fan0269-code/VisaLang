const assert = require('node:assert/strict');
const fs = require('node:fs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const packageLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
const auditRecord = fs.readFileSync('docs/security/FAN-254-dependency-audit-2026-08-18.md', 'utf8');
const remediationRecord = fs.readFileSync('docs/security/DEPENDENCY_REMEDIATION_2026-10-23.md', 'utf8');
const taskLog = fs.readFileSync('docs/TASK_LOG.md', 'utf8');
const lockPackages = packageLock.packages;
const astroPackage = lockPackages['node_modules/astro'];
const markdownRemarkPackage = lockPackages['node_modules/@astrojs/markdown-remark'];
const markdownSatteriPackage = lockPackages['node_modules/@astrojs/markdown-satteri'];
const internalHelpersPackage = lockPackages['node_modules/@astrojs/internal-helpers'];
const vitePackage = lockPackages['node_modules/vite'];
const postcssPackage = lockPackages['node_modules/postcss'];

// Historical FAN-254 record stays readable and unchanged.
assert.match(auditRecord, /1 moderate and 5 high vulnerable package entries/);
assert.match(auditRecord, /1 moderate plus 7 high GHSA IDs/);
assert.match(auditRecord, /root -> astro -> js-yaml/);
assert.match(auditRecord, /root -> astro -> @astrojs\/internal-helpers -> js-yaml/);
assert.match(auditRecord, /root -> astro -> @astrojs\/markdown-satteri -> @astrojs\/internal-helpers -> js-yaml/);
assert.match(auditRecord, /root -> @astrojs\/markdown-remark -> @astrojs\/internal-helpers -> js-yaml/);
assert.match(auditRecord, /astro -> sharp/);
assert.match(auditRecord, /astro -> svgo/);
assert.match(auditRecord, /astro -> vite -> postcss -> nanoid/);
assert.match(auditRecord, /astro@7\.1\.1/);
assert.match(auditRecord, /astro@7\.1\.0.*withdrawn/i);
assert.match(auditRecord, /conservative supply-chain screening decision/);
assert.match(auditRecord, /`for f in deploy\/\*\.sh; do bash -n/);

// Current remediation keeps the Node 22.23.x production floor.
assert.equal(packageJson.dependencies.astro, '7.4.1', 'manifest pins the patched Astro release');
assert.equal(packageLock.name, 'VisaLang', 'lockfile preserves the project name');
assert.equal(packageLock.packages[''].dependencies.astro, '7.4.1', 'lockfile root mirrors the Astro pin');
assert.equal(packageJson.dependencies['@astrojs/markdown-remark'], '^7.3.4', 'Markdown integration meets the Astro 7.4 peer range');
assert.equal(packageJson.dependencies['@astrojs/sitemap'], '^3.7.4', 'sitemap integration stays on the reviewed patch line');
assert.equal(packageJson.overrides['@astrojs/prism'], '4.1.0', 'Prism is overridden below the Node 22.23.4 engine floor');
assert.equal(astroPackage.dependencies['@astrojs/internal-helpers'], '0.13.0', 'Astro pins its internal helpers');
assert.equal(astroPackage.dependencies['@astrojs/markdown-satteri'], '0.4.4', 'Astro pins its Markdown engine');
assert.equal(astroPackage.dependencies.svgo, '^4.1.0', 'Astro reaches svgo through its dependency');
assert.equal(astroPackage.dependencies.vite, '^8.3.4', 'Astro reaches vite through its dependency');
assert.equal(astroPackage.optionalDependencies.sharp, '^0.35.4', 'Astro reaches sharp through its optional dependency');
assert.equal(astroPackage.dependencies['js-yaml'], undefined, 'Astro 7.4 no longer depends on js-yaml');
assert.equal(markdownRemarkPackage.dependencies['@astrojs/internal-helpers'], '0.13.0', 'root Markdown integration pins internal helpers');
assert.equal(markdownSatteriPackage.dependencies['@astrojs/internal-helpers'], '0.13.0', 'Astro Markdown integration pins internal helpers');
assert.equal(internalHelpersPackage.dependencies['js-yaml'], undefined, 'Astro internal helpers no longer depend on js-yaml');
assert.equal(vitePackage.dependencies.postcss, '^8.5.30', 'Astro Vite reaches postcss');
assert.equal(postcssPackage.dependencies.nanoid, '^3.3.20', 'PostCSS reaches nanoid');

const remediatedVersions = {
  astro: '7.4.1',
  '@astrojs/markdown-remark': '7.3.4',
  '@astrojs/sitemap': '3.7.4',
  sharp: '0.35.5',
  svgo: '4.1.0',
  vite: '8.3.5',
  postcss: '8.5.31',
  nanoid: '3.3.20',
};

for (const [name, version] of Object.entries(remediatedVersions)) {
  assert.equal(
    packageLock.packages[`node_modules/${name}`].version,
    version,
    `lockfile keeps the remediated ${name} resolution`,
  );
}

const prismEntries = Object.entries(lockPackages).filter(([key, value]) => key.endsWith('@astrojs/prism') && value.version);
assert.ok(prismEntries.length > 0, 'the Markdown integrations still resolve Prism');
for (const [key, value] of prismEntries) {
  assert.equal(value.version, '4.1.0', `${key} keeps the Node 22.22-compatible Prism version`);
}
assert.equal(packageLock.packages['node_modules/js-yaml'], undefined, 'js-yaml is absent from the lockfile');

assert.match(remediationRecord, /reported 9 vulnerable package entries: 1 critical, 8 high, and 0 low/);
assert.match(remediationRecord, /not reproducible after a clean `npm ci`/);
for (const advisory of ['GHSA-26w7-cxv4-gfx2', 'GHSA-376h-93r7-7g6f', 'GHSA-98hj-9722-w3j8', 'GHSA-mpr7-6m5w-76rw']) {
  assert.match(remediationRecord, new RegExp(advisory), `remediation record cites ${advisory}`);
}
assert.match(remediationRecord, /`astro@7\.4\.2` is the latest registry release, but its `engines\.node` is `>=22\.23\.4`/);
assert.match(remediationRecord, /recorded production runtime is Node `v22\.23\.1`/);
assert.match(remediationRecord, /declares the exact dependency `@astrojs\/prism: 4\.1\.1`/);
assert.match(remediationRecord, /differ only in their `version` and `engines\.node` fields/);
assert.match(remediationRecord, /package `overrides` entry therefore pins `@astrojs\/prism` to `4\.1\.0`/);
for (const [name, version] of Object.entries(remediatedVersions)) {
  const tableRow = '| `' + name + '` |';
  assert.ok(remediationRecord.includes(tableRow), `remediation record tables ${name}`);
  assert.ok(remediationRecord.includes('`' + version + '`'), `remediation record records ${name} ${version}`);
}
assert.match(remediationRecord, /`npm audit --json`: exit `0`, `info: 0`, `low: 0`, `moderate: 0`, `high: 0`, `critical: 0`, `total: 0`/);
assert.match(remediationRecord, /`npm ci`: exit `0`/);
assert.match(remediationRecord, /`npm test`: exit `0`/);
assert.match(remediationRecord, /`npm run launch-check`: exit `0`, 101 pages built, 46\/46 checks passed, `READY`/);
assert.match(remediationRecord, /`for f in deploy\/\*\.sh; do bash -n/);
assert.match(remediationRecord, /`git diff --check`: exit `0`/);
assert.match(remediationRecord, /not a commit, push, deployment, production approval, or owner approval/);

const taskLogUpdatedDate = taskLog.match(/^Updated: (\d{4}-\d{2}-\d{2})$/m)?.[1];
assert.ok(taskLogUpdatedDate && taskLogUpdatedDate >= '2026-10-23', 'task log keeps an ISO update date at or after the remediation window');
assert.equal(fs.existsSync('docs/security/audit.json'), false, 'generic audit output is excluded from the deliverable');

console.log('FAN-254 dependency audit contract passed');
