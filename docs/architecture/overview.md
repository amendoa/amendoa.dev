# Architecture overview

This document describes the repository as currently implemented.

- Markdown under `content/` is the blog's authored content; some pages contain Portuguese and English in the same file.
- `quartz.config.ts` selects Quartz plugins, site configuration, and theme colors. The custom `EnglishVersion` transformer replaces an HTML comment marker with a visible English-section marker.
- `quartz.layout.ts` selects Quartz and repository-owned components for content and list pages. `components/` contains the custom logo, English-section link, and article metadata wrapper. The wrapper composes Quartz's metadata component and adds a sparkle icon and link to `content/ai.md` when `aiAssisted` is the boolean `true` in article frontmatter. Explorer excludes the disclosure page while retaining the default tags exclusion.
- `Makefile` downloads Quartz v4.5.1 into the ignored `quartz/` directory, links the repository's content and configuration, copies static assets, and installs dependencies. `pnpm dev` serves the site; `pnpm build` generates `dist/` through the scripts in `scripts/`.
- The delivery workflow builds the site and deploys its output to Cloudflare Pages on pushes to `main`.

The [development guide](../development.md) explains how authors opt articles into the disclosure.
