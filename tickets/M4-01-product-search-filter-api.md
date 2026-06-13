# M4-01 — Product search/filter API

- **Milestone:** M4 — Visibility
- **Type:** Backend
- **Estimate:** 1-2 hrs
- **Depends on:** M1-13, M2-01

## Description

Extend the NestJS product list endpoint (Prisma queries with `where`/`skip`/`take`) to support search and filtering with pagination.

## Acceptance Criteria

- [ ] Filter by name/SKU (search), category, and location.
- [ ] Returns total on-hand per product.
- [ ] Paginated and ordered results.
- [ ] Performant for ~10k SKUs.
