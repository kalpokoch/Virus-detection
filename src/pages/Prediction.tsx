import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FundingBanner } from '@/components/home/FundingBanner';
import { PatientInfoForm } from '@/components/prediction/PatientInfoForm';
import { ResultCard } from '@/components/prediction/ResultCard';
import { SymptomGrid } from '@/components/prediction/SymptomGrid';
import { SyndromeSelector } from '@/components/prediction/SyndromeSelector';
import { PatientInfo, PredictionResult } from '@/types';

const initialPatientInfo: PatientInfo = {
  age: '', sex: '', patientType: '', durationDays: '',
  state: '', district: '', month: '', year: new Date().getFullYear(),
};

const mockResult: PredictionResult = {
  virusName: "Dengue Virus",
  confidence: 87.4,
  topSymptoms: ["Fever", "Retro-orbital Pain", "Myalgia"]
};

export default function Prediction() {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>(initialPatientInfo);
  const [selectedSyndrome, setSelectedSyndrome] = useState('');
  const [selectedSymptomIds, setSelectedSymptomIds] = useState<string[]>([]);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  const handleToggleSymptom = (id: string) => {
    setSelectedSymptomIds(prev =>
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const handlePredict = () => {
    console.log({ patientInfo, syndromeId: selectedSyndrome, selectedSymptomIds });
    setPredictionResult(mockResult);
  };

  return (
    <>
      <FundingBanner />
      <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
          <aside className="w-full lg:sticky lg:top-24 self-start">
            <PatientInfoForm patientInfo={patientInfo} setPatientInfo={setPatientInfo} />
          </aside>
          <main className="space-y-6">
            <SyndromeSelector selectedSyndrome={selectedSyndrome} setSelectedSyndrome={setSelectedSyndrome} />
            <SymptomGrid selectedSymptomIds={selectedSymptomIds} onToggleSymptom={handleToggleSymptom} />
            <Button onClick={handlePredict} className="w-full mt-6 py-6 text-base rounded-xl">
              Predict Virus →
            </Button>
            {predictionResult && <ResultCard result={predictionResult} />}
          </main>
        </div>
      </div>
    </>
  );
}
