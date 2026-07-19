# Agent Instructions — mcengine.github.io

This repository is the **static documentation website** for the MCEngine
organization, published with GitHub Pages from the [`docs/`](docs/) folder. It
documents the MCEngine API modules (`github`, `gitlab`) and hosts the shared
theme assets other ecosystem sites import. Read [`INDEX.md`](INDEX.md) for the
file structure and [`DESIGN.md`](DESIGN.md) for the design system before making
changes.

---

## Iron Rules

### 1. Never expose internal source code

This is a **public, user-facing** documentation site. It documents how to *use*
a module, never how it is built inside.

* **Do not** copy a module's implementation (Java classes, method bodies,
  internal fields, private helpers, package-internal utilities such as the HTTP
  client, JSON reader, or resolver) onto any page.
* For each module, show **only the usage of its single source-of-truth class**
  and the public contract: how a consumer constructs and calls
  `GitHubPlatform` / `GitLabPlatform`, the public method signatures, parameters,
  and return types, and the public interface a call returns (`GitHubTag` /
  `GitLabTag`). Nothing about how those are implemented.
* Code blocks are allowed only when they are **consumer-facing**:
  * calling the public API (`platform.getLatestTag()`, `platform.CompareVersion("1.0.0")`, …),
  * build configuration (`build.gradle`, dependency + repository declarations),
  * the coordinates needed to depend on the artifact.
* If an example seems to require internal source to explain something, describe
  the behaviour in prose instead and link to the public API surface.

When in doubt, ask: *"Would this line appear in the module's own source tree?"*
If yes, it does not belong on the site.

### 2. Keep the site self-contained

No external fonts, scripts, stylesheets, CDNs, trackers, or network calls at
runtime. Everything ships in-repo. Inline small SVGs / data URIs when an asset
is needed. This keeps the site fast, private, and CSP-friendly.

Never create a `.nojekyll` file. GitHub Pages serves the static files without
one.

### 3. Follow the existing conventions

* Every page injects the shared header/footer via the client-side loader
  (`docs/js/site.js` + `docs/partials/`). Do not hard-code the nav into a page.
* CSS lives under `docs/css/` — root tokens in `main.css`, cross-page styles in
  `docs/css/shared/`, and one folder per section (`docs/css/{section}/`).
* Use the design tokens and components from [`DESIGN.md`](DESIGN.md); do not
  invent new colors or one-off styles.
* Keep files focused (one page = one folder). Prefer editing shared partials
  over duplicating markup.
* The legacy shared assets under `docs/styles/` and `docs/scripts/` are imported
  by external ecosystem sites through `https://mcengine.github.io/...` URLs. Do
  not break or move them; if their paths change, update every consumer listed in
  [`INDEX.md`](INDEX.md) in the same change set.

---

## Website repository structure

Use this layout when creating pages so future tasks can replicate it. `{module}`
is a repository name such as `github` or `gitlab`.

```
mcengine.github.io/
├── AGENTS.md                     # this file
├── DESIGN.md                     # Silver Glass design system (source of truth)
├── INDEX.md                      # repository structure index
├── LICENSE
├── wiki/                         # repository documentation
│   ├── requirements.md
│   ├── api.md
│   ├── environment.md
│   └── system.md
└── docs/                         # served by GitHub Pages
    ├── index.html                # homepage: cards to each module + ecosystem
    ├── css/
    │   ├── main.css              # :root tokens + base element styles
    │   ├── shared/
    │   │   ├── layout.css        # header, nav, footer, breadcrumbs, container
    │   │   └── components.css    # cards, accordions, tables, badges, buttons…
    │   ├── home/home.css         # per-section layout only
    │   ├── repo/repo.css
    │   └── logs/logs.css
    ├── js/site.js                # runtime include loader
    ├── partials/
    │   ├── header.html           # shared nav (uses {{ROOT}} + data-section)
    │   └── footer.html
    ├── {module}/
    │   ├── index.html            # module usage page
    │   └── logs/
    │       ├── index.html        # central log — mirrors the latest version
    │       └── {major}/{minor}/{patch}/index.html   # per-version permalink
    ├── important/index.html      # notices page
    ├── styles/                   # legacy shared assets (imported by other sites)
    └── scripts/                  # legacy shared script (imported by other sites)
```

---

## How to add or update content

### Add a new page

