# M2-01 — StockLevel model + migration

- **Milestone:** M2 — Inventory Core
- **Type:** Database / Backend
- **Estimate:** 1 hr
- **Depends on:** M1-08, M1-12

## Description

Add the `StockLevel` model to `schema.prisma` and generate a migration; it holds the current quantity of a product at a location.

## Acceptance Criteria

- [ ] Fields: product_id, location_id, quantity (int, default 0).
- [ ] Compound unique constraint on (product_id, location_id) via `@@unique`.
- [ ] Relations to product and location.
- [ ] Negative quantity prevented (DB check constraint or enforced in the stock service).
