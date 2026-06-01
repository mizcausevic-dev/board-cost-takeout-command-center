import type {
  BoardCostTakeoutExport,
  BoardCostTakeoutItem,
  BoardCostTakeoutReport,
  Finding
} from "./types.js";

function average(items: BoardCostTakeoutItem[], pick: (item: BoardCostTakeoutItem) => number) {
  return Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length);
}

function evaluate(item: BoardCostTakeoutItem): Finding[] {
  const findings: Finding[] = [];

  if ((item.action === "CUT" || item.action === "CONSOLIDATE") && item.savingsRealizationScore >= 75 && item.continuityRiskScore <= 45) {
    findings.push({
      code: "takeout-ready",
      severity: "medium",
      track: item.track,
      audience: item.audience,
      message: "This lane is ready for cost takeout without breaking the operating story."
    });
  }

  if (item.action === "PROTECT" && item.continuityRiskScore >= 82) {
    findings.push({
      code: "continuity-risk",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "This lane carries too much continuity risk to be a serious takeout candidate."
    });
  }

  if (item.ownerClarityScore <= 65) {
    findings.push({
      code: "owner-gap",
      severity: item.ownerClarityScore <= 52 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Savings ownership is still too unclear for leadership to trust the takeout plan."
    });
  }

  if (item.executionComplexityScore >= 72) {
    findings.push({
      code: "complexity-blocker",
      severity: item.executionComplexityScore >= 82 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Execution complexity is high enough that the board should expect blockers before savings land."
    });
  }

  if (item.boardDefensibilityScore < 68 || item.requiredEvidence.length > 4) {
    findings.push({
      code: "defendability-gap",
      severity: item.boardDefensibilityScore < 60 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "The takeout narrative still rests on thin proof and needs tighter evidence before approval."
    });
  }

  if (item.action === "HOLD") {
    findings.push({
      code: "hold-the-line",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "Leadership should hold this lane flat until proof quality or execution conditions improve."
    });
  }

  return findings;
}

export function analyze(items: BoardCostTakeoutItem[], options: { now?: string } = {}): BoardCostTakeoutReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap((item) => evaluate(item));
  const takeoutReadyLanes = items.filter((item) => item.action === "CUT" || item.action === "CONSOLIDATE").length;
  const protectedLanes = items.filter((item) => item.action === "PROTECT").length;
  const annualSavingsMillions = Math.round(items.reduce((sum, item) => sum + item.annualSavingsMillions, 0));

  return {
    generatedAt,
    items: items.length,
    averageSavingsRealizationScore: average(items, (item) => item.savingsRealizationScore),
    averageExecutionComplexityScore: average(items, (item) => item.executionComplexityScore),
    averageContinuityRiskScore: average(items, (item) => item.continuityRiskScore),
    averageOwnerClarityScore: average(items, (item) => item.ownerClarityScore),
    averageBoardDefensibilityScore: average(items, (item) => item.boardDefensibilityScore),
    averageUrgencyScore: average(items, (item) => item.urgencyScore),
    takeoutReadyLanes,
    protectedLanes,
    annualSavingsMillions,
    findingsList,
    ok: findingsList.filter((item) => item.severity === "high").length <= items.length
  };
}

export function toExport(items: BoardCostTakeoutItem[], now?: string): BoardCostTakeoutExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
