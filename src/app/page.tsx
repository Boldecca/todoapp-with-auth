"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import type { Task } from "@/types/task";
import { createTask, deleteTask, subscribeUserTasks, updateTask } from "@/lib/tasks";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editing, setEditing] = useState<Task | null>(null);
  const email = user?.email ?? "";

  // Redirect unauthenticated users
  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  // Subscribe to user tasks
  useEffect(() => {
    if (!email) return;
    const unsub = subscribeUserTasks(email, setTasks);
    return () => unsub();
  }, [email]);

  const greeting = useMemo(() => (email ? `Hello, ${email}` : ""), [email]);

  async function handleCreate(values: Omit<Task, "id" | "userEmail">) {
    if (!email) return;
    if (editing) {
      await updateTask(editing.id, {
        title: values.title,
        description: values.description,
        priority: values.priority,
        completed: values.completed,
      });
      setEditing(null);
    } else {
      await createTask({ ...values, userEmail: email });
    }
  }

  async function handleToggle(t: Task) {
    await updateTask(t.id, { completed: !t.completed });
  }

  async function handleDelete(t: Task) {
    await deleteTask(t.id);
    if (editing?.id === t.id) setEditing(null);
  }

  if (!user && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 font-sans dark:from-black dark:to-zinc-950">
      <div className="border-b border-zinc-200 bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Dashboard</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{greeting}</p>
          </div>
          <button
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            onClick={async () => {
              await logout();
              router.replace("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-6 py-8 space-y-8">
        <section className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-3 text-base font-medium text-zinc-900 dark:text-zinc-100">
              {editing ? "Edit Task" : "Add Task"}
            </h2>
            <TaskForm
              initial={editing ?? undefined}
              onSubmit={handleCreate}
              onCancelEdit={() => setEditing(null)}
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-100">Your Tasks</h2>
            <span className="text-xs text-zinc-500">{tasks.length} total</span>
          </div>
          <TaskList tasks={tasks} onToggle={handleToggle} onEdit={setEditing} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}
