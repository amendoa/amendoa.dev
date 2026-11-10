# Architecture

The blog is a static Astro application. `src/content.config.ts` validates Markdown collections in `src/content/posts/{pt,en}/` and `src/content/pages/{pt,en}/`. Public images and STL downloads live in folders under `public/attachments/` named after each post’s Markdown filename without `.md`, shared by both locales; `public/logo.svg` is the site logo.

`src/lib/content.ts` resolves translation keys, locale URLs, descriptions, English fallbacks and ordering. Astro's `getStaticPaths()` generates localized pages during the build. `src/layouts/BaseLayout.astro` supplies the shared shell; components supply the folder tree, Octicons and post list. No server, React hydration, runtime content API, or client router is needed.

Article pages enhance `<stl-viewer>` elements from Markdown. The small initializer loads Three.js, its STL loader and orbit controls only when a viewer enters the viewport. Rendering runs on camera or size changes. The authored download link remains available if scripting, WebGL or the model load fails.

Article images open in a native `<dialog>` through a small script on post pages. Linked images retain their link behavior; unlinked images become keyboard-accessible zoom controls. The original content remains readable without scripting.

`src/styles/primer.css` imports official Primer packages; `site.css` implements the [approved reference geometry](../../DESIGN.md). Client JavaScript handles theme preference and mobile navigation. `BaseLayout.astro` emits localized page and social metadata with a shared image at `public/social-card.png`. The sitemap and Portuguese RSS feed are built into XML files. Astro generates a static redirect page for the historical setup article; Cloudflare Pages serves the HTTP redirects defined in `public/_redirects`.

See the [routing decision](../decisions/2026-11-05-astro-localized-routes.md), [development guide](../development.md), and [deployment guide](../deployment.md).
