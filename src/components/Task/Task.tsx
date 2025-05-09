import { useEffect, useState } from "react";
import type { Task as TaskType } from "../../types";
import { Progress } from "../ui/progress";

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
      className="bg-white border border-gray-200 p-4 rounded-lg mb-3 shadow-sm hover:shadow-md hover:bg-red-200 transition-shadow cursor-move"
    >
      <h4 className="text-gray-800 font-medium">{task.title}</h4>
      <Progress value={progress} className="w-[60%]" />
    </div>
  );
};

export default Task;
