# Shipped PRDs — 2026-06-12 batch

Archived after MVP implementation on 2026-06-20.

## Watchlist import/export

- Shelf JSON + CSV export endpoints and watchlist UI
- MAL XML/CSV, AniList JSON, and Shelf JSON import with preview
- Conflict detection and merge / replace / skip import modes

Source PRD: `docs/plans/2026-06-12-watchlist-import-export-prd.md`

## Saved search alerts (in-app MVP)

- `saved_searches` + `saved_search_alerts` tables and worker CRUD
- Daily cron evaluates saved filters after catalog refresh
- `/alerts` page, Save search on `/search`, nav badge count

Source PRD: `docs/plans/2026-06-12-saved-search-alerts-prd.md`

## Public collections

- `collections` + `collection_items` tables and CRUD/public read API
- `/collections` editor (watchlist picker) and public `/c/:slug` page

Source PRD: `docs/plans/2026-06-12-public-collections-prd.md`
