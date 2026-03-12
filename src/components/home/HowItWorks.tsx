import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";

const steps = [
  {
    step: 1,
    title: "Enter Patient Details",
    description: "Provide age, sex, location, and duration of illness.",
  },
  {
    step: 2,
    title: "Select Syndrome & Symptoms",
    description: "Choose the primary syndrome and check all observed clinical symptoms.",
  },
  {
    step: 3,
    title: "Get AI Prediction",
    description: "Receive the most likely virus with confidence score and key contributing symptoms.",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full bg-background py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <SectionHeader
          title="How It Works"
          description="A simple, three-step process to get an AI-driven virus prediction."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.step}>
              <CardHeader>
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent font-mono text-sm font-medium text-primary">
                  {step.step}
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
