export type TaskStatus = "todo" | "inProgress" | "done";

export type Todo = {
  id: number;
  title: string;
};

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export type TasksState = {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
};

export type TasksAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "MOVE_TASK"; payload: { id: string; destination: TaskStatus } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };
