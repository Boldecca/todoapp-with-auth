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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          className="border rounded px-3 py-2"
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
        className="w-full border rounded px-3 py-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <div className="flex items-center gap-2">
        <button type="submit" className="bg-black text-white rounded px-4 py-2">
          {initial?.id ? "Update Task" : "Add Task"}
        </button>
        {initial?.id && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="border rounded px-3 py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
