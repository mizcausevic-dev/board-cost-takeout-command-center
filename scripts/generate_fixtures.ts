import { toExport } from "../src/analyze.js";
import { sampleBoardCostTakeoutCommandCenter } from "../src/data/sampleVerticalBrief.js";
import { writeFileSync } from "node:fs";

const FIXTURE_GENERATED_AT = "2026-06-01T00:00:00Z";

const clean = sampleBoardCostTakeoutCommandCenter.map((item) => ({
  ...item,
  relatedSurfaces: [...item.relatedSurfaces].sort(),
  requiredEvidence: [...item.requiredEvidence].sort(),
  companyTags: [...item.companyTags].sort()
}));

writeFileSync(
  "fixtures/board-cost-takeout-command-center.json",
  JSON.stringify(toExport(sampleBoardCostTakeoutCommandCenter, FIXTURE_GENERATED_AT), null, 2)
);

writeFileSync(
  "fixtures/board-cost-takeout-command-center-clean.json",
  JSON.stringify(toExport(clean, FIXTURE_GENERATED_AT), null, 2)
);
