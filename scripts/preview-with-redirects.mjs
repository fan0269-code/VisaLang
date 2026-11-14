import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const port = Number(process.env.PORT || 4173);
const redirects = JSON.parse(fs.readFileSync('vercel.json', 'utf8')).redirects
  .filter((rule) => !rule.has && !rule.source.includes(':'));

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
};

function redirectFor(urlPath) {
  return redirects.find((rule) => rule.source === urlPath);
}

function fileFor(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const candidates = decoded.endsWith('/')
    ? [path.join(dist, decoded, 'index.html')]
    : [path.join(dist, decoded), path.join(dist, decoded, 'index.html')];
  return candidates.find((candidate) => {
    const relative = path.relative(dist, candidate);
    return relative && !relative.startsWith('..') && fs.existsSync(candidate) && fs.statSync(candidate).isFile();
  });
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url || '/', `http://127.0.0.1:${port}`);
  const rule = redirectFor(url.pathname);
  if (rule) {
    response.writeHead(rule.statusCode || 301, { Location: rule.destination });
    response.end();
    return;
  }
  const file = fileFor(url.pathname);
  if (!file) {
    const missing = path.join(dist, '404.html');
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(fs.readFileSync(missing));
    return;
  }
  response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  response.end(fs.readFileSync(file));
});

server.listen(port, '127.0.0.1', () => {
  process.stdout.write(`preview-with-redirects http://127.0.0.1:${port}\n`);
});
