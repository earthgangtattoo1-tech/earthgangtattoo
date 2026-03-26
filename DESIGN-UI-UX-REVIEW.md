# Earth Gang Tattoo — Design, UI & UX Review

**Date:** 2026-03-26  
**URL:** https://earthgangtattoo.pages.dev  
**Stack:** React 19 · Tailwind CSS v4 · Framer Motion · Cloudflare Pages  
**Pages Audited:** Home, Booking, Gallery, AI Consult, FAQ, 404  
**Viewports:** Desktop (1280×720)  

---

## Executive Summary

The site has a **strong editorial design identity** — the "ink and ash" dark theme with crimson and gold accents is distinctive and on-brand for a premium tattoo studio. The typography system (Syne / Instrument Serif / Outfit / JetBrains Mono) creates excellent visual hierarchy. However, there are **significant issues across trust, content authenticity, conversion flow, and performance** that should be addressed before the site represents a real business.

**Overall Grade: B−** — Beautiful shell, needs substance.

---

## 1. Design & Visual Identity

### 1.1 ✅ What Works

| Area | Detail |
|------|--------|
| **Color palette** | Warm blacks (#0B0A08) with crimson (#C41E3A) and gold (#C9A84C) create a cohesive, premium atmosphere. The ink-stained aesthetic is unique and memorable. |
| **Typography scale** | Four-font system works well — Syne for display headings, Instrument Serif for editorial accents, Outfit for body, JetBrains Mono for labels. Good contrast in sizes and weights. |
| **Micro-animations** | Framer Motion stagger, hover lifts on cards, brush-underline effect on gallery heading. Easing curves ([0.22, 1, 0.36, 1]) feel premium. |
| **Film grain overlay** | Subtle texture adds atmosphere without distraction. Good attention to craft. |
| **Consistent spacing** | `py-28 md:py-36 lg:py-44` section padding is generous and consistent. Max-width containers at 7xl are appropriate. |
| **Dividers** | Ink and crimson gradient dividers create visual rhythm between sections. |

### 1.2 ⚠️ Issues

#### D-01: No real photography — undermines credibility

**Severity: HIGH**

The gallery uses only **Unsplash stock photos** — generic tattoo images that are not the studio's actual work. All 12 gallery items are URLs from Unsplash pointing to images with IDs like `photo-1611501275019`. Several are duplicated (same image used across multiple categories).

A tattoo studio's portfolio is its **primary conversion asset**. Stock photos destroy trust immediately — potential clients will recognize these are not the studio's actual work.

**Recommendation:**
- Replace all gallery images with real tattoo photos from TOON and RONNIE
- Even 6–8 real photos are better than 12 fake ones
- Each should include the artist tag, style, and approximate size
- Consider adding a "New Work" section that can grow over time

#### D-02: OG image is an SVG favicon — broken social sharing

**Severity: MEDIUM**

```html
<meta property="og:image" content="https://earthgangtattoo.net/favicon.svg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

The `og:image` points to a small SVG logo, but claims dimensions of 1200×630. Most social platforms **do not render SVGs** in link previews. This means every link shared on Facebook, LINE, Instagram, or Twitter will show a broken or empty preview.

**Recommendation:**
- Create a 1200×630px PNG/JPG image with the studio name, tagline, and a compelling photo
- Place it in `/public/og-image.jpg` and reference it in `index.html`
- Add `<meta name="twitter:image" content="..." />` as well (currently missing)

#### D-03: Hero is all typography — no emotional hook

**Severity: MEDIUM**

The hero section is pure text (studio name + tagline + buttons) with animated gradient blobs. For a tattoo studio, this is a missed opportunity. First-time visitors need to **see the work immediately** to decide if they trust the studio.

**Recommendation:**
- Add a hero background image (light-opacity photo of the studio or a signature piece)
- Or add a small "featured work" image strip below the hero heading
- The animated blobs are nice but they're a decorator's touch, not a hook

#### D-04: Founder photo filename is "Non.jpg.jpg" — looks unpolished

**Severity: LOW**

The CEO/founder image is served from `/Non.jpg.jpg` — a double extension that looks like an accident. While it works technically, it undermines the professional image the design is trying to build.

**Recommendation:** Rename to `/nont-founder.jpg` and update references in `Home.jsx`.

#### D-05: No favicon.ico — only SVG favicon

**Severity: LOW**

Browsers that don't support SVG favicons (older Safari, some email clients) will show a blank icon. The SVG-only approach means no icon in browser tabs for some users.

**Recommendation:** Generate a multi-size favicon.ico (16/32/48px) and add `<link rel="icon" type="image/x-icon" href="/favicon.ico">` alongside the SVG.

---

## 2. User Experience & Information Architecture

### 2.1 ✅ What Works

| Area | Detail |
|------|--------|
| **Navigation** | Clear 5-item nav with active state indicator. Mobile hamburger menu with smooth animation. |
| **Step indicator** | Booking flow uses a numbered step indicator (1→2→3→4→5) — clear progress feedback |
| **Sticky gallery filter** | Category filter sticks to top when scrolling gallery — good for browse-heavy pages |
| **Chat widget** | FAQ-driven chatbot answers common questions without page navigation |
| **Page-specific layouts** | Each page has its own visual identity while sharing the design system |
| **Scroll-to-top** | Floating button appears after scrolling — good for long-form pages |

### 2.2 ⚠️ Issues

#### UX-01: No prominent pricing on the home page

**Severity: HIGH**

Pricing is only shown in the services section as cards with icons like ✨🎨🔥. The actual prices (2,000 THB, 5,000 THB, etc.) are there but require reading. The most important conversion metric — **price transparency** — should be immediately visible.

Many tattoo studio competitors bury pricing. Being upfront is a differentiator. The current design treats pricing as an editorial layout rather than a conversion element.

**Recommendation:**
- Add a simple, scannable pricing summary near the hero or CTA section:
  ```
  Small: from ฿2,000 · Medium: from ฿5,000 · Large: from ฿10,000 · Full Sleeve: from ฿30,000
  ```
- Consider a "Starts at" badge on each service card

#### UX-02: Booking stores data only in localStorage

**Severity: HIGH**

All booking data is persisted in `localStorage` only (`eg_bookings` key). This means:
- **Bookings are device-specific** — if a user books on their phone, the studio doesn't see it
- **No cross-device sync** — the "booked slots" feature only blocks slots for that browser
- **No backend booking system** — the Cloudflare Functions exist but aren't connected to the frontend

The current flow gives users a "booking confirmed" experience but the studio may never actually receive the booking.

**Recommendation:**
- Connect the frontend to the `/api/book` Cloudflare Function instead of (or in addition to) localStorage
- Use the Function as the source of truth for availability
- Fall back to localStorage only if the API is unreachable

#### UX-03: No clear primary action path from the gallery

**Severity: MEDIUM**

The gallery page has a "Like What You See?" CTA at the bottom and a map embed, but there's no way to **go from seeing a specific piece to booking with the artist who did it**. This breaks the natural browse → interested → book flow.

Gallery items don't link to anything, don't have artist attribution, and don't have a "Book Similar" action.

**Recommendation:**
- Add artist attribution to each gallery item
- Add a "Book This Style" button on hover or as a quick action
- Consider linking specific gallery items to the booking page with a pre-selected artist

#### UX-04: AI Consultation is entirely hardcoded mock data

**Severity: MEDIUM**

The "AI Design Consultation" page (Consult.jsx) uses a `generateConsultation()` function that matches keywords against a static object of 8 predefined responses. There is no actual AI/API call being made. The loading animation (1.5–2.5s fake delay) gives the appearance of AI processing.

This is misleading to users. If they select "Fine Line Rose" and get a detailed recommendation, they believe an AI analyzed their request. In reality, it's a static string lookup.

**Recommendation (short-term):**
- Change the page label from "AI-Powered" to "Style Guide" or "Design Consultation"
- Remove the fake loading delay — show results instantly since they're static
- Make it clear this is a pre-built guide, not a real-time AI response

**Recommendation (long-term):**
- Connect to Claude API via the Cloudflare Function (the commented-out code in the file shows the right approach)
- Move the API key to a server-side secret, never expose it client-side

#### UX-05: No before/aftercare visual guide

**Severity: MEDIUM**

Aftercare information is text-only in the FAQ. For a tattoo studio, this is a missed engagement and SEO opportunity. Visual aftercare guides are highly shareable content that attracts organic traffic.

**Recommendation:**
- Create a dedicated aftercare page or section with day-by-day visual healing stages
- Add simple illustrations showing proper washing, moisturizing, and protection
- This is also excellent content for social media

#### UX-06: No social proof beyond testimonials section

**Severity: MEDIUM**

There are only 3 testimonials and they're all 5-star reviews from generic-sounding international clients ("Sarah M., Australia"). The "Based on 200+ reviews" badge claims an impressive number but there's no way to verify it and no link to Google Reviews, Facebook, or any review platform.

**Recommendation:**
- Link the review badge to the actual Google Reviews page
- Add real review quotes with names and, if possible, profile photos
- Consider embedding a Google Reviews widget
- Add Instagram/social media links for live proof of work

#### UX-07: Chat widget sends unanswered messages to a black hole

**Severity: MEDIUM**

When the chatbot can't answer a question, it sends the message via `sendChatMessage()` to the owner's email via Resend API. However:
- The user gets no confirmation that their message was received
- There's no indication of when they'll get a response
- If the Resend API fails silently, the message is lost

**Recommendation:**
- Show a confirmation message: "We've received your message and will reply within 24 hours"
- Add a fallback email input so the user can leave contact info
- Log failed email attempts and show an error state

#### UX-08: No social media links anywhere on the site

**Severity: MEDIUM**

For a tattoo studio, social media (especially Instagram) is a primary marketing channel. There are zero social media links on the site — no Instagram, Facebook, LINE, or TikTok icons in the header, footer, or anywhere.

**Recommendation:**
- Add Instagram and LINE links to the footer
- Add an Instagram icon in the header nav
- Add a floating social bar or at minimum a link in the footer "Visit Us" section

#### UX-09: Payment card form collects real card data — PCI compliance risk

**Severity: HIGH**

The booking page (Step 4) has a card number, expiry, CVV, and name form that **collects real credit card information directly into React state**. This data is never sent anywhere in the current code, but:
- The form exists and users will fill it in
- There's no Stripe/PromptPay integration — this is a fake payment form
- Even if connected to an API, collecting raw card numbers on your own form requires **PCI-DSS Level 1 compliance**
- The "SSL Encrypted" and "Secure Payment" badges are misleading

**Recommendation:**
- Remove the card form entirely until real payment integration exists
- For PromptPay: generate a real PromptPay QR code using the payload already in `config.js` (the `promptpayQr` field exists!)
- For card payments: integrate Stripe Elements (hosted iframes) — never collect raw card numbers
- For cash: keep the current "pay at studio" option
- Remove the security badges until a real payment processor is in place

#### UX-10: No email/phone click-to-action on mobile

**Severity: LOW**

Phone number and email are displayed as plain text in the footer and FAQ. On mobile devices, these should be `tel:` and `mailto:` links so users can tap to call or email.

**Recommendation:**
```jsx
<a href="tel:+66646394795">{STUDIO.phone}</a>
<a href="mailto:earthgangtattoo@gmail.com">{STUDIO.email}</a>
```

---

## 3. Accessibility (WCAG 2.2)

### 3.1 ✅ What Works (recently added)

| Feature | Detail |
|---------|--------|
| Skip-to-content link | Hidden skip link jumps to `#main-content` |
| Focus-visible styles | Crimson outline on all interactive elements |
| ARIA landmarks | `role="main"`, `role="dialog"`, `role="contentinfo"`, `role="navigation"` |
| Mobile menu ARIA | `aria-expanded`, `aria-controls` on hamburger button |
| FAQ accordion ARIA | `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby` |
| Reduced motion | `prefers-reduced-motion: reduce` disables all animations |
| High contrast | `prefers-contrast: high` overrides to maximum contrast colors |
| Form labels | All form inputs have visible `<label>` elements |
| Lazy loading | Images use `loading="lazy"` |

### 3.2 ⚠️ Remaining Issues

#### A-01: Missing `<label>` elements connected to inputs

**Severity: MEDIUM**

While visible label text exists above inputs, some `<label>` elements don't have a `for`/`htmlFor` attribute connecting them to their input. This means screen readers may not associate the label with the correct field.

```jsx
<label className="label-mono text-cream-dim block mb-2">Full Name *</label>
<input type="text" ... className="input-ink" />
```

**Recommendation:** Add `id` to each input and `htmlFor` to each label.

#### A-02: Card form inputs have no labels (after recent edit)

**Severity: MEDIUM**

The card number, expiry, CVV, and name fields in the payment step have `<label>` text but no `htmlFor`/`id` connection.

#### A-03: Color contrast ratios not verified

**Severity: LOW**

The cream-muted color (#8A8279) on ink background (#0B0A08) gives approximately a 4.6:1 contrast ratio — which passes AA for normal text but **not AA for small text** (requires 4.5:1). The cream-dim color (#5C564E) on ink gives approximately 2.7:1 — this **fails WCAG AA** entirely.

**Recommendation:**
- `cream-dim` should only be used for decorative text, never for essential information
- Verify all color combinations with a contrast checker tool
- Consider bumping `cream-muted` to a slightly lighter shade for body text

#### A-04: No `<h1>` semantic check across pages

**Severity: LOW**

Both `Home.jsx` lines 145 and 155 use `<h1>` — there are **two `<h1>` elements** on the home page. This fails WCAG and confuses screen reader navigation. The "Earth Gang" heading and "Tattoo" heading should be restructured so only one `<h1>` exists.

**Recommendation:**
```jsx
<h1 className="mb-2">
  <span className="heading-display ...">Earth Gang</span>
  <span className="heading-editorial ...">Tattoo</span>
</h1>
```

#### A-05: Gallery images lack width/height attributes

**Severity: LOW**

Gallery images don't specify `width` and `height` attributes, causing **layout shift (CLS)** as images load. This is a Core Web Vitals issue.

**Recommendation:** Add `width` and `height` props matching the actual image dimensions, or use CSS `aspect-ratio`.

---

## 4. Performance

### 4.1 Bundle Analysis

| Chunk | Size | Notes |
|-------|------|-------|
| `index-Cazq_Y7M.js` | 252 KB | Main vendor bundle (React, Router, Framer Motion) |
| `createLucideIcon-BDGp25EQ.js` | 144 KB | **⚠️ All Lucide icons** tree-shaken into one chunk |
| `Booking-CArx7bON.js` | 45 KB | ✅ Good — code split |
| `Home-CbO3orpD.js` | 22 KB | ✅ Good — code split |
| `Consult-BqkFJ9C5.js` | 15 KB | ✅ Good — code split |
| `Faq-uzfqV_t2.js` | 15 KB | ✅ Good — code split |
| `Gallery-Dlg53cyz.js` | 9.6 KB | ✅ Good — code split |
| `NotFound-ETUSk2Wt.js` | 1.9 KB | ✅ Good — code split |
| `index-CIYX_CmO.css` | 62 KB | Single CSS file (Tailwind) |
| **Total** | **~555 KB** | JS only (before gzip) |

### 4.2 Issues

#### P-01: Lucide icons bundle is 144 KB — excessive

**Severity: MEDIUM**

The `createLucideIcon` chunk at 144 KB is likely pulling in many unused icons. Lucide supports tree-shaking, but the current import pattern may not be fully optimized.

**Recommendation:**
- Audit actual icon usage with `npx @iconify/json-to-ts` or similar
- Consider switching to a smaller icon set or SVG sprites for frequently used icons
- Target: reduce to under 30 KB

#### P-02: Google Fonts loaded without `display=swap` in the preconnect

**Severity: LOW**

The font link includes `display=swap` in the URL, but there's no `<link rel="preload">` for the primary font files. This can cause FOUT (Flash of Unstyled Text) on slow connections.

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=..." rel="stylesheet">
```

**Recommendation:**
- Add `&display=swap` (already present ✓)
- Consider self-hosting fonts and preloading the woff2 files to eliminate the external dependency entirely
- At minimum, add `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` (already present ✓)

#### P-03: External images (Unsplash) slow gallery loading

**Severity: MEDIUM**

All 12 gallery images are loaded from Unsplash CDN (`images.unsplash.com`). This adds:
- DNS lookup time for external domain
- No control over image optimization
- Dependency on third-party availability
- Potential CORS issues

**Recommendation:**
- Download and self-host all gallery images
- Use `<picture>` element with WebP + JPEG fallback
- Implement progressive loading with low-quality placeholder (LQIP)

#### P-04: No image lazy loading on hero/background images

**Severity: LOW**

The founder photo in the About section (`/Non.jpg.jpg`) is 58 KB and loads eagerly. It should use `loading="lazy"` since it's below the fold.

#### P-05: No service worker or offline support

**Severity: LOW**

For a local business in Chiang Mai where tourists may have spotty internet, basic offline support for the booking form and FAQ would improve the experience.

---

## 5. SEO & Content

### 5.1 ✅ What Works

| Feature | Detail |
|---------|--------|
| **JSON-LD structured data** | LocalBusiness, FAQPage, and BreadcrumbList schemas — comprehensive |
| **Meta descriptions** | Unique per-page descriptions via SEO component |
| **Canonical URLs** | Set on every page |
| **Sitemap** | `sitemap.xml` with all 5 pages and priority weights |
| **robots.txt** | Clean, references sitemap |
| **Semantic HTML** | Proper heading hierarchy (except double h1) |
| **Local SEO** | Geo meta tags, Thai address, opening hours schema |

### 5.2 ⚠️ Issues

#### S-01: SEO title tag claims "#1" — could be flagged as misleading

**Severity: LOW**

```jsx
title="Best Tattoo Studio in Chiang Mai"
```

Google's helpful content guidelines discourage unsubstantiated superlatives. If there's no third-party verification, this could hurt rankings.

**Recommendation:** Change to something verifiable: "Earth Gang Tattoo | Chiang Mai Tattoo Studio" or "Earth Gang Tattoo | Fine Line & Traditional Tattoos Chiang Mai"

#### S-02: No multilingual support (Thai market)

**Severity: MEDIUM**

The studio is in Chiang Mai, Thailand. The website is entirely in English. While many tourists and expats in Chiang Mai speak English, offering a Thai language option would:
- Improve local search rankings significantly
- Capture Thai-speaking customers
- Show cultural awareness

**Recommendation:**
- Add `lang="en"` attribute to `<html>` (currently missing)
- Add an alternate `hreflang` link for Thai version
- Prioritize translating: Home, Booking, FAQ, and Pricing

#### S-03: Missing `lang` attribute on `<html>`

**Severity: MEDIUM**

```html
<html lang="en" prefix="og: https://ogp.me/ns#">
```

The `lang="en"` is present ✓ — this was correctly set. However, consider adding `lang="th"` for a Thai version.

#### S-04: No blog or content marketing section

**Severity: LOW**

Tattoo studios benefit enormously from content marketing — "Top 10 Tattoo Styles for 2026", "Aftercare Guide", "What to Expect at Your First Session", etc. These drive organic search traffic.

**Recommendation:** Add a `/blog` or `/journal` section with 2–3 initial posts targeting high-volume search queries.

---

## 6. Technical & Security

### 6.1 Issues

#### T-01: Hardcoded Resend API key in client-side code

**Severity: CRITICAL**

```javascript
// emailSender.js
const RESEND_API_KEY = 're_NEDYiuX8_3mKbEoPcaZnF9jj3gD41qs8t'
```

This API key is **bundled into the client-side JavaScript** and visible to anyone who opens DevTools. An attacker could:
- Use the key to send unlimited emails from your domain
- Forge booking confirmations
- Exhaust your Resend credits

**Recommendation:**
- **Immediately rotate this API key** in the Resend dashboard
- Remove `emailSender.js` from the client bundle entirely
- Route all email sends through the Cloudflare Function (`/api/book` and `/api/contact`)
- The Functions already read `RESEND_API_KEY` from `env` — use those exclusively

#### T-02: Client-side booking manipulation

**Severity: HIGH**

All booking validation happens client-side. A user with DevTools can:
- Set any artist/date/time without availability checks
- Remove the deposit requirement
- Manipulate the reference number
- Submit arbitrary data

Since bookings are only in localStorage, this isn't critical yet — but once connected to a backend, server-side validation is essential.

**Recommendation:**
- Add server-side validation in the Cloudflare Function
- Verify date is in the future
- Verify time is within business hours
- Rate-limit booking submissions per IP/email

#### T-03: No CSRF protection on forms

**Severity: LOW**

The booking and contact forms have no CSRF tokens. Since they use fetch POST, they're somewhat protected by same-origin policy, but explicit tokens are better practice.

---

## 7. Conversion Optimization

### 7.1 Current Funnel Analysis

```
Home (hero CTA) → Booking (5-step form) → Confirmation
                  ↘ Gallery → "Like What You See?" CTA → Booking
                  ↘ AI Consult → "Book with [Artist]" CTA → Booking
                  ↘ FAQ → "Book a Free Consultation" CTA → Booking
```

The funnel structure is good — multiple entry points all lead to booking. However:

### 7.2 Issues

#### C-01: Booking confirmation doesn't set expectations

**Severity: MEDIUM**

After booking, the user sees a confirmation screen with a reference number but no clear next steps. What should they do next?

**Recommendation:** Add to the confirmation:
- "What to expect before your session" (eat well, stay hydrated, don't drink alcohol)
- "Bring reference images" reminder
- Studio address with a "Get Directions" button (Google Maps link)
- Option to add to calendar (.ics download)

#### C-02: No urgency or scarcity signals

**Severity: LOW**

The booking page shows 14 days of availability with no indication of demand. Adding subtle urgency ("Only 2 slots left this Saturday") or social proof ("3 people booked today") can increase conversion.

#### C-03: No exit-intent or abandonment recovery

**Severity: LOW**

If a user starts booking and abandons at step 3 or 4, there's no recovery mechanism. Their partial data is lost.

---

## 8. Mobile-Specific Issues

### 8.1 Issues

#### M-01: Hamburger menu SVG icons are tiny (16×16px)

**Severity: LOW**

The menu/close icons are 16×16 SVGs inside a 40×40px touch target. While the touch target meets minimum size requirements, the visual icon itself could be more prominent (20×20 or 24×24).

#### M-02: Gallery grid is 2 columns on mobile — could use full-width featured images

**Severity: LOW**

On mobile, all gallery items are equal size in a 2-column grid. Consider making the first item full-width to create a stronger visual anchor.

#### M-03: Chat widget may overlap with scroll-to-top button

**Severity: LOW**

Both the chat widget (bottom-right) and scroll-to-top button (`bottom: 6rem, right: 1.5rem`) are on the right edge. On small screens, they may overlap or crowd the interface.

**Recommendation:** Move scroll-to-top to bottom-left on mobile, or hide it when the chat is open.

---

## 9. Priority Roadmap

### 🔴 Critical (Do Immediately)

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| 1 | **T-01:** Rotate and remove hardcoded Resend API key | 30 min | Security |
| 2 | **UX-09:** Remove fake card payment form | 1 hour | Trust + PCI compliance |

### 🟠 High Priority (This Sprint)

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| 3 | **D-01:** Replace stock photos with real work | 2–4 hours | Conversion |
| 4 | **UX-02:** Connect booking to backend API | 3–4 hours | Reliability |
| 5 | **D-02:** Create proper OG image (1200×630) | 1 hour | Social sharing |
| 6 | **UX-04:** Rebrand AI Consult to Style Guide | 1 hour | Trust |
| 7 | **UX-08:** Add social media links | 30 min | Engagement |

### 🟡 Medium Priority (Next Sprint)

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| 8 | **A-04:** Fix double h1 on home page | 15 min | Accessibility |
| 9 | **A-01/A-02:** Connect label htmlFor to all inputs | 1 hour | Accessibility |
| 10 | **UX-03:** Add artist attribution to gallery | 2 hours | Conversion |
| 11 | **P-03:** Self-host gallery images | 2 hours | Performance |
| 12 | **D-03:** Add hero background image | 2–3 hours | First impression |
| 13 | **C-01:** Add next-steps to booking confirmation | 1 hour | Conversion |
| 14 | **S-02:** Add Thai language option | 4–6 hours | Local SEO |

### 🟢 Low Priority (Backlog)

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| 15 | **P-01:** Optimize Lucide icon bundle | 2 hours | Performance |
| 16 | **A-03:** Audit and fix color contrast ratios | 2 hours | Accessibility |
| 17 | **D-04:** Rename Non.jpg.jpg | 10 min | Polish |
| 18 | **D-05:** Add favicon.ico | 15 min | Polish |
| 19 | **UX-10:** Make phone/email clickable | 30 min | Mobile UX |
| 20 | **M-03:** Fix scroll-to-top / chat overlap | 30 min | Mobile UX |
| 21 | **S-04:** Add blog section | 8+ hours | SEO |
| 22 | **UX-05:** Create visual aftercare guide | 4+ hours | Content |

---

## 10. Quick Wins (Under 1 Hour Total)

These can be done immediately for maximum impact:

1. **Rotate the Resend API key** — 5 minutes in Resend dashboard
2. **Remove `emailSender.js` imports** from Booking.jsx and ChatWidget.jsx — 10 minutes
3. **Remove card payment form** from Booking step 4 — 30 minutes  
4. **Add `<a href="tel:...">` and `<a href="mailto:...">`** in Footer — 10 minutes
5. **Fix double `<h1>`** on Home page — 5 minutes
6. **Add social media links** to Footer — 20 minutes
7. **Rename Non.jpg.jpg** — 5 minutes

---

## Appendix: Files Reviewed

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | 140 | HTML shell, meta tags, JSON-LD schemas |
| `src/main.jsx` | 52 | App entry, error boundary |
| `src/App.jsx` | 41 | Route definitions, layout shell |
| `src/index.css` | 520 | Design system, animations, accessibility |
| `src/config.js` | 110 | Studio data, services, gallery, testimonials |
| `src/components/Header.jsx` | 183 | Navigation, mobile menu |
| `src/components/Footer.jsx` | 94 | Site footer |
| `src/components/ChatWidget.jsx` | 254 | FAQ chatbot |
| `src/components/SEO.jsx` | 21 | Per-page meta tags |
| `src/pages/Home.jsx` | 683 | Home page (5 sections) |
| `src/pages/Booking.jsx` | 782 | Multi-step booking flow |
| `src/pages/Gallery.jsx` | 369 | Portfolio grid with filters |
| `src/pages/Consult.jsx` | 296 | AI consultation (mock) |
| `src/pages/Faq.jsx` | 379 | FAQ accordion with search |
| `src/emailSender.js` | 148 | Email via Resend (client-side) |
| `functions/api/book.js` | 292 | Cloudflare booking API |
| `functions/api/contact.js` | 98 | Cloudflare contact API |
| `public/_headers` | — | Cloudflare security headers |
| `public/_redirects` | — | SPA routing |
