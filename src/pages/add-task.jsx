import { useState } from "react";
import { useNavigate } from "react-router";
import { Info, UserRoundPlus, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { priorityStyles } from "../data/tasks";
import { date } from "yup";

function AddTask({ currentUser }) {
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "Work",
    priority: "Medium",
    dueDate: "",
  });

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

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
      id: Date.now(),
      title: taskData.title.trim(),
      description: taskData.description,
      date: taskData.dueDate,
      category: taskData.category,
      priority: taskData.priority,
      completed: false,
      status: "Pending",
      assignedTo: currentUser
        ? `${currentUser.firstname} ${currentUser.lastname} ${currentUser.occupation}`
        : "",
    };

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    toast.success("Tasks created successully");
    navigate("/");
  };
  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-indigo-700">
            <span className="h-3 w-3 rounded-full bg-indigo-700"></span>
            New Workflow Item
          </p>

          <h1 className="text-3xl font-bold tracing-tight text-gray-900">
            Create New Task
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Add a new task and stay organised.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10"
        >
            <div className="mb-7">
                <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-800">
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"/>

                    <p className="mt-2 flex items-center gap-2 text-xs text-gray-500"
            </div>
        </form>
      </div>
    </main>
  );
}
