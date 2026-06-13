# M1-06 — Login page

- **Milestone:** M1 — Foundations
- **Type:** Frontend
- **Estimate:** 1 hr
- **Depends on:** M0-01, M1-03

## Description

Build the login screen as a React component styled with styled-components, using React Hook Form and a TanStack Query mutation to authenticate against the login endpoint.

## Acceptance Criteria

- [ ] Email + password fields managed by React Hook Form with validation.
- [ ] Submits via a TanStack Query mutation to `POST /auth/login` and stores the JWT.
- [ ] Shows an error on invalid credentials.
- [ ] Redirects to the dashboard on success.
