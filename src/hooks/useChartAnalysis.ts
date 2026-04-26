import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ChartAnalysis {
  asset: string;
  timeframe: string;
  signal: "bullish" | "bearish" | "neutral";
  confidence: number;
  riskLevel: "low" | "medium" | "high";
  patterns: string[];
  trendDirection: "up" | "down" | "sideways";
  trendStrength: "strong" | "moderate" | "weak";
  supportLevels: string[];
  resistanceLevels: string[];
  summary: string;
  recommendation: string;
}

export interface AnalysisResult {
  fileName: string;
  analysis: ChartAnalysis;
  timestamp: Date;
}

const HISTORY_KEY = "finoptic_history";
const MAX_HISTORY = 50;

function loadHistory(): AnalysisResult[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AnalysisResult[];
    return parsed.map((r) => ({ ...r, timestamp: new Date(r.timestamp) }));
  } catch {
    return [];
  }
}

function saveHistory(results: AnalysisResult[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(results.slice(0, MAX_HISTORY)));
    window.dispatchEvent(new Event("finoptic:history-updated"));
  } catch {}
}

export function useChartAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>(loadHistory());
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async (file: File): Promise<AnalysisResult | null> => {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const { data, error: fnError } = await supabase.functions.invoke("analyze-chart", {
      body: { imageBase64: base64, fileName: file.name },
    });

    if (fnError) throw new Error(fnError.message);
    if (data.error) throw new Error(data.error);

    return {
      fileName: file.name,
      analysis: data.analysis,
      timestamp: new Date(),
    };
  };

  const analyzeFiles = async (files: File[]) => {
    setIsAnalyzing(true);
    setError(null);
    const newResults: AnalysisResult[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      try {
        const result = await analyzeImage(file);
        if (result) newResults.push(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Analysis failed");
      }
    }

    const merged = [...newResults, ...results];
    setResults(merged);
    saveHistory(merged);
    setIsAnalyzing(false);
    return newResults;
  };

  const clearResults = () => {
    setResults([]);
    saveHistory([]);
    setError(null);
  };

  return { isAnalyzing, results, error, analyzeFiles, clearResults };
}
