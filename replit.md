# Tulsa Mobile Detailers

A polished, mobile-first marketing website for a door-to-door car detailing service in Tulsa, Oklahoma.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/tulsa-mobile-detailers/src/App.tsx` — shared shell, routes, gallery data, and booking form
- `artifacts/tulsa-mobile-detailers/src/index.css` — site tokens, layout utilities, grid texture, and motion
- `artifacts/tulsa-mobile-detailers/vite.config.ts` — Vite artifact routing and preview configuration

## Architecture decisions

- The site is a frontend-only marketing experience; booking requests are confirmed in the UI and do not process payment.
- Wouter provides the four-page route shell so navigation works without a backend.
- Remote Pexels imagery is used for replaceable automotive/detailing placeholders, with a graceful image fallback.
- Appointment validation uses the existing react-hook-form and Zod dependencies.

## Product

- Home page introduces the mobile detailing service and four core services.
- Gallery page shows eight before-and-after transformations with category filtering.
- Book page collects customer and vehicle details and shows a confirmation state after submission.
- Contact page provides phone, email, service area, hours, and a booking CTA.

## User preferences

No standing preferences recorded.

## Gotchas

- The frontend workflow supplies `PORT` and `BASE_PATH`; run the artifact through its managed workflow rather than starting Vite at the workspace root.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
