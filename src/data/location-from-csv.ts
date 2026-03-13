import districtStateMappingCsv from './district_state_mapping.csv?raw';

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      const nextChar = line[i + 1];
      if (inQuotes && nextChar === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  result.push(current.trim());
  return result;
}

function parseDistrictStateCsv(csvText: string): Record<string, string[]> {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return {};
  }

  const stateToDistricts = new Map<string, Set<string>>();

  for (let i = 1; i < lines.length; i += 1) {
    const columns = parseCsvLine(lines[i]);
    const districtName = columns[1]?.trim();
    const stateName = columns[2]?.trim();

    if (!districtName || !stateName) {
      continue;
    }

    if (!stateToDistricts.has(stateName)) {
      stateToDistricts.set(stateName, new Set<string>());
    }

    stateToDistricts.get(stateName)?.add(districtName);
  }

  const districtsByState = Array.from(stateToDistricts.entries())
    .sort(([stateA], [stateB]) => stateA.localeCompare(stateB))
    .reduce<Record<string, string[]>>((acc, [stateName, districts]) => {
      acc[stateName] = Array.from(districts).sort((a, b) => a.localeCompare(b));
      return acc;
    }, {});

  return districtsByState;
}

export const districtsByStateFromCsv = parseDistrictStateCsv(districtStateMappingCsv);

export const indianStatesFromCsv = Object.keys(districtsByStateFromCsv);
