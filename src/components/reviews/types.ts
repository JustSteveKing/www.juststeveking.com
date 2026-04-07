export type ReviewTone = 'green' | 'amber' | 'red';
export type EvidenceKind = 'strength' | 'gap' | 'opportunity';

export interface ReviewHeroData {
  badge: string;
  titleAccent: string;
  title: string;
  subtitle: string;
  meta: string[];
}

export interface ReviewScore {
  id: string;
  label: string;
  score: number;
  verdict: string;
  tone: ReviewTone;
  sectionId: string;
}

export interface ReviewEvidence {
  kind: EvidenceKind;
  title: string;
  body: string[];
  sourceUrl?: string;
  sourceLabel?: string;
}

export interface ReviewBreakdownItem {
  label: string;
  value: number;
  tone: ReviewTone;
}

export interface ReviewSectionData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  findings: string[];
  evidence: ReviewEvidence[];
  breakdownIntro: string;
  breakdown: ReviewBreakdownItem[];
  recommendations: string[];
}

export interface ReviewExperienceProps {
  hero: ReviewHeroData;
  scores: [ReviewScore, ReviewScore, ReviewScore, ReviewScore];
  sections: ReviewSectionData[];
  footerNote: string;
}
