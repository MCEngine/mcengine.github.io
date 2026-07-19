# Environment

## Hosting

The site is served by **GitHub Pages** from the `docs/` directory on the default
branch. There is no build step, no server runtime, and no environment variables
or secrets are required to build or serve the site.

Do not create a `.nojekyll` file; the static files are served as-is.

## Local preview

Because the header and footer are fetched at runtime, always serve over HTTP —
do not open the pages as `file://`:

```bash
python3 -m http.server 8000 --directory docs
# then open http://localhost:8000/
```

Click through the affected pages and confirm the header/footer load, links
resolve, and the browser console shows no errors.

## Notes

* No external fonts, scripts, stylesheets, CDNs, trackers, or network calls at
  runtime — everything is in-repo.
* The module documentation references the consumer environment variables
  `GITHUB_ACTOR` and `GITHUB_TOKEN`, which a *consumer* sets to pull the
  published artifacts from GitHub Packages. They are not used by this website.
