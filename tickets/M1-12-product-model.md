# M1-12 — Product model + migration (unique SKU)

- **Milestone:** M1 — Foundations
- **Type:** Database / Backend
- **Estimate:** 1 hr
- **Depends on:** M0-03

## Description

Add the `Product` model to `schema.prisma` and generate a migration for catalog items.

## Acceptance Criteria

- [ ] Fields: id (uuid), name, sku (unique), description, category, unit, reorder_threshold (nullable), image_url (nullable), archived, created_at.
- [ ] SKU uniqueness enforced via `@unique`.
- [ ] Prisma migration applies cleanly.
