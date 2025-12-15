import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";

export interface LogRow {
  id: number;
  endpoint: string;
  status_code: number;
  latency_ms: number;
  created_at: string;
}

export const useLogs = (page: number, limit: number) => {
  const [rows, setRows] = useState<LogRow[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isLd, setIsLd] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const from = page * limit;
        const to = from + limit - 1;

        const { data, error, count } = await supabase
          .from("api_logs")
          .select("*", { count: "exact" })
          .range(from, to)
          .order("crt_ts", { ascending: false });

        if (error) throw error;

        setRows(data ?? []);
        setCount(count ?? 0);
      } catch (e: any) {
        setErr(e.message);
      } finally {
        setIsLd(false);
      }
    };

    fetchLogs();
  }, [page, limit]);

  return { rows, count, isLd, err };
};
