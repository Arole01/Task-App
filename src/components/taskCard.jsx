import {
  CalendarDays,
  PlusCircle,
  Layers,
  CircleCheck,
  Hourglass,
  TriangleAlert,
  ArrowRight,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Link } from "react-router";

function StatisticsCard({ card }) {
  const Icon = card.icon;

  return (
    <div className="relative min-h-35 overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          {card.title}
        </h3>

        <div
          className="flex size-8 items-center justify-center rounded-full"
          style={{ backgroundColor: card.bgcolor }}
        >
          <Icon size={16} strokeWidth={2.2} style={{ color: card.color }} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <h2
          className={cn(
            "text-3xl font-bold text-[#111827] dark:text-white",
            card.title === "OVERDUE" && "text-[#B91C1C]",
          )}
        >
          {card.count}
        </h2>

        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            card.bgcolor,
            card.color,
          )}
        >
          {card.subtitle}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {card.description}
      </p>

      <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gray-100 dark:bg-gray-700">
        <div
          className={cn("h-full rounded-r-full", card.barColor)}
          style={{ width: card.progress }}
        />
      </div>
    </div>
  );
}

function TaskCard({ tasks }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const overdueTasks = tasks.filter((task) => {
    if (task.completed || !task.date) return false;

    const [year, month, day] = task.date.split("-").map(Number);
    const dueDate = new Date(year, month - 1, day);

    return dueDate < today;
  }).length;

  const totalTasks = tasks.length;

  const completedPercentage = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const pendingPercentage = totalTasks
    ? Math.round((pendingTasks / totalTasks) * 100)
    : 0;

  const overduePercentage = totalTasks
    ? Math.round((overdueTasks / totalTasks) * 100)
    : 0;

  const taskCards = [
    {
      title: "TOTAL TASKS",
      count: totalTasks,
      subtitle: "All tasks",
      description: "All active & completed tasks",
      icon: Layers,
      color: "text-[#3730A3]",
      bgcolor: "bg-[#EEF0FF]",
      progress: totalTasks ? "100%" : "0%",
      barColor: "bg-[#3730A3]",
    },
    {
      title: "COMPLETED",
      count: completedTasks,
      subtitle: `${completedPercentage}% completed`,
      description: "successfully completed tasks",
      icon: CircleCheck,
      color: "text-[#166B50]",
      bgcolor: "bg-[#E6FAF1]",
      progress: `${completedPercentage}%`,
      barColor: "bg-[#16845C]",
    },
    {
      title: "PENDING",
      count: pendingTasks,
      subtitle: "Not completed",
      description: "Tasks still to be completed",
      icon: Hourglass,
      color: "text-[#A45B08]",
      bgcolor: "bg-[#FFF3D6]",
      progress: `${pendingPercentage}%`,
      barColor: "bg-[#B45309]",
    },
    {
      title: "OVERDUE",
      count: overdueTasks,
      subtitle: "Requires attention",
      description: "Uncompleted tasks past their due date",
      icon: TriangleAlert,
      color: "text-[#B91C1C]",
      bgcolor: "bg-[#FDE8E8]",
      progress: `${overduePercentage}%`,
      barColor: "bg-[#B91C1C]",
    },
  ];

  return (
    <div className="w-full bg-[#f7f8fc] px-5 pt-0 pb-6 dark:bg-gray-950 sm:px-8">
      <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
            <span className="h-2 w-2 rounded-full bg-[#3216b5]" />
            Executive Overview
          </p>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Here's what's happening with your tasks today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800">
            <CalendarDays size={20} />
            {today.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>

          <Link
            to="/addtask"
            className="flex items-center gap-2 rounded-xl bg-[#3216b5] px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#26109c]"
          >
            <PlusCircle size={21} />
            Add New Task
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {taskCards.map((card) => (
          <StatisticsCard key={card.title} card={card} />
        ))}
      </div>

      <div className="mt-7 flex w-full items-center justify-between rounded-xl bg-white p-4 shadow-sm dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            My Tasks
          </h2>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            {pendingTasks} Pending
          </span>
        </div>

        <Link
          to="/tasks"
          className="flex items-center gap-2 text-sm font-semibold text-indigo-700 transition-colors hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          View All Tasks
          <ArrowRight size={18} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}

export default TaskCard;
