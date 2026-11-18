import { useState } from "react";
import {
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown,
  CalendarDays,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router";

function TopNav({ currentUser, onLogout, tasks = [], theme, onToggleTheme }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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

  const notificationCount = notifications.length;

  // Get user's initials
  const firstName = currentUser?.firstname || "";
  const lastName = currentUser?.lastname || "";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-800 sm:text-lg dark:text-white">
            {formattedDate}
          </h2>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Stay focused and get things done.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
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
                      {notificationCount} tasks need your attention
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

                      return (
                        <div
                          key={task.id}
                          className="flex gap-3 border-b border-gray-100 px-4 py-4 last:border-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
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
                            <p className="truncate text-sm font-semibold text-gray-800 dark:text-white">
                              {task.title}
                            </p>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {isOverdue
                                ? "This task is overdue"
                                : "This task is due today"}
                            </p>
                          </div>
                        </div>
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

                {/* View Tasks */}
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

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <Sun size={21} /> : <Moon size={21} />}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 rounded-full p-1 transition hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="User profile"
            >
              {/* User Avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                {initials}
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                  {currentUser?.firstname || "User"}
                </p>

                <p className="max-w-32 truncate text-xs text-gray-500 dark:text-gray-400">
                  {currentUser?.email || ""}
                </p>
              </div>

              <ChevronDown
                size={16}
                className="hidden text-gray-500 sm:block dark:text-gray-400"
              />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                {/* Profile Details */}
                <div className="border-b border-gray-100 px-4 py-4 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {currentUser?.firstname || "User"}{" "}
                    {currentUser?.lastname || ""}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                    {currentUser?.email || ""}
                  </p>
                </div>

                {/* Profile Menu */}
                <div className="p-2">
                  <Link
                    to="/"
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <User size={17} />
                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={() => setShowProfile(false)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Settings size={17} />
                    Settings
                  </button>

                  <button
                    type="button"
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
