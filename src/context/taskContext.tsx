// src/context/TasksContext.tsx
import { useReducer, useEffect, type ReactNode } from "react";

import { fetchTasks } from "../services/api";

import type { Task, TaskStatus } from "../types";

import { initialState, tasksReducer } from "../reducers/taskReducer";
import { useLocalStorage } from "../hooks/useLocalStoarge";
import { TasksContext } from "./context";

// Provider component
export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const [savedTasks, setSavedTasks] = useLocalStorage<Task[]>(
    "kanbanTasks",
    []
  );

  // Load tasks from localStorage or API on first render
  useEffect(() => {
    const loadTasks = async () => {
      try {
        if (savedTasks.length > 0) {
          dispatch({ type: "SET_TASKS", payload: savedTasks });
        } else {
          dispatch({ type: "SET_LOADING", payload: true });
          const tasksData = await fetchTasks();
          dispatch({ type: "SET_TASKS", payload: tasksData });
          setSavedTasks(tasksData);
        }
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error ? error.message : "Failed to load tasks",
        });
      }
    };

    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (state.tasks.length > 0 && !state.isLoading) {
      setSavedTasks(state.tasks);
    }
  }, [state.tasks, state.isLoading]);

  // Move task between columns
  const moveTask = (id: string, destination: TaskStatus) => {
    dispatch({
      type: "MOVE_TASK",
      payload: { id, destination },
    });
  };

  return (
    <TasksContext.Provider value={{ state, moveTask }}>
      {children}
    </TasksContext.Provider>
  );
};
