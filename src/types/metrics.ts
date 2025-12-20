export interface ReqRow {
  day: string;
  reqCnt: number;
  errPCt?: number;
}

export interface ErrRow {
  day: string;
  errPct: number;
}

export interface LatRow {
  day: string;
  avgLatMs: number;
}
