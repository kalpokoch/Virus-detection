import { FundingBanner } from "@/components/home/FundingBanner";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StatsBar } from "@/components/home/StatsBar";

export default function Home() {
  return (
    <>
      <FundingBanner />
      <HeroSection />
      <StatsBar />
      <HowItWorks />
    </>
  );
}
