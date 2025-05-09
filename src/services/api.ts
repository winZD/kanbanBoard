import type { Task, TaskStatus, Todo } from "../types";

const statusMappings: Record<number, TaskStatus> = {
  0: "todo",
  1: "inProgress",
  2: "done",
};

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=12"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.map((todo: Todo) => ({
      id: todo.id.toString(),
      title: todo.title,
      status: statusMappings[todo.id % 3],
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
