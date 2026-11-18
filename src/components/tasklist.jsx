// import { useState } from "react";
// import { taskList } from "../data/tasks";
import TaskItem from "../components/taskItem";
import { Link } from "react-router";

function TaskList({ tasks, setTasks }) {
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              status: task.completed ? "Pending" : "Completed",
            }
          : task,
      ),
    );
  };

  const recentTasks = [...tasks].sort((a, b) => b.id - a.id).slice(0, 6);

  return (
    <div className="space-y-3 px-4 sm:px-6">
      {recentTasks.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="font-medium text-gray-700">No tasks available yet.</p>
          <p className="mt-2 text-sm text-gray-500">
            Create your first task to get started.
          </p>

          <Link
            to="/addtask"
            className="mt-4 inline-block font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Add a task
          </Link>
        </div>
      ) : (
        recentTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
