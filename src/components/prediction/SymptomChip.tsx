import { Symptom } from "@/types";
import { cn } from "@/lib/utils";

interface SymptomChipProps {
  symptom: Symptom;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function SymptomChip({ symptom, selected, onToggle }: SymptomChipProps) {
  return (
    <button
      onClick={() => onToggle(symptom.id)}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-all cursor-pointer",
        selected
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-muted text-foreground border-border hover:border-primary"
      )}
    >
      {symptom.label}
    </button>
  );
}
