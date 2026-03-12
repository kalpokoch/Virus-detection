import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PredictionResult } from "@/types";
import { Clock } from "lucide-react";

interface ResultCardProps {
  result: PredictionResult;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="mt-8 animate-in fade-in duration-500">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Prediction Result</CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{new Date().toLocaleString()}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">Most Likely Virus</p>
            <h2 className="text-3xl font-semibold text-primary">{result.virusName}</h2>
          </div>
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <p className="text-sm font-medium text-foreground">Confidence</p>
              <p className="text-lg font-semibold text-primary">{result.confidence.toFixed(1)}%</p>
            </div>
            <Progress value={result.confidence} className="h-3" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Key Contributing Symptoms</h4>
            <div className="flex flex-wrap gap-2">
              {result.topSymptoms.map(symptom => (
                <Badge key={symptom} variant="secondary" className="bg-accent text-accent-foreground">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
          <p className="!mt-8 text-xs text-muted-foreground italic">
            This prediction is a decision-support tool and does not constitute a clinical diagnosis. Consult a qualified medical professional.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
