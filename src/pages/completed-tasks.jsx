import TaskItem from "../components/taskItem";

function CompletedTasks({ tasks, setTasks }) {
  // Get only completed tasks
  const completedTasks = tasks.filter((task) => task.completed);

  // Allow a completed task to be marked as pending again
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

  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Completed Tasks
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Here are all the tasks you have successfully completed.
          </p>

          <p className="mt-3 text-sm font-semibold text-emerald-700">
            {completedTasks.length} Completed Tasks
          </p>
        </div>

        {completedTasks.length > 0 ? (
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              No completed tasks yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Tasks you mark as completed will appear here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default CompletedTasks;
