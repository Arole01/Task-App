function ProductivityProgress({ tasks }) {
  const today = new Date();

  const startOfWeek = new Date(today);
  const day = today.getDay();

  startOfWeek.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const weeklyTasks = tasks.filter((task) => {
    if (!task.date) return false;

    const [year, month, day] = task.date.split("-").map(Number);
    const dueDate = new Date(year, month - 1, day);

    return dueDate >= startOfWeek && dueDate <= endOfWeek;
  });

  const completedTasks = weeklyTasks.filter((task) => task.completed).length;

  const totalTasks = weeklyTasks.length;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Weekly Productivity
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your task completion progress this week.
          </p>
        </div>

        <span className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          This Week
        </span>
      </div>

      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {progress}%
          </p>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Weekly completion rate
          </p>
        </div>

        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {completedTasks} of {totalTasks} completed
        </p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        {totalTasks === 0
          ? "No tasks are due this week. Add a task to get started!"
          : progress === 100
            ? "Excellent work! You've completed all your tasks for this week."
            : "Keep going! Every completed task brings you closer to your goals."}
      </p>
    </section>
  );
}

export default ProductivityProgress;
