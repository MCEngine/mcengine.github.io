/*
 * MCEngine shared page script.
 * Served from https://mcengine.github.io/scripts/main/script.js so every
 * site in the MCEngine ecosystem can import it directly. Fades pages in on
 * entry and out before following internal links. Pages render normally
 * without JavaScript, and motion is skipped for users who prefer reduced
 * motion.
 */
(function () {
    "use strict";

    var EXIT_DURATION_MS = 220;

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* Restore the page when it is served from the back/forward cache. */
    window.addEventListener("pageshow", function () {
        document.body.style.opacity = "";
    });

    document.addEventListener("DOMContentLoaded", function () {
        if (reducedMotion.matches) {
            return;
        }

        document.body.style.transition = "opacity " + EXIT_DURATION_MS + "ms ease";
        document.body.style.opacity = "0";
        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
                document.body.style.opacity = "1";
            });
        });

        document.querySelectorAll("a[href]").forEach(function (link) {
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
                /* Keep default behaviour for modified clicks (new tab, ...). */
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
                    return;
                }

                event.preventDefault();
                document.body.style.opacity = "0";

                window.setTimeout(function () {
                    window.location.href = url.href;
                }, EXIT_DURATION_MS);
            });
        });
    });
})();
