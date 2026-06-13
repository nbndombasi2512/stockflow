# M2-03 — Stock computation & validation service

- **Milestone:** M2 — Inventory Core
- **Type:** Backend
- **Estimate:** 2-3 hrs
- **Depends on:** M2-01, M2-02

## Description

Create a NestJS injectable service that applies movements transactionally using Prisma `$transaction`: it writes a ledger record and updates the affected stock level(s) atomically, with validation.

## Acceptance Criteria

- [ ] Applying a movement and updating stock level occur in one Prisma `$transaction`.
- [ ] Rejects movements that would drive a stock level negative.
- [ ] Reusable by receive/ship/transfer/adjust endpoints.
- [ ] Jest unit tests cover increase, decrease, and rejection cases.
