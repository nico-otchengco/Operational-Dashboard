import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/services/supabase";
import type { ReqRow } from "@/types/metrics";
import { getStartDate } from "@/utils/time";

type Trend = "up" | "down" | "flat";

export const useReqMetrics = (range: "7d" | "30d" | "90d") => {
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
        // --- Requests ---
        const { data: reqData, error: reqErr } = await supabase
          .from("vw_req_daily")
          .select("day, req_cnt")
          .gte("day", dtStart)
          .order("day", { ascending: true });

        if (reqErr) throw reqErr;

        // --- Errors ---
        const { data: errData, error: errErr } = await supabase
          .from("vw_err_daily")
          .select("day, err_pct")
          .gte("day", dtStart);

        if (errErr) throw errErr;

        const errMap = new Map<string, number>(
          errData?.map(r => [r.day, r.err_pct]) ?? []
        );

        if (!cancelled) {
          setRows(
            reqData?.map(r => ({
              day: r.day,
              reqCnt: r.req_cnt,
              errPct: errMap.get(r.day) ?? 0,
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

  // ---------- METRICS ----------
  const totalReq = useMemo(
    () => rows.reduce((sum, r) => sum + r.reqCnt, 0),
    [rows]
  );

  const avgReq = useMemo(
    () => (rows.length ? Math.round(totalReq / rows.length) : 0),
    [rows, totalReq]
  );

  const trend: Trend = useMemo(() => {
    if (rows.length < 2) return "flat";

    const last = rows[rows.length - 1].reqCnt;
    const prev = rows[rows.length - 2].reqCnt;

    if (last > prev) return "up";
    if (last < prev) return "down";
    return "flat";
  }, [rows]);

  return {
    rows,
    metrics: {
      totalReq,
      avgReq,
      trend,
    },
    isLd,
    err,
  };
};
