export function StatsBar() {
  const items = ["ICMR Funded", "VRDL Network", "AI-Powered", "Government of India Initiative"];

  return (
    <div className="w-full border-y bg-card py-8">
      <div className="container flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 md:px-6 md:justify-between">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-x-6">
            <span className="text-sm font-medium text-foreground">{item}</span>
            {index < items.length - 1 && (
              <span className="hidden text-muted-foreground md:inline">·</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
