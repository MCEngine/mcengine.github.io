/*
 * MCEngine shared page script.
 * Served at https://mcengine.github.io/scripts/main/script.js and imported
 * by every MCEngine ecosystem site.
 *
 * Page transition controller. Fades the page out before following internal
 * links; the entry animation is pure CSS (styles/main/style.css) so pages
 * still render normally without JavaScript.
 */
(function () {
  "use strict";

  var EXIT_DURATION_MS = 220;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Restore the page when it is served from the back/forward cache.
  window.addEventListener("pageshow", function () {
    document.body.classList.remove("page-exit");
  });

  document.addEventListener("DOMContentLoaded", function () {
    if (reducedMotion.matches) {
      return;
    }

    var links = document.querySelectorAll("a[href]");

    links.forEach(function (link) {
      var url;
      try {
        url = new URL(link.getAttribute("href"), window.location.href);
      } catch (err) {
        return;
      }

      var isInternalPage =
        url.origin === window.location.origin &&
        !link.hasAttribute("target") &&
        !link.hasAttribute("download") &&
        url.hash === "";

      if (!isInternalPage) {
        return;
      }

      link.addEventListener("click", function (event) {
        // Keep default behaviour for modified clicks (new tab, download, ...).
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
          return;
        }

        event.preventDefault();
        document.body.classList.add("page-exit");

        window.setTimeout(function () {
          window.location.href = url.href;
        }, EXIT_DURATION_MS);
      });
    });
  });
})();
