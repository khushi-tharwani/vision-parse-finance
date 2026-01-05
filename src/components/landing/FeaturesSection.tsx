import { 
  Eye, 
  Zap, 
  Shield, 
  BarChart3, 
  Bell, 
  FileText,
  Upload,
  TrendingUp
} from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Visual Pattern Detection",
    description: "Automatically identify candlestick patterns, trendlines, and technical indicators from any chart image.",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get AI-powered insights in under 2 seconds. No manual data entry required.",
    color: "warning",
  },
  {
    icon: TrendingUp,
    title: "Market Sentiment",
    description: "Understand bullish, bearish, or neutral signals with confidence scores and risk assessments.",
    color: "success",
  },
  {
    icon: Upload,
    title: "Multi-Format Support",
    description: "Upload charts, PDFs, presentations, and screenshots. We handle all visual formats.",
    color: "primary",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified instantly when critical patterns or market conditions are detected.",
    color: "destructive",
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Generate comprehensive reports with annotated visuals and actionable recommendations.",
    color: "primary",
  },
  {
    icon: BarChart3,
    title: "Historical Analysis",
    description: "Compare past insights and track pattern accuracy over time.",
    color: "success",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and role-based access control for your sensitive data.",
    color: "primary",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for
            <span className="gradient-text"> Financial Intelligence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform visual market data into actionable insights,
            all in one intelligent platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass-card p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl bg-${feature.color}/10 mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`h-6 w-6 text-${feature.color}`} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
