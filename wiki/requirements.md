# Requirements

## Purpose

`mcengine.github.io` is the static documentation website for the MCEngine
organization, served by GitHub Pages from `docs/`. It documents the MCEngine API
modules (`github`, `gitlab`) and hosts the shared theme assets that other
ecosystem sites import.

## Functional

* A homepage (`docs/index.html`) with card links to each module page and to the
  ecosystem sites.
* One page per module: `docs/github/index.html` and `docs/gitlab/index.html`,
  describing how to add and use the module.
* A change log per module:
  * `docs/{module}/logs/index.html` — always mirrors the latest release.
  * `docs/{module}/logs/{major}/{minor}/{patch}/index.html` — a permanent page
    per released version (Semantic Versioning).
* Shared header and footer injected at runtime so navigation lives in one place.

## Non functional

* **Self-contained.** No external fonts, scripts, stylesheets, CDNs, or runtime
  network calls. Everything ships in-repo.
* **Static only.** Plain HTML, CSS, and JavaScript; no build step.
* **Design system.** Follow `DESIGN.md` (Silver Glass): token-driven, layered
  CSS, accessible, responsive down to ~360px.
* **Content boundary.** Pages document *usage* of a module's public class only;
  they never expose internal implementation source (see `AGENTS.md`).
* **Backwards compatibility.** The shared assets under `docs/styles/` and
  `docs/scripts/` are imported by external sites and must not break.

## Versioning

* Newly created project starts at `0.0.0`. Every pull request updates the version
  using `Major.Minor.Patch`. Module log directories mirror the released version.
