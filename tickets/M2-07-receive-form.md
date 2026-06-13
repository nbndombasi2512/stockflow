# M2-07 — Receive stock form

- **Milestone:** M2 — Inventory Core
- **Type:** Frontend
- **Estimate:** 1-2 hrs
- **Depends on:** M2-04

## Description

Build a React form in a Radix Dialog (React Hook Form, styled-components) to receive stock for a product into a location.

## Acceptance Criteria

- [ ] React Hook Form fields: product, location, quantity, optional note (Radix Select for product/location).
- [ ] Submits via a TanStack Query mutation to the receive endpoint and shows success/error.
- [ ] Invalidates affected queries so updated quantity is reflected in the UI.
