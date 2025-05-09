import { Grid, Plus, UploadCloud } from "lucide-react";
import Placeholder from "../../assets/PlaceholderLogo.svg";
import { Card } from "../ui/card";
import { useEffect, useState } from "react";
import { fetchTasks } from "../../services/api";
import type { Task, TaskStatus } from "../../types";
import Column from "../Column/Column";
import { useTasks } from "../../hooks/useTasks";
const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    getTasks();
  }, []);
  const { state, moveTask } = useTasks();
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  // Filter tasks by status
  const todoTasks = state.tasks.filter((task: Task) => task.status === "todo");
  const inProgressTasks = state.tasks.filter(
    (task: Task) => task.status === "inProgress"
  );
  const doneTasks = state.tasks.filter((task: Task) => task.status === "done");

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    if (taskId) {
      moveTask(taskId, status);
    }

    setDraggedTaskId(null);
  };

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  }

  if (state.error) {
    return (
      <div className="text-red-500 text-center h-64 flex items-center justify-center">
        Error: {state.error}
      </div>
    );
  }

  console.log(tasks);
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex">
        <div className="flex justify-between border-2 w-full">
          <div className="flex flex-row">
            <img src={Placeholder} />
            <div className="flex flex-col">
              <h1>Project Planet X</h1>
              <Card className="p-2 flex flex-row justify-center">
                <button className="flex flex-row">
                  <Grid />
                  Grid View
                </button>
                <button className="flex flex-row">
                  <Grid />
                  List View
                </button>
                <button className="flex flex-row">
                  <Grid />
                  Column View
                </button>
                <button className="flex flex-row">
                  <Grid />
                  Row View
                </button>
              </Card>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-row">
              <button>Grid view</button>
              <button>Grid view</button>
              <button>Grid view</button>
            </div>
            <button className="bg-violet-700 p-2 justify-center text-white rounded-3xl flex flex-row">
              Export data <UploadCloud />
            </button>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 p-2 gap-2">
        {/*    <Card className=" bg-gray-200 flex flex-col p-2">
          <div className="flex  flex-row justify-between">
            <h3>TODO</h3>
            <button>
              <Plus />
            </button>
          </div>
          <Column
            title="To Do"
            status="todo"
            tasks={tasks}
            color="bg-blue-500"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        </Card> */}
        <Column
          title="To Do"
          status="todo"
          tasks={todoTasks}
          color="bg-blue-500"
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />

        <Column
          title="In Progress"
          status="inProgress"
          tasks={inProgressTasks}
          color="bg-yellow-500"
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />

        <Column
          title="Done"
          status="done"
          tasks={doneTasks}
          color="bg-green-500"
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        {/*   <Card className=" bg-gray-200 flex flex-col p-2">
          <div className="flex  flex-row justify-between">
            <h3>In progress</h3>
            <button>
              <Plus />
            </button>
          </div>{" "}
          {tasks
            .filter((task) => task.status === "inProgress")
            .map((task) => (
              <div
                key={task.id}
                className="p-2 bg-white rounded-2xl shadow flex flex-col"
              >
                <h4>{task.title}</h4>
                <p>{task.status}</p>
              </div>
            ))}
        </Card>
        <Card className=" bg-gray-200 flex flex-col p-2">
          <div className="flex  flex-row justify-between">
            <h3>Done</h3>
            <button>
              <Plus />
            </button>
          </div>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <div
                key={task.id}
                className="p-2 bg-white rounded-2xl shadow flex flex-col"
              >
                <h4>{task.title}</h4>
                <p>{task.status}</p>
              </div>
            ))}
        </Card> */}
      </div>
    </div>
  );
};

export default Dashboard;
