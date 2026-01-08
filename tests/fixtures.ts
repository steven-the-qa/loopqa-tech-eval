import { test as base } from '@playwright/test';
import { login } from './utils/auth';

export const test = base.extend({
  page: async ({ page }, use) => {
    // Log in before every test
    await login(page);
    await use(page);
  },
});

export { expect } from '@playwright/test';
