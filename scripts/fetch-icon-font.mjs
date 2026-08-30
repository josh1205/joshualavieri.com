/**
 * Downloads a *subset* of Material Symbols Outlined containing only the icons
 * you name, and writes it to public/fonts/.
 *
 *   npm run fonts:icons                 # regenerate the current set
 *   npm run fonts:icons -- search close # add icons to the set
 *
 * The icon names live in ICONS below — edit that list, rerun, and commit the
 * new .woff2. Only glyphs in this list will render; anything else shows as
 * literal text.
 */
import { writeFile } from 'node:fs/promises'

const ICONS = [
  // Theme toggle
  'light_mode',
  'dark_mode',
  // Social row
  'mail',
  'rss_feed',
  // Language switcher
  'translate',
]

const names = [...new Set([...ICONS, ...process.argv.slice(2)])].sort()
const api =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0' +
  `&icon_names=${names.join(',')}`

// Google serves woff2 only to browser-like user agents.
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const css = await (await fetch(api, { headers: { 'User-Agent': UA } })).text()
const url = css.match(/url\(([^)]+)\)/)?.[1]
if (!url) throw new Error(`No font URL in response:\n${css}`)

const buf = Buffer.from(await (await fetch(url)).arrayBuffer())
const out = 'public/fonts/material-symbols-outlined.woff2'
await writeFile(out, buf)

console.log(`${out}  ${buf.length} bytes`)
console.log(`icons: ${names.join(', ')}`)
