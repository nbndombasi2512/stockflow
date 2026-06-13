# M1-04 — Auth guard

- **Milestone:** M1 — Foundations
- **Type:** Backend
- **Estimate:** 1 hr
- **Depends on:** M1-03

## Description

Add a NestJS JWT auth guard (Passport JWT strategy) that protects API routes and attaches the current user to the request.

## Acceptance Criteria

- [ ] JWT strategy validates tokens and rejects unauthenticated requests with 401.
- [ ] Authenticated user attached to the request (accessible via a `@CurrentUser` decorator).
- [ ] Guard applied globally to all non-auth routes.
