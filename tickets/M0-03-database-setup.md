# M0-03 — Set up PostgreSQL + migrations tooling

- **Milestone:** M0 — Project Setup
- **Type:** Setup / Database
- **Estimate:** 1-2 hrs
- **Depends on:** M0-02

## Description

Provision a PostgreSQL database and integrate it with NestJS via Prisma, including a `schema.prisma`, a generated Prisma Client, and an injectable `PrismaService`.

Make sure you use docker

## Acceptance Criteria

- [ ] Prisma initialized with a `schema.prisma` pointing at PostgreSQL (`DATABASE_URL`).
- [ ] `PrismaService` (NestJS injectable) wraps the Prisma Client and is exported via a `PrismaModule`.
- [ ] `prisma migrate dev` and `prisma migrate deploy` scripts available.
- [ ] An initial migration runs successfully.
- [ ] Local DB setup documented in the README.