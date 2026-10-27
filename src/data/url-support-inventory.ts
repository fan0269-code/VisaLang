import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { guideCategories } from './guide-taxonomy.ts';
import { getCategoryPublicationPolicy, getChineseGuidePublicationPolicy, getEnglishGuidePublicationPolicy, guideRedirects } from './publication-manifest.ts';
import { zhGermanyA1Guides } from './zh-germany-a1.ts';

export type AuditState = 'audited' | 'unverified' | 'source-discovered';
export type FunctionalSupportState = 'configured' | 'guide-only' | 'verification-only' | 'unknown';
export type MigrationState = 'not-assessed';
export type LegacyRetirementConflict = 'none' | 'redirect-and-deleted-source' | 'discovery-noindex';
export type EvidenceState = 'unknown';

export interface UrlSupportRecord {
  recordId: `${AuditState}-${number}`;
  url: `/${string}`;
  locale: 'en' | 'zh-CN';
  jurisdictionTask: string;
  functionalSupportState: FunctionalSupportState;
  auditState: AuditState;
  disposition: 'retain-or-rewrite' | 'review-required';
  sourcePath?: string;
  sourceGap?: string;
  legacyRetirementConflict: LegacyRetirementConflict;
  migrationState: MigrationState;
  httpEvidence: EvidenceState;
  gscEvidence: EvidenceState;
  backlinkEvidence: EvidenceState;
}

export interface CurrentSourceRouteCoverage {
  sourcePath: string;
  inventoryRecordIds: UrlSupportRecord['recordId'][];
  scopeExclusion?: string;
}

export interface DuplicateCanonicalPath {
  url: UrlSupportRecord['url'];
  recordIds: UrlSupportRecord['recordId'][];
}

export interface LegacyRetirementRecord {
  sourceUrl: `/${string}`;
  targetUrl: `/${string}`;
  inventoryRecordIds: UrlSupportRecord['recordId'][];
  sourceGap?: string;
  migrationState: MigrationState;
}

const repositoryRoot = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const auditedCsvPath = join(repositoryRoot, 'docs/master-package-2026-09-08/VisaLang-url-remediation.csv');
const unverifiedCsvPath = join(repositoryRoot, 'docs/master-package-2026-09-08/VisaLang-unverified-urls.csv');
const guideDirectory = join(repositoryRoot, 'src/content/guides');
const pagesDirectory = join(repositoryRoot, 'src/pages');
const redirectSourcePaths = new Set(Object.keys(guideRedirects));
const zhGuideBySlug = new Map(zhGermanyA1Guides.map((guide) => [guide.slug, guide]));

function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (character === '"') {
      if (quoted && input[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === ',' && !quoted) {
      row.push(cell);
      cell = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && input[index + 1] === '\n') index += 1;
      row.push(cell);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += character;
    }
  }
  row.push(cell);
  if (row.some((value) => value.length > 0)) rows.push(row);
  return rows;
}

function readCsvRows(filePath: string): Record<string, string>[] {
  const rows = parseCsv(readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
  const [headers, ...data] = rows;
  return data.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ''])));
}

