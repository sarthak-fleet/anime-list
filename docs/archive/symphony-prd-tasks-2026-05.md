# Symphony PRD / Task Briefs — May 2026 (anime_list)

These were the active in_progress Symphony (SaaS Maker) tasks / product requirement briefs for anime_list during May 2026 active-ai loops. They are preserved here as durable journey artifacts.

All have been implemented (or explicitly deferred per their own criteria) and recorded as done in PROJECT_STATUS.md and the Active AI Task Log in README.md. Source of truth for board status: SaaS Maker Cockpit.

Dot-workspace dirs (`.symphony/`, `.clawpatch/`) were local session artifacts (gitignored via local exclude) and have been cleaned after archival.

## Tasks

### 36332e19-5977-49c9-a1fe-7c0ed4284b5d
**Title:** [active-ai-priority] anime_list: Make discovery list-aware  
**Priority:** medium  
**Work:** Add or improve a discovery queue that accounts for current season, saved/list status, and quick save/dismiss actions.  
**Outcome:** Shipped. See `/discover`, `components/DiscoveryQueue.tsx`, `src/worker.ts` discover routes, taste scoring in recommendations. Anime + manga support.

### f600afd0-7930-41fd-8a0e-2102eda97493
**Title:** Full fleet audit: anime_list  
**Priority:** high  
**Outcome:** Audit context captured in `docs/PROJECT_RECOMMENDATION_CONTEXT.md`. Residual config risks (lint scope, deploy branch guard) addressed June 2026. See also clawpatch reports (archived in this dir's sibling history).

### a880f2b4-bcdb-4c2c-afc3-b310d44b6cd9
**Title:** anime_list: add shareable anime-character identity quiz brief  
**Priority:** low  
**Outcome:** Brief written (`docs/plans/2026-06-04-character-identity-quiz-brief.md`). Smallest proof shipped at `/quiz` (structured questions → archetype → prefilled search URL). Explicitly deferred for expansion per evaluation in the brief. See PROJECT_STATUS.

### 0c5ec1b7-534b-44c2-9cb6-f1a450b3f60d
**Title:** [active-ai-ship] anime_list: Review and ship first-screen discovery fix  
**Priority:** high  
**Outcome:** Polished search landing (Discover* UI primitives, header, live counts/skeletons with "Building your shelf", poster grids, ActiveFilterChips) in `components/FilterBuilder.tsx`, `components/ResultsGrid.tsx`, `components/discover/ui.tsx`. Shipped and verified in prod flows.

### e775b1b8-3d25-4132-94f5-a391d38aeb43
**Title:** anime_list: add filter result explanation chips  
**Priority:** low  
**Outcome:** Shipped. `ActiveFilterChip` + `formatFilterChip` used for active advanced + genre + season + popularity filters in both anime and manga FilterBuilders. Remove actions update URL state. Recorded done 2026-05-26 in logs.

### a935677b-0512-4837-a230-1b8e37daa7ed
**Title:** [active-ai-product] anime_list: Build a list-aware seasonal discovery queue  
**Priority:** medium  
**Outcome:** See 36332e19. Extended with manga, reasons display, status picker per card, refetch on end-of-batch, signed-in gating, cache invalidation on add.

### 3f9e43c7-e311-4bfc-8001-4ea54f34c4e5
**Title:** [active-ai-ui] anime_list: Polish anime detail and list-management flow  
**Priority:** medium  
**Outcome:** Incremental delivery via follow-on commits: improved auth sign-in loading, discover card states, schedule/watchlist invalidation on mutations, random endpoint registration, worker edge caching for detail. Detail views (`AnimeDetailView`, `MangaDetailView`) + modal routes + watchlist add flows provide fast list updates without full context loss.

## Notes
- Acceptance criteria for all (inspect first, scope smallest, cover states, run checks, record follow-ups) were followed in the implementation commits.
- To mark board rows done (when authenticated in fleet env):
  `pnpm --dir ~/Desktop/fleet/saas-maker symphony done <id>`
- Related: `docs/plans/2026-06-04-character-identity-quiz-brief.md`, `PROJECT_STATUS.md`, clawpatch findings (lint/deploy addressed).
- Date of archival: 2026-06-13

(Original prompt.md and route.md contents from `.symphony/workspaces/<id>/` preserved here in summary form; full texts were the direct PRD inputs to agents.)
