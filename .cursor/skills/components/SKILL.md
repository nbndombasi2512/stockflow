---
name: components
description: How to make decisions about creating or modifying components
---

# Components

## Where Components Live

Three locations, each with different constraints. See the `file-structure` skill for file and folder conventions.

- **`@cube-planning/components`** — External package containing design system components, re-exported from `@cube-planning/portal-components`
- **`packages/cube-portal-components`** (`@cube/components`) — shared presentation components with no data-fetching
- **`packages/cube-portal-features`** — feature-specific components and views
- **Shared features** (`*-shared`, e.g. `dimensions-shared`) — reusable hooks/components that need data-fetching but are used across multiple features

## Philosophy

- Prioritize composability — especially for components in the shared package.
- Too many, or complex prop structures are a signal that the component is doing too many things and may benefit from being split into multiple/compound components.
- Minimize duplicate styled component definitions through shared components (good signal for moving to `@cube-planning/components`)

## Rules

- Prefer `React.ReactNode` for flexible slots over configuration objects.
- Export prop types alongside the component: `export { Component, type ComponentProps }`.
- Optionally use `Omit`/`Pick` to extend base types when wrapping third-party or shared components when needed.
- Prefer styling components directly (via `styled(ExampleComponent)`) over creating wrapper components.

## Composition

Ordered by frequency in the codebase:

- **Children** — standard `children: React.ReactNode`
- **Slot props** — named `React.ReactNode` props for specific areas (`header`, `sidebar`, `filters`, `actionButtons`)
- **Compound components** — sub-components attached as static properties (`SideBar.Section`, `SideBar.Link`)
- **Provider wrappers** — context wrapping children, sometimes conditional
- **Render functions** — `renderEmpty?: () => ReactNode` for specific slots like

Prefer the simplest pattern that meets the need. Compound components and providers are most common in `portal-components` where composability matters most.

## When to Move to `@cube-planning/components`?

- Is it a presentation component with complex enough styles that we could lift up cube-portal-components?
- Does it require any data-fetching hooks? If yes, it stays in features.
- Would a Storybook example be useful?
- Will it be reused? (Factor, but not sole reason — lifting it can still clean things up, and keep the features package leaning toward domain + data specific logic.)

Only export components from the package when they are needed externally. Internal components don't need exports.

## Reference

For composition examples, see [references/composition.md](references/composition.md).