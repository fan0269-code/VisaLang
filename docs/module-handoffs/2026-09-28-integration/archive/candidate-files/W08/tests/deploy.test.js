const assert = require('node:assert/strict');
const fs = require('node:fs');

const read = (file) => fs.readFileSync(file, 'utf8');

const extractTopLevelServerBlocks = (config) => {
  const blocks = [];
  let depth = 0;
  let start = -1;

  for (let index = 0; index < config.length; index += 1) {
    if (depth === 0 && start === -1 && (index === 0 || config[index - 1] === '\n') && /^server\s*\{/.test(config.slice(index))) {
      start = index;
    }

    if (config[index] === '{') depth += 1;
    if (config[index] === '}') {
      depth -= 1;
      if (start !== -1 && depth === 0) {
        blocks.push(config.slice(start, index + 1));
        start = -1;
      }
    }
  }

  return blocks;
};

const listensOn = (block, port) => new RegExp(`^\\s*listen\\s+(?:\\[::\\]:)?${port}(?:\\s+[^;]+)?;$`, 'm').test(block);

const deploy = read('deploy/deploy.sh');
const indexOfOrFail = (fragment) => {
  const index = deploy.indexOf(fragment);
  assert.notEqual(index, -1, `deployment contains ${fragment}`);
  return index;
};
const assertOrdered = (label, indices) => {
  for (let index = 1; index < indices.length; index += 1) {
    assert.ok(indices[index - 1] < indices[index], `${label}: command ${index} follows command ${index - 1}`);
  }
};
const nginx = read('deploy/nginx-vhost-template.conf');
const serverInit = read('deploy/server-init.sh');
const redirects = read('deploy/legacy-redirects.conf');
const serverBlocks = extractTopLevelServerBlocks(nginx);
const httpBlock = serverBlocks.find((block) => listensOn(block, 80) && block.includes('server_name visalang.org www.visalang.org;'));
const wwwHttpsBlock = serverBlocks.find((block) => listensOn(block, 443) && block.includes('server_name www.visalang.org;'));
const apexHttpsBlock = serverBlocks.find((block) => listensOn(block, 443) && block.includes('server_name visalang.org;'));

assert.ok(deploy.includes('DOMAIN="visalang.org"'), 'deployment is fixed to the canonical VisaLang domain');
assert.doesNotMatch(deploy, /flowlight\.me/, 'deployment no longer targets the legacy domain');
assert.doesNotMatch(nginx, /https:\/\/\$host/, 'Nginx never builds redirects from the request Host header');
assert.ok(httpBlock, 'Nginx has an HTTP canonical redirect server');
assert.ok(httpBlock.includes('return 301 https://visalang.org$request_uri;'), 'HTTP redirect server uses the fixed canonical host');
assert.ok(wwwHttpsBlock, 'Nginx has a dedicated HTTPS www redirect server');
assert.ok(wwwHttpsBlock.includes('return 301 https://visalang.org$request_uri;'), 'HTTPS www redirect server uses the fixed canonical host');
assert.doesNotMatch(wwwHttpsBlock, /root \/var\/www\/visalang\.org\/current;/, 'HTTPS www redirect server does not serve the current release');
assert.ok(apexHttpsBlock, 'Nginx has a dedicated canonical HTTPS server');
assert.ok(apexHttpsBlock.includes('root /var/www/visalang.org/current;'), 'canonical Nginx server uses the atomic current release');
assert.ok(apexHttpsBlock.includes('include /etc/nginx/snippets/visalang-legacy-redirects.conf;'), 'canonical Nginx server loads executable legacy redirects');
assert.ok(apexHttpsBlock.includes('location ~* \\.(css|js)$') && apexHttpsBlock.includes('expires 1y;') && apexHttpsBlock.includes('try_files $uri =404;'), 'canonical Nginx server caches CSS and JavaScript assets');
assert.ok(apexHttpsBlock.includes('location ~* \\.(xml|txt)$') && apexHttpsBlock.includes('expires 1h;'), 'canonical Nginx server caches XML and text assets');
assert.ok(apexHttpsBlock.includes('error_page 404 /404.html;') && apexHttpsBlock.includes('location = /404.html {') && apexHttpsBlock.includes('internal;') && apexHttpsBlock.includes('location / {'), 'canonical Nginx server defines internal 404 handling');
assert.doesNotMatch(apexHttpsBlock, /server_name www\.visalang\.org;/, 'canonical HTTPS server is not the www redirect server');
assert.doesNotMatch(nginx, /Content-Security-Policy/, 'Nginx does not ship an incompatible static AdSense CSP');
for (const headerDirective of [
  'add_header X-Content-Type-Options nosniff always;',
  'add_header X-Frame-Options SAMEORIGIN always;',
  'add_header Referrer-Policy strict-origin-when-cross-origin always;',
  'add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;',
  'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;',
]) {
  assert.ok(apexHttpsBlock.includes(headerDirective), `canonical Nginx server retains ${headerDirective}`);
}
assert.doesNotMatch(serverInit, /flowlight\.me/, 'server initialization instructions use the canonical domain');

const exactRedirects = {
  '/germany-family-reunion-a1.html': 'https://visalang.org/germany-family-reunion-a1/$is_args$args',
  '/do-i-need-german-a1.html': 'https://visalang.org/tools/route-finder/$is_args$args',
  '/about.html': 'https://visalang.org/about/$is_args$args',
  '/contact.html': 'https://visalang.org/contact/$is_args$args',
  '/privacy-policy.html': 'https://visalang.org/privacy-policy/$is_args$args',
  '/terms.html': 'https://visalang.org/terms/$is_args$args',
  '/cookie-policy.html': 'https://visalang.org/cookie-policy/$is_args$args',
  '/editorial-policy.html': 'https://visalang.org/editorial-policy/$is_args$args',
  '/affiliate-disclosure.html': 'https://visalang.org/affiliate-disclosure/$is_args$args',
  '/zh/germany-family-reunion-a1.html': 'https://visalang.org/zh/germany-family-reunion-a1/$is_args$args',
  '/guides/dutch-inburgering-a2-b1-for-integration-and-citize/': 'https://visalang.org/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship/$is_args$args',
  '/guides/portuguese-language-for-golden-visa-and-citizenshi/': 'https://visalang.org/guides/portuguese-language-for-golden-visa-and-citizenship/$is_args$args',
  '/guides/yki-vs-other-finland-options/': 'https://visalang.org/guides/yki-finnish-citizenship/$is_args$args',
  '/guides/yki-vs-other-finland-options.html': 'https://visalang.org/guides/yki-finnish-citizenship/$is_args$args',
};
assert.ok(redirects.includes('if ($request_uri = /index.html) { return 301 https://visalang.org/$is_args$args; }'), 'Nginx redirects explicit legacy /index.html requests without looping internal index resolution');
assert.ok(redirects.includes('try_files /index.html =404;'), 'Nginx can still serve the homepage after its internal index resolution');
assert.ok(redirects.includes('if ($request_uri = /zh/index.html) { return 301 https://visalang.org/zh/$is_args$args; }'), 'Nginx redirects explicit legacy Chinese index requests without looping internal index resolution');
assert.ok(redirects.includes('try_files /zh/index.html =404;'), 'Nginx can still serve the Chinese homepage after its internal index resolution');
for (const [source, target] of Object.entries(exactRedirects)) {
  assert.ok(redirects.includes(`location = ${source} { return 301 ${target}; }`), `Nginx redirects ${source} to ${target} without dropping query parameters`);
}
assert.ok(redirects.includes('if ($request_uri ~ \\.html(?:\\?|$)) { return 301 https://visalang.org/guides/$1/$is_args$args; }'), 'Nginx redirects explicit legacy English guide HTML routes without catching internal directory indexes');
assert.ok(redirects.includes('if ($request_uri ~ \\.html(?:\\?|$)) { return 301 https://visalang.org/zh/guides/$1/$is_args$args; }'), 'Nginx redirects explicit legacy Chinese guide HTML routes without catching internal directory indexes');

// Runtime orchestration has moved to a bundle-bound transaction tested in Python.
assert.match(deploy, /release\.py" activate/);
assert.doesNotMatch(deploy, /git clone|git pull|npm|main/);
assert.match(read('deploy/rollback.sh'), /release\.py" rollback/);
require('node:child_process').execFileSync('python3', ['-m', 'unittest', 'discover', '-s', 'deploy/tests', '-v'], { stdio: 'inherit' });

assert.ok(fs.existsSync('deploy/smoke-test.sh'), 'deployment includes production smoke checks');
const smoke = read('deploy/smoke-test.sh');
for (const path of ['/', '/guides/', '/robots.txt', '/sitemap-index.xml']) {
  assert.ok(smoke.includes(path), `smoke test checks public path: ${path}`);
}
for (const path of ['/index.html', '/germany-family-reunion-a1.html', '/guides/yki-vs-other-finland-options/', '/guides/yki-vs-other-finland-options.html']) {
  assert.ok(smoke.includes(path), `smoke test checks legacy redirect: ${path}`);
}
assert.ok(smoke.includes('rel="canonical" href="https://visalang.org/"'), 'smoke test verifies the production canonical');
assert.ok(smoke.includes('https://www.visalang.org'), 'smoke test checks www canonicalisation');
assert.ok(smoke.includes('ADS_MODE') && smoke.includes('Advertising-off mode loaded AdSense'), 'smoke test follows the selected advertising mode on an eligible page');
assert.ok(smoke.includes('Homepage must remain advertising-free'), 'smoke test keeps the homepage ad-free in every mode');
assert.ok(smoke.includes('PURPOSE_MODE') && smoke.includes('optional-purpose Nginx route'), 'smoke test verifies the purpose-service route mode without making an inference request');
assert.ok(smoke.includes('/tools/route-finder/'), 'smoke test verifies the tool route remains advertising-free');
assert.ok(smoke.includes('google.com, pub-3018617123550799, DIRECT, f08c47fec0942fa0'), 'smoke test verifies the production ads.txt seller line');
assert.ok(smoke.includes('content-security-policy'), 'smoke test verifies the approved CSP removal');
const deployReadme = read('deploy/README.md');
assert.doesNotMatch(deployReadme, /flowlight\.me/, 'deployment documentation no longer describes the legacy domain as current');
assert.ok(deployReadme.includes('rollback.sh <verified-bundle-path>'), 'deployment documentation requires an explicit verified bundle target');
assert.ok(deployReadme.includes('separately authorised production window'), 'deployment documentation preserves the production authorisation boundary');
assert.ok(deployReadme.includes('Auto ads page exclusions'), 'deployment documentation requires account-side route exclusions');
assert.ok(deployReadme.includes('Raw HAR files and screenshots must not be committed to Git'), 'deployment documentation protects raw browser evidence');

console.log('deployment configuration rules passed');