function sourcePathFor(url: string): { sourcePath?: string; sourceGap?: string } {
  const pathname = new URL(url).pathname;
  const clean = pathname.replace(/^\//, '').replace(/\/$/, '');
  if (clean.startsWith('guides/category/')) return { sourcePath: 'src/pages/guides/category/[category].astro' };
  if (clean.startsWith('guides/')) {
    const slug = clean.slice('guides/'.length);
    if (!slug) return { sourcePath: 'src/pages/guides/index.astro' };
    const sourcePath = `src/content/guides/${slug}.md`;
    return existsSync(join(repositoryRoot, sourcePath))
      ? { sourcePath }
      : { sourceGap: `No current guide source at ${sourcePath}; do not infer deletion, HTTP status, or migration.` };
  }
  if (clean.startsWith('zh/guides/')) {
    const slug = clean.slice('zh/guides/'.length);
    const sourcePath = `src/pages/zh/guides/${slug}.astro`;
    return existsSync(join(repositoryRoot, sourcePath))
      ? { sourcePath }
      : { sourceGap: `No current Chinese guide source at ${sourcePath}; do not infer deletion, HTTP status, or migration.` };
  }
  const candidates = clean
    ? [`src/pages/${clean}.astro`, `src/pages/${clean}/index.astro`]
    : ['src/pages/index.astro'];
  const sourcePath = candidates.find((candidate) => existsSync(join(repositoryRoot, candidate)));
  return sourcePath
    ? { sourcePath }
    : { sourceGap: `No current static page source matches ${pathname}; route state is unknown until source and public checks are reconciled.` };
}

function frontmatterField(sourcePath: string, field: string): string {
  const source = readFileSync(join(repositoryRoot, sourcePath), 'utf8');
  return source.match(new RegExp(`^${field}:\\s*["']?([^"'\\n]+)`, 'm'))?.[1]?.trim() ?? '';
}

function guideNoindex(pathname: string, sourcePath?: string): boolean {
  if (pathname.startsWith('/guides/category/')) return !getCategoryPublicationPolicy(pathname.split('/').filter(Boolean).at(-1) ?? '').index;
  if (!sourcePath) return false;
  if (sourcePath.startsWith('src/content/guides/')) {
    const slug = frontmatterField(sourcePath, 'slug');
    return !getEnglishGuidePublicationPolicy({
      slug,
      contentStatus: frontmatterField(sourcePath, 'contentStatus') as never,
      sourceReviewStatus: frontmatterField(sourcePath, 'sourceReviewStatus') as never,
      noindex: /^true$/i.test(frontmatterField(sourcePath, 'noindex')),
      adsEligible: !/^false$/i.test(frontmatterField(sourcePath, 'adsEligible')),
    }).index;
  }
  if (sourcePath.startsWith('src/pages/zh/guides/')) {
    const slug = sourcePath.split('/').at(-1)?.replace(/\.astro$/, '') ?? '';
    const guide = zhGuideBySlug.get(slug);
    if (!guide) return false;
    return !getChineseGuidePublicationPolicy({
      slug: guide.slug,
      contentStatus: guide.contentStatus,
      sourceReviewStatus: guide.sourceReviewStatus,
      noindex: guide.noindex,
    }).index;
  }
  return false;
}

function jurisdictionTask(pathname: string): string {
  if (pathname.includes('germany-family-reunion') || pathname.includes('goethe-a1') || pathname.includes('german-a1')) return 'Germany family-reunion A1';
  if (pathname.includes('germany-b1') || pathname.includes('goethe-b1')) return 'Germany B1 settlement/citizenship';
  if (pathname.includes('testdaf')) return 'Germany study-language research';
  if (pathname.includes('telc')) return 'Germany exam-product research';
  if (pathname.includes('/zh/')) return 'China-facing Chinese navigation or guide';
  if (pathname.includes('/tools/')) return 'planning tool';
  if (pathname === '/' || pathname === '/routes/' || pathname === '/guides/' || pathname === '/exams/') return 'site navigation';
  return 'route-specific support to be classified';
}

function functionalSupportState(sourcePath?: string): FunctionalSupportState {
  if (!sourcePath) return 'unknown';
  if (sourcePath.startsWith('src/content/guides/')) return 'guide-only';
  if (sourcePath.startsWith('src/pages/tools/') || sourcePath === 'src/pages/germany-family-reunion-a1.astro') return 'configured';
  return 'verification-only';
}

function createRecords(rows: Record<string, string>[], auditState: 'audited' | 'unverified'): UrlSupportRecord[] {
  return rows.map((row, index) => {
    const pathname = new URL(row.url).pathname as `/${string}`;
    const source = sourcePathFor(row.url);
    const sourceRedirected = redirectSourcePaths.has(pathname);
    return {
      recordId: `${auditState}-${index + 1}`,
      url: pathname,
      locale: pathname.startsWith('/zh/') ? 'zh-CN' : 'en',
      jurisdictionTask: jurisdictionTask(pathname),
      functionalSupportState: functionalSupportState(source.sourcePath),
      auditState,
      disposition: auditState === 'unverified' ? 'review-required' : 'retain-or-rewrite',
      ...source,
      legacyRetirementConflict: sourceRedirected
        ? 'redirect-and-deleted-source'
        : guideNoindex(pathname, source.sourcePath) ? 'discovery-noindex' : 'none',
      migrationState: 'not-assessed',
      httpEvidence: 'unknown',
      gscEvidence: 'unknown',
      backlinkEvidence: 'unknown',
    };
  });
}

export const auditedUrlSupportRecords = createRecords(readCsvRows(auditedCsvPath), 'audited');
export const unverifiedUrlSupportRecords = createRecords(readCsvRows(unverifiedCsvPath), 'unverified');
export const packageUrlSupportRecords = [...auditedUrlSupportRecords, ...unverifiedUrlSupportRecords] as const;

const recordIdsByUrl = new Map<UrlSupportRecord['url'], UrlSupportRecord['recordId'][]>();
for (const record of packageUrlSupportRecords) {
  const existing = recordIdsByUrl.get(record.url) ?? [];
  existing.push(record.recordId);
  recordIdsByUrl.set(record.url, existing);
}
export const duplicateCanonicalPaths: DuplicateCanonicalPath[] = [...recordIdsByUrl]
  .filter(([, recordIds]) => recordIds.length > 1)
  .map(([url, recordIds]) => ({ url, recordIds }));

export const legacyRetirementRecords: LegacyRetirementRecord[] = Object.entries(guideRedirects)
  .map(([sourceUrl, targetUrl]) => ({
    sourceUrl: sourceUrl as `/${string}`,
    targetUrl: targetUrl as `/${string}`,
    inventoryRecordIds: recordIdsByUrl.get(sourceUrl as `/${string}`) ?? [],
    sourceGap: recordIdsByUrl.has(sourceUrl as `/${string}`)
      ? undefined
      : 'This pre-existing manifest retirement source has no 2026-09-08 package inventory row; it remains a recorded migration gap, not an approved or executed migration.',
    migrationState: 'not-assessed',
  }));

function astroFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? astroFiles(fullPath) : entry.name.endsWith('.astro') ? [fullPath] : [];
  });
}

