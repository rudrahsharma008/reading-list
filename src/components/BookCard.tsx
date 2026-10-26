import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { Book, ReadingStatus } from "@/types";
import { STATUS_META, STATUS_ORDER } from "@/types";

interface BookCardProps {
  book: Book;
  onSetStatus: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export function BookCard({ book, onSetStatus, onRemove }: BookCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const meta = STATUS_META[book.status];

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-base font-semibold leading-snug text-slate-900">
            {book.title}
          </h3>
          <span
            className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${meta.chip}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onRemove(book.id)}
          aria-label="Remove book"
          className="shrink-0 rounded-lg p-1.5 text-slate-400 opacity-0 transition hover:bg-slate-100 hover:text-slate-600 focus:opacity-100 group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_ORDER.map((s) => {
            const active = book.status === s;
            const m = STATUS_META[s];
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  onSetStatus(book.id, s);
                  setMenuOpen(false);
                }}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
                {m.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
