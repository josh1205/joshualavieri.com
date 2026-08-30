# joshualavieri.com

Personal site and digital workshop — projects, writing, and a resume, in
English and Afrikaans.

Built with [Astro](https://astro.build), [Vue](https://vuejs.org), and
[Tailwind CSS](https://tailwindcss.com). Fully static, deployed to Cloudflare.

## What's on it

| | |
|---|---|
| **Home** | Intro, a timeline, and a selection of projects |
| **Projects** | Cards linking to articles, demos, and source |
| **About me** | Longer intro, contact details, and what I'm currently up to |
| **Résumé** | Work history, skills, and education |
| **Blog** | Markdown posts with tags and an RSS feed |

## Features

- **Bilingual** — English at `/`, Afrikaans at `/af/`, with a language switcher
  in the sidebar. Pages that aren't translated fall back to English rather than
  showing a half-translated page.
- **Light and dark themes**, remembered between visits and matched to your
  system preference on first load.
- **Fast by default** — one small interactive component on the whole site, so
  almost nothing ships JavaScript. Fonts and icons are self-hosted; no
  third-party requests.
- **Accessible** — keyboard-reachable tooltips, real focus states, and motion
  effects that respect `prefers-reduced-motion`.

## Running it locally

Node 22.12 or newer (`.nvmrc` pins 24).

```bash
nvm use
npm install
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server, drafts visible |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built site — needed to test search |
| `npm run fonts:icons` | Regenerate the icon font subset |

## Credits

The design is closely inspired by **[tania.dev](https://tania.dev)** by Tania
Rascia — the warm palette, the sidebar layout, and the general shape of the
resume and project pages all follow her work. Her
[site is open source](https://github.com/taniarascia/taniarascia.com), and
while she notes it isn't meant as a template, it was an excellent thing to
learn from. Thank you.

Icons from [Material Symbols](https://fonts.google.com/icons) and
[Font Awesome](https://fontawesome.com). Fonts are Outfit, Google Sans Flex, and
Google Sans Code.

## Working on this repo

Setup, conventions, and guidance for AI coding agents are in
[AGENTS.md](AGENTS.md), with deeper references in `.agents/skills/`.
