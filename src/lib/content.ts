import { getCollection, type CollectionEntry } from 'astro:content'
export type Locale = 'pt' | 'en'
export const locales: Locale[] = ['pt', 'en']
export const labels = {
  pt: { home: 'Início', all: 'Todos os posts', explore: 'EXPLORAR', about: 'Sobre', back: 'Voltar aos posts', themeDark: 'Mudar para tema escuro', themeLight: 'Mudar para tema claro', menu: 'Abrir navegação', ai: 'Escrita assistida por IA', source: 'Código, DIY e algumas anotações.' },
  en: { home: 'Home', all: 'All posts', explore: 'EXPLORE', about: 'About', back: 'Back to posts', themeDark: 'Switch to dark theme', themeLight: 'Switch to light theme', menu: 'Open navigation', ai: 'AI-assisted writing', source: 'Code, DIY, and a few notes.' },
}
export const postUrl = (post: CollectionEntry<'posts'>) => `/${post.data.lang}/posts/${post.data.routeSlug}/`
export const postDescription = (post: CollectionEntry<'posts'>) => (post.body ?? '').trim().split(/\n\s*\n/)[0].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').replace(/\s+/g, ' ')
export async function allPosts() {
  const entries = (await getCollection('posts')).filter(post => !post.data.draft)
  const keys = new Set<string>(), paths = new Set<string>()
  for (const post of entries) {
    const key = `${post.data.lang}:${post.data.translationKey}`, path = postUrl(post)
    if (keys.has(key) || paths.has(path)) throw new Error(`Duplicate content key or route: ${key}, ${path}`)
    keys.add(key); paths.add(path)
  }
  const fallbacks = entries.filter(post => post.data.lang === 'pt' && !keys.has(`en:${post.data.translationKey}`)).map(post => ({ ...post, data: { ...post.data, lang: 'en' as const }, fallback: true as const }))
  return [...entries, ...fallbacks].sort((a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0) || a.data.title.localeCompare(b.data.title))
}
export const otherLocale = (locale: Locale): Locale => locale === 'pt' ? 'en' : 'pt'
