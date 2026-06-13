# M1-02 — Signup endpoint

- **Milestone:** M1 — Foundations
- **Type:** Backend
- **Estimate:** 1-2 hrs
- **Depends on:** M1-01

## Description

Implement `POST /auth/signup` in an `AuthModule` that creates a user with a securely hashed password.

## Acceptance Criteria

- [ ] Signup DTO validates email format and password strength via `class-validator`.
- [ ] Password hashed (bcrypt/argon2) in the auth service before storage.
- [ ] Returns 409 (ConflictException) on duplicate email.
- [ ] Returns 201 with a safe user payload (no hash) on success.
