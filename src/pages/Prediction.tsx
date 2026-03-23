import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
// import { FundingBanner } from '@/components/home/FundingBanner';
import { PatientInfoForm } from '@/components/prediction/PatientInfoForm';
import { ResultCard } from '@/components/prediction/ResultCard';
import { SymptomGrid } from '@/components/prediction/SymptomGrid';
import { SyndromeSelector } from '@/components/prediction/SyndromeSelector';
import { PageHeader } from '@/components/shared/PageHeader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { fetchLocationOptions, predictVirus } from '@/lib/prediction-api';
import { PatientInfo, PredictionResult } from '@/types';

const initialPatientInfo: PatientInfo = {
  age: '', sex: '', patientType: '', durationDays: '',
  state: '', district: '', month: '', year: new Date().getFullYear(),
};

export default function Prediction() {
  const { toast } = useToast();
  const [patientInfo, setPatientInfo] = useState<PatientInfo>(initialPatientInfo);
  const [selectedSyndrome, setSelectedSyndrome] = useState('');
  const [selectedSymptomIds, setSelectedSymptomIds] = useState<string[]>([]);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [states, setStates] = useState<string[]>([]);
  const [districtsByStateMap, setDistrictsByStateMap] = useState<Record<string, string[]>>({});
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadLocations = async () => {
      try {
        const locationOptions = await fetchLocationOptions();
        if (!isMounted) {
          return;
        }

        setStates(locationOptions.states);
        setDistrictsByStateMap(locationOptions.districtsByState);
      } catch {
        if (!isMounted) {
          return;
        }

        setStates([]);
        setDistrictsByStateMap({});
      }
    };

    loadLocations();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleSymptom = (id: string) => {
    setSelectedSymptomIds(prev =>
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const resetPredictionInputs = () => {
    setPatientInfo({ ...initialPatientInfo });
    setSelectedSyndrome('');
    setSelectedSymptomIds([]);
    setResetKey(prev => prev + 1);
  };

  const handlePredict = async () => {
    if (!selectedSyndrome) {
      toast({
        title: 'Syndrome required',
        description: 'Please select a syndrome classification before prediction.',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedSymptomIds.length) {
      toast({
        title: 'Symptoms required',
        description: 'Please select at least one symptom before prediction.',
        variant: 'destructive',
      });
      return;
    }

    if (
      patientInfo.age === '' ||
      patientInfo.durationDays === '' ||
      patientInfo.year === '' ||
      !patientInfo.sex ||
      !patientInfo.patientType ||
      !patientInfo.state ||
      !patientInfo.month
    ) {
      toast({
        title: 'Incomplete patient information',
        description: 'Please complete all required patient fields before prediction.',
        variant: 'destructive',
      });
      return;
    }

    setIsPredicting(true);

    try {
      const result = await predictVirus({
        patientInfo,
        syndromeId: selectedSyndrome,
        selectedSymptomIds,
      });

      setPredictionResult(result);
      setIsResultDialogOpen(true);
      resetPredictionInputs();
      toast({
        title: 'Prediction successful',
        description: `Top prediction: ${result.virusName} (${result.confidence.toFixed(1)}%).`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to get prediction from backend.';
      toast({
        title: 'Prediction failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsPredicting(false);
    }
  };

  const handleStartNewAnalysis = () => {
    resetPredictionInputs();
    setPredictionResult(null);
    setIsResultDialogOpen(false);
  };

  return (
    <>
      {/* <FundingBanner /> */}
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <PageHeader
          title="Virus Prediction"
          description="AI-powered analysis of clinical symptoms and epidemiological data."
          tooltip="Model uses VRDLN dataset and syndrome classification."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
          <aside className="w-full lg:sticky lg:top-24 self-start">
            <PatientInfoForm
              key={`patient-info-${resetKey}`}
              patientInfo={patientInfo}
              setPatientInfo={setPatientInfo}
              states={states}
              districtsByStateMap={districtsByStateMap}
            />
          </aside>
          <main className="space-y-6">
            <SyndromeSelector
              key={`syndrome-${resetKey}`}
              selectedSyndrome={selectedSyndrome}
              setSelectedSyndrome={setSelectedSyndrome}
            />
            <SymptomGrid
              key={`symptom-grid-${resetKey}`}
              selectedSymptomIds={selectedSymptomIds}
              onToggleSymptom={handleToggleSymptom}
            />
            <Button onClick={handlePredict} className="w-full mt-6 py-6 text-base rounded-xl" disabled={isPredicting}>
              {isPredicting ? 'Predicting...' : 'Predict Virus →'}
            </Button>
          </main>
        </div>

        <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
          <DialogContent className="w-[calc(100vw-1rem)] max-w-3xl max-h-[90vh] overflow-hidden p-0 gap-0 sm:w-full">
            <DialogHeader className="border-b px-4 py-4 pr-12 sm:px-6">
              <DialogTitle>Prediction Result</DialogTitle>
              <DialogDescription>
                Review the model output below, then start a new analysis when ready.
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-[calc(90vh-10.5rem)] overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-6">
              {predictionResult && <ResultCard result={predictionResult} className="mt-4" />}
            </div>

            <DialogFooter className="border-t px-4 py-3 sm:px-6 sm:py-4 gap-2">
              <Button className="w-full sm:w-auto" variant="outline" onClick={() => setIsResultDialogOpen(false)}>
                Close
              </Button>
              <Button className="w-full sm:w-auto" onClick={handleStartNewAnalysis}>
                Start New Analysis
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
