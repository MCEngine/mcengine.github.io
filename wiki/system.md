# System

## Overview

A static, dependency-free documentation site. The visual language is the
**Silver Glass** design system (`DESIGN.md`); pages compose shared components and
inject a shared header/footer at runtime.

## Layers

```
DESIGN.md                     source of truth for the visual language
docs/
  css/
    main.css                  :root tokens + base element styles
    shared/layout.css         header, nav, footer, breadcrumbs, container
    shared/components.css      cards, accordions, tables, badges, buttons, callouts
    {section}/{section}.css    per-section layout only (home, repo, logs)
  js/site.js                  runtime include loader
  partials/header.html        shared nav (uses {{ROOT}} tokens + data-section)
  partials/footer.html        shared footer
  index.html                  homepage
  {module}/index.html         module usage page
  {module}/logs/…             versioned change logs
```

A page links stylesheets in order: `main.css` → `shared/layout.css` →
`shared/components.css` → `{section}/{section}.css`.

## Runtime include flow

1. The page sets `window.SITE_ROOT` and `window.PAGE_SECTION`, then loads
   `js/site.js`.
2. `site.js` fetches `partials/header.html` and `partials/footer.html`.
3. It replaces `{{ROOT}}` with `SITE_ROOT`, injects the markup into
   `#site-header` / `#site-footer`, highlights the active nav link, wires the
   mobile menu, injects a favicon, and stamps the footer year.

Because it uses `fetch()`, the site must be served over HTTP.

## Change-log model

Logs use a versioned directory structure so every build has a permanent URL:
`docs/{module}/logs/{major}/{minor}/{patch}/index.html`. The module's
`logs/index.html` mirrors the latest version and links every version in a
side navigation, newest first, with a `Latest` pill on the newest.

## Legacy shared assets

`docs/styles/` and `docs/scripts/` predate the Silver Glass system and remain in
place because external ecosystem sites import them by URL. Keep them working when
changing site structure.
