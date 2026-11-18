import { CalendarDays, ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router";

function UpcomingTasks({ tasks }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTasks = tasks
    .filter((task) => {
      if (task.completed || !task.date) return false;

      const [year, month, day] = task.date.split("-").map(Number);
      const dueDate = new Date(year, month - 1, day);

      return dueDate >= today;
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const formatDate = (date) => {
    const [year, month, day] = date.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Upcoming Tasks
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Stay on top of what's coming next.
          </p>
        </div>

        <Link
          to="/tasks"
          className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {upcomingTasks.length > 0 ? (
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {upcomingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-600" />

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {task.category}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                <CalendarDays size={15} />
                {formatDate(task.date)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <CalendarDays
            size={30}
            className="mx-auto mb-3 text-gray-300 dark:text-gray-600"
          />

          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            No upcoming tasks
          </p>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            You're all caught up!
          </p>

          <Link
            to="/addtask"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <Plus size={16} />
            Add New Task
          </Link>
        </div>
      )}
    </section>
  );
}

export default UpcomingTasks;
