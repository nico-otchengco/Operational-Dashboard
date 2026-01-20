import { generateInsight } from "@/utils/genInsight";

interface Props {
  range: string;
  totalReq: number;
  avgReq: number;
  trend: "up" | "down" | "flat";
  errPct: number;
  rows: { reqCnt: number }[];
}

export const AiInsightPanel = ({
  range,
  totalReq,
  avgReq,
  trend,
  errPct,
  rows,
}: Props) => {
  const insight = generateInsight({
    range,
    totalReq,
    avgReq,
    trend,
    errPct,
    rows,
  });

  return (
    <div className="ai-panel">
      <h3 className="ai-title">AI Operational Insight</h3>

      {insight.anomalyDetected && (
        <div className="ai-alert">
          ⚠️ Anomalies detected during this period
        </div>
      )}

      <p className="ai-text">{insight.text}</p>

      <div className="ai-confidence">
        Confidence Score: <strong>{insight.confidence}%</strong>
      </div>
    </div>
  );
};
