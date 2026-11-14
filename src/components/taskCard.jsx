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

const taskCards = [
  {
    title: "TOTAL TASKS",
    count: 24,
    subtitle: "+4 this week",
    description: "All active & logged items",
    icon: Layers,
    color: "text-[#3730A3]",
    bgcolor: "bg-[#EEF0FF]",
    progress: "100%",
    barColor: "bg-[#3730A3]",
  },

  {
    title: "COMPLETED",
    count: 12,
    subtitle: "50% completed",
    description: "On schedule for target",
    icon: CircleCheck,
    color: "text-[#166B50]",
    bgcolor: "bg-[#E6FAF1]",
    progress: "50%",
    barColor: "bg-[#16845C]",
  },

  {
    title: "PENDING",
    count: 8,
    subtitle: "In progress",
    description: "Active workflows",
    icon: Hourglass,
    color: "text-[#A45B08]",
    bgcolor: "bg-[#FFF3D6]",
    progress: "33%",
    barColor: "bg-[#B45309]",
  },

  {
    title: "OVERDUE",
    count: 4,
    subtitle: "Requires attention",
    description: "Requires re-prioritization",
    icon: TriangleAlert,
    color: "text-[#B91C1C]",
    bgcolor: "bg-[#FDE8E8]",
    progress: "16%",
    barColor: "bg-[#B91C1C]",
  },
];

function StatisticsCard({ card }) {
  const Icon = card.icon;

  return (
    <div className="relative min-h-35 overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-600">{card.title}</h3>

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
            "text-3xl font-bold text-[#111827]",
            card.title === "OVERDUE" && "text-[#B91C1C]",
          )}
        >
          {card.count}
        </h2>

        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold bg-blue",
            card.bgcolor,
            card.color,
          )}
          // style={{ backgroundColor: card.bgcolor, color: card.color }}
        >
          {card.subtitle}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500">{card.description}</p>

      <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gray-100">
        <div
          className={cn("h-full rounded-r-full", card.barColor)}
          style={{
            width: card.progress,
            // backgroundColor: card.barColor,
          }}
        ></div>
      </div>
    </div>
  );
}

function TaskCard() {
  return (
    <>
      <div className="w-full bg-[#f7f8fc] px-5 pt-0 pb-6 sm:px-8">
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-600">
              <span className="h-2 w-2 rounded-full bg-[#3216b5]"></span>
              Executive Overview
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Good morning, David!
            </h1>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Here's what's happening with your tasks today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50">
              <CalendarDays size={20} />
              Today, Nov 16
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-[#3216b5] px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#26109c]">
              <PlusCircle size={21} />
              Add New Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {taskCards.map((card) => (
            <StatisticsCard key={card.title} card={card} />
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm w-full">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">My Tasks</h2>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              4 Due Soon
            </span>
          </div>

          <a
            href="#"
            className="flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors"
          >
            View All Tasks
            <ArrowRight size={18} strokeWidth={2} />
          </a>
        </div>
      </div>
    </>
  );
}

export default TaskCard;
