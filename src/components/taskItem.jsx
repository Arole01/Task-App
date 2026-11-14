import { priorityStyles } from "../data/tasks";

function TaskItem({ task, onToggle }) {
  const DateIcon = task.dateIcon;
  const StatusIcon = task.statusIcon;
  const priority = priorityStyles[task.priority];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8">
      <div
        className="absolute left-0 top-0 h-full w-1.5"
        style={{ backgroundColor: priority.indicator }}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <button
            type="button"
            onClick={onToggle}
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 ${
              task.completed
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-gray-400 bg-white hover:border-indigo-600"
            }`}
          >
            {task.completed && <StatusIcon size={21} strokeWidth={2.5} />}
          </button>

          <div className="min-w-0">
            <h3
              className={`text-lg font-semibold sm:text-xl ${
                task.completed ? "text-gray-500 line-through" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>

            <p
              className={`mt-1 text-sm text-gray-500 sm:text-base ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.description}
            </p>
          </div>
        </div>

        <span
          className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm"
          style={{
            color: priority.color,
            backgroundColor: priority.background,
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: priority.indicator }}
          />
          {task.priority}
        </span>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 pl-12">
        <div
          className={`flex items-center gap-2 text-sm ${
            task.completed
              ? "text-gray-400 line-through"
              : task.date.includes("Today")
                ? "text-red-600"
                : "text-gray-600"
          }`}
        >
          <DateIcon size={19} />
          <span>{task.date}</span>
        </div>

        <span className="rounded-md bg-indigo-50 px-3 py-1.5 text-sm font-medium text-gray-700">
          {task.category}
        </span>

        {task.completed && (
          <span className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <StatusIcon size={19} />
            Completed
          </span>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
