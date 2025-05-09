// src/components/Board/Column.tsx
import { Plus } from "lucide-react";
import { type Task as TaskType, type TaskStatus } from "../../types";
import Task from "../Task/Task";

interface ColumnProps {
  title: string;
  status: TaskStatus;
  tasks: TaskType[];
  color: string;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: TaskStatus) => void;
}

const Column = ({
  title,
  status,
  tasks,
  color,
  onDragStart,
  onDragOver,
  onDrop,
}: ColumnProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${color} mr-3`}></div>
            <h3 className="font-semibold text-gray-700">{title}</h3>
            <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
              {tasks.length}
            </span>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Plus />
          </button>
        </div>
      </div>
      <div
        className="p-4 min-h-[200px]"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, status)}
      >
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            status={status}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
