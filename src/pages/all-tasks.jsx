import { useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  CheckCircle2,
  Clock,
  AlertCircle,
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { priorityStyles } from "../data/tasks";

function AllTasks({ tasks, setTasks }) {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("earliest");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const tasksPerPage = 5;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isOverdue = (task) => {
    if (task.completed || !task.date) {
      return false;
    }
    const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(task.date);

    if (!dateMatch) {
      return false;
    }

    const dueDate = new Date(
      Number(dateMatch[1]),
      Number(dateMatch[2]) - 1,
      Number(dateMatch[3]),
    );
    return dueDate < today;
  };

  const formatDate = (date) => {
    if (!date) return "No due date";

    const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

    if (!dateMatch) {
      return date;
    }

    const formattedDate = new Date(
      Number(dateMatch[1]),
      Number(dateMatch[2]) - 1,
      Number(dateMatch[3]),
    );

    return formattedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const overdueTasks = tasks.filter(isOverdue).length;

  const tabs = [
    { name: "All", count: totalTasks },
    { name: "Pending", count: pendingTasks },
    { name: "Completed", count: completedTasks },
    { name: "Overdue", count: overdueTasks },
  ];

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (activeTab === "Pending") {
      result = result.filter((task) => !task.completed);
    }

    if (activeTab === "Completed") {
      result = result.filter((task) => task.completed);
    }

    if (activeTab === "Overdue") {
      result = result.filter((task) => isOverdue(task));
    }

    if (search.trim()) {
      const searchText = search.toLowerCase();

      result = result.filter(
        (task) =>
          (task.title || "").toLowerCase().includes(searchText) ||
          (task.description || "").toLowerCase().includes(searchText),
      );
    }

    if (priorityFilter !== "All") {
      result = result.filter((task) => task.priority === priorityFilter);
    }

    if (categoryFilter !== "All") {
      result = result.filter((task) => task.category === categoryFilter);
    }

    result.sort((a, b) => {
      const dateA = /^\d{4}-\d{2}-\d{2}$/.test(a.date || "")
        ? a.date
        : "9999-12-31";

      const dateB = /^\d{4}-\d{2}-\d{2}$/.test(b.date || "")
        ? b.date
        : "9999-12-31";

      if (sortOrder === "earliest") {
        return dateA.localeCompare(dateB);
      }

      return dateB.localeCompare(dateA);
    });

    return result;
  }, [tasks, activeTab, search, priorityFilter, categoryFilter, sortOrder]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const startIndex = (currentPage - 1) * tasksPerPage;

  const displayedTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage,
  );

  const toggleTask = (id) => {
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

  const deleteTask = (id) => {
    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id));

    setSelectedTask(null);
    setEditingTask(null);

    toast.success("Task deleted successfully");
  };

  const saveEditedTask = (e) => {
    e.preventDefault();

    if (!editingTask.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: editingTask.title.trim(),
              description: editingTask.description,
              date: editingTask.date,
              category: editingTask.category,
              priority: editingTask.priority,
            }
          : task,
      ),
    );
    setEditingTask(null);
    toast.success("Task updated successfully");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePriorityFilter = (value) => {
    setPriorityFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (value) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  return (
    <section className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            All Tasks
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage, track and organise all your tasks in one place.
          </p>
        </div>

        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Total Tasks</p>
              <CalendarDays className="text-indigo-600" size={22} />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {totalTasks}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <CheckCircle2 className="text-emerald-600" size={22} />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {completedTasks}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <Clock className="text-amber-600" size={22} />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {pendingTasks}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <AlertCircle className="text-red-600" size={22} />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {overdueTasks}
            </h2>
          </div>
        </div>

        {/* Task tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              type="button"
              onClick={() => handleTabChange(tab.name)}
              className={`border-b-2 px-4 py-3 text-sm font-semibold transition ${
                activeTab === tab.name
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.name}
              <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search and filters */}
        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative xl:col-span-1">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={priorityFilter}
            onChange={(e) => handlePriorityFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-500"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-500"
          >
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-500"
          >
            <option value="earliest">Earliest Due Date</option>
            <option value="latest">Latest Due Date</option>
          </select>
        </div>

        {/* Tasks list */}
        <div className="space-y-4">
          {displayedTasks.length > 0 ? (
            displayedTasks.map((task) => {
              const priority =
                priorityStyles[task.priority] || priorityStyles.Medium;

              const overdue = isOverdue(task);

              return (
                <div
                  key={task.id}
                  className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    {/* Task information */}
                    <div className="flex min-w-0 flex-1 gap-4">
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        title="Toggle task completion"
                        className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
                          task.completed
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-gray-300 hover:border-indigo-600"
                        }`}
                      >
                        {task.completed && <CheckCircle2 size={17} />}
                      </button>

                      <div className="min-w-0 flex-1">
                        <h3
                          className={`break-words text-base font-semibold sm:text-lg ${
                            task.completed
                              ? "text-gray-400 line-through"
                              : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </h3>

                        <p className="mt-1 break-words text-sm text-gray-500">
                          {task.description || "No description provided"}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <span
                            className="rounded-full px-3 py-1 text-xs font-semibold"
                            style={{
                              color: priority.color,
                              backgroundColor: priority.background,
                            }}
                          >
                            {task.priority}
                          </span>

                          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                            {task.category || "Uncategorised"}
                          </span>

                          <span
                            className={`flex items-center gap-1.5 text-xs ${
                              overdue
                                ? "font-semibold text-red-600"
                                : "text-gray-500"
                            }`}
                          >
                            <CalendarDays size={15} />
                            {formatDate(task.date)}
                            {overdue && " (Overdue)"}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              task.completed
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {task.completed ? "Completed" : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex shrink-0 items-center gap-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => setSelectedTask(task)}
                        title="View task"
                        className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingTask({ ...task })}
                        title="Edit task"
                        className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteTask(task.id)}
                        title="Delete task"
                        className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-gray-100 bg-white px-5 py-16 text-center shadow-sm">
              <CheckCircle2 size={40} className="mx-auto text-gray-300" />

              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                No tasks found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + tasksPerPage, filteredTasks.length)} of{" "}
              {filteredTasks.length} tasks
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
                className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
                className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* VIEW TASK MODAL */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Task Details</h2>

              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              {selectedTask.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {selectedTask.description || "No description provided"}
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <p>
                <span className="font-semibold text-gray-800">Category: </span>
                {selectedTask.category}
              </p>

              <p>
                <span className="font-semibold text-gray-800">Priority: </span>
                {selectedTask.priority}
              </p>

              <p>
                <span className="font-semibold text-gray-800">Due date: </span>
                {formatDate(selectedTask.date)}
              </p>

              <p>
                <span className="font-semibold text-gray-800">Status: </span>
                {selectedTask.completed ? "Completed" : "Pending"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTask(null)}
              className="mt-7 w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* EDIT TASK MODAL */}
      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <form
            onSubmit={saveEditedTask}
            className="my-8 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Edit Task</h2>

              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Task Title
                </label>

                <input
                  type="text"
                  value={editingTask.title || ""}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  rows="3"
                  value={editingTask.description || ""}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Due Date
                </label>

                <input
                  type="date"
                  value={
                    /^\d{4}-\d{2}-\d{2}$/.test(editingTask.date || "")
                      ? editingTask.date
                      : ""
                  }
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      date: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>

                <select
                  value={editingTask.category || "Work"}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      category: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Priority
                </label>

                <select
                  value={editingTask.priority || "Medium"}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      priority: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default AllTasks;
