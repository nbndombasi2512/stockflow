# M4-03 — Movement history API

- **Milestone:** M4 — Visibility
- **Type:** Backend
- **Estimate:** 1 hr
- **Depends on:** M2-02

## Description

Implement a NestJS endpoint (Prisma) returning the chronological movement history for a product.

## Acceptance Criteria

- [ ] `GET /products/:id/movements` returns movements newest-first.
- [ ] Includes type, quantity, locations, reason, user, timestamp.
- [ ] Paginated.
