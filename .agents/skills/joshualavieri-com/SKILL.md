---
name: joshualavieri-com
description: Architecture and conventions for this Astro personal site — routing, i18n, design tokens, component boundaries, and where things live. Read before editing any page, component, or stylesheet in this repo.
---

# Digital Workshop — project guide

Personal site for Joshua Lavieri. Astro 7 + Vue 3 + Tailwind CSS v4, fully
static, deployed to Cloudflare.

## Before you start

Setup, commands, and dev-server behaviour are in `AGENTS.md` at the repo root.
Read that first; this skill covers architecture only.

## Routing and i18n

English at `/`, Afrikaans at `/af/`. One route file serves every locale:

```
src/pages/[...lang]/index.astro      -> /        and /af/
src/pages/[...lang]/projects.astro   -> /projects/ and /af/projects/
```

```ts
export const getStaticPaths = localePaths            // all locales
export const getStaticPaths = () => localePaths(['en'])  // English only
```

Adding a language = one entry in `languages` (`src/i18n/ui.ts`) plus its
strings. **No new route files.** Never create `src/pages/af/…` by hand.

**Pages that should exist in one language only live OUTSIDE `[...lang]/`** —
currently `resume.astro` and `me.astro`. Being outside is what stops
`/af/resume/` from generating at all.

`src/i18n/utils.ts`:

| Function | Purpose |
|---|---|
| `getLangFromUrl(url)` | locale from the path |
| `useTranslations(lang)` | returns `t('key')`, falls back to English |
| `localePaths(only?)` | `getStaticPaths` entries per locale |
| `localeHref(path, lang)` | `/af/x/` if translated, else the English path |
| `alternateUrl(url, lang)` | the language switcher's target |
| `isTranslatable(url)` | false on `UNTRANSLATED_PATHS` — hides the switcher |
| `withLinks(html)` | swaps `{{github}}` / `{{linkedIn}}` tokens for config URLs |

Two sets in that file, deliberately separate:

- `TRANSLATED_PATHS` — a translated version exists; links go straight to it
- `UNTRANSLATED_PATHS` — never translated; the switcher is hidden

**Translation strings are plain text and cannot reference config.** Use
`{{token}}` and run the string through `withLinks()`.

**Vue components cannot call `t()`.** Translate in the Astro parent and pass
strings down as props — see `ProjectItem`'s `labels` prop.

## Content collections

Posts are Markdown in `src/content/blog/`; the filename becomes the URL.
Frontmatter is validated by a Zod schema in `src/content.config.ts`, so a bad
field **fails the build** rather than shipping.

```yaml
---
title: 'Post title'
description: 'One sentence — used in listings and search results.'
date: 2026-08-27
tags: ['javascript']
icon: '📄'
draft: false
---
```

`draft: true` keeps a post visible in `npm run dev` but out of the production
build, RSS, and the search index. `src/lib/posts.ts` does that filtering —
query through `getPublishedPosts()`, never `getCollection('blog')` directly.

Pagefind indexes the built HTML, so search is always empty in `npm run dev`;
test it with `npm run build && npm run preview`.

## Components

`.astro` by default. Vue only where interactivity genuinely needs it.

**`ThemeToggle.vue` is the only hydrated component** (`client:load`). It costs
~27KB gzipped for the Vue runtime on every page — that is the entire JS budget.
Do not add `client:*` anywhere else without saying so explicitly.

Shared pieces worth reusing instead of re-rolling:

| Component | Use for |
|---|---|
| `ChipLink.astro` | bordered pill links — `variant="chip"` or `"badge"`, `external` for new-tab |
| `Tooltip.astro` | hover/focus tooltip — `focusable` for plain text, `srHidden` when the child already has an aria-label |
| `ProjectItem.astro` | project cards, used on both `/` and `/projects/` |
| `src/data/brands.ts` | SVG brand marks (GitHub, LinkedIn, Cloudflare, AWS) |

## Design tokens

All in `src/styles/global.css`. Never hardcode a colour.

Raw ramps (`--beige-*`, `--gray-*`) are private. Components use semantic tokens
— `--c-surface`, `--c-card`, `--c-ink`, `--c-ink-muted`, `--c-edge`,
`--c-accent` — set on `:root` and overridden under `.dark`, then exposed to
Tailwind via `@theme inline`.

Because of `@theme inline`, `bg-surface` and `text-ink-muted` follow the theme
on their own. **Components need no `dark:` variants.** The only ones in the
codebase are the theme toggle's icon visibility.

Layout knobs, also in `global.css`:

```
--layout-max-width   whole grid, centred
--sidebar-width      sidebar column
--content-padding-x  content column padding (responsive)
--base-font-size     body copy
--h1 … --h4          heading scale (ALSO redefined in a media query)
```

## Layout is centred — this matters

`.layout` is `margin-inline: auto`. **Raising `--layout-max-width` on one page
moves the sidebar on that page**, so the site appears to shift when navigating.

To give one page a wider content column, reduce `--content-padding-x` instead
(via `BaseLayout`'s `contentPadding` prop). The grid stays put.

## Config

`src/config.ts` holds only what more than one place reads: `SITE.url`, `title`,
`description`, `lang`, `SITE.links` (email / github / linkedIn), and `GISCUS`.

**Anything read by exactly one component lives in that component** — sidebar
bio, nav, and footer links are all in `Sidebar.astro`.

Never hardcode a profile URL or email; use `SITE.links`.
