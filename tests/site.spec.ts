import { test, expect } from '@playwright/test'

test('home has separate cards and localized complete articles', async ({ page }) => {
  await page.goto('/pt/')
  await expect(page.locator('.gist-card')).toHaveCount(2)
  await expect(page.locator('.post-row')).toHaveCount(3)
  await page.locator('.post-row').filter({ hasText: 'Montessori' }).click()
  await expect(page.locator('.article-copy img')).toHaveCount(12)
  await expect(page.locator('.article-copy a[href$=".stl"]')).toHaveCount(2)
  await page.locator('.locale-toggle a').click()
  await expect(page).toHaveURL(/\/en\/posts\//)
  await expect(page.locator('h1')).toHaveText('Building a 4-in-1 Montessori Learning Tower')
})

test('mobile navigation, keyboard dismissal, and persistent theme', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/pt/')
  const menu = page.locator('.mobile-menu')
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('.tree-list')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await page.locator('.theme-switch').click()
  const theme = await page.locator('html').getAttribute('data-color-mode')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-color-mode', theme!)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('navigation and content remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto('http://localhost:4322/en/')
  await expect(page.locator('.sidebar-nav')).toBeVisible()
  await page.locator('.post-row').first().click()
  await expect(page.locator('.article-copy')).toBeVisible()
  await context.close()
})
