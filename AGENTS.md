# Project Instructions

Stockflow is an inventory management software application.

## Standards

Read `.cursor/rules/standards.mdc` for coding conventions (naming, permissions, analytics, feature flags, code style, testing requirements).

## Skills

Check `.cursor/skills/` before implementing. Each skill folder contains a `SKILL.md` with instructions for when and how to use it.

**Never:**

- Never commit `.env` files or secrets

## Cursor Cloud specific instructions

- **What runs:** This is a frontend-only pnpm + Turborepo monorepo (`packages/*`). The only runnable service is `stockflow-application` (Webpack dev server on port `3000`). The NestJS backend and PostgreSQL described in `PRD.md`/`tickets/` are planned and do not exist yet, so no database, API, or `.env` is required.
- **Standard commands** (from repo root, see root `package.json`): `pnpm dev` (dev server on port 3000), `pnpm build`, `pnpm lint`, `pnpm type-check`. CI (`.circleci/config.yml`) runs `lint`, `type-check`, and `build` — there is no test runner configured.
- **Node gotcha:** every `pnpm` script runs `scripts/check-node.mjs` first, which hard-fails on Node < 22.13. `.nvmrc` pins `v26.3.0` while `engines.node` only requires `>=22.13`; any Node >= 22.13 works, so ignore the `.nvmrc` mismatch.
- **Data is client-side:** the Quick-Add form and inventory table hold state in React (seeded via `SEED_ITEMS`); added items persist only for the session and reset on reload since there is no backend.