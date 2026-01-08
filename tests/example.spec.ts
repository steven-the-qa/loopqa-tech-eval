import { test, expect } from './fixtures';
import type { Page, Locator } from '@playwright/test';

// Helper function to navigate to a project
async function navigateToProject(page: Page, projectName: string) {
  await page.getByRole('button', { name: new RegExp(`^${projectName}`) }).click();
  await expect(page.getByRole('banner').getByRole('heading', { name: projectName })).toBeVisible();
}

// Helper function to get a column section
function getColumnSection(page: Page, columnName: string): Locator {
  return page.getByRole('heading', { name: new RegExp(`^${columnName}`) }).locator('..');
}

// Helper function to verify task exists in column and get its card
function getTaskCard(section: Locator, taskName: string): Locator {
  return section.getByRole('heading', { name: taskName }).locator('..');
}

// Helper function to verify task tags
async function verifyTaskTags(taskCard: Locator, tags: readonly string[]) {
  for (const tag of tags) {
    await expect(taskCard.getByText(tag, { exact: true })).toBeVisible();
  }
}

// Test data: all test cases
const testCases = [
  {
    project: 'Web Application',
    taskName: 'Implement user authentication',
    column: 'To Do',
    tags: ['Feature', 'High Priority'],
  },
  {
    project: 'Web Application',
    taskName: 'Fix navigation bug',
    column: 'To Do',
    tags: ['Bug'],
  },
  {
    project: 'Web Application',
    taskName: 'Design system updates',
    column: 'In Progress',
    tags: ['Design'],
  },
  {
    project: 'Mobile Application',
    taskName: 'Push notification system',
    column: 'To Do',
    tags: ['Feature'],
  },
  {
    project: 'Mobile Application',
    taskName: 'Offline mode',
    column: 'In Progress',
    tags: ['Feature', 'High Priority'],
  },
  {
    project: 'Mobile Application',
    taskName: 'App icon design',
    column: 'Done',
    tags: ['Design'],
  },
] as const;

// Data-driven test using test.each
for (const testCase of testCases) {
  test(`Test Case: Verify ${testCase.taskName} in ${testCase.project} project`, async ({ page }) => {
    // Navigate to project
    await navigateToProject(page, testCase.project);

    // Get column section
    const columnSection = getColumnSection(page, testCase.column);

    // Verify task exists
    await expect(columnSection.getByRole('heading', { name: testCase.taskName })).toBeVisible();

    // Get task card
    const taskCard = getTaskCard(columnSection, testCase.taskName);

    // Verify tags
    await verifyTaskTags(taskCard, testCase.tags);
  });
}
