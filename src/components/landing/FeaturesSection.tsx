import { Eye, Zap, TrendingUp, Bell, FileText, Shield } from "lucide-react";

const features = [
  { icon: Eye, title: "Pattern Detection", description: "Identify candlestick patterns and trendlines from chart images." },
  { icon: Zap, title: "Instant Analysis", description: "AI-powered insights in under 2 seconds." },
  { icon: TrendingUp, title: "Market Sentiment", description: "Bullish, bearish or neutral signals with confidence scores." },
  { icon: Bell, title: "Smart Alerts", description: "Notifications when critical patterns are detected." },
  { icon: FileText, title: "Detailed Reports", description: "Exportable reports with annotated visuals and recommendations." },
  { icon: Shield, title: "Secure", description: "Encrypted storage with role-based access control." },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-secondary/40 border-y border-border">
      <div className="container px-4">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Everything you need</h2>
          <p className="text-muted-foreground">A focused set of features to turn visual data into decisions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-6 hover:border-primary/40 transition-colors">
              <div className="inline-flex p-2 rounded-lg bg-primary/10 mb-4">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1.5">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
