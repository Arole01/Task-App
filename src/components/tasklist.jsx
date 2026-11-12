import { useState } from "react";
import { taskList } from "../data/tasks";
import TaskItem from "../components/taskItem";

function TaskList() {
  const [tasks, setTasks] = useState(taskList);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div className="space-y-5 px-4 sm:px-6">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => toggleTask(task.id)}
        />
      ))}
    </div>
  );
}

export default TaskList;
