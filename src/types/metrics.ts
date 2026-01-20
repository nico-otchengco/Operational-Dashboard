export interface ReqRow {
  day: string;
  reqCnt: number;
  errPct?: number;
}

export interface ErrRow {
  day: string;
  errPct: number;
}

export interface LatRow {
  day: string;
  avgLatMs: number;
}
