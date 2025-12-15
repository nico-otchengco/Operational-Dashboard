import { useReqMetrics } from "@/hooks/useReqMetrics";
import "@/styles/style.css";

interface KpiGridProps {
  range: "24h" | "30d" | "90d";
}

export const KpiGrid = ({ range }: KpiGridProps) => {
  const { rows, isLd, err } = useReqMetrics(range);

  const totalReq = rows.reduce((acc, r) => acc + r.reqCnt, 0);
  const avgReq = rows.length ? Math.round(totalReq / rows.length) : 0;

  const kpis = [
    { title: "Total Requests", value: totalReq },
    { title: "Average Requests", value: avgReq },
    { title: "Error Rate", value: "1.2%" },
  ];

  if (isLd) return <div className="kpi-loading">Loading KPIs...</div>;
  if (err) return <div className="kpi-error">{err}</div>;

  return (
    <div className="kpi-grid">
      {kpis.map((kpi) => (
        <div key={kpi.title} className="kpi-card">
          <div className="kpi-title">{kpi.title}</div>
          <div className="kpi-value">{kpi.value}</div>
        </div>
      ))}
    </div>
  );
};
