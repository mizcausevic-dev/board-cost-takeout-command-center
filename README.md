# Board Cost Takeout Command Center

Board-ready cost-takeout command center for sequencing savings owners, execution blockers, and takeout proof across the executive estate.

- Live: `https://takeout.kineticgain.com/`
- Repo: `mizcausevic-dev/board-cost-takeout-command-center`

## Why this matters

Leaders need more than a generic budget cut list. They need one command surface that shows what should be cut, what should be consolidated, what must be protected, and where execution blockers still make the savings story hard to defend.

## What it includes

- TypeScript executive-intelligence surface for cost takeout with modeled savings realization, execution complexity, continuity risk, owner clarity, board defensibility, and urgency signals
- synthetic executive lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness
- reusable outputs for takeout queues, savings-owner packets, execution blockers, and board-ready risk maps
- prerendered static site, JSON payloads, screenshots, and docs

## Routes

- `/`
- `/takeout-queue`
- `/savings-owners`
- `/execution-blockers`
- `/verification`
- `/docs`

## Local run

```bash
cd board-cost-takeout-command-center
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI

```bash
npx board-cost-takeout-command-center fixtures/board-cost-takeout-command-center.json --format summary
npx board-cost-takeout-command-center fixtures/board-cost-takeout-command-center-clean.json --format json
```

## Docs

- [Architecture](docs/architecture.md)
- [Origin](docs/ORIGIN.md)
- [Kinetic Gain Embedded](docs/KINETIC_GAIN_EMBEDDED.md)

## Screenshots

![Overview](screenshots/01-overview-proof.png)
![Takeout queue](screenshots/02-takeout-queue-proof.png)
![Savings owners](screenshots/03-savings-owners-proof.png)
![Execution blockers](screenshots/04-execution-blockers-proof.png)

