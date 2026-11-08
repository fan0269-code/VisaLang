const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const read = (file) => fs.readFileSync(file, 'utf8');
const config = JSON.parse(read('vercel.json'));
const packageJson = JSON.parse(read('package.json'));
const astroConfig = read('astro.config.mjs');
const siteData = read('src/data/site.ts');
const redirectLines = read('public/_redirects')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'));
const headerManifest = read('public/_headers');

assert.equal(config.framework, 'astro', 'Vercel uses the Astro preset');
assert.equal(config.installCommand, 'npm ci', 'Vercel installs the lockfile');
assert.equal(config.buildCommand, 'npm run build', 'Vercel runs the Astro build and sitemap lastmod postbuild');
assert.equal(config.outputDirectory, 'dist', 'Vercel publishes the Astro dist output');
assert.equal(config.cleanUrls, false, 'explicit legacy .html redirects stay in charge of extension URLs');
assert.equal(config.trailingSlash, true, 'Vercel matches Astro trailingSlash always');
assert.equal(packageJson.engines.node, '22.x', 'Vercel stays on Node 22 rather than an open range that selects a newer major');
assert.doesNotMatch(JSON.stringify(packageJson), /@astrojs\/vercel/, 'static hosting does not add the Vercel SSR adapter');
assert.match(astroConfig, /site:\s*'https:\/\/visalang\.org'/, 'production site URL stays on the apex');
assert.match(siteData, /advertisingRuntimeEnabled:\s*false/, 'Vercel cutover leaves the advertising runtime off');
assert.doesNotMatch(JSON.stringify(config), /vercel_token|BEGIN [A-Z ]*PRIVATE KEY|sk_live|AKIA/i, 'vercel.json does not carry credentials');

const staticRedirects = config.redirects.filter((rule) => !rule.has);
const wwwRedirect = config.redirects[0];
assert.equal(config.redirects.indexOf(wwwRedirect), 0, 'www canonicalisation is the first redirect');
assert.deepEqual(wwwRedirect.has, [{ type: 'host', value: 'www.visalang.org' }]);
assert.equal(wwwRedirect.destination, 'https://visalang.org/$1');
assert.equal(wwwRedirect.statusCode, 301);

for (const line of redirectLines) {
  const [source, destination, code] = line.split(/\s+/);
  if (code === '404') {
    assert.equal(source, '/*');
    assert.equal(destination, '/404.html');
    assert.ok(!config.redirects.some((rule) => rule.destination === '/404.html'), 'the Netlify 404 splat is not a Vercel redirect');
    continue;
  }
  assert.equal(code, '301', `${line} is a 301 in public/_redirects`);
  assert.ok(
    staticRedirects.some((rule) => rule.source === source && rule.destination === destination && rule.statusCode === 301 && !rule.permanent),
    `vercel.json keeps 301 ${source} -> ${destination}`,
  );
}

for (const header of ['X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy', 'Strict-Transport-Security']) {
  assert.ok(headerManifest.includes(`${header}:`), `public/_headers still declares ${header}`);
  assert.ok(
    config.headers.some((rule) => rule.headers.some((item) => item.key === header)),
    `vercel.json sends ${header}`,
  );
}
assert.ok(!headerManifest.includes('Content-Security-Policy:'), 'header manifest still has no static CSP');
assert.ok(!config.headers.some((rule) => rule.headers.some((item) => item.key === 'Content-Security-Policy')), 'vercel.json adds no static CSP');

const cacheFor = (source) => {
  const rule = config.headers.find((item) => item.source === source);
  assert.ok(rule, `cache header rule exists for ${source}`);
  return rule.headers.find((item) => item.key === 'Cache-Control').value;
};
assert.equal(cacheFor('/_astro/(.*)'), 'public, max-age=31536000, immutable');
assert.equal(cacheFor('/(.*)\\.html'), 'public, max-age=3600');
assert.equal(cacheFor('/sitemap.xml'), 'public, max-age=3600');
assert.equal(cacheFor('/sitemap-index.xml'), 'public, max-age=3600');
assert.equal(cacheFor('/sitemap-0.xml'), 'public, max-age=3600');
assert.equal(cacheFor('/robots.txt'), 'public, max-age=86400');

const guard = 'VISALANG_LEGACY_NGINX_DEPLOY:-';
for (const script of ['deploy/deploy.sh', 'deploy/rollback.sh', 'deploy/server-init.sh', 'deploy/harden.sh']) {
  assert.ok(read(script).includes(guard), `${script} refuses the historical Nginx path unless the emergency override is set`);
}
assert.match(read('deploy/VERCEL.md'), /advertisingRuntimeEnabled/, 'cutover doc keeps the advertising runtime gate visible');
assert.match(read('deploy/VERCEL.md'), /Do not submit an AdSense application/, 'cutover doc does not start an AdSense application');
assert.match(read('deploy/README.md'), /deploy\/VERCEL\.md/, 'Nginx deploy readme points at the Vercel path');

const workflowDir = '.github/workflows';
if (fs.existsSync(workflowDir)) {
  for (const entry of fs.readdirSync(workflowDir)) {
    const workflow = read(path.join(workflowDir, entry));
    assert.doesNotMatch(workflow, /deploy\/deploy\.sh/, `${entry} does not SSH-deploy`);
  }
}

console.log('vercel hosting rules passed');
