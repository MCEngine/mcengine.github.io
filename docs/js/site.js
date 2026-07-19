/*
 * Silver Glass — runtime include loader (see DESIGN.md §6).
 *
 * Each page sets two globals in <head> before this script runs:
 *   window.SITE_ROOT    relative path back to the site root ("", "../", ...)
 *   window.PAGE_SECTION  section id used to highlight the active nav link
 *
 * This loader fetches partials/header.html and partials/footer.html, replaces
 * the {{ROOT}} token with SITE_ROOT, wires the mobile menu and active link,
 * injects a favicon, and stamps the footer year. Because it uses fetch(), the
 * site must be served over HTTP (not opened as file://).
 */
(function () {
  "use strict";

  var ROOT = typeof window.SITE_ROOT === "string" ? window.SITE_ROOT : "";
  var SECTION = window.PAGE_SECTION || "";

  function inject(id, url, after) {
    var mount = document.getElementById(id);
    if (!mount) {
      return;
    }
    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP " + response.status + " for " + url);
        }
        return response.text();
      })
      .then(function (html) {
        mount.innerHTML = html.split("{{ROOT}}").join(ROOT);
        if (typeof after === "function") {
          after(mount);
        }
      })
      .catch(function (err) {
        console.error("site.js: failed to load " + url, err);
      });
  }

  function wireHeader(headerEl) {
    if (SECTION) {
      var active = headerEl.querySelector('.nav__link[data-section="' + SECTION + '"]');
      if (active) {
        active.classList.add("is-active");
      }
    }

    var toggle = headerEl.querySelector(".nav__toggle");
    var links = headerEl.querySelector(".nav__links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          links.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  function wireFooter(footerEl) {
    var year = String(new Date().getFullYear());
    footerEl.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = year;
    });
  }

  function injectFavicon() {
    if (document.querySelector('link[rel="icon"]')) {
      return;
    }
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#b9c2d0"/>' +
      '<stop offset="1" stop-color="#5b7189"/></linearGradient></defs>' +
      '<rect x="3" y="3" width="26" height="26" rx="7" fill="url(#g)"/></svg>';
    var link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = "data:image/svg+xml," + encodeURIComponent(svg);
    document.head.appendChild(link);
  }

  function start() {
    injectFavicon();
    inject("site-header", ROOT + "partials/header.html", wireHeader);
    inject("site-footer", ROOT + "partials/footer.html", wireFooter);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
