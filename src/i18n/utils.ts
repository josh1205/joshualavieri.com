import { ui, languages, defaultLang, type Lang } from './ui'
import { SITE } from '../config'

type Key = keyof (typeof ui)[typeof defaultLang]

/** Reads the locale out of the path: /af/... → 'af', anything else → 'en'. */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/')
  return first in ui ? (first as Lang) : defaultLang
}

/** t('home.latest') — falls back to English for any untranslated key. */
export function useTranslations(lang: Lang) {
  return function t(key: Key): string {
    return (ui[lang] as Record<Key, string>)[key] ?? ui[defaultLang][key]
  }
}

/** Strips the locale prefix and normalises to a trailing slash: /af/resume -> /resume/ */
function normalise(pathname: string): string {
  const stripped = pathname.replace(/^\/af(?=\/|$)/, '') || '/'
  return stripped.endsWith('/') ? stripped : `${stripped}/`
}

/**
 * Pages that intentionally stay in one language. The switcher is hidden on
 * these rather than offering a translation that will never exist.
 *
 * Paths are locale-stripped and trailing-slashed, e.g. '/resume/'.
 */
const UNTRANSLATED_PATHS = new Set(['/resume/', '/me/'])

/**
 * Pages that exist in both languages. Anything else (not yet translated, but
 * not deliberately excluded) sends the switcher to that locale's home page
 * rather than a 404.
 */
const TRANSLATED_PATHS = new Set(['/', '/projects/'])

/**
 * Href for a nav link in the current locale: the /af/ version when that page
 * is actually translated, otherwise the English page. Prevents linking to a
 * locale route that would just render English.
 */
export function localeHref(path: string, lang: Lang): string {
  const target = normalise(path)
  if (lang === defaultLang) return target
  return TRANSLATED_PATHS.has(target) ? `/${lang}${target}` : target
}

/** False on pages that deliberately stay in one language. */
export function isTranslatable(url: URL): boolean {
  return !UNTRANSLATED_PATHS.has(normalise(url.pathname))
}

/** The same page in the other language. */
export function alternateUrl(url: URL, lang: Lang): string {
  const other: Lang = lang === 'en' ? 'af' : 'en'
  const current = normalise(url.pathname)
  const path = TRANSLATED_PATHS.has(current) ? current : '/'
  return other === 'en' ? path : `/af${path}`
}

/**
 * Translation strings are plain text, so they can't reference config. Write
 * {{github}} / {{linkedIn}} in a string and this swaps in the real URL.
 */
export function withLinks(html: string): string {
  return html.replace(
    /\{\{(\w+)\}\}/g,
    (_, key) => (SITE.links as Record<string, string>)[key] ?? ''
  )
}

/**
 * getStaticPaths() entries for a route under [...lang]. The default locale
 * gets `undefined`, which renders at the un-prefixed path.
 *
 *   export const getStaticPaths = localePaths              // / and /af/
 *   export const getStaticPaths = () => localePaths(['en']) // / only
 *
 * Add a language to `languages` in ui.ts and every unrestricted route picks
 * it up — no new files.
 */
export function localePaths(only?: readonly Lang[]) {
  const langs = Array.isArray(only)
    ? only
    : (Object.keys(languages) as Lang[])
  return langs.map((lang) => ({
    params: { lang: lang === defaultLang ? undefined : lang },
  }))
}
