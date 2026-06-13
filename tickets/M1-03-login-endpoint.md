# M1-03 — Login endpoint + session/JWT

- **Milestone:** M1 — Foundations
- **Type:** Backend
- **Estimate:** 1-2 hrs
- **Depends on:** M1-01

## Description

Implement `POST /auth/login` using a NestJS Passport local strategy that verifies credentials and issues a JWT (via `@nestjs/jwt`).

## Acceptance Criteria

- [ ] Verifies email + password against stored hash.
- [ ] Issues a signed JWT on success.
- [ ] Returns 401 on invalid credentials (no user enumeration).
- [ ] Includes a logout mechanism (token invalidation/clear).
