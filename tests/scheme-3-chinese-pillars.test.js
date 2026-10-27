const assert = require('node:assert/strict');
const fs = require('node:fs');

const contracts = {
  'german-family-reunion-language-requirement': [
    '四方责任图：谁确认什么',
    'A1 要求核验树',
    '豁免证据记录卡',
    '给签证处的中文询问模板',
  ],
  'goethe-a1-vs-telc-a1': [
    '四方责任图：谁确认什么',
    '同一路线比较矩阵',
    '停止比较条件',
    '考试选择工作表',
  ],
  'goethe-a1-test-centers': [
    '四方责任图：谁确认什么',
    '考点授权核验链',
    '付款前证据包',
    '信息冲突处理表',
  ],
  'german-a1-exam-booking-timeline': [
    '四方责任图：谁确认什么',
    '四类节点倒排表',
    '未知日期处理规则',
    '重考分支表',
  ],
  'goethe-a1-30-day-study-plan': [
    '四方责任图：谁确认什么',
    '起点诊断表',
    '30 天学习循环',
    '错误追踪表',
    '原创练习组',
  ],
};

const retiredChineseRoutes = [
  '/zh/guides/goethe-a1-germany-family-reunion/',
  '/zh/guides/goethe-a1-booking-mistakes/',
  '/zh/guides/german-a1-documents-checklist/',
];

const expectedGuideRecords = {
  'german-family-reunion-language-requirement': {
    readingTime: '8',
    nextGuideSlug: 'goethe-a1-vs-telc-a1',
    supportingGuideSlugs: ['goethe-a1-vs-telc-a1', 'goethe-a1-test-centers'],
  },
  'goethe-a1-vs-telc-a1': {
    readingTime: '8',
    nextGuideSlug: 'goethe-a1-test-centers',
    supportingGuideSlugs: ['german-family-reunion-language-requirement', 'goethe-a1-test-centers'],
  },
  'goethe-a1-test-centers': {
    readingTime: '8',
    nextGuideSlug: 'german-a1-exam-booking-timeline',
    supportingGuideSlugs: ['goethe-a1-vs-telc-a1', 'german-a1-exam-booking-timeline'],
  },
  'german-a1-exam-booking-timeline': {
    readingTime: '10',
    nextGuideSlug: 'goethe-a1-30-day-study-plan',
    supportingGuideSlugs: ['goethe-a1-test-centers', 'goethe-a1-30-day-study-plan'],
  },
  'goethe-a1-30-day-study-plan': {
    readingTime: '10',
    nextGuideSlug: null,
    supportingGuideSlugs: ['german-a1-exam-booking-timeline', 'goethe-a1-test-centers'],
  },
};

for (const [slug, requiredAssets] of Object.entries(contracts)) {
  const file = `src/pages/zh/guides/${slug}.astro`;
  const source = fs.readFileSync(file, 'utf8');
  const bodyStart = source.indexOf('>');
  const bodyEnd = source.lastIndexOf('</ZhGuideLayout>');
  const body = source.slice(bodyStart + 1, bodyEnd);
  const hanCount = (body.match(/[\u3400-\u9fff]/g) || []).length;

  assert.ok(hanCount >= 1800 && hanCount <= 3000, `${slug} keeps 1,800–3,000 Han characters in its page-specific body; found ${hanCount}`);

  const minimumSlotHan = {
    who: 80,
    'key-decisions': 80,
    mistakes: 100,
    'next-action': 80,
    sources: 120,
  };
  for (const [slot, minimumHan] of Object.entries(minimumSlotHan)) {
    const matches = [...source.matchAll(new RegExp(`<Fragment slot=["']${slot}["']>([\\s\\S]*?)<\\/Fragment>`, 'g'))];
    assert.equal(matches.length, 1, `${slug} supplies exactly one page-specific ${slot} slot`);
    const slotHanCount = (matches[0][1].match(/[\u3400-\u9fff]/g) || []).length;
    assert.ok(slotHanCount >= minimumHan, `${slug} keeps substantive page-specific ${slot} content; found ${slotHanCount} Han characters`);
  }
  assert.doesNotMatch(body, /<h2>本页(?:适用对象与边界|关键决策|常见错误|下一步行动|官方来源)<\/h2>/, `${slug} lets the shared layout own named-section headings`);

  for (const asset of requiredAssets) {
    assert.ok(body.includes(asset), `${slug} includes its required original asset: ${asset}`);
  }

  assert.ok(body.includes('场景一') && body.includes('场景二'), `${slug} includes at least two bounded Chinese-user scenarios`);
  assert.ok(body.includes('中文询问模板'), `${slug} includes a page-specific Chinese inquiry template`);
  assert.match(body, /china\.diplo\.de|goethe\.de|telc\.net/, `${slug} cites a first-party authority in its page-specific source section`);

  for (const route of retiredChineseRoutes) {
    assert.ok(!source.includes(route), `${slug} links directly to pillars instead of retired Chinese route ${route}`);
  }
}

