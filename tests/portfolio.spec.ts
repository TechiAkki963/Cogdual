import { expect, test } from '@playwright/test';

test.describe('portfolio journeys on mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('home exposes all primary audience routes', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /build skills\. find talent/i })).toBeVisible();

    const audienceRoutes = page.locator('.audience-route-grid');
    await expect(audienceRoutes.getByRole('link', { name: /view certifications/i })).toBeVisible();
    await expect(audienceRoutes.getByRole('link', { name: /employer solutions/i })).toBeVisible();
    await expect(audienceRoutes.getByRole('link', { name: /college programmes/i })).toBeVisible();
  });

  test('certification journey exposes brands and voucher types', async ({ page }) => {
    await page.goto('/certifications');
    await expect(page.getByRole('heading', { name: /recognised proof of skill/i })).toBeVisible();
    await expect(page.getByText('Microsoft', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Exam' })).toBeVisible();
  });

  test('employer journey exposes recruitment commercial bands', async ({ page }) => {
    await page.goto('/employers');
    await expect(page.getByRole('heading', { name: /hire well/i })).toBeVisible();
    await expect(page.getByText('8.33% + GST')).toBeVisible();
    await expect(page.getByText('15% + GST')).toBeVisible();
  });

  test('college journey exposes VConnect programmes', async ({ page }) => {
    await page.goto('/colleges');
    await expect(page.getByRole('heading', { name: /industry experience into the classroom/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /faculty development programmes/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /curriculum creation/i })).toBeVisible();
  });
});
