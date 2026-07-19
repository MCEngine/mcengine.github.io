# Agent Instructions — mcengine.github.io

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
    ├── styles/                   # legacy single-file theme (reference copy)
    └── scripts/                  # legacy single-file theme script (reference copy)
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

---

## Organization Standard — Agent Instructions & Workflow

### Iron Rules

* **Platform Specification:** Whether working with a single repository or multiple repositories, the user must explicitly specify the cloud hosting platform for each repository. For example:
  * `{org}/{repo} - github.com`
  * `{org}/{repo} - gitlab.com`
* **Project Hosting Validation:** The project hosting information must be clearly documented in the first section of the `README.md` file. If this information is missing, you must ask the user where the project is hosted and update the `README.md` to include it using exactly this format (ensuring the items are clickable links):
  ```markdown
  # Project Overview

  * **Platform:** [github.com](link) or [gitlab.com](link)
  * **Organization:** [organization-name](link)
  * **Repository:** [repository-name](link)
  ```

### Strict Rules & Execution

* **Initialization (Read & Understand):** For every repository being worked on (single or multiple), you must perform the following:
  1. **Structure (`INDEX.md`):** Always read `INDEX.md` to understand the project structure. If it does not exist, create it first using the **Universal Repository Index Template** provided below. Actively update it whenever structural changes occur.
  2. **Context (`README.md`):** Always read `README.md` to understand the core project goals, context, setup instructions, and to verify the project hosting information. If the hosting information is missing, refer to the **Project Hosting Validation** iron rule immediately.
* **Execution:** Create a solid plan. Write code section-by-section. Test thoroughly by executing the project's standard test suite via the command line (e.g., `npm test`, `pytest`, `cargo test`) and fix any errors. Verify code security for modified files before completing the task.
* **Modularity:** Separate code into multiple focused files and modules to prevent spaghetti code. Keep files concise and adhere to the Single Responsibility Principle.
* **Dashes:** Do not use dashes (`-`) unnecessarily. Use them strictly for file or directory names (e.g., `getting-started.md`) and branch names. Avoid them in variable names, database schemas, or general prose unless standard conventions explicitly require it.
* **Versioning:** If a project is newly created, its version must be set to "0.0.0". For any pull request (PR) update, the version must always be updated. The version must use the Semantic Versioning format (`Major.Minor.Patch`). If it does not, update it to this format. Before merging, check if the version has been updated. If it hasn't changed, ask the user if they want to update it. If they answer yes, update the version according to the standard definitions of Major, Minor, and Patch.
* **Documents:** The root `README.md` must contain only an overview of the project. The project must have the following documentation files: `wiki/requirements.md`, `wiki/api.md`, `wiki/environment.md`, and `wiki/system.md`. Any other required documentation files must be created within the `wiki/` directory using lowercase filenames, and use hyphens for multiple words (e.g., `wiki/getting-started.md`).
* **Environment:** Do not create a `.env.example` file. Instead, document the required environment variables within the `wiki/environment.md` file using a code block. When providing example values, do not use actual realistic text; use standardized placeholders such as `your_{name}_api_key`, `your_server_api_key`, or `your_openrouter_api_key`. Any examples of infrastructure configurations (e.g., Kubernetes, docker-compose, etc.) must also be written exclusively within the `wiki/environment.md` file.
* **Website Synchronization:** If the user has also cloned the website repository, the agents must update the website contents accordingly.

### Universal Repository Index Template

When creating or updating `INDEX.md`, Agents must follow this structure, adapting the sections to fit the specific project type. Every table must list the directory in the first row, followed by its respective files or subdirectories. **Every single file or directory must have its own dedicated row.**

```markdown
# Repository Index

This file is the entry point for understanding the project structure. Agents MUST read it first, and keep it updated whenever the structure or indexed content of this repository changes. It reflects only the files and directories that exist in this repository.

Agent rules are not kept in this repository. They live in the portable `.agents` instruction set used alongside it.

## Root Files

| Directory / File | Purpose |
|---|---|
| [`./`](./) | Repository root directory. |
| [`INDEX.md`](INDEX.md) | This project structure index. |
| [`README.md`](README.md) | Human-facing project overview. |
| [`package.json`](package.json) | Core dependency and build configuration. |
| [`Dockerfile`](Dockerfile) | Main Docker image configuration. |
| [`docker-compose.yml`](docker-compose.yml) | Multi-container orchestration. |
| [`.gitignore`](.gitignore) | Git ignore configuration. |
| [`.gitattributes`](.gitattributes) | Git attributes configuration. |

## Source Modules / Architecture

Description of the overall architectural patterns (e.g., MVC, Monolith, Multi-module, Microservices). All core packages or directories must be listed below.

### [Module/Layer Name]

Description of the responsibility of this specific module or layer.

| Directory / File | Purpose |
|---|---|
| [`src/`](src/) | Root source directory. |
| [`src/core/`](src/core/) | Core business logic and types. |
| [`src/api/`](src/api/) | API routes, controllers, or contracts. |
| [`src/infrastructure/`](src/infrastructure/) | Database connections, external service clients, or drivers. |

*(Repeat the module/layer block above for every major module, package, or application layer in the repository)*

## Documentation

| Directory / File | Purpose |
|---|---|
| [`wiki/`](wiki/) | Human-facing documentation root directory. |
| [`wiki/api.md`](wiki/api.md) | API specifications and endpoints. |
| [`wiki/environment.md`](wiki/environment.md) | Environment configuration, variables, and infrastructure examples. |
| [`wiki/requirements.md`](wiki/requirements.md) | Project requirements. |
| [`wiki/system.md`](wiki/system.md) | System architecture documentation. |
```

### Agent Directories

All agent-specific files and configurations must be centralized under the `.agents/` directory. Each repository will have its own `.agents/` directory. Agents must strictly use the agent directory belonging to the current repository and must not use or cross-reference `.agents/` directories from another repository.
* `.agents/`: Root directory for all agent configurations.
* `.agents/skills/`: Specific skill definitions and execution steps.
* `.agents/tools/`: Tool definitions and schemas.
* `.agents/knowledge/`: Domain-specific context.
* `.agents/personas/`: Specific roles to adopt.
* `.agents/ethics/`: Safety bounds and constraints.

### Git & Branching Workflow (STRICT)

* **Task Management:** If the user provides one or multiple tasks, each task must have its own branch created, a pull request (PR) opened, and be merged separately.
* **No Master/Main:** Never work directly on the `main` or `master` branches. Create a new branch if the task scope changes; otherwise, continue on the active branch.
* **Branch Naming & Validation:** Must follow `{type}/{primary-noun}` (e.g., `feat/login`). Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. Absolutely do not use preset prefixes (e.g., `claude/`, `codex/`). If a created branch does not follow the naming convention, you must recreate it (rewrite the branch name and delete the incorrect branch) or provide the user with options on how to proceed.
* **Commit Frequency & Verification:** Commit each change or group related commits. Do not wait for the entire session to finish. Always check the diff before creating a commit.
* **Commits:** Must use Conventional Commits (`type[optional scope]: description`). Commit messages must be plain text with **no links** or Jira IDs.
* **Pull Requests (PR):** Open sequentially. Always ask for user approval first. Provide a detailed report of added/modified/deleted features in the PR body. PR titles and descriptions must contain **no links**. Assume any references to github.com or gitlab.com are for their cloud-hosted environments.
