import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/dashboard/StatsCard";
import InsightCard from "@/components/dashboard/InsightCard";
import RecentUploads from "@/components/dashboard/RecentUploads";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  TrendingUp, 
  FileImage, 
  AlertTriangle, 
  Upload,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const insights = [
    {
      title: "Double Bottom Pattern",
      asset: "BTC/USD - 4H Chart",
      pattern: "Double Bottom",
      signal: "bullish" as const,
      confidence: 94,
      riskLevel: "medium" as const,
      timestamp: "2 minutes ago",
      priceTarget: "$68,450",
    },
    {
      title: "Head & Shoulders",
      asset: "ETH/USD - Daily",
      pattern: "Head & Shoulders",
      signal: "bearish" as const,
      confidence: 87,
      riskLevel: "high" as const,
      timestamp: "15 minutes ago",
      priceTarget: "$3,120",
    },
    {
      title: "Ascending Triangle",
      asset: "SOL/USD - 1H Chart",
      pattern: "Ascending Triangle",
      signal: "bullish" as const,
      confidence: 91,
      riskLevel: "low" as const,
      timestamp: "32 minutes ago",
      priceTarget: "$142.50",
    },
    {
      title: "Range Consolidation",
      asset: "XRP/USD - 4H Chart",
      pattern: "Consolidation",
      signal: "neutral" as const,
      confidence: 78,
      riskLevel: "low" as const,
      timestamp: "1 hour ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your visual financial intelligence
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="glass" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Link to="/upload">
              <Button variant="hero" size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                New Upload
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Analyses"
            value="1,284"
            change="+12% from last week"
            changeType="positive"
            icon={Activity}
          />
          <StatsCard
            title="Bullish Signals"
            value="847"
            change="66% of total"
            changeType="positive"
            icon={TrendingUp}
          />
          <StatsCard
            title="Visuals Processed"
            value="3,421"
            change="+28% from last week"
            changeType="positive"
            icon={FileImage}
          />
          <StatsCard
            title="Active Alerts"
            value="23"
            change="5 high priority"
            changeType="neutral"
            icon={AlertTriangle}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Insights */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Latest Insights</h2>
              <Link to="/insights">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, index) => (
                <InsightCard key={index} {...insight} />
              ))}
            </div>
          </div>

          {/* Recent Uploads */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Uploads</h2>
              <Link to="/upload">
                <Button variant="ghost" size="sm">
                  Upload
                </Button>
              </Link>
            </div>
            <RecentUploads />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
