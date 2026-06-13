# M1-13 — Product CRUD API

- **Milestone:** M1 — Foundations
- **Type:** Backend
- **Estimate:** 2 hrs
- **Depends on:** M1-04, M1-12

## Description

Implement a NestJS `ProductsModule` (controller + service backed by `PrismaService`) with REST endpoints to create, list, update, and archive products.

## Acceptance Criteria

- [ ] `POST /products`, `GET /products`, `GET /products/:id`, `PATCH /products/:id`.
- [ ] DTOs validated via `class-validator`.
- [ ] Returns 409 (ConflictException) on duplicate SKU.
- [ ] Archive via `PATCH` rather than hard delete.
- [ ] 404 handling via `NotFoundException`.
