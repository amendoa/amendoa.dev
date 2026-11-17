# Static Astro site and localized URLs

Status: accepted  
Date: 2026-11-05  
Decision owner: Matheus Silva de Almeida

## Context

The blog serves Portuguese and English content at separate static URLs with Primer styling and an accessible, content-first shell.

## Decision

Use Astro static output with Markdown content collections and Primer primitives. Prefix both languages with `/pt/` and `/en/`; connect translations with a stable key. English routes without an English translation display the Portuguese body with a notice and are excluded from indexing until translated. Redirect historical public URLs through Cloudflare Pages.

## Alternatives and consequences

An unprefixed Portuguese default would preserve more URLs directly but makes the two languages asymmetric. Prefixing both requires permanent redirects and a root redirect. Maintaining separate translation files makes language content explicit but requires authors to maintain matching keys. Cloudflare Pages serves the redirects defined in `public/_redirects`.

