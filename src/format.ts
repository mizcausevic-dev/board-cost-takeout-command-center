import type { BoardCostTakeoutReport } from "./types.js";

export function toSummary(report: BoardCostTakeoutReport) {
  return [
    `Takeout lanes: ${report.items}`,
    `Average savings realization: ${report.averageSavingsRealizationScore}`,
    `Average execution complexity: ${report.averageExecutionComplexityScore}`,
    `Average continuity risk: ${report.averageContinuityRiskScore}`,
    `Average owner clarity: ${report.averageOwnerClarityScore}`,
    `Average board defensibility: ${report.averageBoardDefensibilityScore}`,
    `Average urgency: ${report.averageUrgencyScore}`,
    `Takeout-ready lanes: ${report.takeoutReadyLanes}`,
    `Protected lanes: ${report.protectedLanes}`,
    `Annual savings ($M): ${report.annualSavingsMillions}`,
    `High findings: ${report.findingsList.filter((item) => item.severity === "high").length}`
  ].join("\n");
}
