import { Link } from "react-router";
import { CheckCheck } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-gray-200 bg-white px-5 py-8 dark:border-gray-700 dark:bg-gray-900 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-700 text-white">
              <CheckCheck size={20} />
            </span>

            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Task<span className="text-indigo-600">Flow</span>
            </span>
          </Link>

          <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Stay organized, manage your tasks and get things done.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link
            to="/"
            className="transition hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Dashboard
          </Link>

          <Link
            to="/tasks"
            className="transition hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            All Tasks
          </Link>

          <Link
            to="/addtask"
            className="transition hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Add New Task
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-gray-100 pt-5 dark:border-gray-700">
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 sm:text-left">
          © {currentYear} TaskFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
