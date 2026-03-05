import { Upload, Sparkles, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Charts",
    description: "Drag & drop candlestick charts, PDF reports, or screenshots. We accept all major image formats.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "AI Analyzes Visuals",
    description: "Our visual AI detects patterns, trendlines, volume indicators, and market signals in seconds.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Get Actionable Insights",
    description: "Receive detailed reports with confidence scores, risk levels, and trading recommendations.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative">
      <div className="container relative z-10 px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Three simple steps to transform your financial charts into actionable intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40" />

          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="text-center relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <motion.div
                className="inline-flex p-5 rounded-2xl bg-primary/10 border border-primary/20 mb-6 relative"
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <s.icon className="h-8 w-8 text-primary" />
                <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {s.step}
                </span>
              </motion.div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
