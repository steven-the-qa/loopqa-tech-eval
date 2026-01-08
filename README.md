# Playwright Test Automation for Asana Demo App

This project implements automated end-to-end tests for the Asana demo application using Playwright, with a focus on maintainability, reusability, and comprehensive debugging capabilities.

## Architecture Overview

### Custom Fixtures with Auto-Login

The solution uses **Playwright's fixture system** to automatically handle authentication before each test runs. This eliminates repetitive login code and ensures all tests start from an authenticated state.

**Key Files:**
- `tests/fixtures.ts` - Extends the base Playwright test with a custom `page` fixture that automatically logs in
- `tests/utils/auth.ts` - Centralized login helper function

**Benefits:**
- DRY principle: Login logic defined once, used everywhere
- Automatic: Tests don't need to remember to log in
- Consistent: All tests start from the same authenticated state
- Maintainable: Update login logic in one place

### Test Structure

Tests are organized to verify specific tasks and their properties across different projects:

- **Test Case 1-3**: Verify tasks in "Web Application" project
- **Test Case 4-6**: Verify tasks in "Mobile Application" project

Each test verifies:
- Task presence in specific columns (To Do, In Progress, Done)
- Task tags (Feature, Bug, Design, High Priority)

## Key Design Decisions

### 1. Fixture-Based Authentication

Instead of calling `login()` in every test, the custom fixture automatically handles authentication:

```typescript
export const test = base.extend({
  page: async ({ page }, use) => {
    await login(page);  // Runs before every test
    await use(page);
  },
});
```

**Why:** Reduces boilerplate, prevents forgotten logins, centralizes auth logic.

### 2. Centralized Helper Functions

Login logic is extracted to `tests/utils/auth.ts` as a reusable function.

**Why:** Single source of truth for authentication, easier to update credentials or flow.

### 3. Trace Collection on Failure

Playwright is configured to collect traces only when tests fail:

```typescript
trace: 'retain-on-failure'
```

**Why:** 
- Comprehensive debugging: DOM snapshots, network requests, console logs, screenshots
- Storage efficient: Only saves traces for failed tests
- Better than manual logging: Captures everything automatically

### 4. Matrix Strategy for CI/CD

GitHub Actions runs tests in parallel across three browsers using a matrix strategy:

```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
```

**Why:**
- Faster execution: All browsers run in parallel
- Independent failures: One browser failure doesn't block others
- Comprehensive coverage: Tests run on all major browser engines

## Project Structure

```
.
├── tests/
│   ├── fixtures.ts          # Custom test fixtures with auto-login
│   ├── utils/
│   │   └── auth.ts          # Login helper function
│   └── example.spec.ts      # Test cases
├── playwright.config.ts     # Playwright configuration
├── .github/
│   └── workflows/
│       └── playwright.yml   # CI/CD workflow
└── README.md
```

## Running Tests

### Local Development

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run tests for a specific browser
npx playwright test --project=chromium

# Run tests in UI mode
npx playwright test --ui

# Run tests in headed mode
npx playwright test --headed
```

### Viewing Traces

When tests fail, traces are automatically saved. View them with:

```bash
npx playwright show-trace test-results/<trace-file>
```

Or open the HTML report:

```bash
npx playwright show-report
```

## CI/CD

The GitHub Actions workflow:

1. **Runs tests in parallel** across chromium, firefox, and webkit using a matrix strategy
2. **Uploads traces** as artifacts when tests fail (retained for 30 days)
3. **Fails fast disabled** so all browsers complete even if one fails

## Configuration Highlights

- **Reporter**: `line` - Clean console output showing test progress
- **Retries**: 2 retries on CI, 0 locally
- **Workers**: 1 worker on CI (sequential), parallel locally
- **Traces**: Only retained on failure to save storage

## Test Credentials

- **URL**: https://animated-gingersnap-8cf7f2.netlify.app/
- **Username**: admin
- **Password**: password123

## Best Practices Implemented

1. ✅ **DRY**: Login logic centralized, not repeated
2. ✅ **Maintainability**: Single place to update auth flow
3. ✅ **Debugging**: Comprehensive traces on failure
4. ✅ **Scalability**: Easy to add new tests without auth boilerplate
5. ✅ **CI/CD**: Parallel execution for faster feedback
6. ✅ **Selector Strategy**: Uses semantic selectors (`getByRole`, `getByLabel`) for better reliability

## Future Enhancements

- Environment-based configuration for different test environments
- Page Object Model for complex page interactions
- Test data management for dynamic test scenarios
- Visual regression testing
- API testing integration
