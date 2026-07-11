// VisaLang launch readiness check.
// Run: npm run launch-check
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const exists = (rel) => fs.existsSync(path.join(root, rel));

const checks = [];
const fail = (msg) => checks.push({ ok: false, msg });
const pass = (msg) => checks.push({ ok: true, msg });
const warn = (msg) => checks.push({ ok: true, warn: true, msg });

// Domain
const indexHtml = read("index.html");
const zhIndexHtml = exists("zh/index.html") ? read("zh/index.html") : "";
const astroGlobalCss = exists("src/styles/global.css") ? read("src/styles/global.css") : "";
if (/visalang\.example/i.test(indexHtml)) {
  warn("Domain: still a placeholder. Replace with your real domain.");
} else {
  pass("Domain: real domain found (no placeholder).");
}

// Email form
if (/id="waitlist-form"/.test(indexHtml)) { pass("Email form: present."); } else { fail("Email form: missing."); }

// Analytics
if (/google-analytics|gtag|plausible|fathom|matomo/i.test(indexHtml)) {
  pass("Analytics: snippet detected.");
} else {
  warn("Analytics: no snippet yet.");
}

if (zhIndexHtml && /hreflang="en"/.test(zhIndexHtml) && /hreflang="zh-CN"/.test(indexHtml)) {
  pass("Multilingual: English and Chinese hreflang present.");
} else {
  fail("Multilingual: missing English/Chinese hreflang.");
}

// Legal pages
var requiredPages = ["about.html", "contact.html", "privacy-policy.html", "terms.html", "cookie-policy.html", "editorial-policy.html", "affiliate-disclosure.html"];
for (var pi = 0; pi < requiredPages.length; pi++) {
  var pn = requiredPages[pi];
  if (exists(pn)) pass("Legal page: " + pn);
  else fail("Legal page missing: " + pn);
}
var topicPages = ["germany-family-reunion-a1.html", "do-i-need-german-a1.html"];
for (var ti = 0; ti < topicPages.length; ti++) {
  var tn = topicPages[ti];
  if (exists(tn)) pass("Topic page: " + tn);
  else fail("Topic page missing: " + tn);
}

// Guide pages
var guideDir = path.join(root, "guides");
var guideFiles = fs.readdirSync(guideDir).filter(function(f) { return f.endsWith(".html"); });
if (guideFiles.length < 38) {
  fail("Guide count: " + guideFiles.length + " (need >= 22)");
} else {
  pass("Guide pages: " + guideFiles.length + " (>= 38)");
}
var srcRe = /goethe.de|testdaf.de|telc.net|cils.unistrasi.it|cvcl.it|dante.global|inburgeren.nl|cve.nl|caple.letras.ulisboa.pt|cervantes.es|siele.org|ielts.org|languagecert.org|gov.uk|oph.fi|migri.fi|lefrancaisdesaffaires.fr|france-education-international/;
for (var gi = 0; gi < guideFiles.length; gi++) {
  var gf = guideFiles[gi];
  var gc = fs.readFileSync(path.join(guideDir, gf), "utf8");
  if (!/Official sources/.test(gc)) fail("Missing Official sources: " + gf);
  if (!/Last updated:\s*\d{4}-\d{2}-\d{2}/.test(gc)) fail("Missing Last updated: " + gf);
  if (!srcRe.test(gc)) fail("Missing German exam link: " + gf);
}

