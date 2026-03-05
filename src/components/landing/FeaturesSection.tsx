import {
  Eye,
  Zap,
  Shield,
  BarChart3,
  Bell,
  FileText,
  Upload,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Eye,
    title: "Visual Pattern Detection",
    description: "Automatically identify candlestick patterns, trendlines, and technical indicators from any chart image.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get AI-powered insights in under 2 seconds. No manual data entry required.",
  },
  {
    icon: TrendingUp,
    title: "Market Sentiment",
    description: "Understand bullish, bearish, or neutral signals with confidence scores and risk assessments.",
  },
  {
    icon: Upload,
    title: "Multi-Format Support",
    description: "Upload charts, PDFs, presentations, and screenshots. We handle all visual formats.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified instantly when critical patterns or market conditions are detected.",
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Generate comprehensive reports with annotated visuals and actionable recommendations.",
  },
  {
    icon: BarChart3,
    title: "Historical Analysis",
    description: "Compare past insights and track pattern accuracy over time.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and role-based access control for your sensitive data.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="container relative z-10 px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for
            <span className="gradient-text"> Financial Intelligence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform visual market data into actionable insights,
            all in one intelligent platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group glass-card p-6 hover:border-primary/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
