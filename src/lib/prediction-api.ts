import { districtsByState } from '@/data/districts';
import { indianStates } from '@/data/states';
import { syndromes } from '@/data/syndromes';
import { PredictionInput, PredictionResult } from '@/types';

const REQUEST_TIMEOUT_MS = 20000;

const BACKEND_URL = (import.meta.env.VITE_BACKEND_BASE_URL || '').replace(/\/$/, '');

const symptomIdToBackendKey: Record<string, string> = {
  s01: 'HEADACHE',
  s02: 'NECKRIGIDITY',
  s03: 'ALTEREDSENSORIUM',
  s04: 'SOMNOLENCE',
  s05: 'SEIZURES',
  s06: 'IRRITABILITY',
  s07: 'NAUSEA',
  s08: 'VOMITING',
  s09: 'DIARRHEA',
  s10: 'ABDOMINALPAIN',
  s11: 'JAUNDICE',
  s12: 'DARKURINE',
  s13: 'HEPATOMEGALY',
  s14: 'SORETHROAT',
  s15: 'BREATHLESSNESS',
  s16: 'COUGH',
  s17: 'RHINORRHEA',
  s18: 'FEVER',
  s19: 'MYALGIA',
  s20: 'ARTHRALGIA',
  s21: 'CHILLS',
  s22: 'RIGORS',
  s23: 'MALAISE',
  s24: 'MUSCULARRASH',
  s25: 'PAPULARRASH',
  s26: 'PUSTULARRASH',
  s27: 'MACULOPAPULARRASH',
  s28: 'ESCHAR',
  s29: 'BULLAE',
  s30: 'DYSENTERY',
  s31: 'REDEYE',
  s32: 'DISCHARGEEYES',
  s33: 'SWELLINGEYES',
  s34: 'CRUSHINGEYES',
  s35: 'RETROORBITALPAIN',
};

const allBackendSymptoms = Object.values(symptomIdToBackendKey);

const monthToNumber: Record<string, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const syndromeIdToNumber: Record<string, number> = {
  syn01: 1,
  syn02: 2,
  syn03: 3,
  syn04: 4,
  syn05: 5,
  syn06: 6,
  syn07: 7,
  syn08: 8,
};

interface BackendPredictionCandidate {
  virus: string;
  virus_id: number;
  confidence: number;
}

interface BackendSubClassification {
  predicted_sub_virus: string;
  predicted_sub_virus_id: number;
  sub_confidence: number;
  top_5_sub_predictions: BackendPredictionCandidate[];
}

interface BackendPredictionResponse {
  success: boolean;
  predicted_virus: string;
  predicted_virus_id: number;
  confidence: number;
  top_5_predictions: BackendPredictionCandidate[];
  sub_classification?: BackendSubClassification | null;
  timestamp: string;
  prediction_id?: string | null;
}

interface BackendErrorResponse {
  detail?: string;
  error?: string;
  message?: string;
}

interface LocationMappings {
  states: string[];
  districtsByState: Record<string, string[]>;
  stateCodeByName: Record<string, number>;
  districtCodeByName: Record<string, number>;
  source?: string;
  warnings?: string[];
}

interface BackendLocationMappingsResponse {
  states?: string[];
  districts_by_state?: Record<string, string[]>;
  state_mapping?: Record<string, number>;
  district_mapping?: Record<string, number>;
  source?: string;
  timestamp?: string;
  warnings?: string[];
}

let cachedLocationMappings: LocationMappings | null = null;

function toNumericMap(input?: Record<string, number | string>): Record<string, number> {
  if (!input) {
    return {};
  }

  return Object.entries(input).reduce<Record<string, number>>((acc, [name, value]) => {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) {
      acc[name] = numeric;
    }
    return acc;
  }, {});
}

/**
 * Finds the closest matching key in a record for a given name.
 * Tries (in order): exact → case-insensitive → one string is a prefix of the other.
 * Returns undefined if no reasonable match is found.
 */
function findBestKey(name: string, record: Record<string, number>): number | undefined {
  // 1. Exact
  if (record[name] !== undefined) return record[name];

  const nameLower = name.toLowerCase();

  // 2. Case-insensitive
  for (const [k, v] of Object.entries(record)) {
    if (k.toLowerCase() === nameLower) return v;
  }

  // 3. Prefix match in either direction (handles "Telangana" ↔ "Telanganas")
  for (const [k, v] of Object.entries(record)) {
    const kLower = k.toLowerCase();
    if (kLower.startsWith(nameLower) || nameLower.startsWith(kLower)) return v;
  }

  return undefined;
}

