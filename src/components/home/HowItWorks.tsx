import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  ContainerScroll,
  ContainerSticky,
  ProcessCard,
  ProcessCardBody,
  ProcessCardTitle,
} from "@/components/ui/process-timeline";
import { Card, CardContent } from "@/components/ui/card";
import { HOW_IT_WORKS_PHASES } from "@/data/how-it-works";

export function HowItWorks() {
  return (
    <section className="w-full bg-background py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <SectionHeader
          title="How It Works"
          description="A guided four-phase flow from patient intake to AI-backed diagnostic decision support."
          className="md:hidden"
        />

        <div className="mt-12 grid gap-6 md:hidden">
          {HOW_IT_WORKS_PHASES.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <Card key={phase.id} className="overflow-hidden">
                <img
                  src={phase.imageUrl}
                  alt={phase.imageAlt}
                  className="h-44 w-full border-b border-border/70 bg-muted/20 object-contain p-2"
                  loading="lazy"
                />
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-accent/50 text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">STEP {String(index + 1).padStart(2, "0")}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{phase.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{phase.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <ContainerScroll
          className="relative mt-8 hidden min-h-[175vh] overflow-clip rounded-2xl border border-border/70 bg-gradient-to-br from-card via-card to-muted/40 px-8 py-10 lg:min-h-[190vh] md:block"
          style={{
            backgroundImage:
              "radial-gradient(100% 80% at 0% 100%, hsl(var(--accent) / 0.45) 0%, transparent 58%), radial-gradient(80% 70% at 100% 0%, hsl(var(--primary) / 0.18) 0%, transparent 62%)",
          }}
        >
          <ContainerSticky className="top-0 flex h-screen flex-col justify-center gap-8 py-6">
            <SectionHeader
              title="How It Works"
              description="A guided four-phase flow from patient intake to AI-backed diagnostic decision support."
              className="hidden max-w-3xl md:block"
            />

            <div className="flex flex-nowrap gap-4">
              {HOW_IT_WORKS_PHASES.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <ProcessCard
                    key={phase.id}
                    itemsLength={HOW_IT_WORKS_PHASES.length}
                    index={index}
                    className="min-h-[62vh] min-w-[72%] max-w-[72%]"
                  >
                    <ProcessCardTitle className="flex min-w-28 flex-col items-center justify-start gap-3 border-r border-border/80 bg-muted/40">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-accent/40 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                    </ProcessCardTitle>
                    <ProcessCardBody className="justify-between">
                      <img
                        src={phase.imageUrl}
                        alt={phase.imageAlt}
                        className="h-56 w-full rounded-md border border-border/80 bg-muted/20 object-contain p-2"
                        loading="lazy"
                      />
                      <h3 className="text-2xl font-semibold leading-tight text-foreground">{phase.title}</h3>
                      <p className="max-w-[60ch] text-sm leading-relaxed text-muted-foreground">{phase.description}</p>
                    </ProcessCardBody>
                  </ProcessCard>
                );
              })}
            </div>
          </ContainerSticky>
        </ContainerScroll>
      </div>
    </section>
  );
}
