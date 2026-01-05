import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-[0.03]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-success/10 rounded-full blur-[80px] animate-pulse-slow" />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-Powered Visual Financial Intelligence
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            Transform Financial
            <br />
            <span className="gradient-text">Visuals into Insights</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Upload charts, PDFs, and screenshots. Get instant pattern detection, 
            market sentiment analysis, and actionable trading insights—all powered by visual AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/upload">
              <Button variant="hero" size="xl" className="group">
                <Upload className="h-5 w-5" />
                Start Analyzing
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="glass" size="xl">
                View Demo Dashboard
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {[
              { value: "99.2%", label: "Pattern Accuracy" },
              { value: "<2s", label: "Analysis Time" },
              { value: "50+", label: "Pattern Types" },
              { value: "24/7", label: "Real-time Alerts" },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-4">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-success/20 to-primary/20 rounded-2xl blur-xl opacity-50" />
            <div className="relative glass-card p-6 md:p-8 overflow-hidden">
              {/* Mock Dashboard Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Chart Preview */}
                <div className="md:col-span-2 bg-secondary/50 rounded-xl p-4 h-64">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-success" />
                    <span className="font-medium">BTC/USD Analysis</span>
                    <span className="ml-auto px-2 py-1 text-xs rounded-full bg-success/20 text-success">Bullish</span>
                  </div>
                  {/* Mock Candlestick */}
                  <div className="flex items-end justify-around h-40 gap-1">
                    {[40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 70, 90].map((height, i) => (
                      <div key={i} className="flex flex-col items-center gap-0.5">
                        <div 
                          className={`w-1 rounded-full ${i % 2 === 0 ? 'bg-success' : 'bg-bearish'}`}
                          style={{ height: `${height * 0.3}%` }}
                        />
                        <div 
                          className={`w-3 rounded-sm ${i % 2 === 0 ? 'bg-success' : 'bg-bearish'}`}
                          style={{ height: `${height}%` }}
                        />
                        <div 
                          className={`w-1 rounded-full ${i % 2 === 0 ? 'bg-success' : 'bg-bearish'}`}
                          style={{ height: `${height * 0.2}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insight Cards */}
                <div className="space-y-4">
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="text-xs text-muted-foreground mb-1">Detected Pattern</div>
                    <div className="font-semibold text-success">Ascending Triangle</div>
                    <div className="text-xs text-muted-foreground mt-1">Confidence: 94%</div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="text-xs text-muted-foreground mb-1">Market Sentiment</div>
                    <div className="font-semibold">Strong Buy Signal</div>
                    <div className="text-xs text-muted-foreground mt-1">Risk Level: Medium</div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="text-xs text-muted-foreground mb-1">Price Target</div>
                    <div className="font-semibold font-mono text-primary">$68,450</div>
                    <div className="text-xs text-success mt-1">+12.5% potential</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
