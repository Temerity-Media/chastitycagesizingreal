export interface ScoreRange {
  range: {
    min: number;
    max: number;
  };
  score: number;
}

export interface CageModel {
  manufacturer: string;
  model: string;
  baseRingScores: ScoreRange[];
  cageDiameterScores: ScoreRange[];
  cageLengthScores: ScoreRange[];
}