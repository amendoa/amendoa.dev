# Development and authoring

See the [README](../README.md) for setup and commands. All application code is under `src/`. Read [DESIGN.md](../DESIGN.md) before UI changes and preserve its approved layout and interaction behavior.

## Local hostnames

Copy `.env.example` to `.env` and set `DEV_ALLOWED_HOSTS` to a comma-separated list of development hostnames, without protocols or ports (for example, `matrix.local,blog.local`). The root `.env` is ignored by Git. A shell environment value takes precedence. With no value set, Vite's default localhost and IP-address access remains available. Restart the development server after changing the variable.

## Content

Add Markdown under `src/content/posts/pt/` and `src/content/posts/en/`. Use `title`, `lang`, `translationKey`, and `routeSlug`; optional fields are `category`, `tags`, `date`, `draft` and `aiAssisted`. Translation keys pair the two versions; category paths can contain `/` to create nested Explorer folders. Duplicate authored keys or routes fail the build. Posts sort by `date`, newest first, with title as the tie-breaker; undated entries follow dated entries. Use `YYYY-MM-DD` and the same date in both versions.

An absent English entry produces an English route containing the Portuguese body. Add the English file with the matching translation key when ready. Until then, a notice identifies the content language, and the fallback is excluded from sitemap indexing. All published posts currently have English translations.

Use `aiAssisted: true` only when the author declares it; this displays a link to the localized disclosure. Group images and downloads by article under `public/attachments/<markdown-filename-without-extension>/`, shared by both languages. The folder name must match the post’s Markdown filename, not its localized URL slug. Use standard Markdown links and `/attachments/<markdown-filename-without-extension>/<filename>` URLs. Update article references when moving files. The published posts cover Bindfs, the Montessori learning tower, and a Quartz setup tutorial.

To embed an STL preview, wrap its title and download link in `<stl-viewer src="/attachments/.../part.stl" title="Model title"><strong>Model title</strong><a href="/attachments/.../part.stl" download>Download STL</a></stl-viewer>`. Use the same file URL in `src` and `href`, and translate the title and button in each locale. The viewer loads when scrolled into view; the title and link remain available without JavaScript.

Unlinked images in article content can be clicked or activated with Enter or Space to open a larger view. Linked images keep their normal link action. Use meaningful alt text when an image conveys information; the zoom dialog reuses it.

## Article projects

Keep standalone projects accompanying articles in `article-projects/<markdown-filename-without-extension>/`. Link to the project folder from both language versions. These projects are separate from the blog application.

## Checks

`pnpm check` validates Astro and TypeScript; `pnpm build` generates static output. With a server running on `localhost:4322`, `pnpm test:e2e` checks language navigation, article media and downloads, STL and image previews, mobile navigation, theme persistence, and JavaScript-disabled access. The viewer test loads one STL but does not validate its geometry. `TEST_URL` sets Playwright's base URL; the JavaScript-disabled checks use port 4322 directly. Check desktop/mobile light/dark layouts against DESIGN.md after visual changes. Test HTTP redirect changes on Cloudflare Pages.

The shared social card is `public/social-card.png`; its editable source is `src/assets/social-card.svg`. Export the source at 1200×630 pixels after edits, keeping its embedded alien logo in sync with `public/logo.svg`. Check the generated Open Graph and Twitter image URLs in both locales, then inspect a live sharing preview after deployment.
