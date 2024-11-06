import { CageModel } from '../types';

export const matureMetalModels: CageModel[] = [
  {
    manufacturer: "Mature Metal",
    model: "Jailbird",
    baseRingScores: [
      { range: { min: 1.25, max: 1.45 }, score: 9 },
      { range: { min: 1.45, max: 1.65 }, score: 8 },
      { range: { min: 1.65, max: 1.85 }, score: 6 },
      { range: { min: 1.85, max: 2.05 }, score: 4 },
      { range: { min: 2.05, max: 2.25 }, score: 2 }
    ],
    cageDiameterScores: [
      { range: { min: 1.00, max: 1.15 }, score: 9 },
      { range: { min: 1.15, max: 1.30 }, score: 8 },
      { range: { min: 1.30, max: 1.45 }, score: 7 },
      { range: { min: 1.45, max: 1.60 }, score: 6 },
      { range: { min: 1.60, max: 1.75 }, score: 4 }
    ],
    cageLengthScores: [
      { range: { min: 2.0, max: 2.5 }, score: 8 },
      { range: { min: 2.5, max: 3.0 }, score: 9 },
      { range: { min: 3.0, max: 3.5 }, score: 7 },
      { range: { min: 3.5, max: 4.0 }, score: 5 },
      { range: { min: 4.0, max: 4.5 }, score: 3 }
    ]
  },
  {
    manufacturer: "Mature Metal",
    model: "Watchful Mistress",
    baseRingScores: [
      { range: { min: 1.25, max: 1.45 }, score: 8 },
      { range: { min: 1.45, max: 1.65 }, score: 9 },
      { range: { min: 1.65, max: 1.85 }, score: 7 },
      { range: { min: 1.85, max: 2.05 }, score: 5 },
      { range: { min: 2.05, max: 2.25 }, score: 3 }
    ],
    cageDiameterScores: [
      { range: { min: 1.00, max: 1.15 }, score: 8 },
      { range: { min: 1.15, max: 1.30 }, score: 7 },
      { range: { min: 1.30, max: 1.45 }, score: 6 },
      { range: { min: 1.45, max: 1.60 }, score: 5 },
      { range: { min: 1.60, max: 1.75 }, score: 3 }
    ],
    cageLengthScores: [
      { range: { min: 2.0, max: 2.5 }, score: 8 },
      { range: { min: 2.5, max: 3.0 }, score: 9 },
      { range: { min: 3.0, max: 3.5 }, score: 8 },
      { range: { min: 3.5, max: 4.0 }, score: 6 },
      { range: { min: 4.0, max: 4.5 }, score: 4 }
    ]
  },
  {
    manufacturer: "Mature Metal",
    model: "Queen's Keep",
    baseRingScores: [
      { range: { min: 1.25, max: 1.45 }, score: 7 },
      { range: { min: 1.45, max: 1.65 }, score: 8 },
      { range: { min: 1.65, max: 1.85 }, score: 9 },
      { range: { min: 1.85, max: 2.05 }, score: 7 },
      { range: { min: 2.05, max: 2.25 }, score: 5 }
    ],
    cageDiameterScores: [
      { range: { min: 1.00, max: 1.15 }, score: 7 },
      { range: { min: 1.15, max: 1.30 }, score: 8 },
      { range: { min: 1.30, max: 1.45 }, score: 8 },
      { range: { min: 1.45, max: 1.60 }, score: 7 },
      { range: { min: 1.60, max: 1.75 }, score: 5 }
    ],
    cageLengthScores: [
      { range: { min: 2.0, max: 2.5 }, score: 7 },
      { range: { min: 2.5, max: 3.0 }, score: 8 },
      { range: { min: 3.0, max: 3.5 }, score: 9 },
      { range: { min: 3.5, max: 4.0 }, score: 7 },
      { range: { min: 4.0, max: 4.5 }, score: 6 }
    ]
  },
  {
    manufacturer: "Mature Metal",
    model: "Contender",
    baseRingScores: [
      { range: { min: 1.25, max: 1.45 }, score: 5 },
      { range: { min: 1.45, max: 1.65 }, score: 6 },
      { range: { min: 1.65, max: 1.85 }, score: 8 },
      { range: { min: 1.85, max: 2.05 }, score: 9 },
      { range: { min: 2.05, max: 2.25 }, score: 8 }
    ],
    cageDiameterScores: [
      { range: { min: 1.00, max: 1.15 }, score: 6 },
      { range: { min: 1.15, max: 1.30 }, score: 7 },
      { range: { min: 1.30, max: 1.45 }, score: 7 },
      { range: { min: 1.45, max: 1.60 }, score: 8 },
      { range: { min: 1.60, max: 1.75 }, score: 6 }
    ],
    cageLengthScores: [
      { range: { min: 2.0, max: 2.5 }, score: 6 },
      { range: { min: 2.5, max: 3.0 }, score: 7 },
      { range: { min: 3.0, max: 3.5 }, score: 8 },
      { range: { min: 3.5, max: 4.0 }, score: 9 },
      { range: { min: 4.0, max: 4.5 }, score: 7 }
    ]
  }
];