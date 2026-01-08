import { Page } from '@playwright/test';

export async function login(page: Page) {
  const usernameField = page.getByLabel('Username');
  const passwordField =  page.getByLabel('Password');
  const signInButton = page.getByRole('button', { name: 'Sign in' });

  await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

  await usernameField.fill('admin');
  await passwordField.fill('password123');
  await signInButton.click();
}
