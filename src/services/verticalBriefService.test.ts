import { describe, expect, it } from "vitest";
import { executionBlockers, payload, riskMap, savingsOwners, summary, takeoutQueue, verification } from "./verticalBriefService.js";

describe("board cost takeout service", () => {
  it("returns the summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the takeout queue", () => {
    expect(takeoutQueue()[0]?.audience).toBeTruthy();
  });

  it("returns the savings owners view", () => {
    expect(savingsOwners()[0]?.savingsRealizationScore).toBeGreaterThan(0);
  });

  it("returns the execution blockers view", () => {
    expect(executionBlockers()[0]?.continuityRiskScore).toBeGreaterThan(0);
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification()[0]).toContain("Synthetic");
  });

  it("keeps the headline in the payload sample", () => {
    expect(payload().sample[0]?.headline).toBeTruthy();
  });
});
