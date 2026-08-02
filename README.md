# Northstar Commerce

Northstar Commerce is a React, TypeScript, and Vite storefront demo that uses Redux Toolkit, React Query, React Router, and MSW.

## Architecture

The app keeps UI state in Redux, server state in React Query, and product data in a single API boundary under `src/features/products/api`. Pages and components consume query hooks rather than importing catalog fixtures directly.

## Data Flow

Shop filters live in the URL. `useProductFilters` parses and writes search params, `mapShopFiltersToProductParams` converts them into API params, the product API validates requests and responses, and MSW mirrors the same contract for local development and tests.

## Demo Authentication

Authentication is demo-only. The mock auth adapter is isolated behind `src/features/auth/authAdapter.ts`, and production mode rejects demo auth instead of pretending to provide real security.

## Mock API Mode

Set `VITE_APP_MODE=demo` to use the mock API and mock auth. Set `VITE_APP_MODE=production` only when a real API base URL is available and mock flags are disabled. `VITE_` variables are public client configuration and must never contain secrets.

## Environment

`VITE_API_BASE_URL` is required in production mode. Boolean flags are parsed explicitly, and invalid production configuration fails during startup.

## Scripts

```bash
npm run dev
npm run typecheck
npm run lint
npm run test
npm run build
npm run audit:high
```

## Testing Strategy

Tests cover the product API boundary, shop filter integration, selector memoization, environment validation, store persistence, and auth storage behavior. MSW is used in tests to keep request and response handling realistic.

## Trade-offs

The product and auth experiences are intentionally demo-scoped. The code favors explicit failure over silent fallbacks, and production mode requires a real backend before those flows can be considered secure.
