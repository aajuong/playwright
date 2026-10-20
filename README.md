# Playwright login tests

[![Playwright Tests](https://github.com/aajuong/playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/aajuong/playwright/actions/workflows/playwright.yml)

A Playwright (TypeScript) port of my Cypress login and forgot-password tests, written as a learning project. The application under test is the public practice site [qaplayground.com/bank](https://qaplayground.com/bank/).

The same scenarios exist in the companion Cypress repo, so the two tools can be compared side by side: [aajuong/cypress](https://github.com/aajuong/cypress).

## What is covered

7 tests, run on Chromium, Firefox and WebKit (21 test runs in total):

- Blank-field validation on the login form
- Login with invalid credentials
- Login with a locked account
- Show and hide password toggle
- Dashboard navigation and logout
- Direct access to the dashboard without logging in
- Forgot-password flow, including invalid and valid email

## Project layout

```
fixtures/   Custom test fixtures that hand page objects to each test
pages/      Page objects (login, landing, forgot password)
tests/      Spec files
playwright.config.ts
```

## What it demonstrates

- Page Object Model with typed locators (`getByTestId`)
- Custom fixtures via `test.extend`, so tests receive `loginPage` and `landingPage` rather than building them
- Web-first, auto-retrying assertions (`await expect(locator)...`)
- `baseURL` configuration and relative navigation
- Parallel execution (`fullyParallel`) across three browser projects
- CI with GitHub Actions on every push and pull request to `main`, with the HTML report uploaded as an artifact

## Getting started

Requires Node.js (LTS).

```bash
npm ci
npx playwright install
npx playwright test
```

Useful variations:

```bash
npx playwright test --project=chromium   # one browser only
npx playwright test --headed             # watch the browser
npx playwright test --ui                 # interactive UI mode
npx playwright test --workers=1          # run serially, handy for debugging
npx playwright show-report               # open the last HTML report
```

## Continuous integration

The workflow in `.github/workflows/playwright.yml` runs on pushes and pull requests to `main`, and can also be started manually. After each run the HTML report is available as the `playwright-report` artifact. On CI the suite runs with one worker and two retries, and traces are captured on the first retry.

## Notes

This is a small practice project, not a production suite. My main automation experience is a large Cypress suite in a commercial setting, and this repo is where I am building up Playwright alongside it. The tests run against a third-party demo site, so a failure can come from that site changing as well as from the code here.
