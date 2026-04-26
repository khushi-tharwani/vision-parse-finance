import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 border-t border-border">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to start? <span className="gradient-text">It's free.</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Join traders and analysts using visual AI to find opportunities faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/auth">
              <Button variant="hero" size="lg" className="group">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg">Explore</Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-5">No credit card required</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
