# Plan: i18n Catalan (and later English) with SEO-friendly localization

## Goal
Translate the Cosmo Studio landing page to Catalan with a language selector in the navigation, SEO-friendly (per-locale URLs, canonical, hreflang). Default language stays Spanish (`es`). Phase 1: Catalan. Phase 2 (after verification): English.

## Current state (relevant facts)
- Single-page Vite + React SPA, no router. All sections rendered in `App.tsx` from `index.html` (lang="es").
- Static text lives inline in components and in data arrays: `Pricing.tsx` (`Planes`), `Testimonials.tsx`, `Reviews.tsx`, plus UI copy in `Header`, `Hero`, `ProblemSolution`, `Benefits`, `Contact` + `Form`, `Footer`, `WhatsAppButton`, `CookieConsent`.
- `Quiz.tsx` and `FinalCTA.tsx` are NOT mounted in `App.tsx` — excluded from this scope (FinalCTA excluded by user decision).
- `robots.txt` contains a `Sitemap:` line; `public/sitemap.xml` has a single URL.
- SEO meta in `index.html`: title/description/og/twitter/JSON-LD, all Spanish, `hreflang es` + `x-default` → `https://www.cosmostudio.es`.
- Deployed on Vercel (`public/` static + SPA), domain `https://www.cosmostudio.es` (www property in GSC).

## Architecture decisions (CONFIRMED by user)
1. **URL strategy: subdirectory locales** — user confirmed: `/` = Spanish, `/ca/` = Catalan, `/en/` = English (Phase 2). `/` = Spanish (default, canonical, unchanged URL), `/ca/` = Catalan, `/en/` = English (Phase 2). Rejected: subdomains (`ca.cosmostudio.es`) — extra DNS/SSL/GSC property; query-param/cookie locales — not SEO-friendly (Google sees one URL).
2. **Routing: path-based, full page load per locale.** On load, read locale from `window.location.pathname` (first segment `ca`/`en`); set `<html lang>`, title, meta, JSON-LD for that locale. Language switching navigates to the locale URL (full reload) — simplest robust way to keep unique canonical URLs and clean head per locale; no router dependency.
3. **Library: react-i18next** — user confirmed (new dependency accepted). (`i18next` + `react-i18next`). Standard, handles interpolation, plurals, namespaces, localStorage + `navigator.language` detection. Small dependency; well-documented. (Alternative considered: hand-rolled React context + JSON — zero deps but re-implements i18n features; not recommended.)
4. **Default + persistence:** stored choice in `localStorage` (`cosmo.lang`). First visit: `navigator.language` (e.g. `ca`/`ca-ES` → Catalan) only if it matches a supported locale; otherwise Spanish. No cookie needed (localStorage suffices; not a consent issue — no personal data).
5. **Selector:** in `Header` nav (desktop) and mobile menu: `ES | CAT` toggle, active language highlighted (e.g. petrol underline). Phase 2 adds `EN`. `aria-label` localized. Clicking navigates to the counterpart URL keeping the current section anchor (optional `#id` passthrough).
6. **Head/SEO per locale:** a small head manager sets `document.title`, `<html lang>`, meta description/og:*/twitter:* and `<link rel="canonical">` + `hreflang` alternates at init (before first paint via `main.tsx` bootstrap, synchronous).
7. **Canonical + hreflang matrix (Phase 1):**
   - `/`: `<link rel="alternate" hreflang="es" href="https://www.cosmostudio.es/">` (also `x-default` → home)
   - `/`: `<link rel="alternate" hreflang="ca" href="https://www.cosmostudio.es/ca/">`
   - `/ca/`: canonical → `https://www.cosmostudio.es/ca/`; alternates es→home, ca→self, x-default→home
   - Phase 2 adds `en` alternate on every URL.
8. **Sitemap:** two URLs (`/`, `/ca/`) with `<xhtml:link rel="alternate" hreflang>` annotations per sitemap protocol; Phase 2 adds `/en/`. Resubmit in GSC after deploy.
9. **Vercel SPA fallback:** add `vercel.json` rewrites: `/ca/:path*` (and later `/en/:path*`) → `/index.html`, so the SPA can serve each locale URL. Vite dev already falls back to `index.html` for unknown paths.

