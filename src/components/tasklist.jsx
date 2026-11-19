import TaskItem from "../components/taskItem";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

function TaskList({ tasks, setTasks, currentUser }) {
  const navigate = useNavigate();

  const requireLogin = () => {
    toast.error("Please log in to manage your tasks.");
    navigate("/login");
  };

  const toggleTask = (id) => {
    if (!currentUser) {
      requireLogin();
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
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
        <div className="rounded-xl bg-white p-8 text-center shadow-sm dark:bg-gray-900">
          <p className="font-medium text-gray-700 dark:text-gray-200">
            No tasks available yet.
          </p>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Create your first task to get started.
          </p>

          {currentUser ? (
            <Link
              to="/addtask"
              className="mt-4 inline-block font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Add a task
            </Link>
          ) : (
            <button
              type="button"
              onClick={requireLogin}
              className="mt-4 font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Log in to add a task
            </button>
          )}
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
