---
name: write-tests
description: Testing patterns and conventions for writing tests.
---

# Write Tests

## When to Use

- Writing new tests for untested code
- Updating tests after refactors
- Fixing failing tests
- Adding tests for bug fixes
- Improving test coverage for a feature

## Commands

| Action       | Command                               |
| ------------ | ------------------------------------- |
| Run tests    | `npm test -- --no-watch`              |
| Run specific | `npm test path/to/file -- --no-watch` |
| Coverage     | `npm test -- --coverage --no-watch`   |

## General

Applies to all tests in the codebase.

### Rules

- Only write unit tests, no integration or E2E tests.
- Consider unit tests as 'mini integration tests'. Try not to mock all the internal details when possible. Especially relevant to mocking helpers containing business logic.
- Ensure each test case validates what it describes. Avoid redundant tests.
- Prefer importing existing type definitions instead of redefining them in test files
- Minimize duplication when defining mock test data:
    - Define shared mock data above the `describe` block
    - Use object spreading to override specific properties when needed (e.g., `{ ...mockSession, name: null }`)
    - Only define unique mock data inline when it's significantly different from the base mock

### File Structure

- Tests are located in the `__tests__` colocated with the code they are testing.
- Tests are named `index.spec.tsx` when JSX is required, otherwise `index.spec.ts`.

### Approach

1. **Identify** - what needs testing
2. **Analyze** - what is the user experience
3. **Write** - verify behavior
4. **Run** - ensure tests pass

### Language & Structure

Include only one top level describe block in each test file.

Use the name of the function as the describe block name.

- `const EventCard = () => { ... }` -> `describe("EventCard")`
- `const useEventCard = () => { ... }` -> `describe("useEventCard")`
- `const parseEvent = (event: Event) => { ... }` -> `describe("parseEvent")`

Use present tense for writing test cases.

- `it("renders resync button")`
- `it("calls refresh if the token has expired")`
- `it("logs an error")`

## React Specific

Applies to React components, hooks, containers, and contexts.

### What to Test

- What the user sees (renders, displays, shows)
- What happens when user interacts (click, type, submit)
- Error and edge cases (failures, empty states, loading)

### Selectors

- Prioritize `data-testid` attributes and `*ByTestId` selectors for stable element selection.
- When validating that data has been rendered correctly, use `*ByText` selectors
- If it's not possible to use a `data-testid` attribute, other selectors are allowed.

### Use @test-utils

`@test-utils` wrap React Testing Library with added functionality specific to this codebase.

- Always import from `@test-utils`, not `@testing-library/react` directly.
- Use the `render` function for JSX tests and `renderHook` for hook tests.
- Configure application containers by passing `{options: WrapperOptions}` to the render functions. These include theme, router, apollo, intl, launchDarklyFlags, etc.
- Other utilities like `act` and `userEvent` are re-exported for simple & future-proof imports

### Use a setup function

Use a setup function to minimize duplication and keep tests focused.

Required:

- It calls the render function with the component or hook under test
- It sets required application containers on the `render` function
- It returns an object containing `utils`

Optional:

- It accepts props for the component or hook
- It accepts mocks or other parameters (flexible depending on the test file)
- It creates common selectors for elements used by multiple test cases
- It returns additional object properties as needed

## Reference

For patterns and examples, see [references/REFERENCE.md](references/REFERENCE.md).