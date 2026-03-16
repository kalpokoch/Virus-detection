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
  const orderedSymptoms = useMemo(
    () => categoryOrder.flatMap(category => symptoms.filter(symptom => symptom.category === category)),
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinical Symptoms</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {orderedSymptoms.map(symptom => (
          <SymptomChip
            key={symptom.id}
            symptom={symptom}
            selected={selectedSymptomIds.includes(symptom.id)}
            onToggle={onToggleSymptom}
          />
        ))}
      </CardContent>
    </Card>
  );
}
