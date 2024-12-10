type TaskListProps = {
    tasks: { title: string; completed: boolean }[];
    onToggleCompletion: (index: number) => void;
  };
  
  export default function TaskList({ tasks, onToggleCompletion }: TaskListProps) {
    return (
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-2 border rounded-md ${
              task.completed ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <span
              onClick={() => onToggleCompletion(index)}
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </span>
          </div>
        ))}
      </div>
    );
  }
  