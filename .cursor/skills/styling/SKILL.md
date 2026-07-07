---
name: styling
description: How to handle styling, theming, and design.
---

# Styling

## When to Use

- Styling components and views
- Creating or updating styles.ts files

## General

- Use styled-components for styling.
- Always prefer using the theme object over hardcoding colors, sizes, or other theme values.

Exceptions:

- Direct theme import (`import { theme } from '@cube/helpers'`) is acceptable for mapping objects or non-component contexts

## File Structure

- All styled components are located in a `styles.ts` file colocated with the component or view they are styling.
- Avoid unnecessary wrapper components. Prefer extending base components where possible.

Exceptions:

- Storybook files (`.stories.tsx`) allow styled-components to be inlined.

## Naming Conventions

- Use 'Styled' prefix for styled component names (`StyledButton`)

## Theme

- Always prefer using the theme object. Avoid hardcoding colors, sizes, or other theme values.
- Access theme values via destructured props: `${({ theme }) => theme.spacing.m}`
- Theme is exported from `@cube/helpers` (re-exports `@cube-planning/theme`)
- To see the full list of available theme values, run the `cube-theme` CLI from the `packages/cube-portal-helpers` package:
    - `npx cube-theme` – prints every token as `theme.<path> = <value>`, one per line
    - `npx cube-theme --format markdown` – prints a Markdown document

## Transient Props

- Use the `$` prefix for props that control styles but should not be forwarded to the DOM
- Example: `$isActive`, `$hasError`, `$collapsed`

## Conditional Styles

- Always use the `css` helper from `styled-components` — avoid returning plain strings from style functions

## Patterns and Examples

For patterns and examples, see [references/REFERENCE.md](references/REFERENCE.md).