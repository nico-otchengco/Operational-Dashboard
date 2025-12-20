import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useReqMetrics } from "@/hooks/useReqMetrics";

interface ReqChartProps {
  range: "7d" | "30d" | "90d";
}

export const ReqChart = ({ range }: ReqChartProps) => {
  const { rows, isLd, err } = useReqMetrics(range);

  if (isLd) return <div className="text-center p-8">Loading chart...</div>;
  if (err) return <div className="text-red-500 p-8 text-center">{err}</div>;
  if (!rows.length) return <div className="text-gray-500 p-8 text-center">No data available</div>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={rows}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="reqCnt" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};
