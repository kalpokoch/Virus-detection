import { Activity, ClipboardList, Microscope, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface HowItWorksPhase {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  icon: LucideIcon;
}

export const HOW_IT_WORKS_PHASES: HowItWorksPhase[] = [
  {
    id: "process-1",
    title: "Patient Intake",
    description: "Enter age, sex, district, and illness duration to establish the case context.",
    imageUrl:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Doctor collecting patient intake details on a tablet",
    icon: ClipboardList,
  },
  {
    id: "process-2",
    title: "Clinical Observation",
    description: "Select the suspected syndrome and mark all observed symptoms for analysis.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Healthcare specialist reviewing clinical symptoms",
    icon: Stethoscope,
  },
  {
    id: "process-3",
    title: "Model Inference",
    description: "The model evaluates symptom patterns and district intelligence to estimate likely pathogens.",
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Data dashboard showing inference outputs",
    icon: Activity,
  },
  {
    id: "process-4",
    title: "Decision Support",
    description: "Review ranked virus predictions and confidence to support laboratory diagnostics.",
    imageUrl:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Laboratory team discussing diagnostic findings",
    icon: Microscope,
  },
];
