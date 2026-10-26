import { useMemo, useState } from "react";
import { BookMarked, Library } from "lucide-react";
import { useBooks } from "@/hooks/useBooks";
import { AddBookForm } from "@/components/AddBookForm";
import { FilterBar } from "@/components/FilterBar";
import { BookCard } from "@/components/BookCard";
import type { ReadingStatus } from "@/types";
import { STATUS_ORDER } from "@/types";

type Filter = ReadingStatus | "all";

function App() {
  const { books, addBook, setStatus, removeBook } = useBooks();
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c: Record<ReadingStatus, number> = {
      "want-to-read": 0,
      reading: 0,
      finished: 0,
    };
    for (const b of books) c[b.status] += 1;
    return c;
  }, [books]);

  const visible = useMemo(() => {
    if (filter === "all") return books;
    return books.filter((b) => b.status === filter);
  }, [books, filter]);

  const hasBooks = books.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <BookMarked className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Reading List
              </h1>
              <p className="text-sm text-slate-500">
                Track the books you read, one page at a time.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
        <AddBookForm onAdd={addBook} />

        {hasBooks && (
          <div className="mt-6">
            <FilterBar
              current={filter}
              counts={counts}
              total={books.length}
              onChange={setFilter}
            />
          </div>
        )}

        <section className="mt-6">
          {!hasBooks ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Library className="h-6 w-6" />
              </div>
              <p className="text-base font-medium text-slate-700">
                Your reading list is empty. Add your first book.
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Use the form above to get started.
              </p>
            </div>
          ) : visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <p className="text-sm font-medium text-slate-600">
                No books in this category yet.
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Try a different filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {visible.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onSetStatus={setStatus}
                  onRemove={removeBook}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="mx-auto max-w-3xl px-4 pb-8 pt-2">
        <p className="text-center text-xs text-slate-400">
          Your reading list is saved on this device.
        </p>
      </footer>
    </div>
  );
}

export default App;
