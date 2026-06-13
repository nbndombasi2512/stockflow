# M2-05 — Ship/Issue movement endpoint

- **Milestone:** M2 — Inventory Core
- **Type:** Backend
- **Estimate:** 1 hr
- **Depends on:** M2-03

## Description

Implement `POST /movements/ship` in the NestJS `MovementsModule` to remove stock from a location.

## Acceptance Criteria

- [ ] DTO (`class-validator`) accepts product, location, quantity (> 0), optional note.
- [ ] Creates a ship movement and decreases the stock level via the stock service.
- [ ] Returns 422 (UnprocessableEntityException) if insufficient stock (no negative quantity).
- [ ] Returns the updated stock level.
