import type { TasksAction, TasksState } from "../types";

export const initialState: TasksState = {
  tasks: [],
  isLoading: true,
  error: null,
};

export const tasksReducer = (
  state: TasksState,
  action: TasksAction
): TasksState => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
      };
    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.destination }
            : task
        ),
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
