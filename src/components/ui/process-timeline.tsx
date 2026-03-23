"use client";

import * as React from "react";

import { useMeasure, useWindowSize } from "@uidotdev/usehooks";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLMotionProps, MotionValue, motion, useScroll, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

const processCardVariants = cva("flex overflow-hidden rounded-lg border backdrop-blur-sm", {
  variants: {
    variant: {
      theme: "border-border bg-card/85 text-card-foreground shadow-sm",
      muted: "border-border/70 bg-muted/40 text-foreground shadow-sm",
    },
    size: {
      sm: "min-w-[25%] max-w-[25%]",
      md: "min-w-[50%] max-w-[50%]",
      lg: "min-w-[75%] max-w-[75%]",
      xl: "min-w-full max-w-full",
    },
  },
  defaultVariants: {
    variant: "theme",
    size: "md",
  },
});

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

interface ProcessCardProps extends HTMLMotionProps<"div">, VariantProps<typeof processCardVariants> {
  itemsLength: number;
  index: number;
}

const ContainerScrollContext = React.createContext<ContainerScrollContextValue | undefined>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error("useContainerScrollContext must be used within a ContainerScroll component");
  }
  return context;
}

export const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} className={cn("relative min-h-[220vh]", className)} {...props}>
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};

export const ContainerSticky = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sticky left-0 top-24 w-full overflow-hidden", className)} {...props} />
  ),
);
ContainerSticky.displayName = "ContainerSticky";

export const ProcessCardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6", className)} {...props} />,
);
ProcessCardTitle.displayName = "ProcessCardTitle";

export const ProcessCardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col gap-4 p-6", className)} {...props} />,
);
ProcessCardBody.displayName = "ProcessCardBody";

export const ProcessCard: React.FC<ProcessCardProps> = ({
  className,
  style,
  variant,
  size,
  itemsLength,
  index,
  ...props
}) => {
  const { scrollYProgress } = useContainerScrollContext();
  const segment = 1 / itemsLength;
  const start = Math.max(0, index * segment - segment * 0.35);
  const end = Math.min(1, (index + 1) * segment + segment * 0.45);
  const [ref, { width: measuredWidth }] = useMeasure();
  const { width: viewportWidth } = useWindowSize();

  const xRaw = useTransform(
    scrollYProgress,
    [start, end],
    [viewportWidth ?? 0, -((measuredWidth ?? 0) * index) + 64 * index],
  );
  const x = useSpring(xRaw, {
    stiffness: 75,
    damping: 26,
    mass: 0.9,
  });

  return (
    <motion.div
      ref={ref}
      style={{
        x: index > 0 ? x : 0,
        ...style,
      }}
      className={cn(processCardVariants({ variant, size }), className)}
      {...props}
    />
  );
};
ProcessCard.displayName = "ProcessCard";
