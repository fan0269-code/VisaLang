import assert from 'node:assert/strict';
import fs from 'node:fs';

const {
  createReminderIcs,
  escapeIcsText,
  foldIcsLine,
} = await import('../src/data/reminder-ics.ts');

assert.equal(typeof createReminderIcs, 'function', 'T19 exposes a pure RFC 5545 generator');
assert.equal(typeof escapeIcsText, 'function', 'T19 exposes text escaping for direct special-character regression');
assert.equal(typeof foldIcsLine, 'function', 'T19 exposes UTF-8 octet folding for direct regression');

const validInput = {
  topicId: 'recheck-official-source',
  routeId: 'germany-family-reunion-a1',
  date: '2026-12-31',
};
const generatedAt = '2026-09-09T12:00:00.000Z';
const event = createReminderIcs(validInput, { generatedAt });
assert.equal(event.status, 'ready', 'a supported route, date, and UTC timestamp generate a file');
assert.equal(event.filename, 'visalang-reminder.ics', 'the browser download name is stable and explicit');
assert.match(event.uid, /^visalang-[a-z0-9-]+@visalang\.org$/, 'the UID is stable, opaque to personal data, and namespaced');
assert.ok(event.content.endsWith('\r\n'), 'the calendar file ends with CRLF');
assert.doesNotMatch(event.content.replaceAll('\r\n', ''), /[\r\n]/, 'the file contains no bare CR or LF separators');

const physicalLines = event.content.split('\r\n').slice(0, -1);
for (const line of physicalLines) {
  assert.ok(Buffer.byteLength(line, 'utf8') <= 75, `physical ICS line stays within 75 UTF-8 octets: ${line}`);
}
const unfoldedLines = event.content.replace(/\r\n[ \t]/g, '').split('\r\n').filter(Boolean);
for (const required of [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//VisaLang//Reminder Planner//EN',
  'CALSCALE:GREGORIAN',
  'BEGIN:VEVENT',
  `UID:${event.uid}`,
  'DTSTAMP:20260909T120000Z',
  'DTSTART;VALUE=DATE:20261231',
  'DTEND;VALUE=DATE:20270101',
  'END:VEVENT',
  'END:VCALENDAR',
]) {
  assert.ok(unfoldedLines.includes(required), `the parsed ICS contains ${required}`);
}
assert.ok(unfoldedLines.some((line) => line.startsWith('SUMMARY:')), 'the event has a summary');
assert.ok(unfoldedLines.some((line) => line.startsWith('DESCRIPTION:')), 'the event has a description');
assert.ok(
  unfoldedLines.includes('URL:https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682'),
  'a reminder without an optional source embeds the selected route’s trusted official entry',
);
assert.ok(
  unfoldedLines.some((line) => line.includes('Federal Foreign Office spouse-language orientation')),
  'the description gives the official entry’s bounded purpose',
);
assert.doesNotMatch(event.content, /VALARM|email (?:sent|delivered)/i, 'the file does not claim or configure notification delivery');

const later = createReminderIcs(validInput, { generatedAt: '2026-09-10T05:04:03.000Z' });
assert.equal(later.status, 'ready');
assert.equal(later.uid, event.uid, 'the same topic, route, and date keep the same UID across generations');
assert.notEqual(later.content, event.content, 'DTSTAMP still records the actual generation time');
const changedDate = createReminderIcs({ ...validInput, date: '2027-01-01' }, { generatedAt });
assert.equal(changedDate.status, 'ready');
assert.notEqual(changedDate.uid, event.uid, 'changing the stable event identity changes the UID');

for (const [date, expectedEnd] of [
  ['2024-02-29', '20240301'],
  ['2026-01-31', '20260201'],
  ['2026-12-31', '20270101'],
]) {
  const result = createReminderIcs({ ...validInput, date }, { generatedAt });
  assert.equal(result.status, 'ready');
  const logical = result.content.replace(/\r\n[ \t]/g, '');
  assert.match(logical, new RegExp(`DTEND;VALUE=DATE:${expectedEnd}\\r\\n`), `${date} receives the correct exclusive next-day end`);
}

