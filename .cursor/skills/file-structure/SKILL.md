---
name: file-structure
description: How the repository and packages are organized
---

# File Structure

## Packages

See the [Repository Structure](../../../README.md#repository-structure) section in the main README for package details and path aliases.

## Generic Conventions

- Entry points are always `index.tsx` or `index.ts`
- One component or hook per folder
- Colocated files live alongside their component or hook:
    - `styles.ts` — styled-components (see [styling skill](../styling/SKILL.md))
    - `messages.tsx` — i18n copy (see [user-facing-copy skill](../user-facing-copy/SKILL.md))
    - `__tests__/` — unit tests (see [write-tests skill](../write-tests/SKILL.md))

## Package-Specific Structure

Each package has a `README.md` that documents its accepted folder structure. Always refer to the package's README as the source of truth.