# Repository Index

This file is the entry point for any agent working in this repository. Read it
first, then [`AGENTS.md`](AGENTS.md) and [`DESIGN.md`](DESIGN.md), before making
changes. Keep it accurate whenever files or directories are added, removed, or
restructured.

`mcengine.github.io` is the MCEngine organization's static documentation website,
served by GitHub Pages from `docs/`. It documents the MCEngine API modules and
hosts legacy shared theme assets that other ecosystem sites import through
`https://mcengine.github.io/...` URLs.

## Root Files

| Path | Purpose |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Primary agent instruction set (rules, workflow, structure). |
| [`DESIGN.md`](DESIGN.md) | Silver Glass design system — source of truth for the visual language. |
| [`INDEX.md`](INDEX.md) | This file. |
| [`LICENSE`](LICENSE) | Repository license. |

## Documentation (`wiki/`)

| Path | Purpose |
|---|---|
| [`wiki/requirements.md`](wiki/requirements.md) | Project requirements. |
| [`wiki/api.md`](wiki/api.md) | Runtime include contract and shared-asset URLs. |
| [`wiki/environment.md`](wiki/environment.md) | Hosting and local-preview environment. |
| [`wiki/system.md`](wiki/system.md) | Site architecture. |

## Design System Assets (`docs/css`, `docs/js`, `docs/partials`)

| Path | Purpose |
|---|---|
| `docs/css/main.css` | `:root` design tokens + base element styles. |
| `docs/css/shared/layout.css` | Header, nav, footer, breadcrumbs, container. |
| `docs/css/shared/components.css` | Cards, accordions, tables, badges, buttons, callouts, deflist. |
| `docs/css/home/home.css` | Homepage-specific layout. |
| `docs/css/repo/repo.css` | Module-page-specific layout. |
| `docs/css/logs/logs.css` | Change-log layout (version nav, change tags). |
| `docs/js/site.js` | Runtime include loader (header/footer, active nav, mobile menu, favicon, year). |
| `docs/partials/header.html` | Shared nav markup (uses `{{ROOT}}` + `data-section`). |
| `docs/partials/footer.html` | Shared footer markup. |

## Site Pages (`docs/`, served by GitHub Pages)

| Path | Purpose |
|---|---|
| `docs/index.html` | `/` — homepage: module cards, ecosystem links, notices. |
| `docs/github/index.html` | `/github/` — `github` module usage page. |
| `docs/github/logs/index.html` | `/github/logs/` — central log (mirrors latest). |
| `docs/github/logs/0/0/0/index.html` | Permalink for github v0.0.0. |
| `docs/gitlab/index.html` | `/gitlab/` — `gitlab` module usage page. |
| `docs/gitlab/logs/index.html` | `/gitlab/logs/` — central log (mirrors latest). |
| `docs/gitlab/logs/0/0/0/index.html` | Permalink for gitlab v0.0.0. |
| `docs/important/index.html` | `/important/` — contributing, open-core policy, support, AI-usage notice. |

## Legacy Shared Assets (imported by external sites)

These predate the Silver Glass system and remain at stable URLs because other
ecosystem sites import them directly. Do not move or break them.

| Path | Imported as |
|---|---|
| `docs/styles/main/style.css` | `https://mcengine.github.io/styles/main/style.css` |
| `docs/styles/important/main.css` | `https://mcengine.github.io/styles/important/main.css` |
| `docs/scripts/main/script.js` | `https://mcengine.github.io/scripts/main/script.js` |

## Shared Asset Consumers

When a legacy shared asset path changes, update every consumer below in the same
change set:

* `MCValac/mcvalac.github.io` — https://mcvalac.github.io/
* `MCPaimon/mcpaimon.github.io` — https://mcpaimon.github.io/
* `MCShot/mcshot.github.io` — https://mcshot.github.io/
* `MCHaagenti/mchaagenti.github.io` — https://mchaagenti.github.io/
