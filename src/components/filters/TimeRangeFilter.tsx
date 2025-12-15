import type { TimeRange } from "@/types/time";

const opts: TimeRange[] = ["24h", "30d", "90d"];

export const TimeRangeFilter = ({
  val,
  onChg,
}: {
  val: TimeRange;
  onChg: (v: TimeRange) => void;
}) => (
  <div className="flex gap-2">
    {opts.map(o => (
      <button
        key={o}
        onClick={() => onChg(o)}
        className={`px-3 py-1 rounded text-sm ${
          val === o ? "bg-white text-black" : "bg-neutral-800"
        }`}
      >
        {o.toUpperCase()}
      </button>
    ))}
  </div>
);
