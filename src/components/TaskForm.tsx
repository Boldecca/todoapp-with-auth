"use client";
import { useEffect, useState } from "react";
import type { Task, Priority } from "@/types/task";

type Props = {
  initial?: Partial<Task>;
  onSubmit: (values: Omit<Task, "id" | "userEmail">) => Promise<void> | void;
  onCancelEdit?: () => void;
};

const priorities: Priority[] = ["Low", "Medium", "High"];

export default function TaskForm({ initial, onSubmit, onCancelEdit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("Low");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title ?? "");
      setDescription(initial.description ?? "");
      setPriority((initial.priority as Priority) ?? "Low");
    }
  }, [initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ title, description, completed: initial?.completed ?? false, priority });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-zinc-200"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-zinc-200"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <textarea
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-zinc-200"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 active:bg-zinc-900 dark:bg-zinc-200 dark:text-black dark:hover:bg-white"
        >
          {initial?.id ? "Update Task" : "Add Task"}
        </button>
        {initial?.id && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
