# VisaLang Ad Network Onboarding Guide

Date: 2026-07-02

## Goal

Use display ads only after VisaLang has enough trustworthy content and real organic traffic.

Advertising should be a secondary revenue layer. The first job of the site is to help users verify language-exam paths safely. Ads must not hide official-source links, interrupt forms, or make pages look like "made for ads" content.

## Google AdSense first

Start with Google AdSense because it is the most accessible ad network for an early content site.

Based on Google AdSense Help, check these before applying:

- You have your own high-quality, original content.
- The site complies with AdSense Program policies.
- The applicant is at least 18 years old.
- You can access and edit the site's HTML source code.
- The site has clear navigation, legal pages, and real content.

Official references:

- AdSense eligibility requirements: https://support.google.com/adsense/answer/9724
- AdSense Program policies: https://support.google.com/adsense/answer/48182
- Ads.txt guide: https://support.google.com/adsense/answer/12171612
- AdSense code guide: https://support.google.com/adsense/answer/9274634

## Before applying

Do this first:

- Connect the site to a real domain.
- Make sure `privacy-policy.html`, `terms.html`, `cookie-policy.html`, `editorial-policy.html`, `affiliate-disclosure.html`, `about.html`, and `contact.html` are live.
- Confirm every guide has official sources and a Last Updated date.
- Remove placeholder form IDs, placeholder emails, and unfinished copy.
- Connect Google Search Console.
- Submit `sitemap.xml`.
- Confirm `robots.txt` references the sitemap.
- Run `npm run launch-check`.

Content readiness target:

- Minimum practical target: 20 to 30 useful pages.
- Better target: one complete route cluster plus at least one second cluster.
- For VisaLang, finish Germany A1 first before applying.

## Apply to AdSense

High-level steps:

1. Create or sign in to a Google account.
2. Open https://adsense.google.com/.
3. Add the VisaLang domain.
4. Fill in payment country and account details carefully.
5. Copy the AdSense code snippet when Google provides it.
6. Add the code to the `<head>` of the site pages or a shared template if the site later gets a build system.
7. Request site review.
8. Wait for Google to approve, reject, or ask for changes.

For the current static site:

- The site does not have a shared layout system.
- If adding AdSense manually, add the code to every important HTML page.
- Do not add placeholder AdSense code before you have a real publisher/client ID.
- Keep the code out of docs and tests unless it is a safe placeholder comment.

## Add ads.txt

Google says ads.txt is not mandatory but strongly recommended.

After AdSense gives you a publisher ID:

1. Create `/ads.txt` at the site root.
2. Add the exact line from AdSense.
3. It normally looks like this:

```text
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

4. Replace `pub-0000000000000000` with your actual publisher ID.
5. Deploy the file.
6. Visit `https://your-domain.com/ads.txt` in a browser to confirm it is visible.
7. Ask AdSense to recheck if the dashboard shows an ads.txt warning.

Do not commit a fake publisher ID as if it were real.

## Ad placement rules

Protect trust and comply with ad policies.

Good placements:

- After the route-hub introduction.
- Between major content sections after the first official-source warning.
- Below FAQ.
- Near the bottom of long guide pages.

Avoid:

- Ads above the main user task.
- Ads inside navigation.
- Ads next to official-source links in a way that causes confusion.
- Ads inside forms or route-finder controls.
- Ads that look like download buttons, official buttons, or exam booking buttons.
- Pop-ups, pop-unders, forced clicks, or deceptive labels.

Labeling:

- Use clear labels such as "Advertisement" or "Sponsored".
- Do not use misleading labels such as "Official recommendation" or "Best exam site".

Invalid traffic warning:

- Do not click your own ads.
- Do not ask friends, users, or contractors to click ads.
- Do not buy paid-to-click traffic.
- Do not run traffic exchanges or autosurf traffic.
- Do not place ads in a way that tricks users into clicking.

## Privacy and cookies

Before ads go live:

- Review `privacy-policy.html` and `cookie-policy.html`.
- Mention advertising cookies and third-party ad partners.
- Add a consent-management flow later if targeting visitors in regions that require it.
- Do not collect sensitive immigration documents for ad targeting.

## Premium network later

Do not start with premium ad networks.

Use this rough sequence:

1. Google AdSense first.
2. Ezoic or similar early optimization network only if you can maintain page speed and trust.
3. Premium networks later after traffic is much higher and content quality is stable.

Before applying to any premium network:

- Check its current official traffic and content requirements.
- Confirm whether it accepts your geography and niche.
- Confirm contract terms and exclusivity.
- Confirm whether it requires access to DNS, hosting, or ad stack.
- Confirm whether it affects page speed.

Do not rely on old traffic thresholds copied from blogs. Network requirements change.

## VisaLang rollout order

### Stage 1: No display ads

Use this while the site is still proving demand.

- Build Germany A1 traffic.
- Improve guide quality.
- Connect Search Console.
- Collect waitlist intent.
- Create free checklist.

### Stage 2: AdSense readiness

Apply after:

- Domain is live.
- 20 to 30 useful pages exist.
- Legal pages are live.
- `npm run launch-check` passes.
- At least one route has early traffic or impressions.

### Stage 3: Light ads

If approved:

- Add ads to route hubs and long guides only.
- Keep the homepage clean at first.
- Review page speed and mobile layout.
- Track whether waitlist conversions drop.

### Stage 4: Ad optimization

Only after traffic grows:

- Test ad positions one at a time.
- Do not add ad density faster than content quality grows.
- Remove placements that reduce trust or confuse users.

## Approval Checklist

- [ ] Real domain live.
- [ ] Legal pages live.
- [ ] Contact page live.
- [ ] About page live.
- [ ] Cookie and privacy policy mention ads before ads launch.
- [ ] At least 20 to 30 useful pages.
- [ ] Germany A1 route complete.
- [ ] No placeholder form IDs in public pages.
- [ ] Search Console connected.
- [ ] Sitemap submitted.
- [ ] `npm test` passes.
- [ ] `npm run launch-check` passes.
- [ ] AdSense application submitted.
- [ ] Real AdSense code added after approval/request.
- [ ] Real `ads.txt` added after publisher ID is known.

## What To Tell Yourself Before Adding Ads

If the ad makes the page less trustworthy, do not add it.

If the ad could be confused with an official exam link, do not add it.

If the content is thin, improve the content before adding more ads.
