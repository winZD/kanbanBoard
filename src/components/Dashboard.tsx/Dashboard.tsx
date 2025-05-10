import { UploadCloud } from "lucide-react";
import Placeholder from "../../assets/PlaceholderLogo.svg";
import GridView from "../../assets/grid_view.svg";
import ListView from "../../assets/list_view.svg";
import RowView from "../../assets/row_view.svg";
import ColumnView from "../../assets/column_view.svg";
import Sort from "../../assets/sort.svg";
import Filter from "../../assets/filter.svg";

import { useEffect, useState } from "react";
import { fetchTasks } from "../../services/api";
import type { Task, TaskStatus } from "../../types";
import Column from "../Column/Column";
import { useTasks } from "../../hooks/useTasks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
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
    (e.currentTarget as HTMLElement).style.background = "red";
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
            <p className="bg-red-400">{draggedTaskId}</p>
            <img src={Placeholder} />
            <div className="flex flex-col">
              <span className="text-3xl">Project Planet X</span>
              <Tabs defaultValue="list">
                <TabsList className="gap-3 rounded-3xl">
                  <TabsTrigger value="grid" className="rounded-3xl ">
                    {" "}
                    <img src={GridView} alt="" /> Grid View
                  </TabsTrigger>
                  <TabsTrigger value="list" className="rounded-3xl">
                    <img src={ListView} alt="" />
                    List View
                  </TabsTrigger>
                  <TabsTrigger value="column" className="rounded-3xl">
                    {" "}
                    <img src={ColumnView} alt="" />
                    Column View
                  </TabsTrigger>
                  <TabsTrigger value="row" className="rounded-3xl">
                    {" "}
                    <img src={RowView} alt="" />
                    Row View
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="grid">
                  Make changes to your account here.
                </TabsContent>
                <TabsContent value="password">
                  Change your password here.
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-row gap-2">
              <button className="flex flex-row gap-1 ">
                <div>
                  <img src={GridView} alt="" />
                </div>{" "}
                Grid view
              </button>
              <button className="flex flex-row gap-1">
                <div>
                  <img src={Filter} alt="" />
                </div>
                Filter
              </button>
              <button className="flex flex-row gap-1">
                {" "}
                <div>
                  <img src={Sort} alt="" />
                </div>
                Sort
              </button>
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
