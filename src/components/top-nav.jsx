import { useState } from "react";
import {
  Bell,
  Sun,
  Moon,
  CalendarDays,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router";

function TopNav({ currentUser, tasks = [], theme, onToggleTheme }) {
  const [showNotifications, setShowNotifications] = useState(false);

  // Store the IDs of notifications that have been read
  const [readNotifications, setReadNotifications] = useState([]);

  // Mark a notification as read
  const markAsRead = (id) => {
    setReadNotifications((previousNotifications) =>
      previousNotifications.includes(id)
        ? previousNotifications
        : [...previousNotifications, id],
    );
  };

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Format today's date
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Find overdue and today's pending tasks
  const notifications = tasks
    .filter((task) => {
      if (task.completed || !task.date) return false;

      const [year, month, day] = task.date.split("-").map(Number);
      const dueDate = new Date(year, month - 1, day);

      return dueDate <= today;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  // Count only unread notifications
  const notificationCount = notifications.filter(
    (task) => !readNotifications.includes(task.id),
  ).length;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between gap-4">
        {/* Date and Welcome Message */}
        <div>
          <h2 className="text-base font-bold text-gray-800 sm:text-lg dark:text-white">
            {formattedDate}
          </h2>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Stay focused and get things done.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification Dropdown */}
          {currentUser && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label="Notifications"
              >
                <Bell size={21} />

                {notificationCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                  {/* Notification Heading */}
                  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 dark:border-gray-700">
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        Notifications
                      </h3>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {notificationCount} unread notifications
                      </p>
                    </div>

                    <Bell size={19} className="text-indigo-600" />
                  </div>

                  {/* Notification List */}
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((task) => {
                        const [year, month, day] = task.date
                          .split("-")
                          .map(Number);

                        const dueDate = new Date(year, month - 1, day);
                        const isOverdue = dueDate < today;

                        const isRead = readNotifications.includes(task.id);

                        return (
                          <button
                            type="button"
                            key={task.id}
                            onClick={() => markAsRead(task.id)}
                            className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-4 text-left transition hover:bg-gray-50 last:border-0 dark:border-gray-700 dark:hover:bg-gray-700"
                          >
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                                isOverdue
                                  ? "bg-red-50 text-red-600 dark:bg-red-950"
                                  : "bg-amber-50 text-amber-600 dark:bg-amber-950"
                              }`}
                            >
                              {isOverdue ? (
                                <Clock size={17} />
                              ) : (
                                <CalendarDays size={17} />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p
                                className={`truncate text-sm ${
                                  isRead
                                    ? "font-normal text-gray-500 dark:text-gray-400"
                                    : "font-semibold text-gray-800 dark:text-white"
                                }`}
                              >
                                {task.title}
                              </p>

                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {isOverdue
                                  ? "This task is overdue"
                                  : "This task is due today"}
                              </p>
                            </div>

                            {/* Red Indicator */}
                            {!isRead && (
                              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500"></span>
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <CheckCircle2
                          size={30}
                          className="mx-auto mb-2 text-emerald-500"
                        />

                        <p className="text-sm font-semibold text-gray-700 dark:text-white">
                          You're all caught up!
                        </p>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          No overdue or due-today tasks.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* View All Tasks */}
                  <div className="border-t border-gray-100 p-3 dark:border-gray-700">
                    <Link
                      to="/tasks"
                      onClick={() => setShowNotifications(false)}
                      className="block rounded-lg bg-indigo-50 py-2.5 text-center text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900"
                    >
                      View All Tasks
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            disabled={!currentUser}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800 dark:disabled:hover:bg-transparent"
            aria-label="Toggle theme"
            title={
              !currentUser
                ? "Login to change theme"
                : theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <Sun size={21} /> : <Moon size={21} />}
          </button>

          {/* Login and Register Buttons */}
          {!currentUser && (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-gray-800 sm:px-4"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:px-4"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopNav;
