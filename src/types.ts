export type ReadingStatus = "want-to-read" | "reading" | "finished";

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  createdAt: number;
}

export const STATUS_META: Record<
  ReadingStatus,
  { label: string; dot: string; chip: string }
> = {
  "want-to-read": {
    label: "Want to Read",
    dot: "bg-amber-500",
    chip: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  reading: {
    label: "Reading",
    dot: "bg-sky-500",
    chip: "bg-sky-50 text-sky-700 ring-sky-200",
  },
  finished: {
    label: "Finished",
    dot: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
};

export const STATUS_ORDER: ReadingStatus[] = [
  "want-to-read",
  "reading",
  "finished",
];