assert.equal(
  escapeIcsText('Back\\slash, semi;\nline\r\nnext\rfinal'),
  'Back\\\\slash\\, semi\\;\\nline\\nnext\\nfinal',
  'TEXT values escape backslash, comma, semicolon, LF, CRLF, and CR in the RFC order',
);
const logicalLongLine = `DESCRIPTION:${'汉字,semi;\\path '.repeat(20)}`;
const folded = foldIcsLine(logicalLongLine);
const foldedPhysical = folded.split('\r\n');
assert.ok(foldedPhysical.length > 1, 'long multibyte text is folded');
assert.ok(foldedPhysical.slice(1).every((line) => line.startsWith(' ')), 'every continuation line begins with one space');
assert.ok(foldedPhysical.every((line) => Buffer.byteLength(line, 'utf8') <= 75), 'each multibyte physical line stays within the octet limit');
assert.equal(folded.replace(/\r\n /g, ''), logicalLongLine, 'unfolding restores the exact logical content line');

for (const [input, options, field] of [
  [{ ...validInput, date: '2026-02-30' }, { generatedAt }, 'date'],
  [{ ...validInput, topicId: 'custom-free-text' }, { generatedAt }, 'topic'],
  [{ ...validInput, routeId: 'unknown-route' }, { generatedAt }, 'route'],
  [{ ...validInput, routeId: 'germany-b1' }, { generatedAt }, 'route'],
  [{ ...validInput, sourceUrl: 'https://example.org/arbitrary' }, { generatedAt }, 'source'],
  [{ ...validInput, sourceUrl: 'http://example.org/not-secure' }, { generatedAt }, 'source'],
  [{ ...validInput, sourceUrl: 'not a URL' }, { generatedAt }, 'source'],
  [validInput, { generatedAt: '2026-09-09 12:00' }, 'generatedAt'],
  [{ ...validInput, date: '9999-12-31' }, { generatedAt }, 'date'],
]) {
  const result = createReminderIcs(input, options);
  assert.equal(result.status, 'invalid', `invalid ICS input fails closed: ${JSON.stringify(input)}`);
  assert.equal(result.field, field, `the invalid result identifies ${field}`);
  assert.ok(result.message, 'the invalid result gives a correction message');
}

const originalTimezone = process.env.TZ;
try {
  const contents = [];
  for (const timezone of ['Pacific/Kiritimati', 'America/Adak']) {
    process.env.TZ = timezone;
    contents.push(createReminderIcs(validInput, { generatedAt }));
  }
  assert.deepEqual(contents[0], contents[1], 'positive and negative local timezones cannot shift an all-day date');
} finally {
  if (originalTimezone === undefined) delete process.env.TZ;
  else process.env.TZ = originalTimezone;
}

const page = fs.readFileSync('src/pages/tools/email-reminders.astro', 'utf8');
assert.match(page, /createReminderIcs/, 'the production page delegates file creation to the pure generator');
assert.match(
  page,
  /const reminderRoutes = routeRegistry\.filter\(\(route\) => route\.availability === 'configured' && route\.reminderOfficialEntry\);/,
  'the page exposes only configured routes with a trusted reminder entry',
);
assert.match(page, /reminderRoutes\.map\(\(route\)/, 'the route selector uses the restricted reminder route list');
assert.doesNotMatch(page, /name="source"/, 'the page does not present an arbitrary official-source field');
assert.doesNotMatch(page, /Date\.now\(\)/, 'the page does not create unstable timestamp UIDs');
assert.match(page, /new Blob\(\[reminderIcs\.content\]/, 'the downloaded bytes are the tested generator output');
assert.match(page, /controller\.reportError/, 'invalid ICS input is attached to a concrete field');
assert.match(page, /invalidateReminder/, 'editing a submitted reminder invalidates the stale download result');
assert.doesNotMatch(page, /fetch\s*\(/, 'the optional user URL is never automatically visited');
assert.doesNotMatch(page, /URLSearchParams|location\.search/, 'the reminder does not write the source or date into the address bar');

console.log('M2-B T19 RFC 5545 reminder contracts passed');
