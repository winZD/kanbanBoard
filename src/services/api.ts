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

export const addTask = async (title: string): Promise<Task> => {
  try {
    // Prepare the data for the request
    const newTodo = {
      title,
      completed: false,
      userId: 1,
    };

    // Make the POST request
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response
    const data = await response.json();

    // Convert to Task format
    return {
      id: data.id.toString(),
      title: data.title,
      status: "todo",
    };
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};
