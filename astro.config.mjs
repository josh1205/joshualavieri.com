// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import pagefind from 'astro-pagefind'
import tailwindcss from '@tailwindcss/vite'

import { SITE } from './src/config.ts'

export default defineConfig({
  // TODO: replace with your real domain once you buy it.
  // RSS and sitemap both depend on this being correct.
  site: SITE.url,

  // English lives at /, Afrikaans at /af/. Fully static — no client JS.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'af'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [vue(), sitemap(), pagefind()],

  vite: {
    plugins: [tailwindcss()],
    // Force a single Vue instance. Two copies (one from the SFC import, one
    // from the Astro client renderer) is the usual cause of dev-only
    // "__VUE_HMR_RUNTIME__ is not defined" during island hydration.
    resolve: { dedupe: ['vue'] },
    optimizeDeps: { include: ['vue'] },
  },

  markdown: {
    shikiConfig: {
      // Dual themes: Shiki emits both, CSS in global.css swaps them.
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      wrap: true,
    },
  },
})
