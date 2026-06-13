# M0-04 — Configure lint, format, and CI

- **Milestone:** M0 — Project Setup
- **Type:** Setup
- **Estimate:** 1-2 hrs
- **Depends on:** M0-01, M0-02

## Description

Add ESLint + Prettier across frontend and backend and a basic CI pipeline that runs lint and build on every push/PR.

## Acceptance Criteria

- [ ] ESLint + Prettier configured with shared rules.
- [ ] `npm run lint` and `npm run format` work in both apps.
- [ ] CI workflow runs install, lint, and build.
- [ ] CI fails on lint or build errors.
