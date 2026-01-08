import { test, expect } from './fixtures';

test('Test Case 1: Verify task in Web Application project', async ({ page }) => {
  // Navigate to "Web Application"
  await page.getByRole('button', { name: /^Web Application/ }).click();
  await expect(page.getByRole('banner').getByRole('heading', { name: 'Web Application' })).toBeVisible();

  // Verify "Implement user authentication" is in the "To Do" column
  const toDoSection = page.getByRole('heading', { name: /^To Do/ }).locator('..');
  await expect(toDoSection.getByRole('heading', { name: 'Implement user authentication' })).toBeVisible();

  // Confirm tags: "Feature" "High Priority"
  // Find the task card containing the heading, then verify tags within it
  const taskCard = toDoSection.getByRole('heading', { name: 'Implement user authentication' }).locator('..');
  await expect(taskCard.getByText('Feature', { exact: true })).toBeVisible();
  await expect(taskCard.getByText('High Priority', { exact: true })).toBeVisible();
});

test('Test Case 2: Verify task in Web Application project', async ({ page }) => {
  // Navigate to "Web Application"
  await page.getByRole('button', { name: /^Web Application/ }).click();
  await expect(page.getByRole('banner').getByRole('heading', { name: 'Web Application' })).toBeVisible();

  // Verify "Fix navigation bug" is in the "To Do" column
  const toDoSection = page.getByRole('heading', { name: /^To Do/ }).locator('..');
  await expect(toDoSection.getByRole('heading', { name: 'Fix navigation bug' })).toBeVisible();

  // Confirm tag: "Bug"
  // Find the task card containing the heading, then verify tag within it
  const taskCard = toDoSection.getByRole('heading', { name: 'Fix navigation bug' }).locator('..');
  await expect(taskCard.getByText('Bug', { exact: true })).toBeVisible();
});

test('Test Case 3: Verify task in Web Application project', async ({ page }) => {
  // Navigate to "Web Application"
  await page.getByRole('button', { name: /^Web Application/ }).click();
  await expect(page.getByRole('banner').getByRole('heading', { name: 'Web Application' })).toBeVisible();

  // Verify "Design system updates" is in the "In Progress" column
  const inProgressSection = page.getByRole('heading', { name: /^In Progress/ }).locator('..');
  await expect(inProgressSection.getByRole('heading', { name: 'Design system updates' })).toBeVisible();

  // Confirm tag: "Design"
  // Find the task card containing the heading, then verify tag within it
  const taskCard = inProgressSection.getByRole('heading', { name: 'Design system updates' }).locator('..');
  await expect(taskCard.getByText('Design', { exact: true })).toBeVisible();
});

test('Test Case 4: Verify task in Mobile Application project', async ({ page }) => {
  // Navigate to "Mobile Application"
  await page.getByRole('button', { name: /^Mobile Application/ }).click();
  await expect(page.getByRole('banner').getByRole('heading', { name: 'Mobile Application' })).toBeVisible();

  // Verify "Push notification system" is in the "To Do" column
  const toDoSection = page.getByRole('heading', { name: /^To Do/ }).locator('..');
  await expect(toDoSection.getByRole('heading', { name: 'Push notification system' })).toBeVisible();

  // Confirm tag: "Feature"
  // Find the task card containing the heading, then verify tag within it
  const taskCard = toDoSection.getByRole('heading', { name: 'Push notification system' }).locator('..');
  await expect(taskCard.getByText('Feature', { exact: true })).toBeVisible();
});

test('Test Case 5: Verify task in Mobile Application project', async ({ page }) => {
  // Navigate to "Mobile Application"
  await page.getByRole('button', { name: /^Mobile Application/ }).click();
  await expect(page.getByRole('banner').getByRole('heading', { name: 'Mobile Application' })).toBeVisible();

  // Verify "Offline mode" is in the "In Progress" column
  const inProgressSection = page.getByRole('heading', { name: /^In Progress/ }).locator('..');
  await expect(inProgressSection.getByRole('heading', { name: 'Offline mode' })).toBeVisible();

  // Confirm tags: "Feature" & "High Priority"
  // Find the task card containing the heading, then verify tags within it
  const taskCard = inProgressSection.getByRole('heading', { name: 'Offline mode' }).locator('..');
  await expect(taskCard.getByText('Feature', { exact: true })).toBeVisible();
  await expect(taskCard.getByText('High Priority', { exact: true })).toBeVisible();
});

test('Test Case 6: Verify task in Mobile Application project', async ({ page }) => {
  // Navigate to "Mobile Application"
  await page.getByRole('button', { name: /^Mobile Application/ }).click();
  await expect(page.getByRole('banner').getByRole('heading', { name: 'Mobile Application' })).toBeVisible();

  // Verify "App icon design" is in the "Done" column
  const doneSection = page.getByRole('heading', { name: /^Done/ }).locator('..');
  await expect(doneSection.getByRole('heading', { name: 'App icon design' })).toBeVisible();

  // Confirm tag: "Design"
  // Find the task card containing the heading, then verify tag within it
  const taskCard = doneSection.getByRole('heading', { name: 'App icon design' }).locator('..');
  await expect(taskCard.getByText('Design', { exact: true })).toBeVisible();
});
