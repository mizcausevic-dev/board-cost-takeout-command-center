import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardCostTakeoutCommandCenter } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleBoardCostTakeoutCommandCenter, { now: "2026-06-01T00:00:00Z" });
    expect(report.items).toBe(sampleBoardCostTakeoutCommandCenter.length);
  });

  it("computes positive takeout metrics", () => {
    const report = analyze(sampleBoardCostTakeoutCommandCenter, { now: "2026-06-01T00:00:00Z" });
    expect(report.averageSavingsRealizationScore).toBeGreaterThan(0);
    expect(report.averageExecutionComplexityScore).toBeGreaterThan(0);
  });

  it("counts takeout-ready and protected lanes", () => {
    const report = analyze(sampleBoardCostTakeoutCommandCenter, { now: "2026-06-01T00:00:00Z" });
    expect(report.takeoutReadyLanes).toBeGreaterThan(0);
    expect(report.protectedLanes).toBeGreaterThan(0);
  });

  it("emits findings", () => {
    const report = analyze(sampleBoardCostTakeoutCommandCenter, { now: "2026-06-01T00:00:00Z" });
    expect(report.findingsList.length).toBeGreaterThan(0);
  });

  it("rolls up annual savings", () => {
    const report = analyze(sampleBoardCostTakeoutCommandCenter, { now: "2026-06-01T00:00:00Z" });
    expect(report.annualSavingsMillions).toBeGreaterThan(0);
  });
});
