import { test, expect } from './fixtures';

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

for (const testCase of testCases) {
  test(`Test Case: Verify ${testCase.taskName} in ${testCase.project} project`, async ({ page }) => {
    // ARRANGE - Define locators
    const loggedInHeading = page.getByRole('heading', { name: 'Projects' });
    const projectNameButton = page.getByRole('button', { name: testCase.project });
    const projectNameHeading = page.getByRole('banner').getByRole('heading', { name: testCase.project });
    const columnHeading = page.getByRole('heading', { name: testCase.column })
    const column = columnHeading.locator('..');
    const taskCardHeading = column.getByRole('heading', { name: testCase.taskName });
    const taskCard = taskCardHeading.locator('..');

    // ACT - Verify logged-in state & click into the project
    await expect(loggedInHeading).toBeVisible();
    await projectNameButton.click();

    // ASSERT - Verify project & task information
    await expect(projectNameHeading).toBeVisible();
    await expect(taskCardHeading).toBeVisible();

    for (const tagName of testCase.tags) {
      const tag = taskCard.getByText(tagName, { exact: true });

      await expect(tag).toBeVisible();
    };
  });
}
