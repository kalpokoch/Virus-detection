import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { symptoms } from "@/data/symptoms";
import { Symptom } from "@/types";
import { SymptomChip } from "./SymptomChip";

interface SymptomGridProps {
  selectedSymptomIds: string[];
  onToggleSymptom: (id: string) => void;
}

const categoryOrder: Symptom['category'][] = ['general', 'neurological', 'respiratory', 'gastrointestinal', 'dermatological', 'ocular'];

export function SymptomGrid({ selectedSymptomIds, onToggleSymptom }: SymptomGridProps) {
  const groupedSymptoms = useMemo(() => {
    const groups: Record<Symptom['category'], Symptom[]> = {
      general: [], neurological: [], respiratory: [], gastrointestinal: [], dermatological: [], ocular: []
    };
    symptoms.forEach(symptom => {
      groups[symptom.category].push(symptom);
    });
    return groups;
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinical Symptoms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categoryOrder.map(category => (
          groupedSymptoms[category].length > 0 && (
            <div key={category}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {groupedSymptoms[category].map(symptom => (
                  <SymptomChip
                    key={symptom.id}
                    symptom={symptom}
                    selected={selectedSymptomIds.includes(symptom.id)}
                    onToggle={onToggleSymptom}
                  />
                ))}
              </div>
            </div>
          )
        ))}
      </CardContent>
    </Card>
  );
}
