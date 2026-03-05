import Navbar from "@/components/layout/Navbar";
import InsightCard from "@/components/dashboard/InsightCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, TrendingUp, TrendingDown, Minus, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

const Insights = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allInsights = [
    { title: "Double Bottom Pattern", asset: "BTC/USD - 4H Chart", pattern: "Double Bottom", signal: "bullish" as const, confidence: 94, riskLevel: "medium" as const, timestamp: "2 minutes ago", priceTarget: "$68,450" },
    { title: "Head & Shoulders", asset: "ETH/USD - Daily", pattern: "Head & Shoulders", signal: "bearish" as const, confidence: 87, riskLevel: "high" as const, timestamp: "15 minutes ago", priceTarget: "$3,120" },
    { title: "Ascending Triangle", asset: "SOL/USD - 1H Chart", pattern: "Ascending Triangle", signal: "bullish" as const, confidence: 91, riskLevel: "low" as const, timestamp: "32 minutes ago", priceTarget: "$142.50" },
    { title: "Range Consolidation", asset: "XRP/USD - 4H Chart", pattern: "Consolidation", signal: "neutral" as const, confidence: 78, riskLevel: "low" as const, timestamp: "1 hour ago" },
    { title: "Bullish Engulfing", asset: "ADA/USD - 1H Chart", pattern: "Bullish Engulfing", signal: "bullish" as const, confidence: 89, riskLevel: "medium" as const, timestamp: "1.5 hours ago", priceTarget: "$0.68" },
    { title: "Descending Wedge", asset: "AVAX/USD - Daily", pattern: "Descending Wedge", signal: "bearish" as const, confidence: 82, riskLevel: "high" as const, timestamp: "2 hours ago", priceTarget: "$28.40" },
    { title: "Cup and Handle", asset: "DOT/USD - Weekly", pattern: "Cup and Handle", signal: "bullish" as const, confidence: 96, riskLevel: "low" as const, timestamp: "3 hours ago", priceTarget: "$9.50" },
    { title: "Sideways Channel", asset: "LINK/USD - 4H Chart", pattern: "Channel", signal: "neutral" as const, confidence: 85, riskLevel: "low" as const, timestamp: "4 hours ago" },
  ];

  const filteredInsights = allInsights
    .filter((i) => activeFilter === "all" || i.signal === activeFilter)
    .filter((i) => !searchQuery || i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.asset.toLowerCase().includes(searchQuery.toLowerCase()));

  const filters = [
    { id: "all", label: "All", count: allInsights.length, icon: null, color: "" },
    { id: "bullish", label: "Bullish", count: allInsights.filter((i) => i.signal === "bullish").length, icon: TrendingUp, color: "text-success" },
    { id: "bearish", label: "Bearish", count: allInsights.filter((i) => i.signal === "bearish").length, icon: TrendingDown, color: "text-bearish" },
    { id: "neutral", label: "Neutral", count: allInsights.filter((i) => i.signal === "neutral").length, icon: Minus, color: "text-neutral" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Market Insights</h1>
            <p className="text-muted-foreground">AI-generated insights from your visual financial data</p>
          </div>
          <Button variant="glass" className="gap-2"><Download className="h-4 w-4" /> Export Report</Button>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search insights..."
              className="pl-10 bg-secondary/50 border-border/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className={`gap-1.5 ${activeFilter === filter.id ? "border border-primary/30" : ""}`}
              >
                {filter.icon && <filter.icon className={`h-4 w-4 ${filter.color}`} />}
                {filter.label}
                <Badge variant="outline" className="ml-1 h-5 px-1.5 text-xs">{filter.count}</Badge>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <InsightCard {...insight} />
            </motion.div>
          ))}
        </div>

        {filteredInsights.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground text-lg">No insights match your filter.</p>
            <Button variant="ghost" className="mt-4" onClick={() => { setActiveFilter("all"); setSearchQuery(""); }}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Insights;
