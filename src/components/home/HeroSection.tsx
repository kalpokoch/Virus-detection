import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const quickStats = [
  { label: "Patient Records Analysed", value: "5.4M+" },
  { label: "Viral Pathogens Covered", value: "38" },
  { label: "VRDLN Labs Across India", value: "150+" },
];

export function HeroSection() {
  return (
    <section className="w-full bg-background relative overflow-hidden">
      {/* Responsive glow orbs */}
      <style>{`
        @media (max-width: 767px) {
          .glow-orb-large {
            width: 320px !important;
            height: 320px !important;
            right: -120px !important;
          }
          .glow-orb-small {
            width: 140px !important
            height: 140px !important;
            right: 20px !important;
          }
        }
      `}</style>
      {/* Apply mobile class names via a wrapper that re-renders the orbs with classes */}
      <div
        className="absolute pointer-events-none z-0 glow-orb-large"
        style={{
          right: "-180px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          background: `radial-gradient(circle at center, hsl(var(--chart-2)), hsl(var(--chart-1)), hsl(var(--chart-5)))`,
          filter: "blur(90px)",
          opacity: 0.28,
        }}
      />
      <div
        className="absolute pointer-events-none z-0 glow-orb-small"
        style={{
          right: "80px",
          top: "25%",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: `radial-gradient(circle at center, hsl(var(--chart-3)), hsl(var(--chart-4)))`,
          filter: "blur(60px)",
          opacity: 0.18,
        }}
      />

      <div className="container relative z-10 grid min-h-[85vh] items-center gap-12 px-4 pt-20 pb-12 md:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="relative z-10 flex flex-col justify-center space-y-6">
          <h1 className="text-5xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl leading-[1.1]">
            Virus Recommender System for{" "}
            <span className="text-primary">VRDLN</span>
          </h1>
          <div className="max-w-[600px] min-h-[3.25rem]">
            <motion.p
              className="text-lg font-light italic text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.3, ease: "easeOut" }}
            >
              VRDLN - Virus Research and Diagnosis Laboratory Network
            </motion.p>
          </div>
          <p className="max-w-[600px] text-lg font-light text-muted-foreground md:text-xl mt-6">
            Advancing diagnostic decision making through AI
          </p>
          <div className="flex flex-col gap-4 sm:flex-row mt-10">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-base">
              <Link to="/prediction">Run Application →</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-base">
              <Link to="/contributors">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-center" style={{ perspective: '1000px' }}>
          <Card 
            className="w-full max-w-md rounded-2xl border p-8 shadow-lg transition-all duration-150 ease-out hover:shadow-2xl"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 20; // Reduced from 10 to 25 for subtler movement
              const rotateY = -(x - centerX) / 20; // Reduced from 10 to 25 for subtler movement
              card.style.transform = `translateZ(10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(0px) rotateX(0deg) rotateY(0deg)';
            }}
          >
            <CardContent className="p-0" style={{ transform: 'translateZ(30px)' }}>
              <h3 className="mb-6 text-lg font-semibold text-foreground">Quick Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center text-center">
                    <span className="text-4xl font-semibold text-primary">{stat.value}</span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
