Build the first mock of roshai.co in this folder.

Read CLAUDE.md first and follow it. Every input it refers to is already in place: `content/landing.md`, `content/llm-info.md`, `public/images/principal.jpg` and the four logo PNGs under `public/brand/`. The copy is final, so do not write, rephrase or add any. If you find a spot with no copy, leave a visible `[COPY NEEDED]` marker and list it in your report.

Do this, in order:

1. Scaffold an Astro project here (static output). Keep CLAUDE.md, `content/` and `public/` exactly where they are. Add only the dependencies CLAUDE.md allows.
2. Write `src/styles/tokens.css` from the token block in CLAUDE.md, then build the landing page at `/` from `content/landing.md`: hero, gap, offerings, method with the inline SVG flywheel, principal, contact, footer. There is no Publications section.
3. Build `/llm-info` (Paper theme) from `content/llm-info.md`, `/llms.txt` as its verbatim copy, a minimal on-brand 404, `robots.txt`, a sitemap, favicon files from the solid mark, and the metadata and JSON-LD CLAUDE.md specifies. Generate `public/og.png` (1200 x 630) from the solid mark and the headline.
4. Run `npm run build`, then every acceptance check in CLAUDE.md, and fix what fails.
5. Start the dev server and screenshot `/` at 360, 768 and 1440 px wide. Look at each screenshot and correct any layout problem before reporting.
6. Initialize a local git repository and make one commit. Do not create a remote, push or deploy.

Report back with: the preview address, the acceptance results as a short list, any `[COPY NEEDED]` markers, and anything in CLAUDE.md you could not satisfy and why. Ask a question only if you are blocked.
