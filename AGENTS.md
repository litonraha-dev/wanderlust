# AGENTS.md

## Commands

- `npm run dev` — dev server (localhost:3000)
- `npm run build` — production build (Turbopack)
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`)
- `npx tsc --noEmit` — typecheck (no `typecheck` script exists; run this before finishing work)

No test framework is configured.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Next.js 16 quirks (verified in `next.config.ts`)

- **Read bundled docs first**: before writing Next.js code, check `node_modules/next/dist/docs/` — APIs differ from training data (e.g. layouts must use the `LayoutProps<"/">` type helper, not hand-typed props; see `src/app/layout.tsx`).
- **`cacheComponents: true`** is enabled: uncached dynamic data access must be wrapped in `<Suspense>`; use `use cache` / `cache()` for caching. `partialPrefetching` and `reactCompiler: true` are also on (React Compiler via `babel-plugin-react-compiler` — write idiomatic React, no manual memoization).
- **Tailwind v4, no config file**: theming lives in CSS-first form in `src/app/globals.css`; Tailwind is wired through Turbopack rules in `next.config.ts` (no `tailwind.config.*`, none needed).

## shadcn/ui setup (from `components.json`)

- The full component set is already vendored in `src/components/ui` (~70 files) — check for an existing component before writing one from scratch.
- Style is `base-nova` (Base UI based, not Radix). Add new components with `npx shadcn@latest add <name>`; don't hand-roll or paste Radix-based snippets.
- Aliases: `@/*` → `src/*`; `@/components/ui`, `@/lib/utils` (`cn`), `@/hooks`.

## Structure

- All app code lives in `src/app` — currently just the single route `/` (`src/app/page.tsx`) plus `layout.tsx`/`globals.css`.
- Everything under `src/components/ui` is generated shadcn output; app-specific components would go in `src/components`, not `src/components/ui`.
