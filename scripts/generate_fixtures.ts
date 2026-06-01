import { toExport } from "../src/analyze.js";
import { sampleBoardCostTakeoutCommandCenter } from "../src/data/sampleVerticalBrief.js";
import { writeFileSync } from "node:fs";

const clean = sampleBoardCostTakeoutCommandCenter.map((item) => ({
  ...item,
  relatedSurfaces: [...item.relatedSurfaces].sort(),
  requiredEvidence: [...item.requiredEvidence].sort(),
  companyTags: [...item.companyTags].sort()
}));

writeFileSync(
  "fixtures/board-cost-takeout-command-center.json",
  JSON.stringify(toExport(sampleBoardCostTakeoutCommandCenter), null, 2)
);

writeFileSync(
  "fixtures/board-cost-takeout-command-center-clean.json",
  JSON.stringify(toExport(clean), null, 2)
);
