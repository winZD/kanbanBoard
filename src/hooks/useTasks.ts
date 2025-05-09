import { useContext } from "react";
import { TasksContext } from "../context/context";

// Custom hook to use the tasks context
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
