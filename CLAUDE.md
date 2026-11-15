# ROSHAI website: build brief for Claude Code

This repository builds roshai.co, the public site of ROSHAI (Responsible Open-Source Human-Augmented Intelligence), an independent intelligence practice in the San Francisco Bay Area founded by David Schoeller-Diaz. Read this file in full before writing code.

## Scope for this build

One landing page plus one utility page. Nothing else.

- `/` : the landing page, eight sections in a single scroll.
- `/llm-info` : plain facts page for AI assistants, Paper theme.
- `/llms.txt` : plain-text mirror of `/llm-info`.
- `/404` : minimal, on-brand.

Do not add pages, a blog, a newsletter signup, a contact form, testimonials, client logos, counters or an "Ask AI" button row. These were considered and deliberately deferred. The URL structure must leave room for a later `/writing/<slug>` route without changing any existing URL.

## Stack

- Astro, static output, no client-side framework. Ship zero JavaScript unless a feature below requires it (none currently does).
- Plain CSS with custom properties. No Tailwind, no CSS-in-JS.
- Fonts self-hosted from npm (`@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono`, `@fontsource/saira`). Never load Google Fonts or any other font CDN at runtime.
- Hosting: Cloudflare Pages, build command `npm run build`, output directory `dist`.
- Node LTS. Keep dependencies to Astro, the three font packages and `@astrojs/sitemap`.

## Hard constraints

1. **No third-party requests at page load.** No analytics beacons, embeds, iframes, remote fonts, remote images or CDN scripts. The built HTML may contain outbound links (`<a href>`) to the booking page and LinkedIn only.
2. **No cookies, no localStorage.** The footer states this; keep it true.
3. **Booking is a plain link**, opening in a new tab with `rel="noopener noreferrer"`. Do not use Google's scheduling button script or iframe.
4. **Copy comes only from `content/landing.md` and `content/llm-info.md`.** Do not write, rephrase or add marketing copy. If a section needs words that are not in the content files, leave a visible `[COPY NEEDED]` marker and report it.
5. **Accessibility:** WCAG 2.2 AA. Text contrast at least 4.5:1 (3:1 at 24 px and above). Visible focus ring in `--focus`. Respect `prefers-reduced-motion`. One `h1` per page. Every image has meaningful alt text.
6. **Layout works from 360 px wide** with a 16 px side gutter and no horizontal scroll.

## Content files

`content/landing.md` and `content/llm-info.md` are final. Parse `landing.md` into typed data at build time (a small helper in `src/lib/content.ts`) and render from that data; do not paste copy into components.

Format of `landing.md`: each `## name` is one section, in page order: `hero`, `gap`, `offerings`, `method`, `principal`, `contact`, `footer`. `key: value` lines are single-line fields. A key with nothing after the colon (`body:`) owns the paragraphs that follow it. `### name` opens a repeated item (`offering`, `flywheel_step`, `commitment`). The `method` section carries `anchor: method`, so give that section `id="method"`; the hero's secondary link points to it. Flywheel steps carry `kind: machine` or `kind: human`, which sets the node color.

There is no Publications section at launch. Do not build one; the layout must simply make room for adding it between `method` and `principal` later (render it only if `content/publications.json` exists and is non-empty).

`llm-info.md` is ordinary Markdown. Render it as the body of `/llm-info` and copy it verbatim to `/llms.txt`.

## Brand tokens

Source of truth: the ROSHAI design system. Use these exact values. Define them once in `src/styles/tokens.css`.

