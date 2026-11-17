import type { APIRoute } from 'astro'
import { allPosts, postUrl } from '../lib/content'
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
export const GET: APIRoute = async ({ site }) => {
  const posts = (await allPosts()).filter(post => post.data.lang === 'pt')
  const items = posts.map(post => { const url = new URL(postUrl(post), site).href; return `<item><title>${escape(post.data.title)}</title><link>${url}</link><guid>${url}</guid>${post.data.date ? `<pubDate>${post.data.date.toUTCString()}</pubDate>` : ''}</item>` }).join('')
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>amendoa.dev</title><link>${site?.href}</link><description>amendoa.dev</description>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
