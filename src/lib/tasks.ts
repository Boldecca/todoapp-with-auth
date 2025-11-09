import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import type { Task } from "@/types/task";

const TASKS_COL = "tasks";

export function tasksCollectionRef() {
  return collection(db, TASKS_COL);
}

export async function createTask(task: Omit<Task, "id">): Promise<string> {
  const ref = await addDoc(tasksCollectionRef(), task);
  return ref.id;
}

export async function updateTask(id: string, data: Partial<Omit<Task, "id" | "userEmail">>) {
  const ref = doc(db, TASKS_COL, id);
  await updateDoc(ref, data as any);
}

export async function deleteTask(id: string) {
  const ref = doc(db, TASKS_COL, id);
  await deleteDoc(ref);
}

export async function getUserTasks(userEmail: string): Promise<Task[]> {
  const q = query(tasksCollectionRef(), where("userEmail", "==", userEmail));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Task, "id">) }));
}

export function subscribeUserTasks(userEmail: string, cb: (tasks: Task[]) => void) {
  const q = query(tasksCollectionRef(), where("userEmail", "==", userEmail));
  return onSnapshot(q, (snap) => {
    const tasks: Task[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Task, "id">) }));
    cb(tasks);
  });
}
