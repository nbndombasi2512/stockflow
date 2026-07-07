---
name: user-facing-copy
description: How to handle user-facing copy
---

# User Facing Copy

## General

- Use `react-intl`
- Do not add `id` or `description` fields — the codebase relies on `defaultMessage` only
- Do not hardcode user-facing strings in component or hook files

## File Structure

- All user-facing copy is located in a `messages.tsx` file colocated with the component, hook or view
- Messages are always colocated — no shared/common message files

## Naming Conventions

- FormattedMessage components: PascalCase with `Copy` suffix — `ResetFiltersCopy`, `InviteCopy`
- defineMessage exports: camelCase with `Copy` suffix — `updatedSuccessToastCopy`, `confirmationMessageCopy`

## FormattedMessage vs defineMessage

- Both come from `react-intl`. The choice depends on what the consumer expects.
- Prefer `FormattedMessage` over `defineMessage`, unless the consumer requires a string.

Examples of when to use `FormattedMessage`:

- Button labels, headings, body text
- Messages with rich text formatting (bold, links)

Examples that require `defineMessage`:

- Toast messages
- Form labels, placeholders, aria-labels
- Any prop that expects `string`

## Dynamic Values

Use `{variableName}` placeholders in `defaultMessage`. For FormattedMessage, pass via the `values` prop. For defineMessage, pass at the `formatMessage()` call site.

## Rich Text

Use XML-like tags in `defaultMessage` (e.g. `<b>bold</b>`, `<link>click here</link>`) and provide render functions via `values`. Memoize render functions with `useCallback`.

## Reference

For patterns and examples, see [references/REFERENCE.md](references/REFERENCE.md).