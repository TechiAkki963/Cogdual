import { expect, test } from '@playwright/test';

const routes = [
  { name: 'home', path: '/' },
  { name: 'certifications', path: '/certifications' },
  { name: 'employers', path: '/employers' },
  { name: 'colleges', path: '/colleges' },
  { name: 'privacy', path: '/privacy' },
  { name: 'terms', path: '/terms' },
  { name: 'offline', path: '/offline' },
] as const;

const viewports = [
  { name: '360x800', width: 360, height: 800 },
  { name: '390x844', width: 390, height: 844 },
  { name: '430x932', width: 430, height: 932 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1920x1080', width: 1920, height: 1080 },
] as const;

async function settle(page: import('@playwright/test').Page, colorScheme: 'light' | 'dark' = 'light') {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme });
  await page.addStyleTag({
    content: `*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}`,
  });
  await page.evaluate(async () => {
    if ('fonts' in document) await document.fonts.ready;
  });
  await page.waitForTimeout(80);
}

test.describe('visual acceptance screenshots', () => {
  test.setTimeout(8 * 60 * 1000);

  test('capture every public screen across target viewports', async ({ page }) => {
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      for (const route of routes) {
        await page.goto(route.path, { waitUntil: 'domcontentloaded' });
        await settle(page);
        await expect(page.locator('main')).toBeVisible();
        await page.screenshot({
          path: `visual-artifacts/${viewport.name}/${route.name}.png`,
          fullPage: true,
        });
      }
    }
  });

  test('capture application sheet on mobile and desktop', async ({ page }) => {
    for (const viewport of [viewports[1], viewports[6]]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/', { waitUntil: 'load' });
      await settle(page);
      await page.locator('#jobs').scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);

      const firstJob = page.getByRole('article').filter({ hasText: 'Node JS Developer' });
      const applyButton = firstJob.getByRole('button', { name: 'Apply' });
      await expect(applyButton).toBeVisible();
      await applyButton.click();
      await expect(page.getByRole('heading', { name: 'Apply in under a minute' })).toBeVisible({ timeout: 10_000 });
      await page.screenshot({
        path: `visual-artifacts/${viewport.name}/application-sheet.png`,
        fullPage: false,
      });
      await page.getByRole('button', { name: 'Close application form' }).click();
    }
  });

  test('capture dark-mode reference screens', async ({ page }) => {
    for (const viewport of [viewports[1], viewports[6]]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await settle(page, 'dark');
      await page.screenshot({
        path: `visual-artifacts/${viewport.name}/home-dark.png`,
        fullPage: true,
      });
    }
  });
});
