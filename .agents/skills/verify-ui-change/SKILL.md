---
name: verify-ui-change
description: How to verify a visual change on this site — render headless, measure pixels, and force hover states. Use whenever a change affects layout, spacing, colour, or typography, and before claiming a visual fix works.
---

# Verifying a visual change

**Do not judge layout by eye from a user's screenshot.** Two screenshots at
different window sizes or browser zooms are not comparable, and estimating
coordinates from them produces confident wrong answers. Render it and measure.

## Render the page

```bash
cd /Users/joshualavieri/software/joshualavieri.com
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 24 >/dev/null
npm run build && npm run preview > /tmp/pv.log 2>&1 &
PID=$!
for i in $(seq 1 40); do /usr/bin/curl -sf -o /dev/null http://localhost:4321/ && break; sleep 0.5; done

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --no-sandbox --no-first-run \
  --no-default-browser-check --hide-scrollbars \
  --blink-settings=preferredColorScheme=1 \
  --user-data-dir=/tmp/prof --window-size=1500,900 \
  --screenshot=/tmp/shot.png http://localhost:4321/projects/

kill $PID; pkill -f 'astro.mjs preview'
```

Then `Read` the PNG.

- `preferredColorScheme=1` forces light, `2` or omitting gives dark. Headless
  defaults to **dark**.
- Drop `--hide-scrollbars` when testing anything scrollbar-related.
- A fresh `--user-data-dir` is an incognito-equivalent profile — use it to rule
  out `localStorage` (stored theme, etc.) as a cause.

## Measure, don't estimate

To compare positions across pages, find a known colour:

```python
from PIL import Image
target = (0xE5, 0xDC, 0xBD)   # --c-edge, the sidebar border
im = Image.open("shot.png").convert("RGB")
best, bx = 999, None
for x in range(150, 900):
    d = sum(abs(a-b) for a, b in zip(im.getpixel((x, 300)), target))
    if d < best: best, bx = d, x
print("border at", bx)
```

Render every affected page and assert the number is identical. Alignment bugs
here have twice been invisible until measured.

## Force a hover or interactive state

Headless cannot hover. Copy `dist`, inject CSS, serve the copy:

```bash
cp -R dist /tmp/hoverdist
python3 - <<'PY'
import pathlib
p = pathlib.Path("/tmp/hoverdist/projects/index.html")
h = p.read_text()
p.write_text(h.replace("</head>", """<style>
  .project-card:nth-of-type(2){ --rx:-5deg; --ry:6deg; --ty:-4px }
</style></head>""", 1))
PY
(cd /tmp/hoverdist && python3 -m http.server 4470 &)
```

Never inject this into `src/` just to take a screenshot.

## Shell gotchas on this machine

**The shell is zsh, which does not word-split unquoted variables.** This
silently fails:

```bash
for f in "dist/a.html LABEL"; do set -- $f; grep x "$1"; done   # $1 = whole string
```

Use explicit arguments or a function taking `"$1" "$2"`.

**`curl` may not be on PATH after `nvm use`** — use `/usr/bin/curl`.

## Before claiming it works

- Rebuild. `dist/` lags source edits, and a stale `dist` has more than once
  made a working change look broken and a broken one look fine.
- `grep` the built HTML/CSS for the thing you changed.
- Check both themes if colours or borders moved.
- Check every page, not just the one you edited, when touching shared layout.
