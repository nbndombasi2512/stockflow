# M2-02 — Movement (ledger) model + migration

- **Milestone:** M2 — Inventory Core
- **Type:** Database / Backend
- **Estimate:** 1 hr
- **Depends on:** M1-01, M1-08, M1-12

## Description

Add the immutable `Movement` ledger model to `schema.prisma` and generate a migration; it records every stock change.

## Acceptance Criteria

- [ ] Fields: id, type (receive/ship/transfer/adjust), product_id, from_location_id (nullable), to_location_id (nullable), quantity, reason (nullable), user_id, created_at.
- [ ] No update/delete path (insert-only via the service layer).
- [ ] Relations to product, locations, and user.
