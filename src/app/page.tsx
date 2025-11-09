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
    <div className="min-h-screen font-sans bg-zinc-50 dark:bg-black">
      <main className="mx-auto max-w-3xl p-6 space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{greeting}</h1>
          <button className="border rounded px-3 py-2" onClick={async () => { await logout(); router.replace("/login"); }}>
            Logout
          </button>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-medium">{editing ? "Edit Task" : "Add Task"}</h2>
          <TaskForm
            initial={editing ?? undefined}
            onSubmit={handleCreate}
            onCancelEdit={() => setEditing(null)}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium">Your Tasks</h2>
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}
