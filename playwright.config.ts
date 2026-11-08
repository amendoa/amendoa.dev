import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  use: { baseURL: process.env.TEST_URL ?? 'http://localhost:4322' },
  reporter: 'list',
})
