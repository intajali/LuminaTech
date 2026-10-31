# LuminaTech workspace

pnpm workspace for the LuminaTech mobile app and API.

## Layout

- `apps/mobile` — Expo SDK 58 app (`@luminatech/mobile`)
- `apps/api` — NestJS API (`@luminatech/api`)
- `packages/contracts` — shared TypeScript contracts (`@luminatech/contracts`)
- `prisma/schema.prisma` — PostgreSQL schema. Prisma Client is generated into the API.
- `docs` — project notes

## Scripts

Run these from the repository root:

- `pnpm dev:mobile` — Expo development server
- `pnpm dev:api` — NestJS in watch mode
- `pnpm build` — build shared contracts, generate Prisma Client, and build the API
- `pnpm format` and `pnpm format:check`
- `pnpm lint`, `pnpm typecheck`, and `pnpm test`
- `pnpm check` — format, lint, typecheck, and test
- `pnpm db:generate` — generate Prisma Client

## Environment

Copy `apps/api/.env.example` to `apps/api/.env` and `apps/mobile/.env.example` to `apps/mobile/.env`. Those copies, along with other secret and local env files, are gitignored. Only the example files are committed. Prisma ORM 7 is pinned (`prisma` and `@prisma/client` at 7.10.1). The Prisma 8 CLI is still a release candidate and is not used.
