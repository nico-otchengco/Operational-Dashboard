import { useEffect } from "react";
import { useGenAI } from "@/hooks/useGenAI";

export const AiInsightPanel = () => {
  const prompt = `Metrics:
Requests: 12000
Error Rate: 1.2%
Avg Latency: 220ms
Provide actionable insights.`;

  const { gen, insight, isLoading } = useGenAI(prompt);

  useEffect(() => {
    gen();

    const interval = setInterval(() => {
      gen();
    }, 300_000);

    return () => clearInterval(interval);
  }, [gen]);

  return (
    <div className="ai-panel">
      <h3 className="ai-title">AI Insight</h3>

      {insight && (
        <div className="ai-output">
          {insight}
        </div>
      )}
    </div>
  );
};
