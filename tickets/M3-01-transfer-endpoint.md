# M3-01 — Transfer endpoint (atomic)

- **Milestone:** M3 — Multi-location
- **Type:** Backend
- **Estimate:** 1-2 hrs
- **Depends on:** M2-03

## Description

Implement `POST /movements/transfer` in the NestJS `MovementsModule` to move stock from a source location to a destination location atomically (single Prisma `$transaction`).

## Acceptance Criteria

- [ ] DTO (`class-validator`) accepts product, from_location, to_location, quantity (> 0), optional note.
- [ ] Decreases source and increases destination in one transaction.
- [ ] Returns 422 if source has insufficient stock.
- [ ] Rejects identical source and destination.
- [ ] Records a single transfer movement.
