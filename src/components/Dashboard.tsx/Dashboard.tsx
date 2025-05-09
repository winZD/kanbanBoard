import { Divide, Grid, Plus, UploadCloud } from "lucide-react";
import Placeholder from "../../assets/PlaceholderLogo.svg";
import { Card } from "../ui/card";
import { useEffect, useState } from "react";
import { fetchTasks } from "../../services/api";
import type { Task } from "../../types";
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
  console.log(tasks);
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex">
        <div className="flex justify-between border-2 w-full">
          <img src={Placeholder} />
          <div>
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
      <div className="grid grid-cols-3 p-2 gap-2">
        <Card className=" bg-gray-200 flex flex-col">
          <div className="flex  flex-row justify-between">
            <h3>TODO</h3>
            <button>
              <Plus />
            </button>
          </div>
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <div
                key={task.id}
                className="p-2 bg-white rounded shadow flex flex-col"
              >
                <h4>{task.title}</h4>
                <p>{task.status}</p>
              </div>
            ))}
        </Card>
        <Card className=" bg-gray-200 flex flex-col">
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
                className="p-2 bg-white rounded shadow flex flex-col"
              >
                <h4>{task.title}</h4>
                <p>{task.status}</p>
              </div>
            ))}
        </Card>
        <Card className=" bg-gray-200 flex flex-col">
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
                className="p-2 bg-white rounded shadow flex flex-col"
              >
                <h4>{task.title}</h4>
                <p>{task.status}</p>
              </div>
            ))}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
