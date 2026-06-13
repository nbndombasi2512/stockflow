# M0-02 — Scaffold NestJS REST backend

- **Milestone:** M0 — Project Setup
- **Type:** Setup / Backend
- **Estimate:** 1-2 hrs
- **Depends on:** none

## Description

Initialize a NestJS (TypeScript) backend with a REST API structure, environment config via `@nestjs/config`, and a health-check endpoint.

## Acceptance Criteria

- [ ] NestJS app boots in TypeScript.
- [ ] Environment variables loaded via `@nestjs/config` (e.g. PORT, DATABASE_URL).
- [ ] `GET /health` returns 200 with status JSON.
- [ ] Modular structure (modules, controllers, services) established.
- [ ] CORS configured to allow the frontend origin.
