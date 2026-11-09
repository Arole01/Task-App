import { useState } from "react";

// 1. Priority Badge Component
function PriorityBadge({ priority }) {
  const colors = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-gray-200 text-gray-600",
    LOW: "bg-emerald-200 text-emerald-700",
  };

  return (
    <span
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${colors[priority]}`}
    >
      {priority}
    </span>
  );
}

// 2. Task Card Component
function TaskCard({ task, onToggle }) {
  return (
    <div className="flex min-h-[145px] items-center justify-between gap-4 rounded-3xl bg-white px-5 py-6 shadow-sm sm:px-8">
      <div className="flex min-w-0 items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
            task.completed
              ? "border-purple-600 bg-purple-600 text-white"
              : "border-gray-200 bg-white"
          }`}
        >
          {task.completed && <span className="text-2xl">✓</span>}
        </button>

        {/* Task Details */}
        <div className="min-w-0">
          <h2
            className={`break-words text-lg font-semibold sm:text-2xl ${
              task.completed ? "text-gray-500 line-through" : "text-gray-900"
            }`}
          >
            {task.title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm sm:text-lg">
            <span
              className={
                task.type === "today"
                  ? "text-red-700"
                  : task.type === "completed"
                    ? "text-emerald-700"
                    : "text-gray-500"
              }
            >
              {task.type === "today"
                ? "◷"
                : task.type === "completed"
                  ? "✓"
                  : "▣"}{" "}
              {task.time}
            </span>

            <span className="text-gray-400">•</span>

            <span className="rounded-lg bg-indigo-50 px-3 py-2 text-indigo-900">
              {task.category}
            </span>
          </div>
        </div>
      </div>

      {/* Priority */}
      <PriorityBadge priority={task.priority} />
    </div>
  );
}

// 3. Deadline Card Component
function DeadlineCard({ deadline }) {
  return (
    <div className="flex min-h-[145px] items-center justify-between gap-3 rounded-3xl bg-white px-5 py-6 shadow-sm sm:px-8">
      <div className="flex min-w-0 items-center gap-4">
        {/* Date */}
        <div
          className={`flex h-[78px] w-[78px] shrink-0 flex-col items-center justify-center rounded-2xl ${
            deadline.urgent
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          <span className="text-lg font-semibold">{deadline.month}</span>

          <span className="text-3xl font-bold">{deadline.date}</span>
        </div>

        {/* Deadline Information */}
        <div className="min-w-0">
          <h3 className="break-words text-lg font-semibold text-gray-900 sm:text-2xl">
            {deadline.title}
          </h3>

          <p
            className={`mt-2 text-sm sm:text-xl ${
              deadline.urgent ? "text-red-700" : "text-gray-500"
            }`}
          >
            ◷ {deadline.time}
          </p>
        </div>
      </div>

      {/* Status */}
      <span
        className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold sm:px-4 sm:text-base ${
          deadline.urgent
            ? "bg-red-100 text-red-700"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {deadline.status}
      </span>
    </div>
  );
}

// 4. Daily Streak Component
function DailyStreak() {
  return (
    <div className="mt-12 flex items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-[#3012b5] to-[#4535c9] px-6 py-8 text-white shadow-lg sm:px-8">
      <div>
        <p className="text-sm font-semibold tracking-wide text-purple-200 sm:text-xl">
          DAILY STREAK
        </p>

        <h2 className="mt-2 text-2xl font-bold sm:text-4xl">
          5 Days Active! 🔥
        </h2>

        <p className="mt-3 text-sm text-purple-200 sm:text-xl">
          Complete 4 more tasks to set a weekly record.
        </p>
      </div>

      {/* Flame Icon */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10 text-4xl sm:h-24 sm:w-24">
        🔥
      </div>
    </div>
  );
}

// 5. Main MyTasks Component
function MyTasks() {
  // Task data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete React Job Portal",
      time: "Today, 5:00 PM",
      category: "Study",
      priority: "HIGH",
      completed: false,
      type: "today",
    },
    {
      id: 2,
      title: "Study React Router v6",
      time: "Tomorrow, 2:00 PM",
      category: "Study",
      priority: "MEDIUM",
      completed: false,
      type: "tomorrow",
    },
    {
      id: 3,
      title: "Review JavaScript Array Methods",
      time: "Completed Oct 24",
      category: "Study",
      priority: "LOW",
      completed: true,
      type: "completed",
    },
  ]);

  // Deadline data
  const deadlines = [
    {
      id: 1,
      month: "OCT",
      date: "25",
      title: "Client Presentation Prep",
      time: "Due in 3 hours",
      status: "URGENT",
      urgent: true,
    },
    {
      id: 2,
      month: "OCT",
      date: "26",
      title: "API Integration Handover",
      time: "Due in 28 hours",
      status: "2 DAYS",
      urgent: false,
    },
  ];

  // Toggle task completion
  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  // Count completed tasks
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="mb-7 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              My Tasks
            </h1>

            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-gray-600">
              {tasks.length} Recent
            </span>
          </div>

          <button className="text-sm font-semibold text-indigo-800 sm:text-xl">
            View All Tasks →
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </div>

        {/* Upcoming Deadlines Heading */}
        <div className="mb-5 mt-14 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl">
            ⏱ Upcoming Deadlines
          </h2>

          <span className="text-sm text-gray-500 sm:text-xl">Next 48 hrs</span>
        </div>

        {/* Deadline List */}
        <div className="space-y-3">
          {deadlines.map((deadline) => (
            <DeadlineCard key={deadline.id} deadline={deadline} />
          ))}
        </div>

        {/* Daily Streak */}
        <DailyStreak />

        {/* Completed Tasks Counter */}
        <p className="mt-5 text-center text-sm text-gray-500">
          {completedCount} of {tasks.length} recent tasks completed
        </p>
      </div>
    </div>
  );
}

export default MyTasks;
