import CountUp from '@/components/shared/CountUp';

export interface QuickStat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
}

interface QuickStatsProps {
  stats: QuickStat[];
  className?: string;
}

export function QuickStats({ stats, className }: QuickStatsProps) {
  return (
    <div className={`grid grid-cols-3 gap-4 ${className ?? ''}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center text-center">
          <span className="text-4xl font-semibold text-primary">
            {stat.prefix}
            <CountUp
              to={stat.value}
              duration={stat.duration ?? 2}
              delay={stat.delay ?? 0}
              separator=","
            />
            {stat.suffix}
          </span>
          <span className="text-sm text-muted-foreground">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