var contentGuideDir = path.join(root, "src", "content", "guides");
if (fs.existsSync(contentGuideDir)) {
  var contentGuideFiles = fs.readdirSync(contentGuideDir).filter(function(fileName) {
    return fileName.endsWith(".md");
  });
  var contentSlugs = {};
  var contentCategories = {};
  var contentRelated = {};
  var contentUpdatedDates = {};
  var duplicateContentSlugs = [];
  for (var ci = 0; ci < contentGuideFiles.length; ci++) {
    var contentFile = contentGuideFiles[ci];
    var content = fs.readFileSync(path.join(contentGuideDir, contentFile), "utf8");
    var slugMatch = content.match(/^slug:\s*"([^"]+)"/m);
    if (!slugMatch) {
      fail("Astro content guide missing slug: " + contentFile);
      continue;
    }
    var slug = slugMatch[1];
    if (contentSlugs[slug]) duplicateContentSlugs.push(slug);
    contentSlugs[slug] = contentFile;
    var categoryMatch = content.match(/^category:\s*"([^"]+)"/m);
    var relatedMatch = content.match(/^related:\s*\[([^\]]*)\]/m);
    var updatedDateMatch = content.match(/^updatedDate:\s*"(\d{4}-\d{2}-\d{2})"/m);
    contentCategories[slug] = categoryMatch ? categoryMatch[1] : "";
    contentUpdatedDates[slug] = updatedDateMatch ? updatedDateMatch[1] : "";
    contentRelated[slug] = relatedMatch
      ? Array.from(relatedMatch[1].matchAll(/"([^"]+)"/g)).map(function(match) { return match[1]; })
      : [];
  }
  if (duplicateContentSlugs.length === 0) {
    pass("Astro content: guide slugs are unique.");
  } else {
    fail("Astro content: duplicate guide slugs: " + duplicateContentSlugs.join(", "));
  }
  var missingRelatedSlugs = [];
  Object.keys(contentRelated).forEach(function(slug) {
    contentRelated[slug].forEach(function(relatedSlug) {
      if (!contentSlugs[relatedSlug]) missingRelatedSlugs.push(slug + " -> " + relatedSlug);
    });
  });
  if (missingRelatedSlugs.length === 0) {
    pass("Astro content: related guide slugs resolve.");
  } else {
    fail("Astro content: related guide slugs missing: " + missingRelatedSlugs.slice(0, 5).join(", "));
  }
  var focusedRelatedMismatches = [];
  ["canada", "france", "uk"].forEach(function(category) {
    Object.keys(contentRelated).forEach(function(slug) {
      if (contentCategories[slug] !== category) return;
      contentRelated[slug].forEach(function(relatedSlug) {
        if (contentCategories[relatedSlug] && contentCategories[relatedSlug] !== category) {
          focusedRelatedMismatches.push(slug + " -> " + relatedSlug);
        }
      });
    });
  });
  if (focusedRelatedMismatches.length === 0) {
    pass("Astro content: Canada, France, and UK related links stay within route clusters.");
  } else {
    fail("Astro content: weak cross-route related links: " + focusedRelatedMismatches.slice(0, 5).join(", "));
  }
  var slugsByCategory = {};
  Object.keys(contentCategories).forEach(function(slug) {
    var category = contentCategories[slug];
    if (!slugsByCategory[category]) slugsByCategory[category] = [];
    slugsByCategory[category].push(slug);
  });
  var emptyRelatedInMultiGuideRoute = Object.keys(contentRelated).filter(function(slug) {
    var category = contentCategories[slug];
    return slugsByCategory[category] && slugsByCategory[category].length > 1 && contentRelated[slug].length === 0;
  });
  if (emptyRelatedInMultiGuideRoute.length === 0) {
    pass("Astro content: multi-guide routes expose related guides.");
  } else {
    fail("Astro content: multi-guide routes with empty related links: " + emptyRelatedInMultiGuideRoute.slice(0, 5).join(", "));
  }
}

// SEO
if (exists("robots.txt")) pass("robots.txt exists."); else fail("robots.txt missing.");
if (exists("sitemap.xml")) pass("sitemap.xml exists."); else fail("sitemap.xml missing.");
if (/Sitemap:\s*\S+\/sitemap\.xml/.test(read("robots.txt"))) pass("robots.txt references sitemap.");
else fail("robots.txt missing sitemap reference.");
if (read("sitemap.xml").includes("https://flowlight.me/zh/")) pass("sitemap: Chinese homepage included.");
else fail("sitemap missing Chinese homepage.");