1. Create `docs/{section}/index.html`.
2. Set the correct relative root in `<head>`:
   `window.SITE_ROOT = "<relative-path-back-to-docs>/"` (e.g. `"../"` one level
   deep, `"../../"` two levels deep) and `window.PAGE_SECTION = "<section>"`.
3. Link `css/main.css`, `css/shared/layout.css`, `css/shared/components.css`,
   and a per-section stylesheet `css/{section}/{section}.css`, all prefixed with
   the same relative root.
4. Add `<div id="site-header"></div>` at the top of `<body>` and
   `<div id="site-footer"></div>` before the `site.js` script.
5. If it is a top-level section, add a nav link in
   `docs/partials/header.html` using the `{{ROOT}}` token and a matching
   `data-section` value, and a footer link if appropriate.
6. Update [`INDEX.md`](INDEX.md).

### Add a new module

1. Create `docs/{module}/index.html` (one level deep, `SITE_ROOT = "../"`,
   `PAGE_SECTION = "{module}"`) and link `css/repo/repo.css`.
2. Document only consumer-facing usage (Iron Rule 1): coordinates, the
   `build.gradle` dependency block, construction, the three methods, and the
   returned interface.
3. Add a nav link for the module in `docs/partials/header.html` and a footer
   link. Add a homepage card in `docs/index.html`.
4. Create its change log (below) starting at version `0.0.0`.
5. Update [`INDEX.md`](INDEX.md).

---

## How to create a change log

Logs use a **versioned directory structure** so every published build gets a
permanent URL: `docs/{module}/logs/{major}/{minor}/{patch}/index.html` (for
example `docs/github/logs/0/0/0/`, `.../0/0/1/`, `.../0/1/0/`, `.../1/0/0/`).

`docs/{module}/logs/index.html` always mirrors the **latest** release; each
versioned page is the permalink for that specific version. To publish a new log
for version `X.Y.Z`:

1. **Create the versioned page** `docs/{module}/logs/X/Y/Z/index.html`.
   * Copy the layout of the most recent versioned page as a starting point.
   * A version page is **five levels deep**, so it sets
     `window.SITE_ROOT = "../../../../../"` and links the stylesheets
     (`main.css`, `shared/layout.css`, `shared/components.css`, `logs/logs.css`)
     with that same prefix. Use `window.PAGE_SECTION = "{module}"`.
   * Fill in the version, date, and change sections. Use the
     `log-tag--new` / `log-tag--improve` / `log-tag--note` labels for
     Added / Changed / Notes.
2. **Update the version navigation** (`.logs-nav`) so it lists every version,
   newest first. Give the newest entry `class="is-current"` on its own page and
   the `Latest` pill; remove the `Latest` pill from the previous newest.
3. **Refresh `docs/{module}/logs/index.html`** to show the new version's content
   as the latest entry, mark it with the `badge--ok` "Latest" badge, and update
   its version list to include the new version (pointing at `X/Y/Z/index.html`).
4. **Content rule:** describe *what changed for users and integrators* —
   features, fixes, config, and public-API changes only. Never paste internal
   implementation details (see Iron Rule 1).
5. Update [`INDEX.md`](INDEX.md) with the new log path.

> Semantic Versioning: `Major.Minor.Patch`. Keep the directory numbers in sync
> with the module's released version.

---

## Git & branching workflow (STRICT)

* **Never work on `master`/`main`.** Create a branch for the work.
* **Branch naming:** `{type}/{primary-noun}` (e.g. `docs/website`). Allowed
  types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`,
  `ci`, `chore`, `revert`. Do not use preset prefixes such as `claude/` or
  `codex/`; if a branch does not follow the convention, recreate it under a
  correct name. The branch name must reflect the entire set of changes.
* **Commits:** Conventional Commits (`type[optional scope]: description`), plain
  text, no links or issue IDs. Check the diff before each commit.
* **Pull requests:** open sequentially and **ask for user approval first**.
  Provide a detailed report of added/modified/deleted features in the body. PR
  titles use human-readable language, not git conventions. No links in titles or
  descriptions.
* **Versioning:** a newly created project starts at `0.0.0`; every pull request
  updates the `Major.Minor.Patch` version. Confirm the version changed before
  merging.

---

## Verifying changes

Serve the site locally and click through the affected pages — header/footer must
load, links must resolve, and there should be no console errors:

```bash
python3 -m http.server 8000 --directory docs
# then open http://localhost:8000/
```

Because the header/footer are fetched at runtime, always test over HTTP (the
command above), not by opening files directly.
