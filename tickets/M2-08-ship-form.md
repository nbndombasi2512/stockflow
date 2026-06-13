# M2-08 — Ship stock form

- **Milestone:** M2 — Inventory Core
- **Type:** Frontend
- **Estimate:** 1-2 hrs
- **Depends on:** M2-05

## Description

Build a React form in a Radix Dialog (React Hook Form, styled-components) to ship/issue stock for a product from a location.

## Acceptance Criteria

- [ ] React Hook Form fields: product, location, quantity, optional note (Radix Select for product/location).
- [ ] Submits via a TanStack Query mutation to the ship endpoint and surfaces insufficient-stock errors.
- [ ] Invalidates affected queries so updated quantity is reflected in the UI.
