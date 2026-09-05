# Violeta Horn Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (ES/EN), cinematic "Noir editorial" portfolio website for actress & model Violeta Horn, deployable to Vercel.

**Architecture:** Next.js 15 App Router with locale-segment routing (`/es`, `/en`). A single immersive scroll home composed of section components, plus a full-gallery page. All copy lives in `messages/{locale}.json`; structured data (links, stats, timeline) lives in typed modules under `src/content/`. Components are presentational and read from these sources — no hardcoded copy. Framer Motion drives subtle scroll reveals; `next/image` optimizes photos.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, next-intl, Vitest (unit tests), next/image, YouTube facade embed.

**Spec:** `docs/superpowers/specs/2026-09-04-violeta-horn-portfolio-design.md`

## Global Constraints

- Node 18+; Next.js 15 (App Router); TypeScript strict mode on.
- Locales: exactly `es` and `en`. Default/fallback: `es`. Every user-facing string exists in **both** `messages/es.json` and `messages/en.json` with identical key sets.
- No hardcoded user-facing copy in components — read from next-intl messages or `src/content/*`.
- Palette tokens (verbatim): background `#0a0a0a`, off-white `#f4f2ee`, carbón `#141414`, muted `#8a8a8a`. No accent color.
- Fonts: Playfair Display (display/headings), Inter (body/UI).
- WhatsApp number (verbatim): `5493442571976`.
- Respect `prefers-reduced-motion`: all Framer Motion reveals must degrade to no-motion.
- Assets are already present at `Contenido Audiovisual/` (9 JPEG photos + `VIOLETA HORN - REEL.mp4`, ~120 MB). No comp-card/CV PDFs exist.
- **Decisions (override the original spec):** (a) Reel is **self-hosted** from the MP4 (not a YouTube embed). (b) **No PDF downloads** — comp card and CV are shown on-page only. (c) Portfolio is a **single curated gallery**, no category filter tabs.
- All external links verbatim from the spec §1.

---

## File Structure

```
package.json, tsconfig.json, next.config.ts, tailwind.config.ts, postcss.config.mjs, vitest.config.ts
src/
  middleware.ts                 # next-intl locale routing
  i18n/
    routing.ts                  # locales, defaultLocale, Link/navigation helpers
    request.ts                  # per-request message loading
  app/
    layout.tsx                  # <html>, fonts, global metadata
    globals.css                 # Tailwind + design tokens
    [locale]/
      layout.tsx                # NextIntlClientProvider, Nav, Footer, per-locale metadata
      page.tsx                  # home: composes section components in order
      portfolio/page.tsx        # full gallery page
  components/
    Nav.tsx, Footer.tsx, LangSwitcher.tsx
    Reveal.tsx                  # Framer Motion scroll-reveal wrapper (reduced-motion aware)
    sections/
      Hero.tsx, Reel.tsx, About.tsx, Stats.tsx, PortfolioPreview.tsx, ActingCV.tsx, Contact.tsx
    gallery/
      Gallery.tsx, Lightbox.tsx
    YouTubeFacade.tsx
  content/
    profile.ts                  # links, whatsapp, stats values, reel id, timeline (locale-neutral + {es,en} fields)
    gallery.ts                  # Photo[] with category + dimensions
  lib/
    whatsapp.ts                 # buildWhatsAppUrl()
messages/
  es.json, en.json
public/
  portfolio/                    # optimized photos (placeholders until Task 12)
  docs/                         # comp-card.pdf, cv.pdf (placeholders until Task 12)
  og/                           # open-graph preview images
tests/
  content.test.ts, whatsapp.test.ts, gallery.test.ts
```

---

### Task 1: Project scaffold, tooling, and design tokens

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `vitest.config.ts`, `.gitignore`
- Create: `src/app/layout.tsx`, `src/app/globals.css`
- Create: `tests/smoke.test.ts`

**Interfaces:**
- Produces: a running Next.js app; Tailwind with design tokens exposed as CSS variables (`--bg`, `--fg`, `--carbon`, `--muted`) and Tailwind colors (`bg`, `fg`, `carbon`, `muted`); Vitest configured with `npm test`.

