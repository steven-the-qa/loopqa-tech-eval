import { expect, type Page, type Locator } from '@playwright/test';

// Helper function to navigate to a project
export async function navigateToProject(page: Page, projectName: string): Promise<void> {
  await page.getByRole('button', { name: new RegExp(`^${projectName}`) }).click();
  await expect(page.getByRole('banner').getByRole('heading', { name: projectName })).toBeVisible();
}

// Helper function to get a column section
export function getColumnSection(page: Page, columnName: string): Locator {
  return page.getByRole('heading', { name: new RegExp(`^${columnName}`) }).locator('..');
}

// Helper function to verify task exists in column and get its card
export function getTaskCard(section: Locator, taskName: string): Locator {
  return section.getByRole('heading', { name: taskName }).locator('..');
}

// Helper function to verify task tags
export async function verifyTaskTags(taskCard: Locator, tags: readonly string[]): Promise<void> {
  for (const tag of tags) {
    await expect(taskCard.getByText(tag, { exact: true })).toBeVisible();
  }
}
