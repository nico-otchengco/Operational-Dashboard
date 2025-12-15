import { useEffect, useMemo } from "react";
import { useGenAI } from "@/hooks/useGenAI";

export const AiInsightPanel = () => {
  /**
   * Stable, senior-level prompt
   */
  const prompt = useMemo(
    () => `
You are a Senior Site Reliability Engineer reviewing system metrics.

Analyze the following operational data and provide:
1. Key observations
2. Potential risks or anomalies
3. Concrete, actionable recommendations

Metrics:
- Total Requests: 12,000
- Error Rate: 1.2%
- Average Latency: 220ms

Rules:
- Be concise but specific
- Avoid generic statements
- Respond in bullet points
- Focus on operational improvements
`,
    []
  );

  const { gen, insight, isLoading } = useGenAI(prompt);

  useEffect(() => {
    gen();

    const id = setInterval(gen, 300_000);
    return () => clearInterval(id);
  }, [gen]);

  return (
    <div className="ai-panel">
      <h3 className="ai-title">AI Operational Insight</h3>

      {isLoading && <p className="ai-loading">Analyzing metrics...</p>}

      {!isLoading && insight && insight !== "No insight" && (
        <div className="ai-output">
          {insight}
        </div>
      )}

      {!isLoading && !insight && (
        <p className="ai-muted">Waiting for insight...</p>
      )}
    </div>
  );
};
