# M1-01 — User model + migration

- **Milestone:** M1 — Foundations
- **Type:** Database / Backend
- **Estimate:** 1 hr
- **Depends on:** M0-03

## Description

Add the `User` model to `schema.prisma` and generate a migration to support email/password authentication.

## Acceptance Criteria

- [ ] `User` model with id (uuid), email (unique), password_hash, created_at.
- [ ] Prisma migration applies cleanly.
- [ ] Email uniqueness enforced via `@unique`.
