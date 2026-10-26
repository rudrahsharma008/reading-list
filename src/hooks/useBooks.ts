import { useEffect, useState } from "react";
import type { Book, ReadingStatus } from "@/types";

const STORAGE_KEY = "reading-list:books";

function loadBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Book[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function persistBooks(books: Book[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export const TITLE_MAX_LENGTH = 60;

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(loadBooks());
  }, []);

  const update = (next: Book[]) => {
    setBooks(next);
    persistBooks(next);
  };

  const addBook = (
    title: string,
    status: ReadingStatus,
  ): { ok: true } | { ok: false; error: string } => {
    const trimmed = title.trim();
    if (!trimmed) return { ok: false, error: "" };
    if (trimmed.length > TITLE_MAX_LENGTH) {
      return {
        ok: false,
        error: "Book title must be 60 characters or fewer.",
      };
    }
    const normalized = trimmed.toLowerCase().replace(/\s+/g, " ");
    const exists = books.some(
      (b) => b.title.toLowerCase().replace(/\s+/g, " ") === normalized,
    );
    if (exists) {
      return {
        ok: false,
        error: "This book is already in your reading list.",
      };
    }
    const book: Book = {
      id: crypto.randomUUID(),
      title: trimmed,
      status,
      createdAt: Date.now(),
    };
    update([book, ...books]);
    return { ok: true };
  };

  const setStatus = (id: string, status: ReadingStatus) => {
    update(books.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const removeBook = (id: string) => {
    update(books.filter((b) => b.id !== id));
  };

  return { books, addBook, setStatus, removeBook };
}
