# M2-06 — Adjust movement endpoint

- **Milestone:** M2 — Inventory Core
- **Type:** Backend
- **Estimate:** 1 hr
- **Depends on:** M2-03

## Description

Implement `POST /movements/adjust` in the NestJS `MovementsModule` to correct a stock level to a counted value with a required reason.

## Acceptance Criteria

- [ ] DTO (`class-validator`) accepts product, location, new quantity (>= 0), required reason.
- [ ] Records the delta as an adjust movement via the stock service.
- [ ] Sets the stock level to the new value.
- [ ] Rejects missing reason with 422.
