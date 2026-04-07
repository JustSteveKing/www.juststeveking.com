import type { EvidenceKind, ReviewTone } from './types';

export const tonePalette: Record<ReviewTone, { solid: string; soft: string }> = {
  green: { solid: '#4ade80', soft: '#052e16' },
  amber: { solid: '#f59e0b', soft: '#451a03' },
  red: { solid: '#f87171', soft: '#450a0a' },
};

export const evidencePalette: Record<EvidenceKind, { label: string; solid: string; soft: string }> = {
  strength: { label: 'Strength', solid: '#86efac', soft: '#052e16' },
  gap: { label: 'Gap', solid: '#fca5a5', soft: '#450a0a' },
  opportunity: { label: 'Opportunity', solid: '#fcd34d', soft: '#451a03' },
};
