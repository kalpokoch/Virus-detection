import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { syndromes } from "@/data/syndromes";

interface SyndromeSelectorProps {
  selectedSyndrome: string;
  setSelectedSyndrome: (id: string) => void;
}

export function SyndromeSelector({ selectedSyndrome, setSelectedSyndrome }: SyndromeSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Syndrome Classification</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={setSelectedSyndrome} value={selectedSyndrome || undefined}>
          <SelectTrigger>
            <SelectValue placeholder="Select a syndrome..." />
          </SelectTrigger>
          <SelectContent>
            {syndromes.map(syndrome => (
              <SelectItem key={syndrome.id} value={syndrome.id}>{syndrome.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="mt-2 text-xs text-muted-foreground">
          Select the primary syndrome that best describes the patient's condition.
        </p>
      </CardContent>
    </Card>
  );
}
