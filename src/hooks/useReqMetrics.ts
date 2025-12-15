import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import type { ReqRow } from "@/types/metrics";
import { getStartDate } from "@/utils/time";

export const useReqMetrics = (range: "24h" | "30d" | "90d") => {
  const [rows, setRows] = useState<ReqRow[]>([]);
  const [isLd, setIsLd] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const dtStart = getStartDate(range);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("vw_req_daily")
          .select("day, req_cnt")
          .gte("day", dtStart); // apply time filter here

        if (error) throw error;

        setRows(
          data?.map(r => ({ day: r.day, reqCnt: r.req_cnt })) ?? []
        );
      } catch (e: any) {
        setErr(e.message);
      } finally {
        setIsLd(false);
      }
    };

    fetchData();
  }, [dtStart]);

  return { rows, isLd, err };
};
