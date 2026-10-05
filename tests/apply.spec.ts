import { expect, test } from '@playwright/test';

test('candidate can open a job and complete the application flow on mobile', async ({ page }) => {
  await page.route('**/api/upload-url', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        ok: true,
        uploadUrl: 'https://upload.example/resume',
        key: 'applications/test/resume.pdf',
        submissionToken: 'test-submission-token-that-is-long-enough',
        uploadFields: { key: 'applications/test/resume.pdf', policy: 'test-policy' },
      }),
    });
  });

  await page.route('https://upload.example/resume', async (route) => {
    await route.fulfill({ status: 200, body: '' });
  });

  await page.route('**/api/apply', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        ok: true,
        message: 'Application sent. The Cogdual recruitment team can now review your profile.',
      }),
    });
  });

  await page.goto('/');
  await page.getByRole('link', { name: 'Jobs', exact: true }).last().click();
  await expect(page.getByRole('heading', { name: 'Node JS Developer' })).toBeVisible();

  const nodeJob = page.getByRole('article').filter({ hasText: 'Node JS Developer' });
  await nodeJob.getByRole('button', { name: 'Apply' }).click();

  const applicationDialog = page.getByRole('dialog');
  await expect(applicationDialog.getByRole('heading', { name: 'Apply in under a minute' })).toBeVisible();
  await applicationDialog.getByLabel('Full name').fill('Asha Kumar');
  await applicationDialog.getByLabel('Phone').fill('+91 98765 43210');
  await applicationDialog.getByLabel('Email').fill('asha@example.com');
  await applicationDialog.getByLabel('Message').fill('Available to interview next week.');
  await applicationDialog.getByLabel('Resume').setInputFiles({
    name: 'asha-resume.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.4 test resume'),
  });

  await applicationDialog.getByRole('button', { name: 'Send application' }).click();
  await expect(
    applicationDialog.getByText('Application sent. The Cogdual recruitment team can now review your profile.'),
  ).toBeVisible();
});

test('job chips filter remote and office roles', async ({ page }) => {
  await page.goto('/#jobs');
  await page.getByRole('button', { name: 'Office' }).click();
  await expect(page.getByRole('heading', { name: 'Java Full Stack Developer' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Node JS Developer' })).toHaveCount(0);

  await page.getByRole('button', { name: 'Remote' }).click();
  await expect(page.getByRole('heading', { name: 'Node JS Developer' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Java Full Stack Developer' })).toHaveCount(0);
});
