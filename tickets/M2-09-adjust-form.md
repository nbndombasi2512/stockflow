# M2-09 — Adjust stock form

- **Milestone:** M2 — Inventory Core
- **Type:** Frontend
- **Estimate:** 1-2 hrs
- **Depends on:** M2-06

## Description

Build a React form in a Radix Dialog (React Hook Form, styled-components) to adjust a stock level after a physical count, with a required reason.

## Acceptance Criteria

- [ ] React Hook Form fields: product, location, new counted quantity, required reason (Radix Select for product/location).
- [ ] Submits via a TanStack Query mutation to the adjust endpoint and shows success/error.
- [ ] Invalidates affected queries so updated quantity is reflected in the UI.
