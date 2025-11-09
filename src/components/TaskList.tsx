"use client";
import type { Task } from "@/types/task";

type Props = {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export default function TaskList({ tasks, onToggle, onEdit, onDelete }: Props) {
  if (!tasks.length)
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        No tasks yet. Add your first task above.
      </div>
    );

  return (
    <ul className="space-y-3">
      {tasks.map((t) => {
        const badgeClass =
          t.priority === "High"
            ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800"
            : t.priority === "Medium"
            ? "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800"
            : "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800";
        return (
          <li
            key={t.id}
            className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => onToggle(t)}
                className="mt-1 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className={`text-sm font-medium ${t.completed ? "line-through text-zinc-500" : "text-zinc-900 dark:text-zinc-100"}`}>{t.title}</h3>
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${badgeClass}`}>
                    {t.priority}
                  </span>
                </div>
                {t.description && (
                  <p className={`mt-1 text-sm ${t.completed ? "line-through text-zinc-400" : "text-zinc-600 dark:text-zinc-400"}`}>
                    {t.description}
                  </p>
                )}
                <div className="mt-3 flex gap-2 text-sm">
                  <button
                    className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-3 py-1.5 font-medium shadow-sm transition hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                    onClick={() => onEdit(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-3 py-1.5 font-medium text-white shadow-sm transition hover:bg-zinc-800 active:bg-zinc-900 dark:bg-zinc-200 dark:text-black dark:hover:bg-white"
                    onClick={() => onDelete(t)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
