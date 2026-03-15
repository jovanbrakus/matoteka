# Matoteka Project Guidelines

## Git Rules

**NEVER commit unless the user explicitly asks you to.** Wait for an explicit instruction like "commit this" before running `git commit`. This applies to all repos (matoteka, prijemni, etc.).

## Problems Database

The authoritative source of the problems database is the **prijemni project** at `/Users/jovan/personal/prijemni`. This includes:

- `database/` - JSON metadata files (problems.json, categories.json, documents.json, reports.json, sema_zadataka.md)
- `problems/` - HTML problem files (799+ files organized by faculty and year)

**DO NOT make local changes** to `database/` or `problems/` in this repo. Any local modifications will be overwritten on the next sync, as the prijemni project is the one being regularly updated.

To sync, use: `/sync-problems`

## Logo & Typography

- **Logo SVG**: `assets/logo/logo.svg` (also copied to `public/logo.svg`)
- **Logo mascot**: Orange beaver (dabar) with glasses, pencil, and "+" math symbol
- **Logo font**: **Fredoka** (semibold 600) — used for the "Matoteka" wordmark next to the logo
- **Body font**: **Inter** — used for all UI text
- **Logo usage**: Always show the SVG beaver icon + "Matoteka" text in Fredoka font side by side. Use `<img src="/logo.svg">` (not Next.js `<Image>`), with font style `fontFamily: "'Fredoka', sans-serif"`.
- **Logo PNG variants**: stored in `assets/logo/` (various exploration versions v1-v14)

## Running JS Scripts

This project does **not** have `dotenv` installed. To run one-off Node.js scripts that need env vars from `.env.local`:

```bash
export DATABASE_URL="..." && node -e '
const { neon } = require("@neondatabase/serverless");
// ...
'
```

- Manually export needed env vars (don't `source .env.local` — it has `&` chars that break shell parsing)
- Use `node -e` with `require()` — `npx tsx -e` has issues with top-level await in CJS mode
- Only require packages that are in `node_modules` (e.g. `bcryptjs`, `@neondatabase/serverless`)
