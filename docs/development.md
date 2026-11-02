# Development

See the [README](../README.md) for setup, local development, and the production build.

## AI-assisted writing disclosure

When AI assisted the writing of an article, add the boolean `aiAssisted: true` to its YAML frontmatter:

```yaml
---
title: Example article
aiAssisted: true
---
```

The article displays an “AI-assisted writing” link to the bilingual explanation at `/ai`. Omit the field or set it to `false` when the disclosure does not apply. Only the YAML boolean `true` enables the label; the quoted string `"true"` does not.
