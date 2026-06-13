# M1-07 — Auth state + protected routes

- **Milestone:** M1 — Foundations
- **Type:** Frontend
- **Estimate:** 1-2 hrs
- **Depends on:** M1-06

## Description

Add global auth state (React context) and route guards so unauthenticated users are redirected to login.

## Acceptance Criteria

- [ ] React auth context tracks the current user and JWT.
- [ ] Protected routes redirect unauthenticated users to login.
- [ ] JWT persists across page reloads (storage) and is attached to API requests (and TanStack Query fetchers).
- [ ] Logout clears state, resets the TanStack Query cache, and redirects to login.
