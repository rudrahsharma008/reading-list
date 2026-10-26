import type { ReadingStatus } from "@/types";
import { STATUS_ORDER, STATUS_META } from "@/types";

interface FilterBarProps {
  current: ReadingStatus | "all";
  counts: Record<ReadingStatus, number>;
  total: number;
  onChange: (filter: ReadingStatus | "all") => void;
}

export function FilterBar({ current, counts, total, onChange }: FilterBarProps) {
  const tabs: { value: ReadingStatus | "all"; label: string; count: number }[] = [
    { value: "all", label: "All", count: total },
    ...STATUS_ORDER.map((s) => ({
      value: s,
      label: STATUS_META[s].label,
      count: counts[s],
    })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const active = current === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              active
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 text-xs font-semibold ${
                active
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
