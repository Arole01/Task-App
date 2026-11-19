import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Info, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { priorityStyles } from "../data/tasks";

function AddTask({ currentUser, setTasks, onRequireLogin }) {
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "Work",
    priority: "Medium",
    dueDate: "",
  });

  // Prevent logged-out visitors from opening this page directly
  useEffect(() => {
    if (!currentUser) {
      onRequireLogin();
    }
  }, [currentUser, onRequireLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const today = new Date();

  const formattedToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      onRequireLogin();
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskData.title.trim(),
      description: taskData.description,
      date: taskData.dueDate,
      category: taskData.category,
      priority: taskData.priority,
      completed: false,
      status: "Pending",
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);

    toast.success("Task created successfully");
    navigate("/");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 py-8 transition-colors duration-300 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-indigo-700">
            <span className="h-3 w-3 rounded-full bg-indigo-700"></span>
            New Workflow Item
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create New Task
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Add a new task and stay organised.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-8 lg:p-10"
        >
          <div className="mb-7">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Task Title <span className="text-red-500">*</span>
              </label>

              <span className="text-xs text-gray-500">
                {taskData.title.length} / 80
              </span>
            </div>

            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              maxLength={80}
              required
              placeholder="e.g., Complete React Job Portal"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-indigo-900"
            />

            <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
              <Info size={15} />
              Keep it concise and descriptive.
            </p>
          </div>

          <div className="mb-8">
            <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
              Description
            </label>

            <textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe what needs to be accomplished, key acceptance criteria or notes..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-indigo-900"
            />

            <div className="mb-7 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Category <span className="text-red-500">*</span>
                </label>

                <select
                  name="category"
                  value={taskData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-indigo-900"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Study">Study</option>
                  <option value="Health">Health</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Priority Level <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(priorityStyles).map((level) => {
                    const style = priorityStyles[level];

                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() =>
                          setTaskData({
                            ...taskData,
                            priority: level,
                          })
                        }
                        style={{
                          color: style.color,
                          backgroundColor:
                            taskData.priority === level
                              ? style.background
                              : undefined,
                          borderColor:
                            taskData.priority === level
                              ? style.color
                              : "#d1d5db",
                        }}
                        className="flex items-center justify-center gap-2 rounded-lg border bg-white px-2 py-3 text-xs font-semibold transition dark:bg-gray-800 sm:text-sm"
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: style.indicator }}
                        ></span>
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-7 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                Due Date <span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                min={formattedToday}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-indigo-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                Status
              </label>

              <div className="flex items-center justify-between rounded-lg bg-indigo-50 px-4 py-4 dark:bg-indigo-950">
                <span className="flex items-center gap-2 text-sm font-medium text-indigo-700">
                  <span className="h-3 w-3 rounded-full bg-indigo-700"></span>
                  Pending
                </span>

                <span className="rounded-full bg-white px-3 py-1 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-300">
                  Initial Default
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800"
            >
              <CircleCheck size={19} />
              Create Task
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddTask;
