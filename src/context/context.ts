import { createContext } from "react";
import type { TasksState, TaskStatus } from "../types";

// Create context
type TasksContextType = {
  state: TasksState;
  moveTask: (id: string, destination: TaskStatus) => void;
};

export const TasksContext = createContext<TasksContextType | undefined>(
  undefined
);