// Astro build output, when present
if (exists("dist/index.html")) {
  var distIndexHtml = read("dist/index.html");
  var distZhIndexHtml = exists("dist/zh/index.html") ? read("dist/zh/index.html") : "";
  var distGuidesIndexHtml = exists("dist/guides/index.html") ? read("dist/guides/index.html") : "";
  var distHtmlFiles = [];
  function collectDistHtml(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(function(entry) {
      var full = path.join(dir, entry.name);
      if (entry.isDirectory()) collectDistHtml(full);
      else if (entry.name.endsWith(".html")) distHtmlFiles.push(full);
    });
  }
  collectDistHtml(path.join(root, "dist"));

  if (/href="\/zh\/"/.test(distIndexHtml)) pass("Astro: English homepage links to /zh/.");
  else fail("Astro: English homepage missing real /zh/ language switch.");

  if (
    /<nav class="header-nav"[\s\S]*href="\/guides\/"[\s\S]*Guides/.test(distIndexHtml) &&
    /<nav class="header-nav"[\s\S]*href="\/zh\/germany-family-reunion-a1\/"[\s\S]*德国 A1/.test(distZhIndexHtml) &&
    /<nav class="header-nav"[\s\S]*href="\/zh\/#zh-guides"[\s\S]*中文指南/.test(distZhIndexHtml) &&
    /<nav class="header-nav"[\s\S]*href="\/guides\/" class="active"[\s\S]*Guides/.test(distGuidesIndexHtml)
  ) {
    pass("Astro: main navigation links to the right English and Chinese guide entry points.");
  } else {
    fail("Astro: main navigation does not link to the right English and Chinese guide entry points.");
  }

  var distGuideSampleHtml = exists("dist/guides/goethe-a1-30-day-study-plan/index.html")
    ? read("dist/guides/goethe-a1-30-day-study-plan/index.html")
    : "";
  var distZhGuideSampleHtml = exists("dist/zh/guides/goethe-a1-30-day-study-plan/index.html")
    ? read("dist/zh/guides/goethe-a1-30-day-study-plan/index.html")
    : "";
  if (
    /class="lang-switch"[\s\S]*>中文<\/a>/.test(distIndexHtml) &&
    /class="lang-switch"[\s\S]*>EN<\/a>/.test(distZhIndexHtml) &&
    /href="\/zh\/guides\/goethe-a1-30-day-study-plan\/"[^>]*class="lang-switch"[\s\S]*>中文<\/a>/.test(distGuideSampleHtml) &&
    /href="\/guides\/goethe-a1-30-day-study-plan\/"[^>]*class="lang-switch"[\s\S]*>EN<\/a>/.test(distZhGuideSampleHtml)
  ) {
    pass("Astro: language switch routes available Chinese guide translations directly.");
  } else {
    fail("Astro: language switch does not route available Chinese guide translations directly.");
  }

  if (distZhIndexHtml && /<html lang="zh-CN"/.test(distZhIndexHtml)) pass("Astro: Chinese homepage uses zh-CN.");
  else fail("Astro: Chinese homepage missing or wrong language.");

  if (
    /rel="alternate" hreflang="zh-CN" href="https:\/\/flowlight\.me\/zh\/"/.test(distIndexHtml) &&
    /rel="alternate" hreflang="en" href="https:\/\/flowlight\.me\/"/.test(distZhIndexHtml)
  ) {
    pass("Astro: homepage hreflang alternates present.");
  } else {
    fail("Astro: homepage hreflang alternates missing.");
  }

  var zhCoreGuideSlugs = [
    "german-family-reunion-language-requirement",
    "goethe-a1-vs-telc-a1",
    "goethe-a1-booking-mistakes",
    "german-a1-documents-checklist",
    "goethe-a1-30-day-study-plan",
  ];
  var missingZhCoreGuides = zhCoreGuideSlugs.filter(function(slug) {
    return !exists("dist/zh/guides/" + slug + "/index.html");
  });
  if (missingZhCoreGuides.length === 0 && exists("dist/zh/germany-family-reunion-a1/index.html")) {
    pass("Astro: Chinese Germany A1 hub and five core Chinese guides are generated.");
  } else {
    fail("Astro: missing Chinese Germany A1 pages: " + missingZhCoreGuides.join(", "));
  }

  var zhSeoGaps = zhCoreGuideSlugs.filter(function(slug) {
    var html = exists("dist/zh/guides/" + slug + "/index.html") ? read("dist/zh/guides/" + slug + "/index.html") : "";
    return !/<html lang="zh-CN"/.test(html) ||
      !/<link rel="canonical" href="https:\/\/flowlight\.me\/zh\/guides\/[^"]+\/"/.test(html) ||
      !/hreflang="en"/.test(html) ||
      !/请以官方最新要求为准/.test(html);
  });
  if (zhSeoGaps.length === 0) {
    pass("Astro: Chinese core guides have zh-CN, canonical, hreflang, and official-check reminders.");
  } else {
    fail("Astro: Chinese core guide SEO/compliance gaps: " + zhSeoGaps.join(", "));
  }

  if (distGuidesIndexHtml && !/Browse exam guides \| VisaLang \| VisaLang/.test(distGuidesIndexHtml)) {
    pass("Astro: guides index title avoids duplicate brand.");
  } else {
    fail("Astro: guides index title duplicates brand.");
  }

  if (
    /class="filter-fallback"/.test(distGuidesIndexHtml) &&
    /all guides remain listed below/.test(distGuidesIndexHtml) &&
    /fallback\.setAttribute\('hidden', ''\)/.test(distGuidesIndexHtml)
  ) {
    pass("Astro: guides category filters have a no-script fallback message.");
  } else {
    fail("Astro: guides category filters are missing a no-script fallback message.");
  }

  if (
    /role="search"/.test(distGuidesIndexHtml) &&
    /id="guide-search-input"/.test(distGuidesIndexHtml) &&
    /name="q"/.test(distGuidesIndexHtml) &&
    /data-search=/.test(distGuidesIndexHtml) &&
    /search\.addEventListener\('input'/.test(distGuidesIndexHtml) &&
    /applyFilters\(\);/.test(distGuidesIndexHtml)
  ) {
    pass("Astro: guides index has a working client-side search control.");
  } else {
    fail("Astro: guides index is missing a working search control.");
  }

  var guidesIndexJsonLdMatch = distGuidesIndexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  var guidesIndexJsonLd = null;
  try {
    guidesIndexJsonLd = guidesIndexJsonLdMatch ? JSON.parse(guidesIndexJsonLdMatch[1].trim()) : null;
  } catch (e) {
    guidesIndexJsonLd = null;
  }
  var guidesIndexGraph = guidesIndexJsonLd && Array.isArray(guidesIndexJsonLd["@graph"]) ? guidesIndexJsonLd["@graph"] : [];
  var guidesIndexItemList = guidesIndexGraph.find(function(item) {
    return item["@type"] === "ItemList";
  });
  var guideCardCount = (distGuidesIndexHtml.match(/class="guide-card-wrap"/g) || []).length;
  if (
    guidesIndexGraph.some(function(item) { return item["@type"] === "CollectionPage"; }) &&
    guidesIndexItemList &&
    guidesIndexItemList.numberOfItems === guideCardCount &&
    Array.isArray(guidesIndexItemList.itemListElement) &&
    guidesIndexItemList.itemListElement.length === guideCardCount &&
    guidesIndexItemList.itemListElement.every(function(item) {
      return item["@type"] === "ListItem" && /^https:\/\/flowlight\.me\/guides\/[^/]+\/$/.test(item.url || "");
    })
  ) {
    pass("Astro: guides index exposes CollectionPage and complete ItemList JSON-LD.");
  } else {
    fail("Astro: guides index is missing complete CollectionPage/ItemList JSON-LD.");
  }

  var guideIndexCategories = Array.from(new Set((distGuidesIndexHtml.match(/data-category="([^"]+)"/g) || []).map(function(match) {
    return match.match(/data-category="([^"]+)"/)[1];
  })));
  var guideIndexFilters = Array.from(new Set((distGuidesIndexHtml.match(/data-filter="([^"]+)"/g) || []).map(function(match) {
    return match.match(/data-filter="([^"]+)"/)[1];
  }).filter(function(filter) {
    return filter !== "all" && filter.indexOf("$") === -1;
  })));
  var categoriesWithoutFilters = guideIndexCategories.filter(function(category) {
    return guideIndexFilters.indexOf(category) === -1;
  });
  if (categoriesWithoutFilters.length === 0) {
    pass("Astro: every guide category has a visible filter.");
  } else {
    fail("Astro: guide categories without visible filters: " + categoriesWithoutFilters.join(", "));
  }

  var routeOverviewCards = Array.from(new Set((distGuidesIndexHtml.match(/data-route-card="([^"]+)"/g) || []).map(function(match) {
    return match.match(/data-route-card="([^"]+)"/)[1];
  })));
  var categoriesWithoutRouteCards = guideIndexCategories.filter(function(category) {
    return routeOverviewCards.indexOf(category) === -1;
  });
  if (
    /id="route-overview-title"/.test(distGuidesIndexHtml) &&
    /Route overview/.test(distGuidesIndexHtml) &&
    /Family reunion language proof/.test(distGuidesIndexHtml) &&
    categoriesWithoutRouteCards.length === 0
  ) {
    pass("Astro: guides index explains every route before the guide list.");
  } else {
    fail("Astro: guides route overview is incomplete: " + categoriesWithoutRouteCards.join(", "));
  }

  var duplicateTitleFiles = distHtmlFiles.filter(function(filePath) {
    return /\|\s*VisaLang\s*\|\s*VisaLang/.test(fs.readFileSync(filePath, "utf8"));
  });
  if (duplicateTitleFiles.length === 0) {
    pass("Astro: no duplicate VisaLang title suffixes.");
  } else {
    fail("Astro: duplicate title suffixes in " + duplicateTitleFiles.slice(0, 3).map(function(filePath) {
      return path.relative(root, filePath);
    }).join(", "));
  }

  function duplicateRenderedMetadata(pattern) {
    var grouped = {};
    distHtmlFiles.forEach(function(filePath) {
      var value = (fs.readFileSync(filePath, "utf8").match(pattern) || [])[1];
      if (!value) return;
      if (!grouped[value]) grouped[value] = [];
      grouped[value].push(filePath);
    });
    return Object.keys(grouped).filter(function(value) { return grouped[value].length > 1; });
  }

  var duplicateRenderedTitles = duplicateRenderedMetadata(/<title>([^<]+)<\/title>/i);
  var duplicateRenderedDescriptions = duplicateRenderedMetadata(/<meta name="description" content="([^"]+)"/i);
  if (duplicateRenderedTitles.length === 0 && duplicateRenderedDescriptions.length === 0) {
    pass("Astro: generated titles and meta descriptions are unique.");
  } else {
    fail("Astro: duplicate generated metadata: titles=" + duplicateRenderedTitles.slice(0, 2).join(" | ") + "; descriptions=" + duplicateRenderedDescriptions.slice(0, 2).join(" | "));
  }

  var malformedListTagFiles = distHtmlFiles.filter(function(filePath) {
    return /\.li>/.test(fs.readFileSync(filePath, "utf8"));
  });
  if (malformedListTagFiles.length === 0) {
    pass("Astro: no obvious malformed list tags.");
  } else {
    fail("Astro: malformed list tags in " + malformedListTagFiles.slice(0, 3).map(function(filePath) {
      return path.relative(root, filePath);
    }).join(", "));
  }

  var missingSingleH1Files = distHtmlFiles.filter(function(filePath) {
    var html = fs.readFileSync(filePath, "utf8");
    return (html.match(/<h1\b/gi) || []).length !== 1;
  });
  if (missingSingleH1Files.length === 0) {
    pass("Astro: every generated page has exactly one H1.");
  } else {
    fail("Astro: generated pages with missing/duplicate H1: " + missingSingleH1Files.slice(0, 3).map(function(filePath) {
      return path.relative(root, filePath);
    }).join(", "));
  }

  var weakDescriptionFiles = distHtmlFiles.filter(function(filePath) {
    var html = fs.readFileSync(filePath, "utf8");
    var match = html.match(/<meta name="description" content="([^"]{40,})"/);
    return !match;
  });
  if (weakDescriptionFiles.length === 0) {
    pass("Astro: every generated page has a useful meta description.");
  } else {
    fail("Astro: generated pages with missing/short meta description: " + weakDescriptionFiles.slice(0, 3).map(function(filePath) {
      return path.relative(root, filePath);
    }).join(", "));
  }

  var missingCanonicalFiles = distHtmlFiles.filter(function(filePath) {
    return !/<link rel="canonical" href="https:\/\/flowlight\.me\//.test(fs.readFileSync(filePath, "utf8"));
  });
  if (missingCanonicalFiles.length === 0) {
    pass("Astro: every generated page has a flowlight.me canonical URL.");
  } else {
    fail("Astro: generated pages missing canonical URL: " + missingCanonicalFiles.slice(0, 3).map(function(filePath) {
      return path.relative(root, filePath);
    }).join(", "));
  }

  function parseJsonLdBlocks(html) {
    var blocks = [];
    var re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    var match;
    while ((match = re.exec(html)) !== null) {
      try { blocks.push(JSON.parse(match[1].trim())); } catch (e) { blocks.push({ parseError: true }); }
    }
    return blocks;
  }

  function jsonLdTypes(block) {
    if (block["@graph"] && Array.isArray(block["@graph"])) {
      return block["@graph"].map(function(item) { return item["@type"]; });
    }
    return [block["@type"]];
  }

  var generatedGuideFiles = distHtmlFiles.filter(function(filePath) {
    var rel = path.relative(path.join(root, "dist"), filePath);
    return rel.indexOf("guides/") === 0 && rel.indexOf("guides/category/") !== 0 && rel !== "guides/index.html";
  });
  var guideJsonLdGaps = generatedGuideFiles.filter(function(filePath) {
    var blocks = parseJsonLdBlocks(fs.readFileSync(filePath, "utf8"));
    var types = [];
    blocks.forEach(function(block) { types = types.concat(jsonLdTypes(block)); });
    return types.indexOf("Article") === -1 || types.indexOf("BreadcrumbList") === -1;
  });
  if (guideJsonLdGaps.length === 0) {
    pass("Astro: every generated guide has Article and BreadcrumbList JSON-LD.");
  } else {
    fail("Astro: guide pages missing Article/BreadcrumbList JSON-LD: " + guideJsonLdGaps.slice(0, 3).map(function(filePath) {
      return path.relative(root, filePath);
    }).join(", "));
  }

  var distA1Hub = exists("dist/germany-family-reunion-a1/index.html") ? read("dist/germany-family-reunion-a1/index.html") : "";
  if (/"@type":"FAQPage"/.test(distA1Hub) && /<h2>FAQ<\/h2>/.test(distA1Hub)) {
    pass("Astro: Germany A1 hub uses FAQPage only for visible FAQ content.");
  } else {
    fail("Astro: Germany A1 hub FAQPage schema is missing or not supported by visible FAQ content.");
  }
  if (/"@type":"WebSite"/.test(distIndexHtml)) {
    pass("Astro: homepage retains WebSite JSON-LD.");
  } else {
    fail("Astro: homepage missing WebSite JSON-LD.");
  }

  var guideBreadcrumbAnchorGaps = generatedGuideFiles.filter(function(filePath) {
    var html = fs.readFileSync(filePath, "utf8");
    var breadcrumb = html.match(/<nav class="guide-breadcrumb"[\s\S]*?<\/nav>/);
    return breadcrumb && /href="\/#[^"]+"/.test(breadcrumb[0]);
  });
  if (guideBreadcrumbAnchorGaps.length === 0) {
    pass("Astro: guide breadcrumbs link to real guide category pages.");
  } else {
    fail("Astro: guide breadcrumbs still point to homepage anchors: " + guideBreadcrumbAnchorGaps.slice(0, 3).map(function(filePath) {
      return path.relative(root, filePath);
    }).join(", "));
  }

  var guideRouteBacklinkGaps = generatedGuideFiles.filter(function(filePath) {
    var html = fs.readFileSync(filePath, "utf8");
    return !/class="route-backlink" href="\/guides\/category\/[^"]+\/"/.test(html) || !/Browse all guides in/.test(html);
  });
  if (guideRouteBacklinkGaps.length === 0) {
    pass("Astro: every generated guide links back to its route index.");
  } else {
    fail("Astro: guide pages missing same-route index links: " + guideRouteBacklinkGaps.slice(0, 3).map(function(filePath) {
      return path.relative(root, filePath);
    }).join(", "));
  }

  var guideTrustbarGaps = generatedGuideFiles.filter(function(filePath) {
    var html = fs.readFileSync(filePath, "utf8");
    return !/class="guide-trustbar"/.test(html) || !/Last updated:/.test(html) || !/Official sources are linked below/.test(html);
  });
  if (guideTrustbarGaps.length === 0) {
    pass("Astro: every generated guide shows updated-date and official-source trust cues.");
  } else {
    fail("Astro: guide pages missing trust cues: " + guideTrustbarGaps.slice(0, 3).map(function(filePath) {
      return path.relative(root, filePath);
    }).join(", "));
  }

  var guidePagesWithTables = generatedGuideFiles.filter(function(filePath) {
    return fs.readFileSync(filePath, "utf8").includes("<table");
  });
  if (
    guidePagesWithTables.length === 0 ||
    (
      /\.guide-article table[\s\S]*overflow-x:\s*auto/.test(astroGlobalCss) &&
      /\.guide-article a[\s\S]*overflow-wrap:\s*anywhere/.test(astroGlobalCss)
    )
  ) {
    pass("Astro: guide tables and long links have mobile overflow protection.");
  } else {
    fail("Astro: generated guide tables exist without mobile overflow protection.");
  }

  function distUrlExists(href, fromFile) {
    var clean = href.split("#")[0].split("?")[0];
    if (!clean) return true;
    if (/^(https?:|mailto:|data:)/.test(clean)) return true;

    var urlPath = clean;
    if (urlPath.charAt(0) !== "/") {
      var relBase = path.dirname(path.relative(path.join(root, "dist"), fromFile));
      urlPath = "/" + path.normalize(path.join(relBase, urlPath));
    }
    var normalized = urlPath.replace(/^\//, "");
    var direct = path.join(root, "dist", normalized);
    return (
      fs.existsSync(direct) ||
      fs.existsSync(path.join(direct, "index.html")) ||
      fs.existsSync(direct + ".html")
    );
  }

  var distBrokenLinks = [];
  distHtmlFiles.forEach(function(filePath) {
    var html = fs.readFileSync(filePath, "utf8");
    var m;
    var distLinkRe = /(?:href|src)="([^"]+)"|content="(\/[^"]+)"/g;
    while ((m = distLinkRe.exec(html)) !== null) {
      var ref = m[1] || m[2];
      if (!distUrlExists(ref, filePath)) {
        distBrokenLinks.push(path.relative(root, filePath) + " -> " + ref);
      }
    }
  });
  if (distBrokenLinks.length === 0) {
    pass("Astro: generated links and assets resolve.");
  } else {
    fail("Astro: broken generated links/assets (" + distBrokenLinks.length + "): " + distBrokenLinks.slice(0, 3).join(", "));
  }

  if (exists("dist/sitemap-0.xml") && read("dist/sitemap-0.xml").includes("https://flowlight.me/zh/")) {
    pass("Astro: generated sitemap includes Chinese homepage.");
  } else {
    fail("Astro: generated sitemap missing Chinese homepage.");
  }

  var distSitemap0 = exists("dist/sitemap-0.xml") ? read("dist/sitemap-0.xml") : "";
  var noindexSitemapUrls = [
    "https://flowlight.me/affiliate-disclosure/",
    "https://flowlight.me/cookie-policy/",
    "https://flowlight.me/editorial-policy/",
    "https://flowlight.me/privacy-policy/",
    "https://flowlight.me/terms/",
  ].filter(function(url) {
    return distSitemap0.includes(url);
  });
  if (noindexSitemapUrls.length === 0) {
    pass("Astro: generated sitemap excludes noindex legal pages.");
  } else {
    fail("Astro: generated sitemap includes noindex pages: " + noindexSitemapUrls.join(", "));
  }

  if (
    exists("dist/guides/german-a1-exam-booking-timeline/index.html") &&
    read("dist/sitemap-0.xml").includes("https://flowlight.me/guides/german-a1-exam-booking-timeline/")
  ) {
    pass("Astro: German A1 booking timeline is generated and included in sitemap.");
  } else {
    fail("Astro: German A1 booking timeline missing from generated site or sitemap.");
  }

  var guideSitemapLastmodGaps = Object.keys(contentUpdatedDates || {}).filter(function(slug) {
    var updatedDate = contentUpdatedDates[slug];
    return !updatedDate || distSitemap0.indexOf("<loc>https://flowlight.me/guides/" + slug + "/</loc><lastmod>" + updatedDate + "</lastmod>") === -1;
  });
  if (guideSitemapLastmodGaps.length === 0) {
    pass("Astro: generated sitemap lastmod matches every guide updatedDate.");
  } else {
    fail("Astro: guide sitemap lastmod missing or stale: " + guideSitemapLastmodGaps.slice(0, 5).join(", "));
  }

  var staticGuideSlugs = guideFiles.map(function(fileName) {
    return fileName.replace(/\.html$/, "");
  });
  var missingStaticGuidesInAstro = staticGuideSlugs.filter(function(slug) {
    return !exists("dist/guides/" + slug + "/index.html");
  });
  if (missingStaticGuidesInAstro.length === 0) {
    pass("Astro: every legacy static guide is present in the generated site.");
  } else {
    fail("Astro: legacy static guides missing from generated site: " + missingStaticGuidesInAstro.slice(0, 5).join(", "));
  }

  var distRobots = exists("dist/robots.txt") ? read("dist/robots.txt") : "";
  if (/Sitemap:\s*https:\/\/flowlight\.me\/sitemap-index\.xml/.test(distRobots)) {
    pass("Astro: robots.txt points to generated sitemap index.");
  } else {
    fail("Astro: robots.txt does not point to generated sitemap index.");
  }

  if (
    exists("dist/sitemap-index.xml") &&
    read("dist/sitemap-index.xml").includes("https://flowlight.me/sitemap-0.xml") &&
    exists("dist/sitemap-0.xml")
  ) {
    pass("Astro: generated sitemap index points to an existing sitemap file.");
  } else {
    fail("Astro: generated sitemap index does not resolve to sitemap-0.xml.");
  }

  var seoCoreRoutes = [
    "/germany-family-reunion-a1/",
    "/germany-b1-settlement-citizenship/",
    "/tools/route-finder/",
    "/tools/checklist-generator/",
    "/tools/timeline-calculator/",
    "/tools/exam-comparison/",
    "/tools/email-reminders/",
    "/pricing/",
    "/products/a1-family-reunion-pack/",
    "/products/a1-practice-pack/",
    "/route-review/",
    "/partners/",
  ];
  var sitemapCoreGaps = seoCoreRoutes.filter(function(route) {
    return !distSitemap0.includes("https://flowlight.me" + route);
  });
  var missingCorePages = seoCoreRoutes.filter(function(route) {
    return !exists("dist" + route + "index.html");
  });
  if (sitemapCoreGaps.length === 0 && missingCorePages.length === 0) {
    pass("Astro: every indexable A1, B1, tool, and product route is generated and in the sitemap.");
  } else {
    fail("Astro: core route output/sitemap gaps: " + missingCorePages.concat(sitemapCoreGaps).join(", "));
  }

  var seoLinkRequirements = [
    {
      route: "/germany-family-reunion-a1/",
      links: ["/tools/route-finder/", "/tools/checklist-generator/", "/tools/timeline-calculator/", "/tools/exam-comparison/", "/products/a1-family-reunion-pack/", "/products/a1-practice-pack/", "/route-review/"],
    },
    {
      route: "/germany-b1-settlement-citizenship/",
      links: ["/tools/route-finder/", "/tools/checklist-generator/", "/tools/timeline-calculator/", "/tools/exam-comparison/", "/pricing/", "/route-review/"],
    },
  ].concat([
    "/tools/route-finder/", "/tools/checklist-generator/", "/tools/timeline-calculator/", "/tools/exam-comparison/", "/tools/email-reminders/",
  ].map(function(route) {
    return { route: route, links: ["/germany-family-reunion-a1/", "/germany-b1-settlement-citizenship/", "/products/a1-family-reunion-pack/", "/products/a1-practice-pack/", "/route-review/"] };
  })).concat([
    "/pricing/", "/products/a1-family-reunion-pack/", "/products/a1-practice-pack/", "/route-review/", "/partners/",
  ].map(function(route) {
    return { route: route, links: ["/tools/route-finder/", "/germany-family-reunion-a1/", "/germany-b1-settlement-citizenship/"] };
  }));
  var seoLinkGaps = [];
  seoLinkRequirements.forEach(function(requirement) {
    var html = exists("dist" + requirement.route + "index.html") ? read("dist" + requirement.route + "index.html") : "";
    requirement.links.forEach(function(link) {
      if (html.indexOf('href="' + link + '"') === -1) seoLinkGaps.push(requirement.route + " -> " + link);
    });
  });
  if (seoLinkGaps.length === 0) {
    pass("Astro: A1, B1, tools, and product pages keep their required two-way internal links.");
  } else {
    fail("Astro: cross-cluster internal-link gaps: " + seoLinkGaps.slice(0, 5).join(", "));
  }
} else {
  warn("Astro: dist/ not found; run npm run build for build-output checks.");
}

