import type { APIRoute } from 'astro'
import { allPosts, locales, postUrl } from '../lib/content'
export const GET: APIRoute = async ({ site }) => {
  const paths = [...locales.flatMap(locale => [`/${locale}/`, `/${locale}/ai/`]), ...(await allPosts()).filter(post => !('fallback' in post)).map(postUrl)]
  const urls = paths.map(path => `<url><loc>${new URL(path, site).href}</loc></url>`).join('')
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } })
}
