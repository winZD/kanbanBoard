import { useEffect, useState } from "react";
import type { Task as TaskType } from "../../types";
import { Progress } from "../ui/progress";
import Avatars from "../../assets/AvatarGroup.png";
import Msg from "../../assets/vector2.png";
import Check from "../../assets/vector3.svg";

interface TaskProps {
  task: TaskType;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

const Task = ({ task, onDragStart }: TaskProps) => {
  const [progress, setProgress] = useState(12);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(65), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-white border border-gray-200 flex flex-col p-4 rounded-lg mb-3 shadow-sm hover:shadow-md hover:bg-red-200 transition-shadow cursor-move"
    >
      <h4 className="text-gray-800 font-medium">{task.title}</h4>
      <p>Progress</p>
      <Progress value={progress} className="w-[60%]" />
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
