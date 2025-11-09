export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  userEmail: string;
}
