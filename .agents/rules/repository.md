# Repository-specific rules — mcengine.github.io

This repository is the **static documentation website** for the MCEngine
organization, published with GitHub Pages from the [`docs/`](docs/) folder. It
documents the MCEngine API modules (`github`, `gitlab`) and is the canonical home
of the shared theme assets. Read [`INDEX.md`](INDEX.md) for the file structure and
[`DESIGN.md`](DESIGN.md) for the design system before making changes.

This repository is the **canonical reference for the MCEngine ecosystem's visual
language**. [`DESIGN.md`](DESIGN.md) and the stylesheets under
[`docs/css/`](docs/css/) are the reference copy of the shared "Silver Glass"
design system. Sibling sites (`mcoriax.github.io`, `mcpaimon.github.io`,
`mcshot.github.io`, `mchaagenti.github.io`, `mcclauneck.github.io`) each keep
their **own vendored copy** of the theme and their own `DESIGN.md` in sync with
this one, rather than importing anything at runtime. When you change tokens or
selectors here, treat it as a design-system change and propagate it to the
vendored copies.

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
* The modular theme under `docs/css/` (`main.css`, `shared/layout.css`,
  `shared/components.css`) is the ecosystem's **canonical shared stylesheet**.
  Sibling sites vendor their own copy of it; when you change tokens or selectors
  here, propagate the change to those copies rather than expecting them to import
  it at runtime.
* The legacy single-file theme under `docs/styles/` and `docs/scripts/` is kept
  for reference. Ecosystem sites now vendor their own copy of the theme, so these
  files are no longer imported over the network; leave them in place unless the
  whole ecosystem is migrated.

---
