import { defineConfig } from 'astro/config'
import { loadEnvFile } from 'node:process'

try {
  loadEnvFile(new URL('./.env', import.meta.url))
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}

const allowedHosts = (process.env.DEV_ALLOWED_HOSTS ?? '')
  .split(',')
  .map(host => host.trim())
  .filter(Boolean)

export default defineConfig({
  site: 'https://amendoa.dev',
  output: 'static',
  devToolbar: { enabled: false },
  server: { host: true },
  vite: { server: { allowedHosts } },
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false },
  },
})
