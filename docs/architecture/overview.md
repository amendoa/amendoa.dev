# Architecture

The blog is a static Astro application. `src/content.config.ts` validates Markdown collections in `src/content/posts/{pt,en}/` and `src/content/pages/{pt,en}/`. Public images and STL downloads live in folders under `public/attachments/` named after each post’s Markdown filename without `.md`, shared by both locales; `public/logo.svg` is the site logo.

`src/lib/content.ts` resolves translation keys, locale URLs, descriptions, English fallbacks and ordering. Astro's `getStaticPaths()` generates localized pages during the build. `src/layouts/BaseLayout.astro` supplies the shared shell; components supply the folder tree, Octicons and post list. No server, React hydration, runtime content API, or client router is needed.

`src/styles/primer.css` imports official Primer packages; `site.css` implements the [approved reference geometry](../../DESIGN.md). Client JavaScript handles theme preference and mobile navigation. The sitemap and Portuguese RSS feed are built into XML files. Astro generates a static redirect page for the historical setup article; Cloudflare Pages serves the HTTP redirects defined in `public/_redirects`.

See the [routing decision](../decisions/2026-11-05-astro-localized-routes.md), [development guide](../development.md), and [deployment guide](../deployment.md).
