import LogoLoop, { type LogoItem } from "@/components/shared/LogoLoop";

export function StatsBar() {
  const items = ["ICMR Funded", "VRDLN Network", "AI-Powered", "Government of India Initiative"];

  const logos: LogoItem[] = items.map((item) => ({
    node: (
      <span className="inline-flex items-center text-sm font-medium text-muted-foreground whitespace-nowrap">
        {item}
        <span className="mx-4 text-muted-foreground/70" aria-hidden>
          •
        </span>
      </span>
    ),
    ariaLabel: item,
    title: item,
  }));

  return (
    <div className="w-full border-y bg-card py-4">
      <LogoLoop
        logos={logos}
        speed={28}
        direction="left"
        logoHeight={14}
        gap={0}
        pauseOnHover
        ariaLabel="Trust badges"
      />
    </div>
  );
}
