"use client";

import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import ActivityBar from "./components/ActivityBar";

export default function Dashboard() {
  const [tasks, setTasks] = useState<{ title: string; completed: boolean }[]>(
    []
  );
  const [taskTitle, setTaskTitle] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskTitle.trim()) return;
    setTasks([...tasks, { title: taskTitle, completed: false }]);
    setTaskTitle("");
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <main className="p-4 m-56">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ActivityBar tasks={tasks} />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Add a new task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border p-2 rounded-md w-full mb-2"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-green-500 text-white rounded-md w-full"
        >
          Add Task
        </button>
      </div>
      <TaskList tasks={tasks} onToggleCompletion={toggleTaskCompletion} />
    </main>
  );
}
