# Tatamata Project Guidelines

## Problems Database

The authoritative source of the problems database is the **prijemni project** at `/Users/jovan/personal/prijemni`. This includes:

- `database/` - JSON metadata files (problems.json, categories.json, documents.json, reports.json, sema_zadataka.md)
- `problems/` - HTML problem files (799+ files organized by faculty and year)

**DO NOT make local changes** to `database/` or `problems/` in this repo. Any local modifications will be overwritten on the next sync, as the prijemni project is the one being regularly updated.

To sync, use: `/sync-problems`

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
