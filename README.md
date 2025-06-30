# Speaknow Dmytro

This project contains Playwright API tests for the JSONPlaceholder service.

## Running the tests

Install dependencies and execute the tests using Playwright:

```bash
npx playwright test
```

## Test structure

All tests reside in `src/tests` and are grouped by HTTP method:

- `get.spec.ts`
- `post.spec.ts`
- `put.spec.ts`
- `patch.spec.ts`
- `delete.spec.ts`

Refer to `docs/testCases.md` for the full list of numbered scenarios.