# Repository Index

This file is the entry point for any agent working in this repository. Read it first before making changes.

`mcengine.github.io` is the MCEngine organization website, served by GitHub Pages from `docs/`. It also hosts the shared theme assets (`.css` and `.js`) that other MCEngine ecosystem sites import through `https://mcengine.github.io/...` URLs instead of raw content URLs. Keep this index accurate whenever files or directories are added, removed, or restructured.

## Root Files

| Path | Purpose |
|---|---|
| LICENSE | MIT license for this repository. |
| INDEX.md | This file. |

## Site Content (`docs/`, served by GitHub Pages)

| Path | Purpose |
|---|---|
| docs/important/index.html | `/important/` — contributing, open-core policy, support, and AI-usage notice. |
| docs/styles/main/style.css | Shared base stylesheet (dark night theme). Imported by ecosystem sites as `https://mcengine.github.io/styles/main/style.css`. |
| docs/styles/important/main.css | Shared layout stylesheet (container card, headings, lists, warning block, footer). Imported by ecosystem sites as `https://mcengine.github.io/styles/important/main.css`. |
| docs/scripts/main/script.js | Shared page script (fade-in on entry, fade-out on internal navigation). Imported by ecosystem sites as `https://mcengine.github.io/scripts/main/script.js`. |

## Shared Asset Consumers

Ecosystem sites reuse the theme by importing the stylesheets and script above directly from `https://mcengine.github.io`. No consumer sites are registered at the moment; add each new consumer to this list when it starts importing the shared assets, and when shared asset paths change, update every consumer listed here in the same change set.
