export type PipelineStatus =
  | 'new'
  | 'under_review'
  | 'meeting_scheduled'
  | 'active_diligence'
  | 'passed';

export type DealStage =
  | 'Pre-seed'
  | 'Seed'
  | 'Series A'
  | 'Series B'
  | 'Series B+'
  | 'Unknown';

export type RedFlagSeverity = 'high' | 'medium' | 'low';

export interface TractionMetric {
  metric: string;
  value: string;
}

export interface TeamMember {
  name: string;
  role: string;
  background: string;
}

export interface RedFlag {
  headline: string;
  detail: string;
  severity: RedFlagSeverity;
}

export interface MarketData {
  tam: string | null;
  sam: string | null;
  som: string | null;
  framing: string | null;
}

export interface DealAnalysis {
  companyName: string;
  oneLiner: string;
  problem: string;
  solution: string;
  businessModel: string;
  stage: DealStage;
  sector: string;
  geography: string;
  founded: string | null;
  website: string | null;
  market: MarketData;
  traction: TractionMetric[];
  team: TeamMember[];
  askingAmount: string | null;
  valuation: string | null;
  redFlags: RedFlag[];
  rawHighlights: string[];
}

export interface ThesisCriterion {
  name: string;
  description: string;
  weight: number;
}

export interface ThesisScore {
  criterion: string;
  score: number;
  reason: string;
  weight: number;
}

export interface AutoFlags {
  noRevenueModel: boolean;
  soloFounder: boolean;
  noTractionMetrics: boolean;
  unsubstantiatedMarket: boolean;
  outsideStage: boolean;
}

export interface ThesisConfig {
  id?: string;
  analystId: string;
  firmName: string;
  focusStages: DealStage[];
  targetSectors: string[];
  checkSizeMin: number;
  checkSizeMax: number;
  geography: string[];
  criteria: ThesisCriterion[];
  autoFlags: AutoFlags;
}

export interface MemoContent {
  executiveSummary: string;
  problemSolution: { problem: string; solution: string };
  marketCommentary: string;
  tractionCommentary: string;
  teamAssessment: string;
  thesisAlignment: string;
  keyRisks: string[];
  recommendation: 'PURSUE' | 'WATCH' | 'PASS';
  recommendationRationale: string;
}

export interface Deal {
  id: string;
  analystId: string;
  companyName: string;
  oneLiner: string;
  stage: DealStage;
  sector: string;
  geography: string;
  analysis: DealAnalysis;
  thesisScores: ThesisScore[];
  overallThesisScore: number;
  redFlags: RedFlag[];
  pipelineStatus: PipelineStatus;
  analystNotes: string;
  memoContent: MemoContent | null;
  aiDetection: AIDetectionReport | null;
  createdAt: string;
  updatedAt: string;
}

export interface AnalystProfile {
  firmName: string;
  analystName: string;
  email: string;
}

export interface AIDetectionSection {
  name: string;
  score: number;
  flag: string | null;
}

export interface AIFlaggedExcerpt {
  text: string;
  section: string;
  reason: string;
}

export interface AIDetectionReport {
  overallScore: number;
  sections: AIDetectionSection[];
  flaggedExcerpts: AIFlaggedExcerpt[];
  analystNote: string;
}
