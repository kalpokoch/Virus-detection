import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FundingBanner } from "@/components/home/FundingBanner";
import { contributors } from "@/data/contributors";
import { Contributor } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const RoleBadge = ({ role }: { role: Contributor['role'] }) => {
  const roleMap: Record<Contributor['role'], { text: string; className: string }> = {
    funder: { text: "Primary Funder", className: "bg-accent text-accent-foreground border-primary/20" },
    developer: { text: "Developed By", className: "bg-primary/10 text-primary border-primary/20" },
    supporter: { text: "Supported By", className: "bg-muted text-muted-foreground border-border" },
  };
  const { text, className } = roleMap[role];
  return <Badge variant="outline" className={cn("font-medium", className)}>{text}</Badge>;
};

export default function Contributors() {
  return (
    <>
      <FundingBanner />
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl">
            Project Contributors & Collaborators
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            This project is developed under the ICMR VRDL Network with support from leading Indian health research institutions.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {contributors.map((contributor) => (
            <Card key={contributor.id} className="overflow-hidden">
              <CardContent className="p-0 lg:flex">
                <div className="flex items-center justify-center bg-muted p-8 lg:w-1/3">
                  <div className="w-40 h-24 flex items-center justify-center">
                    <img
                      src={contributor.logo}
                      alt={`${contributor.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col p-8 lg:w-2/3">
                  <RoleBadge role={contributor.role} />
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{contributor.name}</h3>
                  <p className="mt-2 flex-grow text-muted-foreground">{contributor.description}</p>
                  {contributor.website && (
                    <a
                      href={contributor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Visit Website <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
