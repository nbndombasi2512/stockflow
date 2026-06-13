# M3-02 — Transfer stock form

- **Milestone:** M3 — Multi-location
- **Type:** Frontend
- **Estimate:** 1-2 hrs
- **Depends on:** M3-01

## Description

Build a React form in a Radix Dialog (React Hook Form, styled-components) to transfer stock of a product between two locations.

## Acceptance Criteria

- [ ] React Hook Form fields: product, source location, destination location, quantity (Radix Select for selects).
- [ ] Prevents selecting the same source and destination (form validation).
- [ ] Submits via a TanStack Query mutation to the transfer endpoint and surfaces insufficient-stock errors.
- [ ] Invalidates affected queries so both location quantities update in the UI.
