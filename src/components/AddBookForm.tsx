import { useState } from "react";
import { Plus } from "lucide-react";
import type { ReadingStatus } from "@/types";
import { STATUS_META, STATUS_ORDER } from "@/types";
import { TITLE_MAX_LENGTH } from "@/hooks/useBooks";

interface AddBookFormProps {
  onAdd: (
    title: string,
    status: ReadingStatus,
  ) => { ok: true } | { ok: false; error: string };
}

export function AddBookForm({ onAdd }: AddBookFormProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<ReadingStatus>("want-to-read");
  const [error, setError] = useState("");

  const clearError = () => {
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    const result = onAdd(trimmed, status);
    if (!result.ok) {
      if (result.error) setError(result.error);
      return;
    }
    setTitle("");
    setStatus("want-to-read");
    setError("");
  };

  const overLimit = title.length > TITLE_MAX_LENGTH;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="book-title"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Book title
          </label>
          <input
            id="book-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              clearError();
            }}
            placeholder="The Great Gatsby"
            maxLength={TITLE_MAX_LENGTH}
            className={`w-full rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${
              overLimit
                ? "border-red-400 focus:border-red-400 focus:ring-red-500/10"
                : "border-slate-200 focus:border-slate-300 focus:ring-slate-900/10"
            }`}
          />
          <div className="mt-1.5 flex items-center justify-between text-xs">
            <span
              className={
                overLimit ? "font-medium text-red-600" : "text-slate-400"
              }
            >
              {overLimit
                ? "Book title must be 60 characters or fewer."
                : `${title.length}/${TITLE_MAX_LENGTH} characters`}
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="book-status"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Status
          </label>
          <select
            id="book-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ReadingStatus)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 sm:w-auto"
          >
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!title.trim()}
        >
          <Plus className="h-4 w-4" />
          Add book
        </button>
      </div>
      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 ring-1 ring-inset ring-red-200"
        >
          {error}
        </p>
      )}
    </form>
  );
}
