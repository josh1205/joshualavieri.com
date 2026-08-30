---
name: astro-silent-failures
description: Failure modes in this Astro + Tailwind v4 codebase that produce no error — CSS that doesn't apply, classes that generate no rules, stripped whitespace, stale caches. Check here first when an edit appears to do nothing.
---

# Silent failures

Every item below was hit at least once in this repo. None produced an error
message. **If a change appears to do nothing, work down this list before
assuming the code is wrong.**

## CSS that doesn't apply

### Specificity ties lose to source order

`.prose h2` and `.prose-resume h2` are both `(0,1,1)`. At a tie the **later**
rule wins, and the resume block is emitted first — so its `font-size` was
silently discarded for weeks.

**Fix:** double the class — `.prose.prose-resume h2` — rather than relying on
where the block sits in the file.

### Unlayered CSS beats `@layer utilities`

A rule outside any `@layer` beats everything inside one, including all Tailwind
utilities. `.material-symbols-outlined` sets `font-size: 24px`; while it sat
unlayered, `text-[20px]` on the element did nothing.

**Fix:** put component classes inside `@layer components`.

### A token defined twice

`--h1`, `--h2`, `--h3`, `--h4` and `--hero-h1` are each defined **twice** in
`global.css` — a base value and a larger one in a `min-width` media query.
Editing the top one changes nothing on desktop.

```bash
grep -n '\-\-hero-h1' src/styles/global.css   # more than one hit? the last wins
```

### An anchor overrides inherited weight

`a { font-weight: 500 }` in the base layer applies to the anchor itself, so
`font-bold` on a parent `h2` has no effect on linked text.

**Fix:** put the weight on the `<a>`.

### `font-synthesis: none` blocks italics

`body` sets `font-synthesis: style`. It was `none`, and because Google Sans Flex
ships **no italic face**, every `<em>` rendered upright.

## Tailwind cannot generate classes from variables

Tailwind scans source for **literal** class strings. This produces no CSS at all:

```astro
class={`text-[${ICON_SIZE}px]`}   <!-- silently matches nothing -->
```

**Fix:** inline `style` for computed values, or write the class literally.
`SiteNav.astro` and `SocialLinks.astro` use `style={...}` for exactly this.

## Astro strips whitespace before an inline element

A newline between text and a tag is removed:

```astro
working at
<a href="...">Crunchyroll</a>     <!-- renders "atCrunchyroll" -->
```

**Fix:** keep the text and opening tag on one line, or use `{' '}`.

## `getStaticPaths` receives an options object

Astro calls it with an argument. An optional first parameter will bind to it:

```ts
export function localePaths(only?: readonly Lang[]) {
  const langs = Array.isArray(only) ? only : allLangs   // guard, don't trust it
}
```

Without the `Array.isArray` guard this crashes the build with
`(only ?? …).map is not a function`.

## Stale caches

Astro's content layer persists in **`node_modules/.astro/data-store.json`**, not
just `.astro/`. Deleted posts kept building from it while `astro dev` correctly
reported the collection as empty.

```bash
rm -rf node_modules/.astro .astro dist     # when build and dev disagree
rm -rf node_modules/.vite                  # Vite/HMR weirdness, e.g. __VUE_HMR_RUNTIME__
```

Running `npm run build` while `astro dev` is live can poison the shared cache.

## Props declared but never rendered

`SocialLinks.astro` declared `target?: string` and never put it on the anchor,
so `target: '_blank'` from `Sidebar.astro` was dropped. It type-checked and
built cleanly.

**When a prop seems ignored, grep the template for it, not just the interface.**

## `as const` and optional properties

`as const` gives each object an exact literal type, so an entry without `color`
genuinely has no `color` — `BRANDS[x].color` fails to compile.

**Fix:** declare an interface with `color?: string` and annotate the map as
`Record<Name, Brand>`.
