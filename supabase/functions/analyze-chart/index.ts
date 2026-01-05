import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, fileName } = await req.json();

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are FinOptic, an expert financial chart analyst AI. Analyze the provided financial chart image and extract actionable insights.

Your analysis must include:
1. **Pattern Detection**: Identify candlestick patterns (doji, hammer, engulfing, etc.), chart patterns (head & shoulders, triangles, flags), and trendlines
2. **Signal Classification**: Determine if the overall signal is BULLISH, BEARISH, or NEUTRAL
3. **Trend Analysis**: Assess trend direction and strength (strong, moderate, weak)
4. **Key Levels**: Identify support and resistance levels if visible
5. **Volume Analysis**: Comment on volume patterns if visible
6. **Risk Assessment**: Provide a risk level (low, medium, high)
7. **Confidence Score**: Rate your confidence in the analysis (0-100%)

Respond in this exact JSON format:
{
  "asset": "Detected asset name or 'Unknown'",
  "timeframe": "Detected timeframe or 'Unknown'",
  "signal": "bullish" | "bearish" | "neutral",
  "confidence": 0-100,
  "riskLevel": "low" | "medium" | "high",
  "patterns": ["list of detected patterns"],
  "trendDirection": "up" | "down" | "sideways",
  "trendStrength": "strong" | "moderate" | "weak",
  "supportLevels": ["price levels if visible"],
  "resistanceLevels": ["price levels if visible"],
  "summary": "A concise 2-3 sentence summary of the key insight",
  "recommendation": "Brief actionable recommendation"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: `Analyze this financial chart image (${fileName}). Provide your analysis in the exact JSON format specified.` },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64.startsWith("data:") ? imageBase64 : `data:image/png;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No analysis content received from AI");
    }

    // Parse the JSON response from the AI
    let analysis;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      analysis = JSON.parse(jsonString.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", content);
      // Return a structured error with the raw content
      analysis = {
        asset: "Unknown",
        timeframe: "Unknown",
        signal: "neutral",
        confidence: 50,
        riskLevel: "medium",
        patterns: [],
        trendDirection: "sideways",
        trendStrength: "moderate",
        supportLevels: [],
        resistanceLevels: [],
        summary: content.substring(0, 200),
        recommendation: "Unable to parse detailed analysis. Please try with a clearer chart image.",
        rawResponse: content
      };
    }

    return new Response(
      JSON.stringify({ success: true, analysis, fileName }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-chart:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Analysis failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