- [ ] **Step 1: Scaffold the app**

```bash
npx create-next-app@latest . --ts --tailwind --app --src-dir --import-alias "@/*" --no-eslint --use-npm --yes
npm install framer-motion next-intl
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Add `.gitignore` entries and init git**

Append to `.gitignore`:
```
.superpowers/
contenido audiovisual/
```

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js app"
```

- [ ] **Step 3: Configure design tokens in `src/app/globals.css`**

Replace the color layer with tokens (keep Tailwind's `@tailwind` directives):
```css
:root{
  --bg:#0a0a0a; --fg:#f4f2ee; --carbon:#141414; --muted:#8a8a8a;
}
html,body{background:var(--bg);color:var(--fg);}
body{font-family:var(--font-inter),system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
h1,h2,h3,.display{font-family:var(--font-playfair),Georgia,serif;}
```

- [ ] **Step 4: Map tokens in `tailwind.config.ts`**

```ts
theme:{ extend:{ colors:{ bg:'var(--bg)', fg:'var(--fg)', carbon:'var(--carbon)', muted:'var(--muted)' } } }
```

- [ ] **Step 5: Load fonts in `src/app/layout.tsx`**

```tsx
import { Playfair_Display, Inter } from 'next/font/google';
const playfair = Playfair_Display({ subsets:['latin'], variable:'--font-playfair', display:'swap' });
const inter = Inter({ subsets:['latin'], variable:'--font-inter', display:'swap' });
export default function RootLayout({ children }:{ children:React.ReactNode }){
  return (<html><body className={`${playfair.variable} ${inter.variable}`}>{children}</body></html>);
}
```

- [ ] **Step 6: Configure Vitest (`vitest.config.ts`) and add test script**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins:[react()], test:{ environment:'jsdom', globals:true } });
```
Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 7: Write smoke test `tests/smoke.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
describe('tooling', () => { it('runs', () => { expect(1 + 1).toBe(2); }); });
```

- [ ] **Step 8: Run tests and build**

Run: `npm test` → Expected: PASS. Then `npm run build` → Expected: succeeds.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "chore: design tokens, fonts, vitest"
```

---

### Task 2: i18n routing and content model

