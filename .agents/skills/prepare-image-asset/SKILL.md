---
name: prepare-image-asset
description: Prepare an image for this site — check transparency, strip a baked-in background, normalise icon size, and render it through Astro's Image. Use whenever a new logo, icon, or photo is added to src/assets.
---

# Preparing an image asset

## Always inspect before using

Images arriving from design tools and AI generators frequently **look**
transparent but are not.

```python
from PIL import Image
im = Image.open("src/assets/thing.png")
print(im.size, im.mode)
if im.mode in ("RGBA", "LA"):
    print("alpha range", im.getchannel("A").getextrema())
    print("art bbox", im.getchannel("A").getbbox())
else:
    print("NO ALPHA — background is baked in")
print("corner px", im.convert("RGB").getpixel((2, 2)))
```

Two failure shapes seen repeatedly in this repo:

- **`mode=RGB` with a checkerboard** — the transparency grid was flattened into
  real pixels. Tell: alternating `(254,254,254)` / `(243,243,243)`, and a file
  far larger than the artwork warrants (900KB for a two-colour wordmark).
- **`mode=RGB` on a solid background** — worse when that colour is close to the
  site's `#f8f4e6`, because it looks nearly right in light mode and shows as a
  bright block in dark mode.

## Recovering transparency

**Monochrome art on white** — key on luminance:

```python
lum = im.convert("L"); FLOOR = 28
alpha = 0 if (255 - lum) <= FLOOR else min(255, (255 - lum - FLOOR) * 255 / (255 - FLOOR))
```

**Colour art on a flat background** — flood fill inward from the border. This is
essential: a global colour key punches holes in white areas *inside* the
artwork (a photo page, white lettering).

```python
from collections import deque
def is_bg(p): return min(p) >= 235 and (max(p) - min(p)) <= 6   # or match the sampled colour
# seed the queue with every border pixel that is_bg, flood 4-way, set alpha 0
```

Afterwards `crop(out.getchannel("A").getbbox())` to trim, and **keep the
original** as `<name>.original-backup.png` (unreferenced files are not emitted).

## Normalise icons to a shared canvas

Nav and card icons must share a canvas or they render at visibly different
sizes under `object-contain`. The convention here is **40×40 with the artwork
filling ~90%**:

```python
CANVAS, FILL = 40, 36
scale = min(FILL / art.width, FILL / art.height)
art = art.resize((round(art.width * scale), round(art.height * scale)), Image.LANCZOS)
canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
canvas.paste(art, ((CANVAS - art.width) // 2, (CANVAS - art.height) // 2), art)
```

## Rendering it

Put images in `src/assets/` (optimised, hashed) — **not `public/`**, which is
copied verbatim. Only favicons and the icon font belong in `public/`.

```astro
<Image src={icon} alt="" width={20} densities={[1, 2]} class="size-5 object-contain" />
```

- **`width` + `densities`**, never `widths` — `widths` also emits a full-size
  fallback as `src` (a 334KB variant for a 20px icon).
- Drive the displayed size and the generated `width` from **one variable**, or
  enlarging the CSS later leaves the image soft. See `ICON_SIZE` in
  `SiteNav.astro` and `LOGO_WIDTH` in `Sidebar.astro`.
- Tailwind cannot build a class from a variable — use `style` for computed size.
- **Black-on-transparent art needs `dark:invert`**, or it disappears on the dark
  surface. The wordmark in `Sidebar.astro` does this.
- `alt=""` when the image sits beside text that already says the same thing.

## Sanity check

```bash
find dist/_astro -iname '*yourasset*' -exec sh -c \
  'echo "$(basename {}) $(( $(wc -c < {}) / 1024 ))KB"' \;
```

A nav icon should be **1–3KB**. If it is hundreds of KB, `width`/`densities` is
wrong or the source was never trimmed.
