import { useReqMetrics } from "@/hooks/useReqMetrics";
import "@/styles/style.css";
import { useEffect } from "react";

interface KpiGridProps {
  range: "7d" | "30d" | "90d";
  onDataDerived?: (errorRate: number) => void;
}

export const KpiGrid = ({ range, onDataDerived }: KpiGridProps) => {
  const { rows, isLd, err } = useReqMetrics(range);

  const totalReq = rows.reduce((sum, r) => sum + r.reqCnt, 0);
  const avgReq = rows.length ? Math.round(totalReq / rows.length) : 0;
  const totalErr = rows.reduce((sum, r) => sum + r.reqCnt * (r.errPct / 100), 0);

  const errorRate = totalReq > 0 ? (totalErr / totalReq) * 100 : 0;
  const errorRateStr = errorRate.toFixed(2) + "%";

  useEffect(() => {
    if (onDataDerived && !isLd && !err) {
      onDataDerived(errorRate);
    }
  }, [errorRate, isLd, onDataDerived]);

  if (isLd) return <div className="kpi-loading">Loading KPIs...</div>;
  if (err) return <div className="kpi-error">{err}</div>;

  const kpis = [
    { title: "Total Requests", value: totalReq.toLocaleString() },
    { title: "Average Requests", value: avgReq.toLocaleString() },
    { title: "Error Rate", value: errorRateStr },
  ];

  return (
    <div className="kpi-grid">
      {kpis.map(kpi => (
        <div key={kpi.title} className="kpi-card">
          <div className="kpi-title">{kpi.title}</div>
          <div className="kpi-value">{kpi.value}</div>
        </div>
      ))}
    </div>
  );
};
