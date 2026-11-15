# ROSHAI web v1: start here

This folder is a complete input kit for the first mock of roshai.co, built with Claude Code. Nothing else is needed to start.

## What is in it

```
ROSHAI_Web_v1_Kit/
  00_START-HERE.md                  this file
  01_PROMPT-for-Claude-Code.md      the prompt to paste
  CLAUDE.md                         build brief (Claude Code reads it automatically)
  content/
    landing.md                      final landing page copy, structured
    llm-info.md                     final /llm-info copy
  public/
    images/principal.jpg            headshot, 800 x 800, about 63 KB
    brand/
      roshai-mark-aqua-transparent.png      header and hero mark (violet ground)
      roshai-mark-solid-on-violet.png       favicon and social image
      roshai-mark-violet-transparent.png    /llm-info header (paper ground)
      roshai-mark-inline-on-violet.png      optional, large display only
```

File names inside `content/` and `public/` are fixed by the brief. Do not rename them.

## Steps (about 5 minutes of your time)

1. Rename the folder to `roshai-site` and move it out of Downloads, for example to `~/Documents/roshai-site`.
2. In Terminal: `cd ~/Documents/roshai-site`, then `node -v` (any current LTS, 20 or newer, is fine).
3. Run `claude` in that folder.
4. Paste the prompt from `01_PROMPT-for-Claude-Code.md`.
5. When it reports, open the local preview address it prints and check the page at phone and laptop widths.

## Decisions already made for the mock

- Single landing page, plus `/llm-info`, `/llms.txt` and a 404. No other pages.
- Publications section left out until the first PDF exists.
- Booking is a plain link to your Google Calendar page.
- Southern Command stays named in the bio (your facts file allows either; change one phrase in `content/landing.md` to genericize it).
- Two lines on `/llm-info` that were still unconfirmed ("not legal advice", "no partisan work") were dropped rather than published unconfirmed.
- The unverified "Founded 2025" row was removed from `/llm-info`.

## Known limits of the first mock

- Display type is Saira until the licensed Sporty Pro files exist.
- Logos are PNG files, supplied at 1600 px. SVG versions would be sharper at large sizes; the design-system export has only PNGs.
- Not deployed. Cloudflare, domains and the roshai.net redirect come after you approve the mock (steps are at the end of `CLAUDE.md`).
