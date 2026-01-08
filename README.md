# Playwright Test Automation for Asana Demo App

This project implements automated end-to-end tests for the Asana demo application using Playwright, with a focus on maintainability, reusability, and comprehensive debugging capabilities.

## Architecture Overview

### Data-Driven Testing Strategy

The solution uses a **data-driven testing pattern** where test logic is separated from test data. Instead of writing individual test functions for each scenario, test cases are defined as data structures and a single test function iterates over them. This approach significantly reduces code duplication and makes it easier to add new test cases.

**Key Files:**
- `tests/fixtures.ts` - Extends the base Playwright test with a custom `page` fixture that automatically logs in
- `tests/utils/auth.ts` - Centralized login helper function
- `tests/projectTasks.spec.ts` - Data-driven test cases using ARRANGE-ACT-ASSERT pattern

**Benefits:**
- **DRY**: Single test logic handles all test cases
- **Scalability**: Add new test cases by adding data entries
- **Maintainability**: Update test logic in one place
- **Type Safety**: TypeScript ensures test data correctness
- **Readability**: Clear separation of test data and test logic

### Custom Fixtures with Auto-Login

The solution uses **Playwright's fixture system** to automatically handle authentication before each test runs. This eliminates repetitive login code and ensures all tests start from an authenticated state.

**Benefits:**
- DRY principle: Login logic defined once, used everywhere
- Automatic: Tests don't need to remember to log in
- Consistent: All tests start from the same authenticated state
- Maintainable: Update login logic in one place

### Test Structure: ARRANGE-ACT-ASSERT Pattern

Tests follow a clear three-phase structure with inline locator definitions:

**ARRANGE**: Define all locators upfront at the top of the test
```typescript
const projectNameButton = page.getByRole('button', { name: testCase.project, exact: true });
const columnHeading = page.getByRole('heading', { name: testCase.column, exact: true });
const taskCardHeading = column.getByRole('heading', { name: testCase.taskName });
```

**ACT**: Perform user actions
```typescript
await projectNameButton.click();
```

**ASSERT**: Verify expected outcomes
```typescript
await expect(taskCardHeading).toBeVisible();
for (const tagName of testCase.tags) {
  await expect(taskCard.getByText(tagName, { exact: true })).toBeVisible();
}
```

**Test Data Structure:**
All test cases are defined in a single array:
```typescript
const testCases = [
  {
    project: 'Web Application',
    taskName: 'Implement user authentication',
    column: 'To Do',
    tags: ['Feature', 'High Priority'],
  },
  // ... more test cases
] as const;
```

Each test verifies:
- Task presence in specific columns (To Do, In Progress, Done)
- Task tags (Feature, Bug, Design, High Priority)

## Key Design Decisions

### 1. Data-Driven Testing Pattern

Test cases are defined as data structures in an array, and a single test function iterates over them:

```typescript
const testCases = [
  { project: 'Web Application', taskName: 'Task 1', column: 'To Do', tags: ['Feature'] },
  // ... more test cases
] as const;

for (const testCase of testCases) {
  test(`Test Case: Verify ${testCase.taskName}...`, async ({ page }) => {
    // Test logic here
  });
}
```

**Why:** 
- Eliminates code duplication (reduced from ~94 lines to ~66 lines)
- Easy to add new test cases by adding data entries
- Single place to update test logic
- Type-safe with TypeScript

### 2. ARRANGE-ACT-ASSERT Pattern

All tests follow a clear three-phase structure with inline locator definitions:

```typescript
// ARRANGE - Define locators
const projectNameButton = page.getByRole('button', { name: testCase.project });
const taskCardHeading = column.getByRole('heading', { name: testCase.taskName });

// ACT - Perform actions
await projectNameButton.click();

// ASSERT - Verify outcomes
await expect(taskCardHeading).toBeVisible();
```

**Why:**
- Clear structure: Easy to understand test flow
- Self-contained: Locators defined where they're used
- Maintainable: Changes localized to appropriate phase
- No abstraction overhead: Direct and simple

### 3. Inline Locator Definitions

Locators are defined directly in tests rather than in helper functions:

```typescript
const projectNameButton = page.getByRole('button', { name: testCase.project, exact: true });
const column = columnHeading.locator('..');
const taskCard = taskCardHeading.locator('..');
```

**Why:**
- Simplicity: No need to jump between files
- Clarity: See exactly what elements are being tested
- Flexibility: Each test can customize locators as needed
- Semantic selectors: Uses `getByRole`, `getByText` for better reliability

### 4. Fixture-Based Authentication

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

### 5. Centralized Helper Functions

Login logic is extracted to `tests/utils/auth.ts` as a reusable function.

**Why:** Single source of truth for authentication, easier to update credentials or flow.

### 6. Trace Collection on Failure

Playwright is configured to collect traces only when tests fail:

```typescript
trace: 'retain-on-failure'
```

**Why:** 
- Comprehensive debugging: DOM snapshots, network requests, console logs, screenshots
- Storage efficient: Only saves traces for failed tests
- Better than manual logging: Captures everything automatically

### 7. Matrix Strategy for CI/CD

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
│   └── projectTasks.spec.ts # Data-driven test cases
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

1. ✅ **DRY**: Data-driven approach eliminates code duplication; login logic centralized
2. ✅ **Data-Driven Testing**: Test data separated from test logic for easy extension
3. ✅ **ARRANGE-ACT-ASSERT**: Clear three-phase test structure for readability
4. ✅ **Inline Locators**: Self-contained tests with locators defined where used
5. ✅ **Type Safety**: TypeScript ensures test data correctness with `as const`
6. ✅ **Semantic Selectors**: Uses `getByRole`, `getByText` for better reliability
7. ✅ **Maintainability**: Single place to update test logic and auth flow
8. ✅ **Debugging**: Comprehensive traces on failure
9. ✅ **Scalability**: Easy to add new test cases by adding data entries
10. ✅ **CI/CD**: Parallel execution for faster feedback
