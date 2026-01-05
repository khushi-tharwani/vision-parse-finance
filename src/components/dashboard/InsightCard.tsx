import { TrendingUp, TrendingDown, Minus, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InsightCardProps {
  title: string;
  asset: string;
  pattern: string;
  signal: "bullish" | "bearish" | "neutral";
  confidence: number;
  riskLevel: "low" | "medium" | "high";
  timestamp: string;
  priceTarget?: string;
}

const InsightCard = ({
  title,
  asset,
  pattern,
  signal,
  confidence,
  riskLevel,
  timestamp,
  priceTarget,
}: InsightCardProps) => {
  const signalConfig = {
    bullish: { icon: TrendingUp, color: "text-success", bg: "bg-success/10", label: "Bullish" },
    bearish: { icon: TrendingDown, color: "text-bearish", bg: "bg-bearish/10", label: "Bearish" },
    neutral: { icon: Minus, color: "text-neutral", bg: "bg-neutral/10", label: "Neutral" },
  };

  const riskConfig = {
    low: { color: "text-success", bg: "bg-success/10" },
    medium: { color: "text-warning", bg: "bg-warning/10" },
    high: { color: "text-destructive", bg: "bg-destructive/10" },
  };

  const SignalIcon = signalConfig[signal].icon;

  return (
    <div className="glass-card p-5 hover:border-primary/30 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground">{asset}</p>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${signalConfig[signal].bg}`}>
          <SignalIcon className={`h-4 w-4 ${signalConfig[signal].color}`} />
          <span className={`text-xs font-medium ${signalConfig[signal].color}`}>
            {signalConfig[signal].label}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Pattern Detected</span>
          <span className="text-sm font-medium">{pattern}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Confidence</span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${signal === 'bullish' ? 'bg-success' : signal === 'bearish' ? 'bg-bearish' : 'bg-neutral'}`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span className="text-sm font-mono">{confidence}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Risk Level</span>
          <Badge variant="outline" className={`${riskConfig[riskLevel].bg} ${riskConfig[riskLevel].color} border-0`}>
            <AlertTriangle className="h-3 w-3 mr-1" />
            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
          </Badge>
        </div>

        {priceTarget && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Price Target</span>
            <span className="text-sm font-mono font-medium text-primary">{priceTarget}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border/50 flex items-center text-xs text-muted-foreground">
        <Clock className="h-3 w-3 mr-1" />
        {timestamp}
      </div>
    </div>
  );
};

export default InsightCard;
