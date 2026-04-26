import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Circle } from "lucide-react";
import { motion } from "framer-motion";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
}

const SEED: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 228.45, change: 0, changePct: 0 },
  { symbol: "MSFT", name: "Microsoft", price: 432.18, change: 0, changePct: 0 },
  { symbol: "NVDA", name: "NVIDIA", price: 138.92, change: 0, changePct: 0 },
  { symbol: "TSLA", name: "Tesla", price: 248.67, change: 0, changePct: 0 },
  { symbol: "GOOGL", name: "Alphabet", price: 175.34, change: 0, changePct: 0 },
  { symbol: "AMZN", name: "Amazon", price: 198.21, change: 0, changePct: 0 },
  { symbol: "META", name: "Meta Platforms", price: 562.78, change: 0, changePct: 0 },
  { symbol: "BTC", name: "Bitcoin", price: 67842.5, change: 0, changePct: 0 },
];

const LiveStocks = () => {
  const [stocks, setStocks] = useState<Stock[]>(SEED);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStocks((prev) =>
        prev.map((s) => {
          const drift = (Math.random() - 0.48) * (s.price * 0.004);
          const newPrice = Math.max(0.01, s.price + drift);
          const change = newPrice - SEED.find((x) => x.symbol === s.symbol)!.price;
          const changePct = (change / SEED.find((x) => x.symbol === s.symbol)!.price) * 100;
          return { ...s, price: newPrice, change, changePct };
        }),
      );
      setTick((t) => t + 1);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Circle className="h-2 w-2 fill-success text-success animate-pulse" />
          <h3 className="font-semibold">Live Market</h3>
        </div>
        <span className="text-xs text-muted-foreground">Updates every 1.5s</span>
      </div>
      <div className="divide-y">
        {stocks.map((s) => {
          const up = s.change >= 0;
          return (
            <div key={s.symbol} className="flex items-center justify-between p-3 hover:bg-muted/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-xs font-bold">
                  {s.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="font-medium text-sm">{s.symbol}</div>
                  <div className="text-xs text-muted-foreground">{s.name}</div>
                </div>
              </div>
              <div className="text-right">
                <motion.div
                  key={`${s.symbol}-${tick}`}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-sm font-semibold"
                >
                  ${s.price.toFixed(2)}
                </motion.div>
                <div
                  className={`flex items-center justify-end gap-1 text-xs font-medium ${
                    up ? "text-success" : "text-bearish"
                  }`}
                >
                  {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {up ? "+" : ""}
                  {s.changePct.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveStocks;
