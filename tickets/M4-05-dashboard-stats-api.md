# M4-05 — Dashboard stats API

- **Milestone:** M4 — Visibility
- **Type:** Backend
- **Estimate:** 1 hr
- **Depends on:** M2-01

## Description

Implement a NestJS endpoint (Prisma aggregations) returning summary statistics for the dashboard.

## Acceptance Criteria

- [ ] Returns total SKUs, total units on hand, location count, low-stock count.
- [ ] Low-stock derived from product reorder thresholds.
- [ ] Single efficient query/response.
