const assert = require('node:assert/strict');
const fs = require('node:fs');
const { pathToRegexp } = require('path-to-regexp');

// Vercel compiles vercel.json in getTransformedRoutes (packages/routing-utils):
// cleanUrls, then trailingSlash routes, then redirects. A trailingSlash: true
// 308 is therefore the first match for an extensionless path with no slash.
// This file simulates that order. It is not a measurement of visalang.org.

const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const astroConfig = fs.readFileSync('astro.config.mjs', 'utf8');
const pathToRegexpPackage = JSON.parse(fs.readFileSync('node_modules/path-to-regexp/package.json', 'utf8'));

assert.equal(pathToRegexpPackage.version, '6.1.0', 'route compiler matches the path-to-regexp release Vercel routing-utils uses');
assert.equal(Object.hasOwn(config, 'trailingSlash'), false, 'trailingSlash is omitted');
assert.equal(config.cleanUrls, false, 'cleanUrls stays false');
assert.match(astroConfig, /trailingSlash:\s*'always'/, 'Astro still builds trailing-slash directory URLs');

const ADD_SLASH = '/:path((?!\\.well-known/)(?:[^/]+/)*[^/.]+)';
const STRIP_EXTENSION_SLASH = '/:path((?:[^/]+/)*[^/]+\\.\\w+)/';
const slashRules = config.redirects.slice(-2);
assert.deepEqual(
  slashRules.map((rule) => [rule.source, rule.destination, rule.statusCode, rule.permanent]),
  [
    [ADD_SLASH, '/:path/', 308, undefined],
    [STRIP_EXTENSION_SLASH, '/:path', 308, undefined],
  ],
  'slash normalization is the last two redirects and uses statusCode 308',
);
for (const rule of config.redirects.slice(0, -2)) {
  if (rule.has) {
    assert.equal(rule.source, '/(.*)');
    assert.equal(rule.statusCode, 301);
    continue;
  }
  assert.equal(rule.statusCode, 301, `${rule.source} stays a 301 ahead of slash normalization`);
  assert.equal(rule.permanent, undefined, `${rule.source} does not set permanent`);
}

const PLATFORM_TRAILING_SLASH_TRUE = [
  { src: '^/\\.well-known(?:/.*)?$', status: null, location: null },
  { src: '^/((?:[^/]+/)*[^/.]+)$', status: 308, location: '/$1/' },
  { src: '^/((?:[^/]+/)*[^/]+\\.\\w+)/$', status: 308, location: '/$1' },
];

