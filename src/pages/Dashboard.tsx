import { useState, useMemo, useEffect } from "react";
import { TimeRangeFilter } from "@/components/filters/TimeRangeFilter";
import type { TimeRange } from "@/types/time";
import { KpiGrid } from "@/components/kpi/KpiGrid";
import { ReqChart } from "@/components/charts/ReqCharts";
import { LogsTable } from "@/components/logs/LogsTable";
import { AiInsightPanel } from "@/components/ai/AiInsightPanel";
import { useReqMetrics } from "@/hooks/useReqMetrics";
import { Analytics3DLoader } from "@/pages/Analytics3DLoader";

export const Dashboard = () => {
  const [range, setRange] = useState<TimeRange>("7d");
  const { rows, isLd, err } = useReqMetrics(range);
  const [ready, setReady] = useState(false);
  const [errorRate, setErrorRate] = useState<number>(0);

  type Trend = "up" | "down" | "flat";

  const metrics = useMemo(() => {
    if (!rows.length) {
      return {
        totalReq: 0,
        avgReq: 0,
        trend: "flat" as Trend,
      };
    }

    let trend: Trend = "flat";

    if (rows.length > 1) {
      const first = rows[0].reqCnt;
      const last = rows.at(-1)!.reqCnt;

      if (last > first) trend = "up";
      else if (last < first) trend = "down";
    }

    const totalReq = rows.reduce((sum, r) => sum + r.reqCnt, 0);
    const avgReq = Math.round(totalReq / rows.length);

    return { totalReq, avgReq, trend };
  }, [rows]);

  if (err) {
    return <div className="error">Failed to load dashboard: {err}</div>;
  }

  useEffect(() => {
    if (!isLd) {
      setTimeout(() => setReady(true), 800);  
    }
  }, [isLd]);


  if (!ready) return <Analytics3DLoader />;

  return (
    <div className="dashboard">
      <div className="section">
        <TimeRangeFilter val={range} onChg={setRange} />
      </div>

      <div className="section">
        <KpiGrid 
          range={range}
          onDataDerived={(val) => setErrorRate(val)}
        />
      </div>

      <div className="main-grid">
        <div className="section chart-box">
          <ReqChart range={range} />
        </div>

        <div className="section">
            <AiInsightPanel
              range={range}
              totalReq={metrics.totalReq}
              avgReq={metrics.avgReq}
              trend={metrics.trend}
              errPct={errorRate}
              rows={rows}
            />
        </div>
      </div>

      <div className="section">
        <LogsTable />
      </div>
    </div>
  );
};
