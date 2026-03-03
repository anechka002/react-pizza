# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains all application code.
- `src/app/` holds app bootstrap, global styles, and Redux store/slices (`redux/store.ts`, `redux/slices/*`).
- `src/common/` contains reusable modules: `components/`, `pages/`, `hooks/`, `utils/`, `types/`, and routing.
- `src/assets/` stores images/icons; `public/` is for static files served as-is.
- Path alias `@/` maps to `src/` (configured in `tsconfig.app.json` and `vite.config.ts`).

## Build, Test, and Development Commands
Use `pnpm` (lockfile is `pnpm-lock.yaml`).
- `pnpm install` - install dependencies.
- `pnpm dev` - start Vite dev server with HMR.
- `pnpm build` - run TypeScript project build (`tsc -b`) and produce production bundle.
- `pnpm lint` - run ESLint on the codebase.
- `pnpm preview` - serve the built app locally for verification.
- After each task, run `pnpm build` to verify the code.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components.
- Follow ESLint config in `eslint.config.js`; fix warnings before opening a PR.
- Prefer `@/` imports over long relative paths.
- Naming:
  - Components/pages: `PascalCase` (`Header.tsx`, `FullPizza.tsx`).
  - Hooks/utils/selectors/functions: `camelCase` (`useDebounce`, `calcTotalPrice`).
  - SCSS modules: `*.module.scss`; shared SCSS partials in `src/app/scss/components/` use `_name.scss`.

## Testing Guidelines
- No automated test runner is currently configured in this repository.
- Agent workflow requirement: after completing each task, run `pnpm build` and ensure it passes before returning results.
- Minimum pre-PR quality gate: run `pnpm lint` and `pnpm build` successfully.
- For new tests, use `*.test.ts` / `*.test.tsx` naming and place tests near feature code (for example, beside component files).

## Commit & Pull Request Guidelines
- Use Conventional Commits for all new commits:
  - `<type>[optional scope]: <description>`
  - `[optional body]`
  - `[optional footer(s)]`
- Preferred commit types:
  - `fix`: patches a bug (PATCH in Semantic Versioning).
  - `feat`: introduces a new feature (MINOR in Semantic Versioning).
  - `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test` and other conventional types are allowed.
- Breaking changes:
  - Add `!` after type/scope (for example, `feat(api)!: remove legacy endpoint`) or include a `BREAKING CHANGE:` footer.
  - Breaking changes correlate with MAJOR in Semantic Versioning.
- Keep commits focused on one logical change.
- PRs should include:
  - clear summary of behavioral changes,
  - linked issue/task (if available),
  - screenshots/GIFs for UI updates,
  - confirmation that `pnpm lint` and `pnpm build` passed.