const guideData = fs.readFileSync('src/data/zh-germany-a1.ts', 'utf8');
for (const [slug, expected] of Object.entries(expectedGuideRecords)) {
  const recordMarker = `\n    slug: '${slug}',`;
  const recordStart = guideData.indexOf(recordMarker);
  assert.notEqual(recordStart, -1, `${slug} has a Chinese guide data record`);
  const nextRecordStart = guideData.indexOf('\n  {', recordStart + recordMarker.length);
  const record = guideData.slice(recordStart, nextRecordStart === -1 ? guideData.length : nextRecordStart);

  const expectedReviewDate = slug === 'german-family-reunion-language-requirement'
    ? '2026-09-08'
    : ['goethe-a1-vs-telc-a1', 'goethe-a1-test-centers', 'german-a1-exam-booking-timeline'].includes(slug)
      ? '2026-09-09'
      : '2026-09-01';
  assert.match(record, new RegExp(`updatedDate: '${expectedReviewDate}'`), `${slug} has the current content update date`);
  assert.match(record, new RegExp(`sourceReviewedAt: '${expectedReviewDate}'`), `${slug} has the current source review date`);
  assert.match(record, /publicationDisposition: 'pillar'/, `${slug} remains a pillar record`);
  assert.match(record, /noindex: false/, `${slug} remains indexable`);
  assert.match(record, /adsEligible: false/, `${slug} remains advertising-free`);
  assert.ok(record.includes(`readingTime: '${expected.readingTime}'`), `${slug} uses its recalculated reading time`);

  if (expected.nextGuideSlug) {
    assert.ok(record.includes(`nextGuideSlug: '${expected.nextGuideSlug}'`), `${slug} links directly to the next pillar`);
  } else {
    assert.doesNotMatch(record, /nextGuideSlug:/, `${slug} is the terminal Chinese pillar`);
  }
  const supportingList = expected.supportingGuideSlugs.map((supportingSlug) => `'${supportingSlug}'`).join(', ');
  assert.ok(record.includes(`supportingGuideSlugs: [${supportingList}]`), `${slug} uses only its direct Scheme 3 supporting pillars`);

  for (const retiredRoute of retiredChineseRoutes) {
    const retiredSlug = retiredRoute.split('/').filter(Boolean).at(-1);
    assert.ok(!record.includes(`'${retiredSlug}'`), `${slug} data does not depend on retired guide ${retiredSlug}`);
  }
}

const ledger = fs.readFileSync('docs/VISALANG_SCHEME_3_ZH_CLAIM_SOURCE_LEDGER_2026-09-01.md', 'utf8');
const expectedLedgerColumns = [
  'Claim',
  'Source URL',
  'Locator',
  'Checked',
  'Owner',
  'Allowed support',
  'Boundary',
  'Update trigger',
];
const parseLedgerRow = (line) => line.slice(1, -1).split('|').map((cell) => cell.trim());
const ledgerLines = ledger.split(/\r?\n/);
const ledgerHeaderIndex = ledgerLines.findIndex((line) => {
  if (!line.startsWith('|') || !line.endsWith('|')) return false;
  return JSON.stringify(parseLedgerRow(line)) === JSON.stringify(expectedLedgerColumns);
});
assert.notEqual(ledgerHeaderIndex, -1, 'Chinese claim ledger uses the exact required eight-column schema');
assert.match(ledgerLines[ledgerHeaderIndex + 1], /^\|(?:\s*:?-+:?\s*\|){8}$/, 'Chinese claim ledger has a valid eight-column divider');

const ledgerRows = [];
for (let index = ledgerHeaderIndex + 2; index < ledgerLines.length; index += 1) {
  const line = ledgerLines[index];
  if (!line.startsWith('|') || !line.endsWith('|')) break;
  const cells = parseLedgerRow(line);
  assert.equal(cells.length, expectedLedgerColumns.length, `ledger row ${index + 1} has exactly eight cells`);
  ledgerRows.push(Object.fromEntries(expectedLedgerColumns.map((column, cellIndex) => [column, cells[cellIndex]])));
}
assert.ok(ledgerRows.length >= 10, `Chinese claim ledger records multiple bounded claims for five pillars; found ${ledgerRows.length}`);

const allowedOfficialHosts = new Set(['china.diplo.de', 'www.goethe.de', 'www.telc.net', 'shop.telc.net']);
for (const [index, row] of ledgerRows.entries()) {
  for (const column of expectedLedgerColumns) {
    assert.ok(row[column], `ledger row ${index + 1} has a non-empty ${column}`);
  }
  const sourceUrl = new URL(row['Source URL']);
  assert.equal(sourceUrl.protocol, 'https:', `ledger row ${index + 1} uses HTTPS`);
  assert.ok(allowedOfficialHosts.has(sourceUrl.hostname), `ledger row ${index + 1} uses an approved first-party official host`);
  assert.ok(!/https?:\/\//.test(row.Locator) && row.Locator.length >= 12, `ledger row ${index + 1} has a source-local locator rather than another URL`);
  const expectedCheckedAt = (row.Claim.includes('goethe-a1-vs-telc-a1')
    && !row.Claim.includes('比较前先核验中国申请路线'))
    || row.Claim.includes('goethe-a1-test-centers')
    || (row.Claim.includes('german-a1-exam-booking-timeline')
      && !row.Claim.includes('材料节点从中国地区当前申请类别取得'))
    ? '2026-09-09'
    : '2026-09-01';
  assert.equal(row.Checked, expectedCheckedAt, `ledger row ${index + 1} has its actual verification date`);
  assert.ok(row.Owner.length >= 4, `ledger row ${index + 1} names the responsible source owner`);
  assert.ok(row['Allowed support'].length >= 16, `ledger row ${index + 1} defines substantive allowed support`);
  assert.ok(row.Boundary.length >= 16, `ledger row ${index + 1} defines a substantive non-support boundary`);
  assert.ok(row['Update trigger'].length >= 12, `ledger row ${index + 1} defines a concrete update trigger`);
}

for (const slug of Object.keys(contracts)) {
  const pageRows = ledgerRows.filter((row) => row.Claim.includes(slug));
  assert.ok(pageRows.length >= 2, `${slug} has at least two independently bounded ledger claims`);
  assert.ok(
    pageRows.some((row) => row['Source URL'].includes('china.diplo.de') || row['Source URL'].includes('/ins/cn/')),
    `${slug} uses a China-specific authority source for its China-context claims`,
  );
}

console.log('Scheme 3 Chinese pillar depth contracts passed');
