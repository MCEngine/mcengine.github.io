# Repository Index

This file is the entry point for any agent working in this repository. Read it first, then [`AGENTS.md`](AGENTS.md), before making changes.

`mcengine.github.io` is the MCEngine organization website, served by GitHub Pages from `docs/`. It also hosts the shared theme assets (`.css` and `.js`) — white/silver/modern, defined by the ecosystem design system in `DESIGN.md` of `MCPaimon/mcpaimon.github.io` — that other MCEngine ecosystem sites import through `https://mcengine.github.io/...` URLs instead of raw content URLs. Keep this index accurate whenever files or directories are added, removed, or restructured.

## Root Files

| Path | Purpose |
|---|---|
| AGENTS.md | Primary agent instruction set (workflow, branching, commits, content rules). |
| LICENSE | MIT license for this repository. |
| INDEX.md | This file. |

## Site Content (`docs/`, served by GitHub Pages)

| Path | Purpose |
|---|---|
| docs/index.html | `/` — ecosystem homepage with navigation blocks to every ecosystem site and the important notice. |
| docs/important/index.html | `/important/` — contributing, open-core policy, support, and AI-usage notice. |
| docs/styles/main/style.css | Shared base stylesheet (white/silver theme: tokens, components, page transitions, navigation blocks). Imported by ecosystem sites as `https://mcengine.github.io/styles/main/style.css`. |
| docs/styles/important/main.css | Shared card layout add-on (centered container card, headings, lists, warning block, footer). Imported by ecosystem sites as `https://mcengine.github.io/styles/important/main.css`. |
| docs/scripts/main/script.js | Shared page script (page transition controller). Imported by ecosystem sites as `https://mcengine.github.io/scripts/main/script.js`. |

## Shared Asset Consumers

Ecosystem sites reuse the theme by importing the stylesheets and script above directly from `https://mcengine.github.io`:

* `MCValac/mcvalac.github.io` — https://mcvalac.github.io/
* `MCPaimon/mcpaimon.github.io` — https://mcpaimon.github.io/
* `MCShot/mcshot.github.io` — https://mcshot.github.io/
* `MCHaagenti/mchaagenti.github.io` — https://mchaagenti.github.io/

When shared asset paths change, update every consumer listed here in the same change set.
