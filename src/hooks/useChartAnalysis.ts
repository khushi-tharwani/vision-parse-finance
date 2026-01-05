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

export function useChartAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async (file: File): Promise<AnalysisResult | null> => {
    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const { data, error: fnError } = await supabase.functions.invoke("analyze-chart", {
        body: { imageBase64: base64, fileName: file.name },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const result: AnalysisResult = {
        fileName: file.name,
        analysis: data.analysis,
        timestamp: new Date(),
      };

      return result;
    } catch (err) {
      console.error("Analysis error for", file.name, err);
      throw err;
    }
  };

  const analyzeFiles = async (files: File[]) => {
    setIsAnalyzing(true);
    setError(null);
    const newResults: AnalysisResult[] = [];

    for (const file of files) {
      // Only process image files
      if (!file.type.startsWith("image/")) {
        console.warn("Skipping non-image file:", file.name);
        continue;
      }

      try {
        const result = await analyzeImage(file);
        if (result) {
          newResults.push(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Analysis failed");
      }
    }

    setResults((prev) => [...newResults, ...prev]);
    setIsAnalyzing(false);
    return newResults;
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return {
    isAnalyzing,
    results,
    error,
    analyzeFiles,
    clearResults,
  };
}