```css
:root {
  /* palette */
  --violet: #2d0196;
  --aqua: #10ffe2;
  --periwinkle: #4c5fd1;
  --periwinkle-light: #8e9bf2;
  --tangerine: #ffa168;
  --deep-violet: #1c0a5c;
  --ink: #12062e;
  --paper: #f6f5fb;
  --graphite: #3c3c3b;
  --lavender: #c9c3ef;
  --muted: #5b5678;

  /* semantic, Violet theme (landing page) */
  --surface: var(--violet);
  --surface-raised: var(--deep-violet);
  --surface-sunken: var(--ink);
  --text: var(--paper);
  --text-muted: var(--lavender);
  --heading: var(--aqua);
  --line: var(--periwinkle-light);
  --machine: var(--periwinkle-light);
  --human: var(--tangerine);
  --on-human: var(--ink);
  --focus: var(--aqua);

  /* spacing */
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px; --space-32: 128px;

  /* radius and strokes */
  --radius-sm: 4px; --radius-md: 12px; --radius-lg: 24px;
  --stroke-hairline: 1px; --stroke-inline: 3px; --stroke-connector: 4px;
}

/* Paper theme, used on /llm-info */
[data-theme="paper"] {
  --surface: var(--paper);
  --surface-raised: #ffffff;
  --surface-sunken: #edebf7;
  --text: var(--graphite);
  --text-muted: var(--muted);
  --heading: var(--violet);
  --line: var(--periwinkle);
  --machine: var(--periwinkle);
  --focus: var(--violet);
}
```

The landing page is Violet theme only. Do not add a light-mode switch for it.

### Color rules

- Aqua is for display headings, the wordmark and key figures on dark grounds. Never on white or paper.
- **Tangerine means a human.** Use it only for the human step in the flywheel diagram. Never decorative, never a button color.
- Periwinkle is never body text on violet. Use `--periwinkle-light` for lines on violet.
- `deep-violet` panels on the violet ground need a `--line` outline, because the two violets are close in value.
- No gradients, glows, glass effects or shadows.

## Typography

| Role | Family | Use |
| --- | --- | --- |
| Display | `"Sporty Pro", Saira, "Arial Black", sans-serif`, weight 800 | Headline, section headings |
| Text | `"IBM Plex Sans", Helvetica, Arial, sans-serif`, 400/500/600 | All readable text |
| Data | `"IBM Plex Mono", ui-monospace, Menlo, monospace`, 400/500 | Eyebrows, audience labels, captions |

- Sporty Pro is licensed and not yet in the repo. Build with Saira 800 as the display face. When `public/fonts/SportyPro-Black.woff2` appears, add the `@font-face` and nothing else changes.
- Eyebrows: uppercase Plex Mono, 14 px, letter-spacing 0.16em, `--text-muted`.
- Web scale: hero headline `clamp(40px, 7vw, 72px)`; section headings `clamp(28px, 4.5vw, 44px)`; body 16 px / 26 px; small 13 px / 20 px. Display text never below 20 px.
- Measure for body text: 60 to 72 characters.

## Shape language

- Content sits in flush stacked blocks: narrower above, wider below, echoing the stacked R / OS / HAI logo.
- Corners: `--radius-sm` for buttons and tags, `--radius-md` for cards, `--radius-lg` for the headshot frame.
- The inline stroke (a 3 px inset outline in `--line`) may frame one element on the whole page, the hero or the method diagram, not both.
- Subtle HUD detail is allowed at the edges of the hero only: thin `--line` corner ticks or a mono coordinate-style label. Keep it quiet. The data-interface banner style belongs on covers, never behind body text.

## Section specs

**Hero.** Logo (`roshai-mark-aqua-transparent.png`) top-left at 64 px width, 48 px minimum, with clear space equal to the R's height. Eyebrow, `h1` headline in `--heading`, positioning line in `--text`, primary button (aqua fill, ink text, `--radius-sm`), secondary text link.

**Offerings.** Three cards stacked on mobile, three across from 960 px. Card: `--surface-raised`, `--line` outline, audience label in mono above the card title. No icons.

**Method.** Inline SVG of the Cognitive Elevation Flywheel: four nodes on a ring, ring and arrows in `--line` at `--stroke-connector`, machine nodes outlined and labelled in `--machine`, the human node ("Elevate judgment") filled `--human` with `--on-human` text. Labels are real `<text>` in Plex Sans, at least 14 px. Give the SVG `role="img"` and an `aria-label` that names the four steps in order. No animation. Three commitment blocks beside the diagram from 960 px, below it on mobile.

**Publications.** Hidden unless `content/publications.json` lists at least one item `{ title, summary, pdf, date }`. PDFs live in `public/publications/`.

