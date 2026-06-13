# M2-04 — Receive movement endpoint

- **Milestone:** M2 — Inventory Core
- **Type:** Backend
- **Estimate:** 1 hr
- **Depends on:** M2-03

## Description

Implement `POST /movements/receive` in a NestJS `MovementsModule` to add stock to a location.

## Acceptance Criteria

- [ ] DTO (`class-validator`) accepts product, location, quantity (> 0), optional note.
- [ ] Creates a receive movement and increases the stock level via the stock service.
- [ ] Returns the updated stock level.
- [ ] 404 handling via `NotFoundException`.
