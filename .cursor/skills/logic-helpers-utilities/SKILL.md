---
name: logic-helpers-utilities
description: How to handle writing logic, helpers, and utilities
---

# Logic Helpers and Utilities

## General

- When writing logic, helpers and/or utilities, try to scan for existing implementations first.
- Helpers are always in a `helpers` folder, in sub-folders matching the name of each helper
- `helpers` folders are colocated within the feature/domain or component type depending on the package
- Helpers should have some level of documentation in a jsdoc comment above the function. A simple example is welcome as well.
- Helper names should balance being concise and descriptive. Do not invent words.

Exceptions:

- `packages/cube-portal-helpers` package contains folders with various helpers, utilities and hooks

## Where to place logic, helpers and utilities in the codebase

- `packages/cube-portal-helpers/src`
    - contains shared helpers and utilities for the entire application
    - not tied to a specific feature or domain
    - `utils` folder contains generic helpers and utilities
    - try to consolidate logic here when the functionality is not specific to a feature or component
- `helpers` in all other packages should be specific to the package, component and/or feature/domain

## Should this piece of logic be inlined in a component/hook or extracted to a helper?

Factors that lead to extracting logic to a helper:

- Is the logic complicated enough? Does it have multiple, steps, complex logic, or scenarios?
- Has the logic already been extracted outside of the component/hook?

## External Packages to Consider

- `@cube-planning/helpers` - shared helpers across multiple codebases
- `@cube-planning/spreadsheet-helpers` - shared helpers specific to spreadsheet functionality