function staticPagePath(sourcePath: string): `/${string}` | undefined {
  const relative = sourcePath.replace('src/pages/', '').replace(/\.astro$/, '');
  if (relative === '404' || relative.includes('[')) return undefined;
  if (relative === 'index') return '/';
  return `/${relative.replace(/\/index$/, '')}/`;
}

const sourceDiscoveredInputs = [
  ...astroFiles(pagesDirectory)
    .map((absolutePath) => absolutePath.slice(repositoryRoot.length + 1).replaceAll('\\', '/'))
    .map((sourcePath) => ({ sourcePath, url: staticPagePath(sourcePath) }))
    .filter((input): input is { sourcePath: string; url: `/${string}` } => Boolean(input.url)),
  ...readdirSync(guideDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => ({ sourcePath: `src/content/guides/${fileName}`, url: `/guides/${fileName.replace(/\.md$/, '')}/` as `/${string}` })),
  ...guideCategories.map((category) => ({ sourcePath: 'src/pages/guides/category/[category].astro', url: `/guides/category/${category.slug}/` as `/${string}` })),
].sort((left, right) => left.url.localeCompare(right.url) || left.sourcePath.localeCompare(right.sourcePath));

const packagePaths = new Set(packageUrlSupportRecords.map((record) => record.url));
export const sourceDiscoveredUrlSupportRecords: UrlSupportRecord[] = sourceDiscoveredInputs
  .filter((input) => !packagePaths.has(input.url))
  .map((input, index) => ({
    recordId: `source-discovered-${index + 1}`,
    url: input.url,
    locale: input.url.startsWith('/zh/') ? 'zh-CN' : 'en',
    jurisdictionTask: jurisdictionTask(input.url),
    functionalSupportState: functionalSupportState(input.sourcePath),
    auditState: 'source-discovered',
    disposition: 'review-required',
    sourcePath: input.sourcePath,
    legacyRetirementConflict: guideNoindex(input.url, input.sourcePath) ? 'discovery-noindex' : 'none',
    migrationState: 'not-assessed',
    httpEvidence: 'unknown',
    gscEvidence: 'unknown',
    backlinkEvidence: 'unknown',
  }));
export const urlSupportInventory = [...packageUrlSupportRecords, ...sourceDiscoveredUrlSupportRecords] as const;

const inventoryIdsBySourcePath = new Map<string, UrlSupportRecord['recordId'][]>();
for (const record of urlSupportInventory) {
  if (!record.sourcePath) continue;
  const existing = inventoryIdsBySourcePath.get(record.sourcePath) ?? [];
  existing.push(record.recordId);
  inventoryIdsBySourcePath.set(record.sourcePath, existing);
}

export const currentSourceRouteCoverage: CurrentSourceRouteCoverage[] = astroFiles(pagesDirectory)
  .map((absolutePath) => absolutePath.slice(repositoryRoot.length + 1).replaceAll('\\', '/'))
  .sort()
  .map((sourcePath) => {
    const inventoryRecordIds = inventoryIdsBySourcePath.get(sourcePath) ?? [];
    if (inventoryRecordIds.length > 0) return { sourcePath, inventoryRecordIds };
    if (sourcePath === 'src/pages/guides/[slug].astro') {
      return { sourcePath, inventoryRecordIds, scopeExclusion: 'Dynamic template: individual public guide output is inventoried through Markdown guide sources.' };
    }
    if (sourcePath === 'src/pages/guides/category/[category].astro') {
      return { sourcePath, inventoryRecordIds, scopeExclusion: 'Dynamic template: category output is inventoried through the current guide-category registry.' };
    }
    if (sourcePath === 'src/pages/404.astro') return { sourcePath, inventoryRecordIds, scopeExclusion: 'Generated 404 recovery document is not a canonical public route.' };
    return { sourcePath, inventoryRecordIds, scopeExclusion: 'Dynamic template mechanics require separate route parameters.' };
  });

for (const fileName of readdirSync(guideDirectory).filter((fileName) => fileName.endsWith('.md')).sort()) {
  const sourcePath = `src/content/guides/${fileName}`;
  const inventoryRecordIds = inventoryIdsBySourcePath.get(sourcePath) ?? [];
  currentSourceRouteCoverage.push({ sourcePath, inventoryRecordIds });
}
