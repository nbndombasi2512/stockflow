# StockFlow — Ticket Backlog

Task-level tickets derived from [PRD.md](../PRD.md). Each ticket is sized at roughly 1-3 hours and lives in its own file.

Naming: `M{milestone}-{seq}-{slug}.md`

## Stack Conventions

All tickets assume this stack (see [PRD.md](../PRD.md) section 9):

- **Frontend:** React + TypeScript, bundled with Webpack, styled with styled-components.
  - Forms built with React Hook Form.
  - UI primitives from Radix UI.
  - Server state/data fetching via TanStack Query (React Query).
  - Data tables built with TanStack Table.
- **Backend:** NestJS (TypeScript) with modules/controllers/services, DTOs validated by `class-validator`, persistence via Prisma.
- **Database:** PostgreSQL; schema defined in `schema.prisma`, changes via Prisma Migrate.
- **Auth:** NestJS Passport strategy with JWT guards.

## M0 — Project Setup

- [M0-01](M0-01-frontend-scaffold.md) — Scaffold React + TypeScript frontend
- [M0-02](M0-02-backend-scaffold.md) — Scaffold Node/Express REST backend
- [M0-03](M0-03-database-setup.md) — Set up PostgreSQL + migrations tooling
- [M0-04](M0-04-lint-format-ci.md) — Configure lint, format, and CI

## M1 — Foundations (auth, locations, products CRUD)

- [M1-01](M1-01-user-model.md) — User model + migration
- [M1-02](M1-02-signup-endpoint.md) — Signup endpoint
- [M1-03](M1-03-login-endpoint.md) — Login endpoint + session/JWT
- [M1-04](M1-04-auth-middleware.md) — Auth guard
- [M1-05](M1-05-signup-page.md) — Signup page
- [M1-06](M1-06-login-page.md) — Login page
- [M1-07](M1-07-protected-routes.md) — Auth state + protected routes
- [M1-08](M1-08-location-model.md) — Location model + migration
- [M1-09](M1-09-location-crud-api.md) — Location CRUD API
- [M1-10](M1-10-location-list-page.md) — Location list page
- [M1-11](M1-11-location-form.md) — Location create/edit/archive form
- [M1-12](M1-12-product-model.md) — Product model + migration (unique SKU)
- [M1-13](M1-13-product-crud-api.md) — Product CRUD API
- [M1-14](M1-14-product-list-page.md) — Product list page
- [M1-15](M1-15-product-form.md) — Product create/edit/archive form

## M2 — Inventory Core (stock levels + movement ledger)

- [M2-01](M2-01-stocklevel-model.md) — StockLevel model + migration
- [M2-02](M2-02-movement-model.md) — Movement (ledger) model + migration
- [M2-03](M2-03-stock-service.md) — Stock computation & validation service
- [M2-04](M2-04-receive-endpoint.md) — Receive movement endpoint
- [M2-05](M2-05-ship-endpoint.md) — Ship/Issue movement endpoint
- [M2-06](M2-06-adjust-endpoint.md) — Adjust movement endpoint
- [M2-07](M2-07-receive-form.md) — Receive stock form
- [M2-08](M2-08-ship-form.md) — Ship stock form
- [M2-09](M2-09-adjust-form.md) — Adjust stock form

## M3 — Multi-location (transfers + per-location views)

- [M3-01](M3-01-transfer-endpoint.md) — Transfer endpoint (atomic)
- [M3-02](M3-02-transfer-form.md) — Transfer stock form
- [M3-03](M3-03-location-detail-page.md) — Location detail page
- [M3-04](M3-04-product-location-breakdown.md) — Per-location breakdown on product detail

## M4 — Visibility (search, detail, dashboard, low-stock)

- [M4-01](M4-01-product-search-filter-api.md) — Product search/filter API
- [M4-02](M4-02-product-search-filter-ui.md) — Product search/filter UI
- [M4-03](M4-03-movement-history-api.md) — Movement history API
- [M4-04](M4-04-product-detail-page.md) — Product detail page + history
- [M4-05](M4-05-dashboard-stats-api.md) — Dashboard stats API
- [M4-06](M4-06-dashboard-page.md) — Dashboard page
- [M4-07](M4-07-low-stock-indicators.md) — Low-stock indicators
