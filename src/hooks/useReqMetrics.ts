import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/services/supabase";
import type { ReqRow } from "@/types/metrics";
import { getStartDate } from "@/utils/time";

export const useReqMetrics = (range: "24h" | "30d" | "90d") => {
  const [rows, setRows] = useState<ReqRow[]>([]);
  const [isLd, setIsLd] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const dtStart = useMemo(() => getStartDate(range), [range]);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setIsLd(true);
      setErr(null);

      try {
        const { data, error } = await supabase
          .from("vw_req_daily")
          .select("day, req_cnt")
          .gte("day", dtStart)
          .order("day", { ascending: true });

        if (error) throw error;

        if (!cancelled) {
          setRows(
            data?.map(r => ({
              day: r.day,
              reqCnt: r.req_cnt,
            })) ?? []
          );
        }
      } catch (e: any) {
        if (!cancelled) setErr(e.message);
      } finally {
        if (!cancelled) setIsLd(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [dtStart]);

  return { rows, isLd, err };
};
