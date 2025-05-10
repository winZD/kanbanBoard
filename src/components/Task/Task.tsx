import { useEffect, useMemo, useState } from "react";
import type { TaskStatus, Task as TaskType } from "../../types";
import { Progress } from "../ui/progress";
import Avatars from "../../assets/AvatarGroup.png";
import Msg from "../../assets/msg.svg";
import Check from "../../assets/vector3.svg";
import { getRandomButton } from "../../utils/utils";

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
        return "[&>div]:bg-[#4F46E5]";
      case "done":
        return "[&>div]:bg-green-500";
      default:
        return "[&>div]:bg-orange-500";
    }
  };
  const randomButton = useMemo(() => getRandomButton(), []);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-white max-w-[384px] gap-[16px] rounded-[24px]  border-[1px] p-[12px]
 border-gray-200 flex flex-col mb-3 shadow-sm hover:shadow-md hover:bg-red-200 transition-shadow cursor-move"
    >
      <div className="flex items-start justify-baseline">
        {randomButton && (
          <button
            className={`${randomButton.className} font-semibold text-[12px] leading-[16px] tracking-[-0.005em] text-center h-[24px] gap-[4px] px-[8px] py-[4px]
`}
          >
            {randomButton.label}
          </button>
        )}
      </div>
      <h4 className="text-[#1E293B] first-letter:uppercase font-bold text-[16px] leading-[22px] tracking-[-0.007em]">
        {task.title}
      </h4>
      <div>
        <span>Progress</span>
        <div className="flex justify-between items-center">
          <Progress
            value={progress}
            className={`w-[60%] ${statusColor(status)}`}
          />
          <span className=" font-bold text-[14px] leading-[20px] tracking-[-0.006em]">{`${progress}%`}</span>
        </div>
      </div>
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
