import { Button } from "@/components/ui/button";
import { ArrowRight, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              AI-Powered Visual Financial Intelligence
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.1]">
            Transform Financial Visuals
            <br />
            <span className="gradient-text">Into Actionable Insights</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            Upload charts, PDFs, and screenshots. Get instant pattern detection and
            market sentiment analysis powered by visual AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/upload">
              <Button variant="hero" size="lg" className="group">
                <Upload className="h-4 w-4" />
                Start Analyzing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
