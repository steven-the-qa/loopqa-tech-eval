import { test, expect } from './fixtures';
import { navigateToProject, getColumnSection, getTaskCard, verifyTaskTags } from './utils/helpers';

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
