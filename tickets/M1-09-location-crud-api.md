# M1-09 — Location CRUD API

- **Milestone:** M1 — Foundations
- **Type:** Backend
- **Estimate:** 2 hrs
- **Depends on:** M1-04, M1-08

## Description

Implement a NestJS `LocationsModule` (controller + service backed by `PrismaService`) with REST endpoints to create, list, update, and archive locations.

## Acceptance Criteria

- [ ] `POST /locations`, `GET /locations`, `GET /locations/:id`, `PATCH /locations/:id`.
- [ ] DTOs validated via `class-validator`.
- [ ] Archive via `PATCH` rather than hard delete.
- [ ] List excludes archived by default with an option to include them.
- [ ] 404 handling via `NotFoundException`.
