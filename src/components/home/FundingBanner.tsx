import { Award } from "lucide-react";

export function FundingBanner() {
  return (
    <div className="bg-secondary py-2 px-6">
      <div className="container flex items-center justify-center gap-2 text-center">
        <Award className="h-4 w-4 text-primary" />
        <p className="text-sm font-medium text-secondary-foreground">
          Funded by the Indian Council of Medical Research (ICMR) · VRDL Network Initiative
        </p>
      </div>
    </div>
  );
}
