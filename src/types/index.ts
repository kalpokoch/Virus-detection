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

export interface PredictionResult {
  virusName: string;
  confidence: number;
  topSymptoms: string[];
}

export interface Contributor {
  id: string;
  name: string;
  role: 'funder' | 'developer' | 'supporter';
  description: string;
  logo: string;
  website?: string;
}
