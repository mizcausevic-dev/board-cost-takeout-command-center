import { analyze } from "../analyze.js";
import { sampleBoardCostTakeoutCommandCenter } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardCostTakeoutCommandCenter, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageSavingsRealizationScore: report.averageSavingsRealizationScore,
    averageExecutionComplexityScore: report.averageExecutionComplexityScore,
    averageContinuityRiskScore: report.averageContinuityRiskScore,
    averageOwnerClarityScore: report.averageOwnerClarityScore,
    averageBoardDefensibilityScore: report.averageBoardDefensibilityScore,
    averageUrgencyScore: report.averageUrgencyScore,
    takeoutReadyLanes: report.takeoutReadyLanes,
    protectedLanes: report.protectedLanes,
    annualSavingsMillions: report.annualSavingsMillions,
    highFindings,
    recommendation:
      "Consolidate duplicate procurement and AI wrappers, cut low-yield revenue backlog, protect identity and biotech control layers, and hold FinTech flat until execution blockers fall."
  };
}

export function takeoutQueue() {
  return sampleBoardCostTakeoutCommandCenter.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    action: item.action,
    spendCategory: item.spendCategory,
    takeoutTheme: item.takeoutTheme,
    recommendedMove: item.recommendedMove,
    nextMove: item.nextMove
  }));
}

export function savingsOwners() {
  return sampleBoardCostTakeoutCommandCenter
    .filter((item) => item.action === "CUT" || item.action === "CONSOLIDATE")
    .map((item) => ({
      owner: item.owner,
      audience: item.audience,
      action: item.action,
      savingsRealizationScore: item.savingsRealizationScore,
      ownerClarityScore: item.ownerClarityScore,
      executionComplexityScore: item.executionComplexityScore,
      annualSavingsMillions: item.annualSavingsMillions,
      companyTags: item.companyTags
    }));
}

export function executionBlockers() {
  return sampleBoardCostTakeoutCommandCenter.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    continuityRiskScore: item.continuityRiskScore,
    boardDefensibilityScore: item.boardDefensibilityScore,
    urgencyScore: item.urgencyScore,
    headline: item.headline,
    relatedSurfaces: item.relatedSurfaces,
    requiredEvidence: item.requiredEvidence
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic cost-takeout data only - no live board packets, operating budgets, or actual savings approvals are included.",
    "Savings realization, execution complexity, continuity risk, owner clarity, board defensibility, urgency, and annual savings metrics are modeled from the sample executive-intelligence estate in this repo.",
    "This surface is read-only and shows how Kinetic Gain can package board-readable cost-takeout decisions into one command center.",
    "Company tags and track labels are synthetic design aids rather than audited market or financial signals.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    takeoutQueue: takeoutQueue(),
    savingsOwners: savingsOwners(),
    executionBlockers: executionBlockers(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardCostTakeoutCommandCenter
  };
}
