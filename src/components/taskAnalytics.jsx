import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function TaskAnalytics({ tasks }) {
  // Get the current week's Monday
  const today = new Date();
  const startOfWeek = new Date(today);

  const currentDay = today.getDay();

  startOfWeek.setDate(
    today.getDate() - (currentDay === 0 ? 6 : currentDay - 1),
  );

  startOfWeek.setHours(0, 0, 0, 0);

  // Format date as YYYY-MM-DD
  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Prepare chart data
  const chartData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);

    date.setDate(startOfWeek.getDate() + index);

    const dateKey = formatDateKey(date);

    const dailyTasks = tasks.filter((task) => task.date === dateKey);

    const completed = dailyTasks.filter((task) => task.completed).length;

    const pending = dailyTasks.length - completed;

    return {
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      completed,
      pending,
    };
  });

  // Calculate totals
  const completedTotal = chartData.reduce(
    (total, day) => total + day.completed,
    0,
  );

  const pendingTotal = chartData.reduce((total, day) => total + day.pending, 0);

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      {/* Heading */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Task Analytics</h2>

          <p className="mt-1 text-sm text-gray-500">
            Your task activity throughout this week.
          </p>
        </div>

        <span className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700">
          This Week
        </span>
      </div>

      {/* Task Summary */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-indigo-50 p-3">
          <p className="text-xs font-medium text-indigo-600">Completed Tasks</p>

          <p className="mt-1 text-2xl font-bold text-indigo-700">
            {completedTotal}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs font-medium text-gray-500">Pending Tasks</p>

          <p className="mt-1 text-2xl font-bold text-gray-800">
            {pendingTotal}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />

            <Tooltip
              cursor={{ fill: "#F3F4F6" }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                fontSize: "12px",
              }}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{
                fontSize: "12px",
                paddingTop: "15px",
              }}
            />

            <Bar
              dataKey="completed"
              name="Completed"
              stackId="tasks"
              fill="#4F46E5"
              radius={[0, 0, 0, 0]}
            />

            <Bar
              dataKey="pending"
              name="Pending"
              stackId="tasks"
              fill="#D1D5DB"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default TaskAnalytics;
