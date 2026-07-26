const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sitemapPath = path.join(root, "dist", "sitemap-0.xml");
const guidesDir = path.join(root, "src", "content", "guides");

function readGuideMetadata(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const slug = content.match(/^slug:\s*"([^"]+)"/m)?.[1];
  const updatedDate = content.match(/^updatedDate:\s*"(\d{4}-\d{2}-\d{2})"/m)?.[1];
  if (!slug || !updatedDate) return null;
  return { slug, updatedDate };
}

function sitemapUrlPattern(loc, flags = "") {
  const escapedLoc = loc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`<url><loc>${escapedLoc}</loc>(?:<lastmod>[^<]+</lastmod>)?</url>`, flags);
}

function addLastmod(xml, loc, lastmod) {
  return xml.replace(sitemapUrlPattern(loc), `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`);
}

function removeUrl(xml, loc) {
  return xml.replace(sitemapUrlPattern(loc, "g"), "");
}

function listHtmlFiles(directory, result = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) listHtmlFiles(fullPath, result);
    else if (entry.name.endsWith(".html")) result.push(fullPath);
  }
  return result;
}

function canonicalUrlFromHtml(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  if (!html.includes('<meta name="robots" content="noindex,follow">')) return null;
  return html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null;
}

if (!fs.existsSync(sitemapPath) || !fs.existsSync(guidesDir)) {
  process.exit(0);
}

let sitemap = fs.readFileSync(sitemapPath, "utf8");
const guideFiles = fs.readdirSync(guidesDir).filter((file) => file.endsWith(".md"));

for (const file of guideFiles) {
  const metadata = readGuideMetadata(path.join(guidesDir, file));
  if (!metadata) continue;
  sitemap = addLastmod(
    sitemap,
    `https://visalang.org/guides/${metadata.slug}/`,
    metadata.updatedDate
  );
}

for (const filePath of listHtmlFiles(path.join(root, "dist"))) {
  const canonicalUrl = canonicalUrlFromHtml(filePath);
  if (canonicalUrl) sitemap = removeUrl(sitemap, canonicalUrl);
}

fs.writeFileSync(sitemapPath, sitemap);
