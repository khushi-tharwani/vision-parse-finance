import { useEffect, useMemo, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Circle } from "lucide-react";

interface SymbolDef {
  symbol: string;
  name: string;
  base: number;
  color: string;
}

const SYMBOLS: SymbolDef[] = [
  { symbol: "AAPL", name: "Apple", base: 228.45, color: "hsl(217 91% 60%)" },
  { symbol: "MSFT", name: "Microsoft", base: 432.18, color: "hsl(142 71% 45%)" },
  { symbol: "NVDA", name: "NVIDIA", base: 138.92, color: "hsl(0 84% 60%)" },
  { symbol: "TSLA", name: "Tesla", base: 248.67, color: "hsl(38 92% 50%)" },
  { symbol: "GOOGL", name: "Alphabet", base: 174.32, color: "hsl(280 75% 60%)" },
  { symbol: "AMZN", name: "Amazon", base: 198.21, color: "hsl(190 80% 45%)" },
];

const MAX_POINTS = 40;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  const sorted = [...payload].sort((a, b) => b.value - a.value);
  return (
    <div className="rounded-lg border bg-background/95 backdrop-blur p-3 shadow-lg text-xs min-w-[180px]">
      <p className="font-medium text-muted-foreground mb-2">{label}</p>
      <div className="space-y-1.5">
        {sorted.map((entry: any) => {
          const sym = SYMBOLS.find((s) => s.symbol === entry.dataKey);
          return (
            <div key={entry.dataKey} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="font-medium">{entry.dataKey}</span>
                <span className="text-muted-foreground">{sym?.name}</span>
              </div>
              <span className="font-mono font-semibold">${entry.value.toFixed(2)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LiveStockChart = () => {
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const pricesRef = useRef<Record<string, number>>(
    Object.fromEntries(SYMBOLS.map((s) => [s.symbol, s.base])),
  );
  const [data, setData] = useState<Array<Record<string, number | string>>>(() => {
    const seed: Array<Record<string, number | string>> = [];
    for (let i = 0; i < MAX_POINTS; i++) {
      const point: Record<string, number | string> = { t: "" };
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

  // Normalize all series to % change from their base so they fit on one axis
  const normalized = useMemo(() => {
    return data.map((d) => {
      const out: Record<string, number | string> = { t: d.t };
      SYMBOLS.forEach((s) => {
        const v = d[s.symbol] as number;
        out[s.symbol] = Number((((v - s.base) / s.base) * 100).toFixed(3));
      });
      return out;
    });
  }, [data]);

  const toggle = (sym: string) => setHidden((h) => ({ ...h, [sym]: !h[sym] }));

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Circle className="h-2 w-2 fill-success text-success animate-pulse" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Live • All Stocks</span>
          </div>
          <h3 className="text-xl font-semibold">Market Movement (% change)</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Hover the chart to see exact price for each stock. Click a legend item to toggle it.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {SYMBOLS.map((s) => {
            const last = (data[data.length - 1]?.[s.symbol] as number) ?? s.base;
            const pct = ((last - s.base) / s.base) * 100;
            const isHidden = hidden[s.symbol];
            return (
              <button
                key={s.symbol}
                onClick={() => toggle(s.symbol)}
                className={`flex items-center gap-2 px-2.5 py-1 rounded-md border text-xs transition ${
                  isHidden ? "opacity-40" : "opacity-100"
                } hover:bg-muted`}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="font-medium">{s.symbol}</span>
                <span className="font-mono text-muted-foreground">${last.toFixed(2)}</span>
                <span className={pct >= 0 ? "text-success" : "text-bearish"}>
                  {pct >= 0 ? "+" : ""}{pct.toFixed(2)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={normalized} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="t"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              minTickGap={40}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              width={50}
              tickFormatter={(v) => `${Number(v).toFixed(2)}%`}
            />
            <Tooltip
              content={({ active, label }) => {
                if (!active) return null;
                // Build payload from raw price data, not normalized
                const idx = normalized.findIndex((p) => p.t === label);
                if (idx < 0) return null;
                const raw = data[idx];
                const items = SYMBOLS.filter((s) => !hidden[s.symbol]).map((s) => ({
                  dataKey: s.symbol,
                  color: s.color,
                  value: raw[s.symbol] as number,
                }));
                return <CustomTooltip active payload={items} label={label} />;
              }}
            />
            {SYMBOLS.map((s) => (
              <Line
                key={s.symbol}
                type="monotone"
                dataKey={s.symbol}
                stroke={s.color}
                strokeWidth={2}
                dot={false}
                hide={hidden[s.symbol]}
                isAnimationActive={false}
                activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(var(--background))" }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LiveStockChart;