## Translation scope
- **Files to convert to keys:** `Header`, `Hero`, `ProblemSolution`, `Benefits`, `Pricing` (heading, intro, plan names/subtitles/features, prices, personal plan block, footer note), `Testimonials` (data arrays: client names/roles stay as proper nouns, texts translated), `Reviews`, `Contact`, `Form` (labels/placeholders/validation/button states), `Footer`, `WhatsAppButton` (label/aria), `CookieConsent` (text + buttons), `App` selectors if any.
- **Data arrays** (`Planes`, testimonials, reviews) move to locale JSON under keys; `Pricing` feature lists are plain keys per item.
- **index.html equivalents per locale:** `lang`, title, meta description, og:title/og:description, twitter:title/twitter:description, JSON-LD `name`/`description` (keep address/vat/phone as-is).
- **NOT translated:** `Quiz.tsx`, `FinalCTA.tsx` (unmounted; user excluded FinalCTA), pixel/tracking scripts, image files, `logo.jpg`, favicons.
- Price strings: keep the same format in Catalan ("A partir de 250 €/mes" → "A partir de 250 €/mes"); Catalan commercial style uses the same separator; confirm at copy review.

## File structure (proposed)
```
vercel.json                    # SPA rewrites for /ca/, /en/
src/i18n/i18n.ts               # i18next init: resources, lng from path, fallbackLng 'es'
src/i18n/locales/es.json       # Spanish (source of truth, current copy)
src/i18n/locales/ca.json       # Catalan
src/i18n/locales/en.json       # English (Phase 2)
src/i18n/head.ts               # per-locale head manager (html lang, title, meta, canonical, hreflang)
src/utils/locale.ts            # path<->locale helpers, selector navigation
```
Components use `useTranslation()` / `t()`; head manager called once in `main.tsx` before `createRoot`.

## Implementation phases
- **Phase 1 — Infrastructure + Catalan:**
  1. Add react-i18next deps; create `i18n.ts`, `locales/es.json` (extract all current strings), `head.ts`, `locale.ts`, `vercel.json`.
  2. Replace hardcoded strings in all in-scope components with `t()` keys.
  3. Create `locales/ca.json` (translated copy).
  4. Wire selector in `Header` (desktop + mobile), persistence, first-visit detection.
  5. Head manager + canonical/hreflang per locale; sitemap with 2 URLs + hreflang annotations.
  6. Verify: build, preview both locales (dev + Vercel preview), URL behavior, head correctness.
- **Phase 2 — English (DONE, commit 331715b):** `en.json` added, `/en/` route + rewrites + hreflang (es↔ca↔en, x-default→/) + 3-URL sitemap; alternates registered on every canonical. RDD-approved.

## Verification
- `npm run build` OK; both locale URLs resolve on preview (`/` and `/ca/`).
- Head per URL: correct `lang`, title, description, og/twitter, canonical self-reference, both hreflang alternates present and symmetric.
- Selector persists choice across reloads; switching changes URL.
- `sitemap.xml` valid XML with 2 URLs + xhtml hreflang links.
- After deploy: submit sitemap in GSC, request indexing for `/` and `/ca/`.
- Visual QA by user: navigate both languages, check plans/forms/reviews text.

## SEO risks & mitigations
- **Duplicate content:** each locale is a unique URL with self canonical + hreflang pairs — resolved.
- **Google re-crawl latency:** resubmit sitemap + URL Inspection re-index after deploy; keep `/` unchanged to protect current rankings.
- **JS-rendered head:** Googlebot renders JS, but to be safest the head manager must run synchronously at bootstrap (before first render) so title/meta/canonical are present in the rendered DOM.
- **x-default:** always points to Spanish home; `hreflang` pairs are bidirectional (validate with tooling).
- **Lag between phases:** until Phase 2, no `en` alternate exists anywhere — no broken references.

## Out of scope (noted for the user)
- Quiz and FinalCTA translation/mounting.
- Twitter/social `sameAs` (dropped by user request).
- Full SSR/SSG prerender per locale (possible future enhancement if SEO head robustness becomes critical).