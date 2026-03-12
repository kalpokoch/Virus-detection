import { cn } from "@/lib/utils";

interface LogoPlaceholderProps {
  label: string;
  width?: string;
  height?: string;
  className?: string;
}

export function LogoPlaceholder({ label, width = '100%', height = '100%', className }: LogoPlaceholderProps) {
  return (
    <div
      className={cn("placeholder-logo", className)}
      style={{ width, height }}
      data-label={label}
    />
  );
}
