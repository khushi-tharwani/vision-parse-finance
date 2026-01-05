import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50" />
      
      <div className="container relative z-10 px-4">
        <div className="glass-card max-w-4xl mx-auto p-8 md:p-12 text-center glow-effect">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Start Free Today</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your
            <br />
            <span className="gradient-text">Financial Analysis?</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join thousands of traders and analysts using visual AI to uncover market opportunities 
            faster than ever before.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button variant="hero" size="xl" className="group">
                Get Started Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="glass" size="xl">
                Explore Features
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Free tier available • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
