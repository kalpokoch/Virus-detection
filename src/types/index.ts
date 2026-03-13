export interface Symptom {
  id: string;
  label: string;
  category: 'neurological' | 'gastrointestinal' | 'respiratory' | 'dermatological' | 'ocular' | 'general';
}

export interface Syndrome {
  id: string;
  label: string;
}

export interface PatientInfo {
  age: number | '';
  sex: 'Male' | 'Female' | 'Other' | '';
  patientType: 'Inpatient' | 'Outpatient' | '';
  durationDays: number | '';
  state: string;
  district: string;
  month: string;
  year: number | '';
}

export interface PredictionInput {
  patientInfo: PatientInfo;
  syndromeId: string;
  selectedSymptomIds: string[];
}

export interface PredictionCandidate {
  virus: string;
  virusId: number;
  confidence: number;
}

export interface SubClassification {
  predictedSubVirus: string;
  predictedSubVirusId: number;
  subConfidence: number;
  top5SubPredictions: PredictionCandidate[];
}

export interface PredictionResult {
  virusName: string;
  virusId: number;
  confidence: number;
  topPredictions: PredictionCandidate[];
  subClassification?: SubClassification;
  predictionId?: string;
  timestamp: string;
}

export interface Contributor {
  id: string;
  name: string;
  role: 'funder' | 'developer' | 'supporter';
  description: string;
  logo: string;
  website?: string;
}