function normalizeLocationMappings(payload: BackendLocationMappingsResponse | null): LocationMappings | null {
  if (!payload) {
    return null;
  }

  const districtsByState = payload.districts_by_state || {};
  const rawStateMapping = toNumericMap(payload.state_mapping);
  const districtCodeByName = toNumericMap(payload.district_mapping);

  if (
    !Object.keys(districtsByState).length &&
    !(payload.states || []).length &&
    !Object.keys(rawStateMapping).length &&
    !Object.keys(districtCodeByName).length
  ) {
    return null;
  }

  // Use districts_by_state keys as canonical state names — district lookup
  // depends on them. The backend's `states` array can have typos (e.g.
  // "Telanganas") that don't match these keys.
  const canonicalStates = Object.keys(districtsByState).sort((a, b) => a.localeCompare(b));
  const states = canonicalStates.length > 0 ? canonicalStates : (payload.states || []);

  // Re-map state encoding to canonical names using best-match lookup so that
  // minor backend typos (e.g. "Telanganas" vs "Telangana") still resolve.
  const stateCodeByName: Record<string, number> = {};
  for (const stateName of states) {
    const code = findBestKey(stateName, rawStateMapping);
    if (code !== undefined) {
      stateCodeByName[stateName] = code;
    }
  }

  return {
    states,
    districtsByState,
    stateCodeByName,
    districtCodeByName,
    source: payload.source,
    warnings: payload.warnings || [],
  };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function getLocationMappings(): Promise<LocationMappings> {
  if (cachedLocationMappings) {
    return cachedLocationMappings;
  }

  const candidatePaths = ['/location-mappings', '/locations'];
  for (const path of candidatePaths) {
    const response = await fetchJson<BackendLocationMappingsResponse>(`${BACKEND_URL}${path}`);
    const normalized = normalizeLocationMappings(response);
    if (normalized) {
      if (normalized.warnings && normalized.warnings.length) {
        console.warn('Location mapping warnings:', normalized.warnings);
      }
      cachedLocationMappings = normalized;
      return normalized;
    }
  }

  cachedLocationMappings = {
    states: indianStates,
    districtsByState,
    stateCodeByName: {},
    districtCodeByName: {},
  };

  return cachedLocationMappings;
}

function fallbackStateCode(stateName: string): number {
  const stateIndex = indianStates.indexOf(stateName);
  return stateIndex >= 0 ? stateIndex + 1 : 0;
}

function fallbackDistrictCode(stateName: string, districtName: string): number {
  const districtList = districtsByState[stateName] || [];
  const districtIndex = districtList.indexOf(districtName);
  return districtIndex >= 0 ? districtIndex + 1 : 0;
}

async function buildRequestBody(input: PredictionInput) {
  const { patientInfo, syndromeId, selectedSymptomIds } = input;
  const locationMappings = await getLocationMappings();

  const syndromeName = syndromes.find((item) => item.id === syndromeId)?.label;

  const symptomPayload = allBackendSymptoms.reduce<Record<string, number>>((acc, symptomKey) => {
    acc[symptomKey] = 0;
    return acc;
  }, {});

  selectedSymptomIds.forEach((symptomId) => {
    const backendKey = symptomIdToBackendKey[symptomId];
    if (backendKey) {
      symptomPayload[backendKey] = 1;
    }
  });

  return {
    age: Number(patientInfo.age),
    SEX: patientInfo.sex === 'Male' ? 1 : 0,
    PATIENTTYPE: patientInfo.patientType === 'Inpatient' ? 1 : 0,
    durationofillness: Number(patientInfo.durationDays),
    labstate: locationMappings.stateCodeByName[patientInfo.state] ?? fallbackStateCode(patientInfo.state),
    districtencoded: locationMappings.districtCodeByName[patientInfo.district] ?? fallbackDistrictCode(patientInfo.state, patientInfo.district),
    month: monthToNumber[patientInfo.month] || 1,
    year: Number(patientInfo.year),
    syndrome: syndromeIdToNumber[syndromeId] || 1,
    syndrome_name: syndromeName,
    other_syndrome_specification: '',
    ...symptomPayload,
  };
}

export async function fetchLocationOptions() {
  const locationMappings = await getLocationMappings();

  return {
    states: locationMappings.states.length ? locationMappings.states : indianStates,
    districtsByState: Object.keys(locationMappings.districtsByState).length
      ? locationMappings.districtsByState
      : districtsByState,
  };
}

function mapPredictionResult(apiResponse: BackendPredictionResponse): PredictionResult {
  return {
    virusName: apiResponse.predicted_virus,
    virusId: apiResponse.predicted_virus_id,
    confidence: apiResponse.confidence,
    topPredictions: apiResponse.top_5_predictions.map((item) => ({
      virus: item.virus,
      virusId: item.virus_id,
      confidence: item.confidence,
    })),
    subClassification: apiResponse.sub_classification
      ? {
          predictedSubVirus: apiResponse.sub_classification.predicted_sub_virus,
          predictedSubVirusId: apiResponse.sub_classification.predicted_sub_virus_id,
          subConfidence: apiResponse.sub_classification.sub_confidence,
          top5SubPredictions: apiResponse.sub_classification.top_5_sub_predictions.map((item) => ({
            virus: item.virus,
            virusId: item.virus_id,
            confidence: item.confidence,
          })),
        }
      : undefined,
    predictionId: apiResponse.prediction_id || undefined,
    timestamp: apiResponse.timestamp,
  };
}

async function parseBackendError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as BackendErrorResponse;
    return payload.detail || payload.error || payload.message || `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
}

export async function predictVirus(input: PredictionInput): Promise<PredictionResult> {
  const body = await buildRequestBody(input);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${BACKEND_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(await parseBackendError(response));
    }

    const apiResponse = (await response.json()) as BackendPredictionResponse;
    return mapPredictionResult(apiResponse);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Prediction request timed out. Please try again.');
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Failed to fetch prediction from backend.');
  } finally {
    clearTimeout(timeout);
  }
}
