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

function addLastmod(xml, loc, lastmod) {
  const escapedLoc = loc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`<url><loc>${escapedLoc}</loc>(?:<lastmod>[^<]+</lastmod>)?</url>`);
  return xml.replace(re, `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`);
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

fs.writeFileSync(sitemapPath, sitemap);
