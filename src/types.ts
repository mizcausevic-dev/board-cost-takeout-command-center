export type TakeoutTrack =
  | "AI_PLATFORM"
  | "IDENTITY_SECURITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "PROCUREMENT_TRUST"
  | "PUBLIC_SECTOR";

export type TakeoutAction = "CUT" | "CONSOLIDATE" | "HOLD" | "PROTECT";

export interface BoardCostTakeoutItem {
  id: string;
  owner: string;
  audience: string;
  track: TakeoutTrack;
  action: TakeoutAction;
  spendCategory: string;
  takeoutTheme: string;
  boardQuestion: string;
  currentPosture: string;
  recommendedMove: string;
  savingsRealizationScore: number;
  executionComplexityScore: number;
  continuityRiskScore: number;
  ownerClarityScore: number;
  boardDefensibilityScore: number;
  urgencyScore: number;
  annualSavingsMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
  companyTags: string[];
  relatedSurfaces: string[];
  requiredEvidence: string[];
}

export interface BoardCostTakeoutExport {
  generatedAt: string;
  items: BoardCostTakeoutItem[];
}

export type FindingCode =
  | "takeout-ready"
  | "continuity-risk"
  | "owner-gap"
  | "complexity-blocker"
  | "defendability-gap"
  | "hold-the-line";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  track: TakeoutTrack;
  audience: string;
  message: string;
}

export interface BoardCostTakeoutReport {
  generatedAt: string;
  items: number;
  averageSavingsRealizationScore: number;
  averageExecutionComplexityScore: number;
  averageContinuityRiskScore: number;
  averageOwnerClarityScore: number;
  averageBoardDefensibilityScore: number;
  averageUrgencyScore: number;
  takeoutReadyLanes: number;
  protectedLanes: number;
  annualSavingsMillions: number;
  findingsList: Finding[];
  ok: boolean;
}
