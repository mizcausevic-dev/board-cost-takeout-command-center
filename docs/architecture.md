# Architecture

Board Cost Takeout Command Center is a static-friendly TypeScript executive-intelligence surface for showing what leadership should cut, consolidate, protect, and hold next to remove cost without breaking critical operations.

## Core flow

- `src/data/sampleVerticalBrief.ts` models takeout lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness.
- `src/analyze.ts` scores savings realization, execution complexity, continuity risk, owner clarity, board defensibility, urgency, and annual savings while generating takeout findings.
- `src/services/verticalBriefService.ts` exposes the takeout-queue, savings-owners, execution-blockers, and risk-map packets used by both the app and prerender step.
- `src/services/render.ts` turns those packets into board-readable HTML routes plus a sample export.
- `scripts/prerender.ts` produces the static site and JSON payloads for GitHub Pages.

## Output shape

Each lane is designed to answer the same executive questions:

- what should we cut now
- what should be consolidated instead of duplicated
- what must be protected from takeout pressure
- what can leadership hold flat until evidence improves

## Guardrails

- synthetic data only
- read-only public surface
- no tenant credentials or private documents
- no compliance overclaim language
