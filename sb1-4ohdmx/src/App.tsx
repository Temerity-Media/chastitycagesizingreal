import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { CageData, SizingForm, Results } from './components/SizingComponents';
import { Header } from './components/Header';
import { cageModels, calculateFitScore } from './data/cageData';

function App() {
  const [measurements, setMeasurements] = useState({
    baseRing: '',
    cageDiameter: '',
    cageLength: ''
  });

  const [results, setResults] = useState<CageData[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert measurements to numbers
    const numericMeasurements = {
      baseRing: parseFloat(measurements.baseRing),
      cageDiameter: parseFloat(measurements.cageDiameter),
      cageLength: parseFloat(measurements.cageLength)
    };

    // Calculate scores and group by manufacturer
    const manufacturerScores = new Map<string, Array<{ name: string; score: number }>>();
    
    cageModels.forEach(model => {
      const score = calculateFitScore(numericMeasurements, model);
      if (score >= 7.0) { // Only include good matches
        const models = manufacturerScores.get(model.manufacturer) || [];
        models.push({ name: model.model, score });
        manufacturerScores.set(model.manufacturer, models);
      }
    });

    // Convert to final results format
    const groupedResults: CageData[] = Array.from(manufacturerScores.entries())
      .map(([manufacturer, models]) => {
        // Get the highest score for the manufacturer
        const maxScore = Math.max(...models.map(m => m.score));
        return {
          manufacturer,
          models: models.sort((a, b) => b.score - a.score),
          score: maxScore,
          match: getMatchDescription(maxScore)
        };
      })
      .sort((a, b) => b.score - a.score);

    setResults(groupedResults);
  };

  const getMatchDescription = (score: number): string => {
    if (score >= 9.5) return "Perfect fit for your measurements";
    if (score >= 9.0) return "Excellent fit with optimal sizing";
    if (score >= 8.5) return "Great fit for your dimensions";
    if (score >= 8.0) return "Very good fit with proper sizing";
    if (score >= 7.5) return "Good fit for your measurements";
    return "Acceptable fit with standard sizing";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2">
          <SizingForm 
            measurements={measurements}
            setMeasurements={setMeasurements}
            onSubmit={handleSubmit}
          />
          
          <Results results={results} />
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <AlertCircle className="text-purple-600" />
            Important Notes
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• All measurements should be in inches</li>
            <li>• Take measurements while flaccid</li>
            <li>• For best results, take multiple measurements at different times</li>
            <li>• If between sizes, choose the smaller option</li>
            <li>• Results show models with 70% or better fit score</li>
          </ul>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <a href="https://chastitytek.com/?utm_source=chastitycagesizing&utm_medium=banner&utm_campaign=bottom_banner" 
             target="_blank" 
             rel="noopener noreferrer"
             className="block hover:opacity-95 transition-opacity">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img 
                src="https://chastitytek.com/wp-content/uploads/2024/11/Veru-One-Medium-Shot-of-Whole-Device.png"
                alt="ChastityTek Veru One Device"
                className="w-64 h-auto rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold text-purple-600 mb-2">Discover the Future of Chastity</h3>
                <p className="text-gray-600">
                  Check out the revolutionary new biometric chastity device from ChastityTek. 
                  Featuring cutting-edge technology and premium materials for ultimate security and comfort.
                </p>
                <span className="inline-block mt-4 text-purple-600 font-medium hover:underline">
                  Learn More →
                </span>
              </div>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}

export default App;