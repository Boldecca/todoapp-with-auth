"use client";
import type { Task } from "@/types/task";

type Props = {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export default function TaskList({ tasks, onToggle, onEdit, onDelete }: Props) {
  if (!tasks.length) return <p className="text-sm text-zinc-600">No tasks yet.</p>;

  return (
    <ul className="divide-y border rounded">
      {tasks.map((t) => (
        <li key={t.id} className="p-3 flex items-start gap-3">
          <input
            type="checkbox"
            checked={t.completed}
            onChange={() => onToggle(t)}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className={`font-medium ${t.completed ? "line-through text-zinc-500" : ""}`}>{t.title}</h3>
              <span className="text-xs rounded-full border px-2 py-0.5">{t.priority}</span>
            </div>
            {t.description && (
              <p className={`text-sm text-zinc-600 ${t.completed ? "line-through" : ""}`}>{t.description}</p>
            )}
            <div className="mt-2 flex gap-2 text-sm">
              <button className="border rounded px-2 py-1" onClick={() => onEdit(t)}>Edit</button>
              <button className="border rounded px-2 py-1" onClick={() => onDelete(t)}>Delete</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
