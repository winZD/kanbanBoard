import { useEffect, useState } from "react";
import type { TaskStatus, Task as TaskType } from "../../types";
import { Progress } from "../ui/progress";
import Avatars from "../../assets/AvatarGroup.png";
import Msg from "../../assets/vector2.png";
import Check from "../../assets/vector3.svg";

interface TaskProps {
  task: TaskType;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  status: TaskStatus;
}

const Task = ({ task, onDragStart, status }: TaskProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let newProgress = 0;

    switch (status) {
      case "todo":
        newProgress = 5;
        break;
      case "done":
        newProgress = 100;
        break;
      default:
        newProgress = Math.floor(Math.random() * (90 - 6 + 1)) + 6;
    }

    setProgress(newProgress);
  }, [status]);

  const statusColor = (status: TaskStatus): string => {
    switch (status) {
      case "todo":
        return "[&>div]:bg-violet-500";
      case "done":
        return "[&>div]:bg-green-500";
      default:
        return "[&>div]:bg-orange-500";
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-white border border-gray-200 flex flex-col p-4 rounded-lg mb-3 shadow-sm hover:shadow-md hover:bg-red-200 transition-shadow cursor-move"
    >
      <h4 className="text-gray-800 font-medium">{task.title}</h4>
      <p>Progress</p>
      <Progress value={progress} className={`w-[60%] ${statusColor(status)}`} />
      <div className="flex flex-row justify-between">
        <img src={Avatars} width={130} />
        <div className="flex flex-row gap-5 justify-between">
          <div className="flex flex-row gap-2">
            {" "}
            <img src={Msg} alt="" />
            <span>{Math.floor(Math.random() * (200 - 50 + 1)) + 50}</span>
          </div>
          <div className="flex flex-row gap-2">
            <img src={Check} alt="" />
            <span>{Math.floor(Math.random() * (200 - 50 + 1)) + 50}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
