# M1-15 — Product create/edit/archive form

- **Milestone:** M1 — Foundations
- **Type:** Frontend
- **Estimate:** 2 hrs
- **Depends on:** M1-14

## Description

Build the React form (React Hook Form, styled-components) for creating and editing a product, plus an archive action. Present it in a Radix UI Dialog.

## Acceptance Criteria

- [ ] Create and edit modes share one React Hook Form.
- [ ] Validates required fields and unique SKU (surface 409 error).
- [ ] Optional fields: description, reorder threshold, image.
- [ ] Rendered in a Radix Dialog; archive uses a Radix AlertDialog confirmation.
- [ ] Submits via TanStack Query mutations and invalidates the products query.
- [ ] Success/error feedback and return to list.