**Principal.** Headshot from `public/images/principal.jpg` (already cropped to 800 px square and compressed to about 63 KB; display at up to 400 px and let Astro's image pipeline emit AVIF and WebP; keep the JPEG as fallback). Name as heading, title in mono, bio paragraphs.

**Contact.** Heading, one paragraph, primary booking button, LinkedIn text link.

**Footer.** Two lines from the content file, link to `/llm-info`. Small type, `--text-muted`.

## Metadata

- `<title>`: "ROSHAI · Human-Augmented Intelligence"
- Meta description: the positioning line from the hero.
- Open Graph and Twitter card with `public/og.png` (1200 x 630, violet ground, aqua solid mark, the headline in display type). Generate it once at build time or commit a static file.
- Canonical URL `https://roshai.co/`.
- JSON-LD on `/`: an `Organization` (name, alternateName, url, logo, sameAs LinkedIn, founder) and a `Person` for the founder with `jobTitle` "Founder and Principal Analyst". Facts only from the content files.
- Favicon and apple-touch-icon from `roshai-mark-solid-on-violet.png` (resize with Astro's image pipeline or `sharp`; 32, 180 and 512 px).
- `robots.txt` allowing all, pointing to the sitemap. `llms.txt` at root.

## Distinctiveness check

ROSHAI must not resemble the site of any firm David has worked with. Before calling the build finished, confirm none of the following is present: dark navy grounds, gold or amber accents, serif display type, an all-services grid of five or more items, a press-logo strip, or "peace of mind" style reassurance copy.

## Writing rules for any text you are allowed to generate

These cover alt text, aria labels, the 404 page and code comments that render.

- ROSHAI is "it", never "we".
- Say "human-augmented". Never "human-in-the-loop".
- Say "online record", not "public record".
- No em dashes, no emoji, no hype words (revolutionize, unlock, seamless, cutting-edge, game-changer).
- Never name clients or engagements.

## Acceptance checks (run before reporting done)

1. `npm run build` succeeds with no warnings.
2. `grep -rEo 'https?://[^"'"'"' )]+' dist | sort -u` lists only roshai.co, calendar.app.google, linkedin.com and schema.org.
3. `grep -rn '—' content dist` returns nothing.
4. Lighthouse on `/` (mobile): Performance, Accessibility, Best Practices and SEO all at 95 or above.
5. Page weight for `/` under 500 KB including fonts and the headshot.
6. Keyboard-only pass: every link and button reachable, focus ring visible on violet.
7. Visual check at 360, 768 and 1440 px wide.

Report results as a short list. Flag any `[COPY NEEDED]` markers left in the build.

## Deployment (David runs these; do not attempt without being asked)

1. Push to a private GitHub repo.
2. Cloudflare Pages: connect the repo, build `npm run build`, output `dist`.
3. Custom domain: roshai.co (apex) and www.roshai.co, www redirecting to apex.
4. roshai.net: add to Cloudflare, then a Redirect Rule sending every path to `https://roshai.co` with a 301, preserving the path.
5. Traffic: use Cloudflare's server-side zone analytics. Do not enable the Web Analytics JavaScript beacon, which would break constraint 1.

## Assets (all supplied, in `public/`)

| File | Use |
| --- | --- |
| `images/principal.jpg` | Principal headshot, 800 x 800, about 63 KB. Do not re-crop. |
| `brand/roshai-mark-aqua-transparent.png` | Header and hero mark on the violet ground. |
| `brand/roshai-mark-solid-on-violet.png` | Favicon, apple-touch-icon and the Open Graph image. |
| `brand/roshai-mark-violet-transparent.png` | `/llm-info` (Paper theme) header. |
| `brand/roshai-mark-inline-on-violet.png` | Optional hero moment at 200 px or wider only; the inline detail clogs when small. Not required. |

The logos are 1600 x 1600 PNGs, not SVGs. Use them as supplied: scale them down with CSS or the image pipeline, never redraw, trace, recolor or approximate them. Always set explicit `width` and `height`.

`public/fonts/SportyPro-Black.woff2` is not supplied yet. Build with Saira 800 for display type.
