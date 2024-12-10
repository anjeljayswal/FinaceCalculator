type ActivityBarProps = {
    tasks: { title: string; completed: boolean }[];
  };
  
  export default function ActivityBar({ tasks }: ActivityBarProps) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
  
    return (
      <div className="flex items-center mb-4">
        <div className="flex-1 h-4 bg-gray-300 rounded-md overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{
              width: `${(completedTasks / totalTasks) * 100 || 0}%`,
            }}
          ></div>
        </div>
        <span className="ml-2 text-sm">
          {completedTasks}/{totalTasks} completed
        </span>
      </div>
    );
  }
  