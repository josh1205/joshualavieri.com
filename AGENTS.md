# AGENTS.md

Instructions for AI coding agents working in this repository. Written to the
[agents.md](https://agents.md) convention, which several tools read directly.

## What this is

Personal site for Joshua Lavieri. **Astro 7 + Vue 3 + Tailwind CSS v4**, fully
static, deployed to Cloudflare. English at `/`, Afrikaans at `/af/`.

## Setup

Node **24** — Astro 7 requires ≥22.12 and the system default may be older.

```bash
nvm use
npm install
npm run dev       # dev server
npm run build     # production build to dist/
npm run preview   # serve dist/ — needed to see real output
```

Astro runs a **persistent** dev server: a second `npm run dev` reattaches
rather than restarting. Use `npx astro dev status` / `npx astro dev stop`.

## Skills

Detailed guidance lives in `.agents/skills/`. Each is a `SKILL.md` with
frontmatter, in the portable Agent Skills format. **Read the relevant one before
starting.**

| Skill | Read it when |
|---|---|
| [`joshualavieri-com`](.agents/skills/joshualavieri-com/SKILL.md) | Editing any page, component, or stylesheet — architecture, i18n, design tokens, component boundaries |
| [`verify-ui-change`](.agents/skills/verify-ui-change/SKILL.md) | A change affects layout, spacing, colour, or typography |
| [`astro-silent-failures`](.agents/skills/astro-silent-failures/SKILL.md) | An edit appears to do nothing — every entry is a failure with no error message |
| [`prepare-image-asset`](.agents/skills/prepare-image-asset/SKILL.md) | Adding a logo, icon, or photo to `src/assets/` |

`.claude/skills` is a symlink to `.agents/skills` so Claude Code discovers them.
The files are not Claude-specific; delete the symlink and everything still works
for any tool that can read a Markdown file.

## House rules

One line each; the reasoning is in the linked skill.

- **Verify visual changes by rendering, not by eye** — `verify-ui-change`.
- **Rebuild before checking `dist/`** — it lags source edits.
- **Never hardcode a colour** — use the tokens in `src/styles/global.css`.
- **Never hardcode a profile URL or email** — use `SITE.links` in `src/config.ts`.
- **Don't add `client:*` to a component** without flagging it — it pulls the Vue
  runtime onto every page.
- **Don't create `src/pages/af/…` by hand** — locale routes come from
  `src/pages/[...lang]/`.
- **Kill any dev or preview server you start** — they outlive the browser.
- **If an edit appears to do nothing**, check `astro-silent-failures` before
  assuming the code is wrong.
