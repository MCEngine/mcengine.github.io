# API

This repository has no server API. Its "API" is the contract of the shared,
portable front-end system described in `DESIGN.md` — the runtime include system
and the shared theme assets. Pages and other repositories integrate against
these.

## Runtime include contract

Each page sets two globals in `<head>` before `js/site.js` runs:

```html
<script>
  window.SITE_ROOT = "../";      // relative path back to docs/ root
  window.PAGE_SECTION = "github"; // section id for active-nav highlighting
</script>
```

| Global | Type | Purpose |
|---|---|---|
| `window.SITE_ROOT` | string | Relative path from the page to the site root (`""`, `"../"`, `"../../"`, …). Used to resolve partial and internal-link URLs. |
| `window.PAGE_SECTION` | string | Matches a `data-section` value in the header so the active link is highlighted. |

Mount points the loader fills:

```html
<div id="site-header"></div>
<div id="site-footer"></div>
```

`js/site.js` fetches `partials/header.html` and `partials/footer.html`, replaces
the `{{ROOT}}` token with `SITE_ROOT`, wires the mobile menu and active link,
injects a favicon, and stamps the footer year.

## Section-root depth reference

| Page | `SITE_ROOT` |
|---|---|
| `docs/index.html` | `""` |
| `docs/{module}/index.html` | `"../"` |
| `docs/{module}/logs/index.html` | `"../../"` |
| `docs/{module}/logs/{maj}/{min}/{patch}/index.html` | `"../../../../../"` |

## Shared theme assets (imported by other sites)

Legacy shared assets remain available at stable URLs for existing consumers:

* `https://mcengine.github.io/styles/main/style.css`
* `https://mcengine.github.io/styles/important/main.css`
* `https://mcengine.github.io/scripts/main/script.js`
