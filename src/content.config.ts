import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

const locale = z.enum(['pt', 'en'])
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({ title: z.string(), lang: locale, translationKey: z.string(), routeSlug: z.string(), category: z.string().optional(), tags: z.array(z.string()).default([]), date: z.coerce.date().optional(), aiAssisted: z.boolean().default(false), draft: z.boolean().default(false) }),
})
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({ title: z.string(), lang: locale, translationKey: z.string() }),
})
export const collections = { posts, pages }
