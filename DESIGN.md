# amendoa.dev design

Status: approved production interface. Owner: Matheus Silva de Almeida. Updated: 2026-11-07.

## Reference and scope

This document is the source of truth for the approved layout, typography, colors and interactions. Future changes must preserve this baseline unless the owner explicitly requests or approves a change. Feature additions and refactors must not introduce an incidental redesign.

Implementation lives in the [shared layout](src/layouts/BaseLayout.astro), [site styles](src/styles/site.css), and [Primer imports](src/styles/primer.css). Use this specification and the running application to review changes; no external visual reference files are required.

Before changing the interface, read this specification and inspect the affected implementation. Verify the result at desktop and mobile widths, in both themes, including keyboard behavior. Update this document when an approved change alters the baseline.

## Shell and pages

The desktop shell uses a 1210px outer container, 235px sidebar, 55px gutter, and up to 820px main column. Below 1050px the sidebar and gutter become narrower; below 730px the layout becomes one column. Mobile uses a brand/theme/menu row, collapsible navigation, and visible breadcrumb and PT/EN links. At 390px the cards use 12px page margins.

Home contains two independent bordered cards: Sobre/About with the author's introduction and social links, followed by all posts with titles, excerpts from the actual content, category and language metadata. Card headers have no filename or Markdown decorations. Article pages reuse the shell and display the complete Markdown, metadata, code, images and downloads. The AI disclosure appears only when explicitly declared by the article.

Explorer is built from category paths, supports nested native folder disclosures, and highlights the active article. Folders start expanded. Only the disclosure arrow rotates, by 90 degrees over 150ms; the folder itself never rotates. The closed state uses the `file-directory` Octicon and the open state uses `file-directory-open-fill`. Each folder's visuals follow its own disclosure state independently of its ancestors. Home and All posts navigate with normal links. No graph, search, SPA shell or generated biography is included.

Both total-post counters use Primer's `--base-text-size-xs` token (12px). The sidebar counter is a compact bordered pill with 4px horizontal padding and a 16px line height. The Posts card header displays the current count in plain muted monospace text, without a pill.

## GitHub Primer

Official `@primer/primitives` supplies functional light/dark color themes, base and functional typography, font stacks, spacing, border widths and radii. Official `@primer/css` supplies Markdown and button styles; `@primer/octicons` supplies icons. Site CSS implements the approved layout geometry using these tokens. The original SVG alien retains its brand colors; UI colors come from Primer. No external font download is required.

Themes use `data-color-mode`, `data-light-theme`, and `data-dark-theme`. Initial appearance follows the system; a saved choice takes precedence before first paint. The 36px square theme button displays a sun in light mode and a moon in dark mode. Both icons are centered horizontally and vertically, with no text-baseline offset. Its accessible label describes switching to the other theme. The choice persists across pages. Keyboard focus remains visible and reduced-motion preference is respected.

## Reading typography

The approved typography uses these official Primer tokens:

| Use | Token | Value |
| --- | --- | --- |
| Interface and reading font | `--fontStack-sansSerif` | Primer system sans-serif stack |
| Code and monospace counters | `--fontStack-monospace` | Primer system monospace stack |
| About text, article text and post-list titles | `--base-text-size-md` | 16px |
| Reading line height | `--base-text-lineHeight-normal` | 1.5 (24px at 16px) |
| Descriptions, navigation and Explorer | `--base-text-size-sm` | 14px |
| Compact metadata and post counters | `--base-text-size-xs` | 12px |
| About heading | `--base-text-size-xl` | 32px |
| Article section headings | `--base-size-24` | 24px |

Mobile does not shrink reading text. Code uses 85% of the reading size, matching GitHub Markdown.

The About heading is 32px at every breakpoint. Article titles scale up to 34px on desktop, use 28px below 730px, and 25px below 450px. Article section headings are 24px. Card headers, breadcrumbs and social links use 14px. Code blocks use 13.6px text with approximately 19.72px line height and horizontal scrolling when needed; the page itself must not overflow horizontally.

## Social preview

The shared 1200×630 social card pairs the alien logo with the site name and author. Its dark background, card, border, primary text and muted text use the corresponding Primer dark color values. The card is language neutral; page metadata supplies localized titles and descriptions. Its editable source is `src/assets/social-card.svg`, and the published image is `public/social-card.png`.

## Language and accessibility

Every article has `/pt/posts/{slug}/` and `/en/posts/{slug}/` URLs. Missing English content uses the Portuguese body with a translation-pending notice, a `pt-BR` body language, and no indexing until translated. Language controls navigate to the corresponding article. Normal navigation and Explorer work without JavaScript; mobile navigation remains expanded in that case. The enhanced menu supports Escape and exposes its expanded state.

The [routing decision](docs/decisions/2026-11-05-astro-localized-routes.md) documents localized URLs and redirects. Authored content is authoritative for copy, dates and article inventory.
