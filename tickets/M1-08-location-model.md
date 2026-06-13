# M1-08 — Location model + migration

- **Milestone:** M1 — Foundations
- **Type:** Database / Backend
- **Estimate:** 1 hr
- **Depends on:** M0-03

## Description

Add the `Location` model to `schema.prisma` and generate a migration representing a warehouse/storage location.

## Acceptance Criteria

- [ ] `Location` model with id (uuid), name, notes, archived (bool), created_at.
- [ ] Prisma migration applies cleanly.
- [ ] `archived` defaults to false.
