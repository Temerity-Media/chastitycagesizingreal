import { CageModel } from './types';
import { holyTrainerModels } from './manufacturers/holyTrainer';
import { cherryKeeperModels } from './manufacturers/cherryKeeper';
import { ternenceModels } from './manufacturers/ternence';
import { bon4Models } from './manufacturers/bon4';
import { lockedInLustModels } from './manufacturers/lockedInLust';
import { kink3dModels } from './manufacturers/kink3d';
import { steelworxxModels } from './manufacturers/steelworxx';
import { matureMetalModels } from './manufacturers/matureMetal';
import { cbxModels } from './manufacturers/cbx';

// Combine all models
export const cageModels: CageModel[] = [
  ...holyTrainerModels,
  ...cherryKeeperModels,
  ...ternenceModels,
  ...bon4Models,
  ...lockedInLustModels,
  ...kink3dModels,
  ...steelworxxModels,
  ...matureMetalModels,
  ...cbxModels
];

export const calculateFitScore = (measurements: {
  baseRing: number;
  cageDiameter: number;
  cageLength: number;
}, model: CageModel): number => {
  const baseRingScore = findScoreForMeasurement(measurements.baseRing, model.baseRingScores);
  const cageDiameterScore = findScoreForMeasurement(measurements.cageDiameter, model.cageDiameterScores);
  const cageLengthScore = findScoreForMeasurement(measurements.cageLength, model.cageLengthScores);

  return Number(((baseRingScore + cageDiameterScore + cageLengthScore) / 3).toFixed(1));
};

const findScoreForMeasurement = (measurement: number, scoreRanges: ScoreRange[]): number => {
  for (const { range, score } of scoreRanges) {
    if (measurement >= range.min && measurement <= range.max) {
      return score;
    }
  }
  return 0;
};