function compileRedirect(rule) {
  const keys = [];
  const compiled = pathToRegexp(rule.source, keys, {
    strict: true,
    sensitive: true,
    delimiter: '/',
  });
  let src = compiled.source;
  if (!src.startsWith('^')) src = `^${src}`;
  if (!src.endsWith('$')) src = `${src}$`;
  src = src.replace(/\\\//g, '/');
  let location = rule.destination;
  keys.forEach((key, index) => {
    if (typeof key.name === 'string') {
      location = location.replaceAll(`:${key.name}`, `$${index + 1}`);
    }
  });
  return {
    regex: new RegExp(src),
    location,
    status: rule.statusCode,
    has: rule.has || null,
  };
}

function firstHop(pathname, host, routes) {
  for (const route of routes) {
    if (route.has) {
      const allowed = route.has.every((condition) => condition.type === 'host' && condition.value === host);
      if (!allowed) continue;
    }
    const match = pathname.match(route.regex);
    if (!match) continue;
    if (!route.status) return null;
    let location = route.location;
    for (let index = match.length - 1; index >= 1; index -= 1) {
      location = location.replaceAll(`$${index}`, () => match[index] ?? '');
    }
    return { status: route.status, location };
  }
  return null;
}

function routesFor(trailingSlash) {
  const redirects = config.redirects.map(compileRedirect);
  if (trailingSlash === true) {
    return [
      ...PLATFORM_TRAILING_SLASH_TRUE.map((route) => ({ ...route, regex: new RegExp(route.src), has: null })),
      ...redirects,
    ];
  }
  assert.equal(trailingSlash, undefined);
  return redirects;
}

const deployed = routesFor(config.trailingSlash);
const platformFirst = routesFor(true);

function hop(pathname, host = 'visalang.org', routes = deployed) {
  return firstHop(pathname, host, routes);
}

function chain(pathname, host = 'visalang.org', routes = deployed) {
  const hops = [];
  let current = pathname;
  let currentHost = host;
  for (let guard = 0; guard < 6; guard += 1) {
    const step = firstHop(current, currentHost, routes);
    if (!step) break;
    hops.push(step);
    if (step.location.startsWith('https://visalang.org')) {
      const url = new URL(step.location);
      current = url.pathname;
      currentHost = url.host;
      continue;
    }
    if (step.location.startsWith('/')) {
      current = step.location;
      continue;
    }
    break;
  }
  return hops;
}

const apex = [
  ['/disclaimer', { status: 301, location: '/terms/' }],
  ['/disclaimer/', { status: 301, location: '/terms/' }],
  ['/privacy', { status: 301, location: '/privacy-policy/' }],
  ['/privacy/', { status: 301, location: '/privacy-policy/' }],
  ['/terms/', null],
  ['/privacy-policy/', null],
  ['/about', { status: 308, location: '/about/' }],
  ['/about/', null],
  ['/guides/goethe-a1-30-day-study-plan', { status: 308, location: '/guides/goethe-a1-30-day-study-plan/' }],
  ['/guides/goethe-a1-30-day-study-plan/', null],
  ['/zh', { status: 308, location: '/zh/' }],
  ['/zh/', null],
  ['/zh/germany-family-reunion-a1', { status: 308, location: '/zh/germany-family-reunion-a1/' }],
  ['/tools/route-finder', { status: 308, location: '/tools/route-finder/' }],
  ['/tools/route-finder/', null],
  ['/about.html', { status: 301, location: '/about/' }],
  ['/privacy-policy.html', { status: 301, location: '/privacy-policy/' }],
  ['/terms.html', { status: 301, location: '/terms/' }],
  ['/guides/foo.html', { status: 301, location: '/guides/foo/' }],
  ['/zh/guides/foo.html', { status: 301, location: '/zh/guides/foo/' }],
  ['/guides/yki-vs-other-finland-options', { status: 308, location: '/guides/yki-vs-other-finland-options/' }],
  ['/guides/yki-vs-other-finland-options/', { status: 301, location: '/guides/yki-finnish-citizenship/' }],
  ['/guides/yki-vs-other-finland-options.html', { status: 301, location: '/guides/yki-finnish-citizenship/' }],
  ['/guides/goethe-a1-booking-mistakes', { status: 301, location: '/guides/goethe-a1-pre-booking-checklist/' }],
  ['/guides/goethe-a1-booking-mistakes/', { status: 301, location: '/guides/goethe-a1-pre-booking-checklist/' }],
  ['/guides/goethe-a1-official-links-practice-resources', { status: 301, location: '/germany-family-reunion-a1/' }],
  ['/guides/goethe-a1-study-plan-working-adults', { status: 301, location: '/guides/goethe-a1-30-day-study-plan/' }],
  ['/guides/goethe-b1-difficulty-analysis', { status: 301, location: '/guides/goethe-b1-study-plan/' }],
  ['/guides/dutch-inburgering-a2-b1-for-integration-and-citize', { status: 308, location: '/guides/dutch-inburgering-a2-b1-for-integration-and-citize/' }],
  ['/guides/dutch-inburgering-a2-b1-for-integration-and-citize/', { status: 301, location: '/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship/' }],
  ['/privacy-policy.html/', { status: 308, location: '/privacy-policy.html' }],
  ['/sitemap.xml', null],
  ['/robots.txt', null],
  ['/_astro/app.js', null],
  ['/favicon.ico', null],
  ['/favicon.ico/', { status: 308, location: '/favicon.ico' }],
  ['/', null],
  ['/.well-known', null],
  ['/.well-known/acme-challenge/token', null],
];

for (const [pathname, expected] of apex) {
  assert.deepEqual(hop(pathname), expected, `${pathname} first hop`);
}

assert.deepEqual(
  hop('/disclaimer', 'visalang.org', platformFirst),
  { status: 308, location: '/disclaimer/' },
  'restoring trailingSlash: true makes /disclaimer a 308 before the 301',
);
assert.deepEqual(
  hop('/privacy', 'visalang.org', platformFirst),
  { status: 308, location: '/privacy/' },
  'restoring trailingSlash: true makes /privacy a 308 before the 301',
);
assert.deepEqual(hop('/disclaimer/', 'visalang.org', platformFirst), { status: 301, location: '/terms/' });
assert.deepEqual(hop('/about', 'visalang.org', platformFirst), { status: 308, location: '/about/' });
assert.deepEqual(hop('/.well-known/acme-challenge/token', 'visalang.org', platformFirst), null);

assert.deepEqual(chain('/disclaimer'), [{ status: 301, location: '/terms/' }]);
assert.deepEqual(chain('/disclaimer/'), [{ status: 301, location: '/terms/' }]);
assert.deepEqual(chain('/privacy'), [{ status: 301, location: '/privacy-policy/' }]);
assert.deepEqual(chain('/privacy/'), [{ status: 301, location: '/privacy-policy/' }]);
assert.deepEqual(chain('/about'), [{ status: 308, location: '/about/' }]);
assert.deepEqual(chain('/terms/'), []);
assert.deepEqual(chain('/privacy-policy/'), []);
assert.deepEqual(chain('/privacy-policy.html/'), [
  { status: 308, location: '/privacy-policy.html' },
  { status: 301, location: '/privacy-policy/' },
]);
assert.deepEqual(chain('/guides/dutch-inburgering-a2-b1-for-integration-and-citize'), [
  { status: 308, location: '/guides/dutch-inburgering-a2-b1-for-integration-and-citize/' },
  { status: 301, location: '/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship/' },
]);
assert.deepEqual(chain('/guides/yki-vs-other-finland-options'), [
  { status: 308, location: '/guides/yki-vs-other-finland-options/' },
  { status: 301, location: '/guides/yki-finnish-citizenship/' },
]);

assert.deepEqual(hop('/disclaimer', 'www.visalang.org'), {
  status: 301,
  location: 'https://visalang.org/disclaimer',
});
assert.deepEqual(hop('/privacy', 'www.visalang.org'), {
  status: 301,
  location: 'https://visalang.org/privacy',
});
assert.deepEqual(hop('/about/', 'www.visalang.org'), {
  status: 301,
  location: 'https://visalang.org/about/',
});
assert.deepEqual(chain('/disclaimer', 'www.visalang.org'), [
  { status: 301, location: 'https://visalang.org/disclaimer' },
  { status: 301, location: '/terms/' },
]);

const platformAdd = /^\/((?:[^/]+\/)*[^/.]+)$/;
const ourAdd = deployed.at(-2).regex;
for (const pathname of ['/about', '/guides/foo', '/zh', '/a/b/c', '/about/', '/sitemap.xml', '/about.html', '/']) {
  assert.equal(
    ourAdd.test(pathname),
    platformAdd.test(pathname),
    `${pathname} add-slash coverage matches the platform 308`,
  );
}
assert.equal(platformAdd.test('/.well-known/acme-challenge/token'), true);
assert.equal(ourAdd.test('/.well-known/acme-challenge/token'), false);

console.log('legal redirect first hop passed');
