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
  //const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  // Filter tasks by status
  const todoTasks = state.tasks.filter((task: Task) => task.status === "todo");
  const inProgressTasks = state.tasks.filter(
    (task: Task) => task.status === "inProgress"
  );
  const doneTasks = state.tasks.filter((task: Task) => task.status === "done");

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    //setDraggedTaskId(taskId);
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

    //setDraggedTaskId(null);
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
    <Tabs defaultValue="list" className="flex flex-col w-full h-full">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-full md:flex-row p-6">
          <div className="self-start md:self-center">
            <img src={Placeholder} className="max-w-[96px]" />
          </div>
          <div className="flex p-[4px] flex-col gap-3 w-full justify-between">
            <div className="flex flex-col md:flex-row justify-between gap-2 w-full">
              <span
                className="font-sans font-semibold text-[30px] leading-[38px] tracking-[-0.013em]
"
              >
                Project PlanetX
              </span>{" "}
              <div className="flex flex-col justify-center">
                <div className="flex flex-row gap-2 items-center">
                  <button className="flex flex-row gap-1 ">
                    <div className="self-center">
                      <img src={GridView} alt="" />
                    </div>{" "}
                    Grid view
                  </button>
                  <button className="flex flex-row gap-1">
                    <div className="self-center">
                      <img src={Filter} alt="" />
                    </div>
                    Filter
                  </button>
                  <button className="flex flex-row gap-1">
                    {" "}
                    <div className="self-center">
                      <img src={Sort} alt="" />
                    </div>
                    Sort
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <TabsList className="w-[531px] h-[48px] bg-white md:bg-gray-100 rounded-full p-0 md:p-[4px]">
                <TabsTrigger
                  value="grid"
                  className="flex items-center gap-1 bg-transparent border-0 rounded-none h-full !outline-none !shadow-none !ring-0 
    border-b-2 border-transparent data-[state=active]:bg-transparent  data-[state=active]:border-primary cursor-pointer
    md:rounded-3xl lg:cursor-pointer p-0 md:border-2"
                >
                  {" "}
                  <img src={GridView} alt="" /> Grid View
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="flex items-center gap-1 bg-transparent border-0 rounded-none  h-full !outline-none !shadow-none !ring-0 
    border-b-2 border-transparent data-[state=active]:bg-transparent  data-[state=active]:border-primary cursor-pointer
    md:rounded-3xl lg:cursor-pointer md:border-2"
                >
                  <img src={ListView} alt="" />
                  List View
                </TabsTrigger>
                <TabsTrigger
                  value="column"
                  className="flex items-center gap-1 bg-transparent border-0 rounded-none  h-full !outline-none !shadow-none !ring-0 
    border-b-2 border-transparent data-[state=active]:bg-transparent  data-[state=active]:border-primary cursor-pointer
    md:rounded-3xl lg:cursor-pointer md:border-2"
                >
                  {" "}
                  <img src={ColumnView} alt="" />
                  Column View
                </TabsTrigger>
                <TabsTrigger
                  value="row"
                  className="flex items-center gap-1 bg-transparent border-0 rounded-none  h-full !outline-none !shadow-none !ring-0 
    border-b-2 border-transparent data-[state=active]:bg-transparent  data-[state=active]:border-primary cursor-pointer
    md:rounded-3xl lg:cursor-pointer md:border-2"
                >
                  {" "}
                  <img src={RowView} alt="" />
                  Row View
                </TabsTrigger>
              </TabsList>
              <button
                className="bg-[#4F46E5] cursor-pointer w-[161px] h-[48px] min-h-[48px] gap-[10px] px-[20px] py-[12px] 
 justify-center text-white rounded-full hidden md:flex font-semibold text-[16px] leading-[22px] tracking-[-0.007em]
"
              >
                Export data <UploadCloud />
              </button>
            </div>
          </div>
        </div>
      </div>
      <TabsContent
        value="list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 gap-2"
      >
        <Column
          title="To Do"
          status="todo"
          tasks={todoTasks}
          color="bg-[#4F46E5]"
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
      </TabsContent>
    </Tabs>
  );
};

export default Dashboard;
