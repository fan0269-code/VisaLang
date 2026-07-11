const assert = require('node:assert/strict');
const fs = require('node:fs');

const dataSource = fs
  .readFileSync('src/data/commercial-offers.ts', 'utf8')
  .replace(/export\s+const\s/g, 'const ');
const commercial = new Function(`${dataSource}\nreturn { commercialStatus, commercialLinks, commercialOffers, businessConfirmations };`)();

assert.equal(commercial.commercialStatus, 'contact-intent');
assert.equal(commercial.commercialOffers.length, 6, 'Pricing should compare all six commercial paths');
assert.equal(commercial.commercialOffers.find((offer) => offer.id === 'free-tools').price, 'Free');
for (const offer of commercial.commercialOffers.filter((offer) => offer.id !== 'free-tools')) {
  assert.ok(!/[$€£]\s*\d/.test(offer.price), `${offer.name} must not show an unconfirmed paid price`);
}
for (const href of [
  commercial.commercialLinks.a1FamilyReunionPackIntent,
  commercial.commercialLinks.a1PracticePackIntent,
  commercial.commercialLinks.routeReviewIntent,
  commercial.commercialLinks.partnersIntent,
]) {
  assert.ok(href.startsWith('/contact/'), 'Unconfigured commercial actions must use a contact-intent target');
}
assert.equal(commercial.businessConfirmations.length, 5, 'Business handoff should retain the five confirmation areas');

const pages = {
  pricing: fs.readFileSync('src/pages/pricing.astro', 'utf8'),
  familyPack: fs.readFileSync('src/pages/products/a1-family-reunion-pack.astro', 'utf8'),
  practicePack: fs.readFileSync('src/pages/products/a1-practice-pack.astro', 'utf8'),
  routeReview: fs.readFileSync('src/pages/route-review.astro', 'utf8'),
  partners: fs.readFileSync('src/pages/partners.astro', 'utf8'),
};

for (const [name, page] of Object.entries(pages)) {
  assert.ok(page.includes('CommercialBoundary'), `${name} needs the official-verification and disclaimer boundary`);
  assert.ok(page.includes('IntentCTA'), `${name} needs an explicit real contact or request-access CTA`);
  assert.ok(!/payment successful|email sent|review accepted/i.test(page), `${name} must not claim a false completion state`);
}
for (const phrase of ['Who it is for', 'Proposed contents', 'What it would not include', 'How it would be used']) {
  assert.ok(pages.familyPack.includes(phrase), `Family Reunion Pack needs: ${phrase}`);
  assert.ok(pages.practicePack.includes(phrase), `Practice Pack needs: ${phrase}`);
}
for (const phrase of ['not legal advice', 'What input would be needed', 'Output boundary', 'When to speak with a qualified lawyer']) {
  assert.ok(pages.routeReview.toLowerCase().includes(phrase.toLowerCase()), `Route Review needs: ${phrase}`);
}
assert.ok(pages.partners.includes('affiliate link is a commercial link'), 'Partners page must not call affiliate links official recommendations');

console.log('commercial page rules passed');
