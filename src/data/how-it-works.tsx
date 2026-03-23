import { Activity, ClipboardList, Microscope, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import process1Image from "@/assets/HowItWorks/process-1.svg";
import process2Image from "@/assets/HowItWorks/process-2.svg";
import process3Image from "@/assets/HowItWorks/process-3.svg";
import process4Image from "@/assets/HowItWorks/process-4.svg";

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
    imageUrl: process1Image,
    imageAlt: "Doctor collecting patient intake details on a tablet",
    icon: ClipboardList,
  },
  {
    id: "process-2",
    title: "Clinical Observation",
    description: "Select the suspected syndrome and mark all observed symptoms for analysis.",
    imageUrl: process2Image,
    imageAlt: "Healthcare specialist reviewing clinical symptoms",
    icon: Stethoscope,
  },
  {
    id: "process-3",
    title: "Model Inference",
    description: "The model evaluates symptom patterns and district intelligence to estimate likely pathogens.",
    imageUrl: process3Image,
    imageAlt: "Data dashboard showing inference outputs",
    icon: Activity,
  },
  {
    id: "process-4",
    title: "Decision Support",
    description: "Review ranked virus predictions and confidence to support laboratory diagnostics.",
    imageUrl: process4Image,
    imageAlt: "Laboratory team discussing diagnostic findings",
    icon: Microscope,
  },
];
