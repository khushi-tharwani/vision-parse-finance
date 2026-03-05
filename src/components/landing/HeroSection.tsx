import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Sparkles, TrendingUp, BarChart3, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-[0.03]" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/5 w-[400px] h-[400px] bg-success/8 rounded-full blur-[100px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-warning/5 rounded-full blur-[80px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 px-4 py-20">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 border border-border/50 mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                AI-Powered Visual Financial Intelligence
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
          >
            Transform Financial
            <br />
            <span className="gradient-text">Visuals into Insights</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload charts, PDFs, and screenshots. Get instant pattern detection,
            market sentiment analysis, and actionable trading insights—all powered by visual AI.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
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
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "99.2%", label: "Pattern Accuracy", icon: BarChart3 },
              { value: "<2s", label: "Analysis Time", icon: Sparkles },
              { value: "50+", label: "Pattern Types", icon: TrendingUp },
              { value: "24/7", label: "Real-time Alerts", icon: Shield },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass-card p-4 group hover:border-primary/30 transition-all duration-300"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <stat.icon className="h-5 w-5 text-primary/60 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          className="mt-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-success/10 to-primary/20 rounded-2xl blur-xl opacity-40" />
            <div className="relative glass-card p-6 md:p-8 overflow-hidden border border-border/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Chart Preview */}
                <div className="md:col-span-2 bg-secondary/40 rounded-xl p-4 h-64 border border-border/20">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-success" />
                    <span className="font-medium">BTC/USD Analysis</span>
                    <span className="ml-auto px-2.5 py-1 text-xs rounded-full bg-success/20 text-success font-medium">
                      Bullish
                    </span>
                  </div>
                  <div className="flex items-end justify-around h-40 gap-1">
                    {[40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 70, 90, 82, 95].map((height, i) => (
                      <motion.div
                        key={i}
                        className="flex flex-col items-center gap-0.5"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
                        style={{ originY: 1 }}
                      >
                        <div
                          className={`w-1 rounded-full ${i % 3 !== 0 ? "bg-success" : "bg-bearish"}`}
                          style={{ height: `${height * 0.3}%` }}
                        />
                        <div
                          className={`w-3 rounded-sm ${i % 3 !== 0 ? "bg-success" : "bg-bearish"}`}
                          style={{ height: `${height}%` }}
                        />
                        <div
                          className={`w-1 rounded-full ${i % 3 !== 0 ? "bg-success" : "bg-bearish"}`}
                          style={{ height: `${height * 0.2}%` }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Insight Cards */}
                <div className="space-y-3">
                  {[
                    { label: "Detected Pattern", value: "Ascending Triangle", sub: "Confidence: 94%", color: "text-success" },
                    { label: "Market Sentiment", value: "Strong Buy Signal", sub: "Risk Level: Medium", color: "text-foreground" },
                    { label: "Price Target", value: "$68,450", sub: "+12.5% potential", color: "text-primary" },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      className="bg-secondary/40 rounded-xl p-4 border border-border/20"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
                    >
                      <div className="text-xs text-muted-foreground mb-1">{card.label}</div>
                      <div className={`font-semibold ${card.color} ${card.label === "Price Target" ? "font-mono" : ""}`}>
                        {card.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{card.sub}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
