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
            <p className="text-xs text-muted-foreground mt-1">Virus ID: {result.virusId}</p>
          </div>
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <p className="text-sm font-medium text-foreground">Confidence</p>
              <p className="text-lg font-semibold text-primary">{result.confidence.toFixed(1)}%</p>
            </div>
            <Progress value={result.confidence} className="h-3" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Top 5 Predictions</h4>
            <div className="space-y-2">
              {result.topPredictions.map((prediction) => (
                <div key={`${prediction.virus}-${prediction.virusId}`} className="flex items-center justify-between rounded-md border p-2">
                  <div>
                    <p className="font-medium text-sm">{prediction.virus}</p>
                    <p className="text-xs text-muted-foreground">ID: {prediction.virusId}</p>
                  </div>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {prediction.confidence.toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          {result.subClassification && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Other Virus Sub-classification</h4>
              <div className="rounded-md border p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{result.subClassification.predictedSubVirus}</p>
                    <p className="text-xs text-muted-foreground">ID: {result.subClassification.predictedSubVirusId}</p>
                  </div>
                  <Badge>{result.subClassification.subConfidence.toFixed(1)}%</Badge>
                </div>
              </div>
            </div>
          )}
          <p className="!mt-8 text-xs text-muted-foreground italic">
            This prediction is a decision-support tool and does not constitute a clinical diagnosis. Consult a qualified medical professional.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
