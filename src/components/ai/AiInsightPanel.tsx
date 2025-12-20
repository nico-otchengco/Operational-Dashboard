import { useEffect } from "react";
import { useGenAI } from "@/hooks/useGenAI";

interface Props {
  range: "7d" | "30d" | "90d";
  totalReq: number;
  avgReq: number;
  trend: "up" | "down" | "flat";
}

export const AiInsightPanel = ({
  range,
  totalReq,
  avgReq,
  trend,
}: Props) => {
  const prompt = `
    You are a Senior Site Reliability Engineer reviewing API traffic.

    Time window: ${range}

    Metrics summary:
    - Total requests: ${totalReq}
    - Average requests per period: ${avgReq}
    - Traffic trend: ${trend}

    Tasks:
    1. Assess system health
    2. Identify potential risks
    3. Recommend concrete improvements

    Rules:
    - Be specific
    - Avoid generic advice
    - Use bullet points
    `;

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
