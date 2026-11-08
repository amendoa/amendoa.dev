# Deployment and rollback

The GitHub Actions delivery workflow deploys the blog to the Cloudflare Pages project `amendoadev` on pushes to `main`. It installs dependencies from the lockfile on Node 24, updates the version and changelog, checks the application, builds `dist/`, archives it as `dist.tar.gz`, and publishes the release asset. Deployment credentials are stored in GitHub secrets.

For a production change, run the checks in the [development guide](development.md) and inspect both locales and themes. If routes or redirects change, verify their behavior in a Cloudflare Pages preview. The root path redirects to `/pt/`; `public/_redirects` also covers historical article, folder, tag and disclosure URLs. The feed at `/index.xml` lists Portuguese posts, and the sitemap is at `/sitemap.xml`.

Astro also generates a redirect for the historical setup article at `/how-i-built-my-blog-with-quartz`, which points to its Portuguese post. Cloudflare Pages serves the rules in `public/_redirects`.

Local build commands generate files without deploying them. To roll back, select a preceding successful production deployment in Cloudflare Pages. Release archives contain the corresponding static output if redeployment is necessary.