// JSON-LD
function checkJsonLd(file, label) {
  var re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  var m, found = false;
  while ((m = re.exec(file)) !== null) {
    found = true;
    try { JSON.parse(m[1].trim()); } catch (e) { fail("Invalid JSON-LD: " + label); return; }
  }
  if (!found) fail("No JSON-LD: " + label);
}
checkJsonLd(indexHtml, "index.html");
if (zhIndexHtml) checkJsonLd(zhIndexHtml, "zh/index.html");
for (var tj = 0; tj < topicPages.length; tj++) {
  var tm = topicPages[tj];
  if (exists(tm)) checkJsonLd(read(tm), tm);
}
for (var gj = 0; gj < guideFiles.length; gj++) {
  var gk = guideFiles[gj];
  checkJsonLd(fs.readFileSync(path.join(guideDir, gk), "utf8"), "guides/" + gk);
}

// Dead links
var allHtml = ["index.html"].concat(zhIndexHtml ? ["zh/index.html"] : []).concat(requiredPages.filter(exists)).concat(topicPages.filter(exists)).concat(guideFiles.map(function(f) { return "guides/" + f; }));
var linkRe = /href="([^"]+)"/g;
var broken = [];
for (var ai = 0; ai < allHtml.length; ai++) {
  var rel = allHtml[ai];
  var file = read(rel);
  var baseDir = path.dirname(rel);
  var m;
  while ((m = linkRe.exec(file)) !== null) {
    var href = m[1];
    if (/^(https?:|mailto:|#|data:)/.test(href)) continue;
    var clean = href.split("#")[0].split("?")[0];
    if (!clean) continue;
    var target = path.join(root, baseDir, clean);
    if (!fs.existsSync(target)) broken.push(rel + " -> " + href);
  }
}
if (broken.length === 0) pass("Internal links: all valid.");
else fail("Broken links (" + broken.length + "): " + broken.slice(0, 3).join(", "));

// Affiliate
if (/affiliate-disclosure\.html/.test(indexHtml)) pass("Footer: affiliate link.");
else fail("Footer: no affiliate link.");

// Report
var errors = checks.filter(function(c) { return !c.ok; });
var warnings = checks.filter(function(c) { return c.warn; });
console.log("\n=== VisaLang Launch Readiness ===\n");
for (var xi = 0; xi < checks.length; xi++) {
  var c = checks[xi];
  console.log("  " + (c.warn ? "!" : c.ok ? "✓" : "✗") + " " + c.msg);
}
console.log("\n--- Summary ---");
console.log("  Pass: " + checks.filter(function(c) { return c.ok && !c.warn; }).length);
console.log("  Warn: " + warnings.length);
console.log("  Fail: " + errors.length);
if (errors.length === 0) {
  console.log("\n  READY.");
  process.exit(0);
} else {
  console.log("\n  NOT READY.");
  process.exit(1);
}