**Files:**
- Create: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/middleware.ts`
- Create: `messages/es.json`, `messages/en.json`
- Create: `src/content/profile.ts`
- Modify: `next.config.ts` (wrap with next-intl plugin)
- Create: `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`
- Create: `tests/content.test.ts`

**Interfaces:**
- Produces:
  - `routing` from `src/i18n/routing.ts`: `locales = ['es','en'] as const`, `defaultLocale = 'es'`, plus `Link`, `redirect`, `usePathname`, `useRouter` via `createNavigation(routing)`.
  - `src/content/profile.ts` exporting:
    ```ts
    export const profile = {
      name: 'Violeta Horn',
      whatsapp: '5493442571976',
      reelYoutubeId: 'vG922zPjxS0',
      socials: {
        instagram: 'https://www.instagram.com/violehorn/',
        tiktok: 'https://www.tiktok.com/@violehorn',
        youtube: 'https://www.youtube.com/@violetahorn',
        behance: 'https://www.behance.net/violetahorn',
      },
      stats: { heightCm:170, bust:95, waist:70, hips:105, top:'S–M', pants:'38', shoes:'39' },
      representation: { audiovisual:'Club Semillas' },
      training: [
        { period:'2019–2022', role:{es:'Taller de teatro',en:'Theatre workshop'}, place:'Las Yotivenco' },
        { period:'2022–2023', role:{es:'Actuación',en:'Acting'}, place:'Virginia Landi · Actuartestudio' },
        { period:'2022–2024', role:{es:'Actuación frente a cámara',en:'On-camera acting'}, place:'Leonel Armeri' },
        { period:'2024–2025', role:{es:'Improvisación',en:'Improvisation'}, place:'Franca Boletta · Espacio Hamas' },
        { period:'2025', role:{es:'Intensivo actuación frente a cámara',en:'On-camera acting intensive'}, place:'Leonel Armeri' },
      ],
    } as const;
    ```
  - `messages/{locale}.json` with top-level keys: `nav`, `hero`, `reel`, `about`, `stats`, `portfolio`, `acting`, `contact`, `footer`, `meta`.

- [ ] **Step 1: Write failing content-integrity test `tests/content.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import es from '../messages/es.json';
import en from '../messages/en.json';
function keys(o:Record<string,unknown>,p=''):string[]{
  return Object.entries(o).flatMap(([k,v])=>{
    const key=p?`${p}.${k}`:k;
    return v&&typeof v==='object'&&!Array.isArray(v)?keys(v as Record<string,unknown>,key):[key];
  });
}
describe('i18n messages', () => {
  it('es and en have identical key sets', () => {
    expect(keys(es as any).sort()).toEqual(keys(en as any).sort());
  });
  it('no empty strings', () => {
    const flat=(o:any):string[]=>Object.values(o).flatMap(v=>typeof v==='string'?[v]:v&&typeof v==='object'?flat(v):[]);
    expect(flat(es).every(s=>s.trim().length>0)).toBe(true);
    expect(flat(en).every(s=>s.trim().length>0)).toBe(true);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- content` → Expected: FAIL (message files do not exist yet).

- [ ] **Step 3: Create routing and request config**

`src/i18n/routing.ts`:
```ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
export const routing = defineRouting({ locales:['es','en'], defaultLocale:'es' });
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
```
`src/i18n/request.ts`:
```ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) locale = routing.defaultLocale;
  return { locale, messages: (await import(`../../messages/${locale}.json`)).default };
});
```
`src/middleware.ts`:
```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
export default createMiddleware(routing);
export const config = { matcher: ['/', '/(es|en)/:path*'] };
```

- [ ] **Step 4: Wrap `next.config.ts` with the plugin**

```ts
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withNextIntl({});
```

- [ ] **Step 5: Author `messages/es.json` and `messages/en.json`**

Create both with identical keys. ES content (EN mirrors, translated):
```json
{
  "nav": { "reel":"Reel", "about":"Sobre mí", "portfolio":"Portfolio", "acting":"Actriz", "contact":"Contacto" },
  "hero": { "tagline":"Actriz & Modelo · Buenos Aires", "watchReel":"Ver reel", "whatsapp":"WhatsApp" },
  "reel": { "title":"Reel", "play":"Reproducir" },
  "about": { "title":"Sobre mí", "body":"Tengo 21 años. Estudio la Licenciatura en Artes Escénicas y el Traductorado Público en UADE (CABA). Tomo clases de danza contemporánea, jazz y urbano, y soy nivel intermedio-avanzado en acrobacia." },
  "stats": { "title":"Ficha técnica", "height":"Altura", "measures":"Medidas", "top":"Remera", "pants":"Pantalón", "shoes":"Calzado", "hair":"Pelo", "eyes":"Ojos", "hairValue":"Castaño", "eyesValue":"Negros", "representation":"Representación (audiovisual)", "downloadCard":"Descargar comp card" },
  "portfolio": { "title":"Portfolio", "all":"Todo", "moda":"Moda", "beauty":"Beauty", "comercial":"Comercial", "editorial":"Editorial", "viewAll":"Ver galería completa" },
  "acting": { "title":"Actriz", "creditsTitle":"Créditos", "credits":"Cortos universitarios", "trainingTitle":"Formación", "skillsTitle":"Skills", "skills":"Español · Inglés · Danza contemporánea · Jazz · Urbano · Acrobacia de piso (intermedio-avanzado) · Carnet náutico · Carnet de auto", "downloadCV":"Descargar CV" },
  "contact": { "title":"Contacto", "lead":"¿Trabajamos juntos?", "whatsapp":"Escribime por WhatsApp", "prefill":"Hola Violeta, te contacto desde tu web." },
  "footer": { "rights":"Todos los derechos reservados" },
  "meta": { "title":"Violeta Horn — Actriz & Modelo", "description":"Portfolio de Violeta Horn, actriz y modelo con base en Buenos Aires. Reel, book de fotos, ficha técnica y contacto." }
}
```

- [ ] **Step 6: Create `src/content/profile.ts`** with the exact object from Interfaces.

- [ ] **Step 7: Create `src/app/[locale]/layout.tsx` and a minimal `page.tsx`**

`[locale]/layout.tsx`:
```tsx
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
export function generateStaticParams(){ return routing.locales.map(locale=>({locale})); }
export default async function LocaleLayout({ children, params }:{ children:React.ReactNode; params:Promise<{locale:string}> }){
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
```
`[locale]/page.tsx` (temporary, replaced in later tasks):
```tsx
import { useTranslations } from 'next-intl';
export default function Home(){ const t=useTranslations('hero'); return <main><h1>{t('tagline')}</h1></main>; }
```
Delete the default `src/app/page.tsx` if present.

- [ ] **Step 8: Run tests and dev server**

Run: `npm test -- content` → Expected: PASS. Run `npm run build` → Expected: succeeds; `/es` and `/en` generated.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: i18n routing, messages, profile content model"
```

---

### Task 3: Layout shell — Nav, LangSwitcher, Footer

**Files:**
- Create: `src/components/Nav.tsx`, `src/components/LangSwitcher.tsx`, `src/components/Footer.tsx`
- Modify: `src/app/[locale]/layout.tsx` (mount Nav + Footer)

**Interfaces:**
- Consumes: `useTranslations('nav'|'footer')`, `Link`/`usePathname`/`useRouter` from `@/i18n/routing`, `profile.name`.
- Produces: `<Nav/>`, `<Footer/>` rendered on every locale page; anchor links to `#reel`, `#about`, `#portfolio`, `#acting`, `#contact`.

- [ ] **Step 1: Build `LangSwitcher.tsx`**

```tsx
'use client';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
export default function LangSwitcher(){
  const locale=useLocale(); const pathname=usePathname(); const router=useRouter();
  const other = locale==='es'?'en':'es';
  return <button aria-label="Change language" onClick={()=>router.replace(pathname,{locale:other})} className="text-sm tracking-widest uppercase">{locale.toUpperCase()} / {other.toUpperCase()}</button>;
}
```

- [ ] **Step 2: Build `Nav.tsx`** — fixed top bar, brand initials `VH` linking to `#top`, anchor links from `nav` messages, `LangSwitcher`, and a mobile hamburger toggling a full-screen overlay menu. Use `useState` for the mobile menu; close on link click. Keyboard accessible (`button` elements, `aria-expanded`).

- [ ] **Step 3: Build `Footer.tsx`** — `profile.name`, social icon links (open in new tab, `rel="noopener"`), `© {year} · {footer.rights}`.

- [ ] **Step 4: Mount in `[locale]/layout.tsx`** — wrap children with `<Nav/>` above and `<Footer/>` below inside the provider.

- [ ] **Step 5: Verify**

Run `npm run build` → Expected: succeeds. Visual check (browser, mobile + desktop): nav fixed, lang switch flips `/es`↔`/en` preserving scroll target, hamburger opens/closes.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: nav, language switcher, footer"
```

---

### Task 4: WhatsApp link builder (utility + unit test)

**Files:**
- Create: `src/lib/whatsapp.ts`, `tests/whatsapp.test.ts`

**Interfaces:**
- Produces: `buildWhatsAppUrl(phone: string, message?: string): string` → `https://wa.me/<phone>?text=<urlencoded>` (no `?text=` when message empty).

- [ ] **Step 1: Write failing test `tests/whatsapp.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { buildWhatsAppUrl } from '../src/lib/whatsapp';
describe('buildWhatsAppUrl', () => {
  it('builds a wa.me url with encoded message', () => {
    expect(buildWhatsAppUrl('5493442571976','Hola Violeta'))
      .toBe('https://wa.me/5493442571976?text=Hola%20Violeta');
  });
  it('omits text when message is empty', () => {
    expect(buildWhatsAppUrl('5493442571976')).toBe('https://wa.me/5493442571976');
  });
});
```

- [ ] **Step 2: Run to verify it fails** — Run: `npm test -- whatsapp` → Expected: FAIL (module not found).

- [ ] **Step 3: Implement `src/lib/whatsapp.ts`**

```ts
export function buildWhatsAppUrl(phone: string, message = ''): string {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
```

- [ ] **Step 4: Run to verify it passes** — Run: `npm test -- whatsapp` → Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: whatsapp url builder"
```

---

### Task 5: Reveal wrapper + Hero section

**Files:**
- Create: `src/components/Reveal.tsx`, `src/components/sections/Hero.tsx`
- Modify: `src/app/[locale]/page.tsx` (render `<Hero/>`)

**Interfaces:**
- Produces:
  - `Reveal`: `({children, delay?}:{children:React.ReactNode; delay?:number}) => JSX` — fades/slides in on scroll; renders statically (no transform) when `prefers-reduced-motion: reduce`.
  - `<Hero/>`: full-viewport section `id="top"`, background image (placeholder `public/portfolio/hero.jpg`) with dark gradient overlay, `profile.name` in Playfair, `hero.tagline`, CTAs "Ver reel" (anchor `#reel`) and "WhatsApp" (`buildWhatsAppUrl(profile.whatsapp, t('prefill from contact'))`).

- [ ] **Step 1: Build `Reveal.tsx`**

```tsx
'use client';
import { motion, useReducedMotion } from 'framer-motion';
export default function Reveal({ children, delay=0 }:{ children:React.ReactNode; delay?:number }){
  const reduce=useReducedMotion();
  if(reduce) return <>{children}</>;
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-10%'}} transition={{duration:.7,delay,ease:[0.22,1,0.36,1]}}>{children}</motion.div>;
}
```

- [ ] **Step 2: Build `Hero.tsx`** — `next/image` with `fill`, `priority`, `object-cover`, plus a `bg-gradient-to-r from-black/80` overlay; centered/left-aligned content; CTAs as described. Add a subtle scroll-cue chevron at the bottom.

- [ ] **Step 3: Add a placeholder hero image** at `public/portfolio/hero.jpg` (any 1920×1080 dark placeholder; replaced in Task 12).

- [ ] **Step 4: Render `<Hero/>` in `page.tsx`.**

- [ ] **Step 5: Verify** — `npm run build` succeeds; visual check desktop + mobile: hero fills viewport, text legible over image, CTAs work, reveal animates and is static under reduced-motion (toggle OS setting or emulate).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: reveal wrapper and hero section"
```

---

### Task 6: Self-hosted reel section (video facade)

**Files:**
- Create: `src/components/VideoFacade.tsx`, `src/components/sections/Reel.tsx`
- Create: `public/reel/reel.mp4` (from `Contenido Audiovisual/VIOLETA HORN - REEL.mp4`), `public/reel/reel-poster.jpg`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `useTranslations('reel')`.
- Produces:
  - `VideoFacade`: `({src, poster, title}:{src:string; poster:string; title:string})` — shows `poster` with a play button until first click; on click renders `<video src controls autoPlay preload="none">`. Keyboard-activatable (button). `preload="none"` so the ~120 MB file is NOT fetched until play.
  - `<Reel/>`: `id="reel"` section wrapping the facade in a cinematic 16:9 frame with `reel.title`.

- [ ] **Step 1: Place the video and generate a poster.** Copy the MP4 to `public/reel/reel.mp4`. If `ffmpeg` is available, also produce a compressed web version and a poster frame:

```bash
ffmpeg -y -i "Contenido Audiovisual/VIOLETA HORN - REEL.mp4" -vf "scale=-2:1080" -c:v libx264 -crf 24 -preset slow -c:a aac -b:a 128k -movflags +faststart public/reel/reel.mp4
ffmpeg -y -ss 00:00:02 -i public/reel/reel.mp4 -frames:v 1 -q:v 3 public/reel/reel-poster.jpg
```
If `ffmpeg` is absent, copy the MP4 as-is and export any single frame as `reel-poster.jpg`. (Compression is strongly recommended — 120 MB is heavy for web.)

- [ ] **Step 2: Build `VideoFacade.tsx`** — `'use client'`, `useState(playing)`; poster button until first click; `title`/`aria-label` for a11y.

- [ ] **Step 3: Build `Reel.tsx`** — centered max-width 16:9 frame, `Reveal`-wrapped, dark surround, `reel.title`.

- [ ] **Step 4: Render `<Reel/>` in `page.tsx`** after Hero.

- [ ] **Step 5: Verify** — build succeeds; poster shows; no request for `reel.mp4` before click (Network tab); click plays with controls.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: self-hosted reel section with video facade"
```

---

### Task 7: About section

**Files:**
- Create: `src/components/sections/About.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `useTranslations('about')`, placeholder image `public/portfolio/about.jpg`.
- Produces: `<About/>` `id="about"` — two-column on desktop (editorial portrait + bio), stacked on mobile.

- [ ] **Step 1: Build `About.tsx`** — `Reveal`-wrapped; `about.title` (Playfair), `about.body`; `next/image` portrait with grayscale hover→color transition.
- [ ] **Step 2: Add placeholder `public/portfolio/about.jpg`.**
- [ ] **Step 3: Render in `page.tsx`.**
- [ ] **Step 4: Verify** — build succeeds; responsive check; reveal + reduced-motion.
- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: about section"
```

---

### Task 8: Stats / ficha técnica (on-page, no download)

**Files:**
- Create: `src/components/sections/Stats.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `useTranslations('stats')`, `profile.stats`, `profile.representation.audiovisual`.
- Produces: `<Stats/>` — a definition grid of stat label/value pairs shown on-page. **No download button** (per decision (b)).

- [ ] **Step 1: Build `Stats.tsx`** — grid: Altura `1,70 m`, Medidas `95 · 70 · 105`, Remera `S–M`, Pantalón `38`, Calzado `39`, Pelo `t('hairValue')`, Ojos `t('eyesValue')`, Representación `Club Semillas`. Height formatted from `heightCm` as `1,70 m`. Do not render the `downloadCard` key.
- [ ] **Step 2: Render in `page.tsx`.**
- [ ] **Step 3: Verify** — build succeeds; values match spec §1; no download control present.
- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: stats/ficha técnica section"
```

---

### Task 9: Gallery data model, Portfolio preview, full gallery page + Lightbox

Single curated gallery — **no category filter** (per decision (c)).

**Files:**
- Create: `src/content/gallery.ts`, `tests/gallery.test.ts`
- Create: `src/components/gallery/Gallery.tsx`, `src/components/gallery/Lightbox.tsx`, `src/components/sections/PortfolioPreview.tsx`
- Create: `src/app/[locale]/portfolio/page.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Produces:
  - `src/content/gallery.ts`:
    ```ts
    export interface Photo { src:string; alt:string; width:number; height:number; }
    export const photos: Photo[]; // real photos from Contenido Audiovisual/, placed in Task 12
    ```
  - `Gallery`: `({photos}:{photos:Photo[]}) => JSX` — responsive masonry/grid; clicking a photo opens `Lightbox`.
  - `Lightbox`: `({photos, index, onClose}:{photos:Photo[]; index:number; onClose:()=>void}) => JSX` — full-screen overlay, next/prev, close on Esc/backdrop, focus-trapped, arrow-key navigation.
  - `PortfolioPreview`: `id="portfolio"` — a capped preview grid (up to 6) + "Ver galería completa" link to `/[locale]/portfolio`.

- [ ] **Step 1: Write failing test `tests/gallery.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { photos } from '../src/content/gallery';
describe('gallery data', () => {
  it('every photo has positive dimensions, alt text, and a public path', () => {
    expect(photos.length).toBeGreaterThan(0);
    for (const p of photos){
      expect(p.width).toBeGreaterThan(0);
      expect(p.height).toBeGreaterThan(0);
      expect(p.alt.trim().length).toBeGreaterThan(0);
      expect(p.src.startsWith('/')).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run to verify it fails** — Run: `npm test -- gallery` → Expected: FAIL (module not found).

- [ ] **Step 3: Create `src/content/gallery.ts`** with the `Photo` type and initial entries pointing at `/portfolio/*.jpg` (real filenames wired in Task 12), each with real `width`/`height` and descriptive `alt`.

- [ ] **Step 4: Run to verify it passes** — Run: `npm test -- gallery` → Expected: PASS.

- [ ] **Step 5: Build `Lightbox.tsx`** — `'use client'`, keyboard handlers (Esc close, ←/→ navigate), backdrop click closes, `role="dialog"` `aria-modal`, focus the close button on open, `next/image` with `sizes` for large view.

- [ ] **Step 6: Build `Gallery.tsx`** — grid of `next/image` thumbnails (grayscale→color on hover), opens Lightbox at clicked index.

- [ ] **Step 7: Build `PortfolioPreview.tsx`** — a capped preview (up to 6 photos) + "Ver galería completa" link. No category tabs.

- [ ] **Step 8: Build `[locale]/portfolio/page.tsx`** — full `Gallery` with all photos; per-locale metadata title.

- [ ] **Step 9: Render `<PortfolioPreview/>` in `page.tsx`.**

- [ ] **Step 10: Verify** — `npm test` all pass; `npm run build` succeeds; visual check: grid responsive, lightbox opens/navigates/closes via mouse and keyboard, `/es/portfolio` and `/en/portfolio` render.

- [ ] **Step 11: Commit**

```bash
git add -A && git commit -m "feat: gallery data, portfolio preview, full gallery, lightbox"
```

---

### Task 10: Acting / CV section (timeline, on-page)

**Files:**
- Create: `src/components/sections/ActingCV.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `useTranslations('acting')`, `profile.training` (with `role[locale]` + `place`), `useLocale()`.
- Produces: `<ActingCV/>` `id="acting"` — credits, a vertical training timeline (period · role · place), skills line. **No download button** (per decision (b)); do not render the `downloadCV` key.

- [ ] **Step 1: Build `ActingCV.tsx`** — `Reveal`-wrapped blocks; timeline maps `profile.training`, selecting `role[locale]`; skills from `acting.skills`.
- [ ] **Step 2: Render in `page.tsx`.**
- [ ] **Step 3: Verify** — build succeeds; timeline entries match spec §1 in both locales; no download control present.
- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: acting/cv timeline section"
```

---

### Task 11: Contact section + SEO/OG metadata

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Modify: `src/app/[locale]/page.tsx`, `src/app/[locale]/layout.tsx` (metadata), `src/app/layout.tsx` (base metadata)
- Create: `public/og/og.jpg` (placeholder 1200×630)

**Interfaces:**
- Consumes: `useTranslations('contact')`, `buildWhatsAppUrl`, `profile.whatsapp`, `profile.socials`.
- Produces: `<Contact/>` `id="contact"` — big WhatsApp CTA (prefilled `contact.prefill`) + social icon row; `generateMetadata` per locale using `meta` messages and OG image.

- [ ] **Step 1: Build `Contact.tsx`** — `contact.lead`, WhatsApp button via `buildWhatsAppUrl(profile.whatsapp, t('prefill'))` (`target="_blank"`, `rel="noopener"`), social icons.

- [ ] **Step 2: Add `generateMetadata` in `[locale]/layout.tsx`**

```tsx
import { getTranslations } from 'next-intl/server';
export async function generateMetadata({ params }:{ params:Promise<{locale:string}> }){
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace:'meta' });
  return { title:t('title'), description:t('description'),
    openGraph:{ title:t('title'), description:t('description'), images:['/og/og.jpg'], locale }, };
}
```

- [ ] **Step 3: Render `<Contact/>` in `page.tsx`** as the final section.

- [ ] **Step 4: Verify** — build succeeds; WhatsApp link resolves to `https://wa.me/5493442571976?text=...`; social links open correctly; OG tags present in page `<head>`.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: contact section and SEO/OG metadata"
```

---

### Task 12: Real asset integration

**Files:**
- Modify: `src/content/gallery.ts`, `public/portfolio/*`, `public/og/og.jpg`, hero/about images

**Interfaces:**
- Consumes: files in `Contenido Audiovisual/` (9 JPEGs + reel MP4 — reel handled in Task 6).
- Produces: real photos replacing placeholders, gallery entries with true dimensions and descriptive alt text.

- [ ] **Step 1: Inventory & measure** the 9 JPEGs in `Contenido Audiovisual/` — record each file's pixel dimensions (needed for `next/image`). Pick the strongest portrait for the Hero, a second for About.
- [ ] **Step 2: Optimize and place photos** into `public/portfolio/` (web-appropriate resolution ~2000px long edge; keep aspect ratios; sensible kebab-case filenames). Set `public/portfolio/hero.jpg` and `public/portfolio/about.jpg`.
- [ ] **Step 3: Update `src/content/gallery.ts`** with real filenames, true `width`/`height`, and descriptive `alt` text (e.g., "Violeta Horn — editorial retrato").
- [ ] **Step 4: Create `public/og/og.jpg`** (1200×630) cropped from a strong frame for social previews.
- [ ] **Step 5: Verify** — `npm test` (gallery test passes), `npm run build` succeeds, visual check of every section with real content, no layout shift from wrong dimensions.
- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: integrate real photos and og image"
```

---

### Task 13: Final verification pass + Vercel deploy

**Files:** none (config/deploy)

**Interfaces:**
- Produces: a live Vercel URL.

- [ ] **Step 1: Full test + build** — Run `npm test` (all pass) and `npm run build` (no errors/type warnings).
- [ ] **Step 2: Accessibility pass** — verify AA contrast on text over images, `alt` on all images, keyboard nav through Nav + Lightbox, `prefers-reduced-motion` disables reveals, focus visible.
- [ ] **Step 3: Cross-device visual pass** — mobile (375px), tablet (768px), desktop (1440px): no horizontal scroll, hero legible, gallery reflows, nav hamburger works.
- [ ] **Step 4: Link audit** — reel, Instagram, TikTok, YouTube, Behance, WhatsApp, comp card, CV all resolve.
- [ ] **Step 5: i18n audit** — `/es` and `/en` complete, switcher preserves location, no missing keys in console.
- [ ] **Step 6: Deploy to Vercel** — connect the git repo (or `vercel` CLI); confirm the production URL renders; note it for the client. Domain hookup deferred.
- [ ] **Step 7: Commit any config** and tag `v1`.

```bash
git add -A && git commit -m "chore: production verification and deploy config"
```

---

## Self-Review

**Spec coverage:**
- §1 profile/content → Tasks 2 (profile.ts, messages), 8 (stats), 10 (training/credits/skills), 11 (contact/socials). ✓
- §2 information architecture (8 sections + portfolio page + nav + routes) → Tasks 3, 5–11, 9 (portfolio page), 2 (routing). ✓
- §3 visual direction (palette, fonts, motion) → Task 1 (tokens/fonts), 5 (Reveal + reduced-motion). ✓
- §4 technical architecture (Next.js, Tailwind, Framer, next/image, next-intl, content model, reel facade, comp/CV, WhatsApp, OG, deploy) → Tasks 1, 2, 4, 6, 8, 10, 11, 13. ✓
- §5 errors/states (placeholders, blur, reel fallback) → Tasks 5, 6, 9, 12. ✓
- §6 testing (visual, build, a11y, links, i18n) → Task 13 + per-task verify steps. ✓
- §7 out-of-scope respected (no CMS/backend/blog). ✓

**Placeholder scan:** No "TBD/TODO"; the only deferrals (Task 12 assets, Vercel connect) are real external dependencies with concrete steps, not vague instructions.

**Type consistency:** `Photo`/`GalleryCategory`/`categories`/`photos` (Task 9) used consistently in Gallery/Lightbox/PortfolioPreview/portfolio page. `buildWhatsAppUrl(phone, message?)` (Task 4) used identically in Hero (Task 5) and Contact (Task 11). `profile` shape (Task 2) consumed with matching field names throughout. `Reveal({children, delay?})` (Task 5) reused consistently.
