import { useState } from "react";
import { TimeRangeFilter } from "@/components/filters/TimeRangeFilter";
import type { TimeRange } from "@/types/time";
import { KpiGrid } from "@/components/kpi/KpiGrid";
import { ReqChart } from "@/components/charts/ReqCharts";
import { LogsTable } from "@/components/logs/LogsTable";
import { AiInsightPanel } from "@/components/ai/AiInsightPanel";

export const Dashboard = () => {
  const [range, setRange] = useState<TimeRange>("24h");

  return (
    <div className="dashboard">
      <div className="section">
        <TimeRangeFilter val={range} onChg={setRange} />
      </div>

      <div className="section">
        <KpiGrid range={range} />
      </div>

      <div className="main-grid">
        <div className="section chart-box">
          <ReqChart range={range} />
        </div>

        <div className="section">
          <AiInsightPanel />
        </div>
      </div>

      <div className="section">
        <LogsTable />
      </div>
    </div>
  );
};
