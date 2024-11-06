import React, { useState } from 'react';
import { Ruler, ChevronRight, AlertCircle, Award } from 'lucide-react';
import { validateMeasurement, clampValue } from '../utils/measurementValidation';

export interface CageData {
  manufacturer: string;
  models: Array<{
    name: string;
    score: number;
  }>;
  score: number;
  match: string;
}

interface SizingFormProps {
  measurements: {
    baseRing: string;
    cageDiameter: string;
    cageLength: string;
  };
  setMeasurements: React.Dispatch<React.SetStateAction<{
    baseRing: string;
    cageDiameter: string;
    cageLength: string;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
}

interface ValidationErrors {
  baseRing?: string;
  cageDiameter?: string;
  cageLength?: string;
}

const MEASUREMENT_RANGES = {
  baseRing: { min: 1.375, max: 2.0 },
  cageDiameter: { min: 1.25, max: 1.75 },
  cageLength: { min: 2.0, max: 4.0 }
};

export const SizingForm: React.FC<SizingFormProps> = ({ measurements, setMeasurements, onSubmit }) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [clampedValues, setClampedValues] = useState<Record<string, number>>({});

  const handleInputChange = (field: keyof typeof measurements) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const range = MEASUREMENT_RANGES[field];
    const validation = validateMeasurement(value);

    setMeasurements(prev => ({
      ...prev,
      [field]: validation.value
    }));

    if (validation.isValid && validation.value !== '') {
      const numValue = parseFloat(validation.value);
      const clampedValue = clampValue(numValue, range.min, range.max);
      
      setClampedValues(prev => ({
        ...prev,
        [field]: clampedValue
      }));

      if (clampedValue !== numValue) {
        setErrors(prev => ({
          ...prev,
          [field]: `This measurement is outside typical ranges (${range.min}" - ${range.max}"). Please verify your measurement.`
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          [field]: undefined
        }));
      }
    } else {
      setErrors(prev => ({
        ...prev,
        [field]: validation.message
      }));
    }
  };

  const isFormValid = () => {
    return Object.values(measurements).every(value => value !== '' && !isNaN(parseFloat(value)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      // Use clampedValues for the actual submission
      const processedMeasurements = {
        baseRing: clampedValues.baseRing || parseFloat(measurements.baseRing),
        cageDiameter: clampedValues.cageDiameter || parseFloat(measurements.cageDiameter),
        cageLength: clampedValues.cageLength || parseFloat(measurements.cageLength)
      };
      
      // Clamp any values that weren't already clamped
      Object.keys(processedMeasurements).forEach(key => {
        const field = key as keyof typeof measurements;
        const range = MEASUREMENT_RANGES[field];
        processedMeasurements[field] = clampValue(processedMeasurements[field], range.min, range.max);
      });

      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Ruler className="text-purple-600" />
        Enter Your Measurements
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Base Ring Diameter (inches)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={measurements.baseRing}
              onChange={handleInputChange('baseRing')}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.baseRing ? 'border-yellow-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 1.5"
              required
            />
          </div>
          {errors.baseRing ? (
            <p className="text-xs text-yellow-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.baseRing}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Recommended range: 1.375" - 2.0"</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cage Diameter (inches)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={measurements.cageDiameter}
              onChange={handleInputChange('cageDiameter')}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.cageDiameter ? 'border-yellow-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 1.375"
              required
            />
          </div>
          {errors.cageDiameter ? (
            <p className="text-xs text-yellow-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.cageDiameter}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Recommended range: 1.25" - 1.75"</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cage Length (inches)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={measurements.cageLength}
              onChange={handleInputChange('cageLength')}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.cageLength ? 'border-yellow-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 2.5"
              required
            />
          </div>
          {errors.cageLength ? (
            <p className="text-xs text-yellow-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.cageLength}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Recommended range: 2.0" - 4.0"</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid()}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Find My Size
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export const Results: React.FC<{ results: CageData[] }> = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Results</h2>
        <p className="text-gray-600">Enter your measurements to see cage recommendations</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 overflow-auto max-h-[calc(100vh-200px)]">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Award className="text-purple-600" />
        Best Matches
      </h2>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2 w-full">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg">{result.manufacturer}</h3>
                  <span className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                    Best Score: {result.score.toFixed(1)}/10
                  </span>
                </div>
                <div className="space-y-1">
                  {result.models.map((model, modelIndex) => (
                    <div key={modelIndex} className="flex justify-between items-center text-sm text-gray-600 border-t pt-1">
                      <span>{model.name}</span>
                      <span className="text-purple-600">Score: {model.score.toFixed(1)}/10</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2 pt-2 border-t">{result.match}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};