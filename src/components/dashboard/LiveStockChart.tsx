import { useEffect, useMemo, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Circle, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Symbol {
  symbol: string;
  name: string;
  base: number;
  color: string;
}

const SYMBOLS: Symbol[] = [
  { symbol: "AAPL", name: "Apple", base: 228.45, color: "hsl(var(--primary))" },
  { symbol: "MSFT", name: "Microsoft", base: 432.18, color: "hsl(var(--success))" },
  { symbol: "NVDA", name: "NVIDIA", base: 138.92, color: "hsl(var(--bearish))" },
  { symbol: "TSLA", name: "Tesla", base: 248.67, color: "hsl(var(--accent-foreground))" },
];

const MAX_POINTS = 40;

const LiveStockChart = () => {
  const [active, setActive] = useState<string>("AAPL");
  const pricesRef = useRef<Record<string, number>>(
    Object.fromEntries(SYMBOLS.map((s) => [s.symbol, s.base])),
  );
  const [data, setData] = useState<Array<Record<string, number | string>>>(() => {
    const seed: Array<Record<string, number | string>> = [];
    for (let i = 0; i < MAX_POINTS; i++) {
      const point: Record<string, number | string> = { t: i };
      SYMBOLS.forEach((s) => (point[s.symbol] = s.base));
      seed.push(point);
    }
    return seed;
  });

  useEffect(() => {
    const id = setInterval(() => {
      const point: Record<string, number | string> = {
        t: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      };
      SYMBOLS.forEach((s) => {
        const prev = pricesRef.current[s.symbol];
        const drift = (Math.random() - 0.49) * (prev * 0.005);
        const next = Math.max(0.01, prev + drift);
        pricesRef.current[s.symbol] = next;
        point[s.symbol] = Number(next.toFixed(2));
      });
      setData((d) => [...d.slice(-(MAX_POINTS - 1)), point]);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const activeSym = SYMBOLS.find((s) => s.symbol === active)!;
  const currentPrice = (data[data.length - 1]?.[active] as number) ?? activeSym.base;
  const change = currentPrice - activeSym.base;
  const changePct = (change / activeSym.base) * 100;
  const up = change >= 0;

  const yDomain = useMemo<[number, number]>(() => {
    const vals = data.map((d) => d[active] as number);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const pad = (max - min) * 0.15 || max * 0.005;
    return [min - pad, max + pad];
  }, [data, active]);

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Circle className="h-2 w-2 fill-success text-success animate-pulse" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Live</span>
          </div>
          <div className="flex items-baseline gap-3">
            <h3 className="text-2xl font-bold font-mono">${currentPrice.toFixed(2)}</h3>
            <span className={`flex items-center text-sm font-medium ${up ? "text-success" : "text-bearish"}`}>
              {up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              {up ? "+" : ""}
              {change.toFixed(2)} ({changePct.toFixed(2)}%)
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{activeSym.name} • {activeSym.symbol}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SYMBOLS.map((s) => (
            <button
              key={s.symbol}
              onClick={() => setActive(s.symbol)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                active === s.symbol
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted border-border"
              }`}
            >
              {s.symbol}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={activeSym.color} stopOpacity={1} />
                <stop offset="100%" stopColor={activeSym.color} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="t"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              minTickGap={40}
            />
            <YAxis
              domain={yDomain}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              width={55}
              tickFormatter={(v) => `$${Number(v).toFixed(2)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, active]}
            />
            <Line
              type="monotone"
              dataKey={active}
              stroke="url(#lineGrad)"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LiveStockChart;
