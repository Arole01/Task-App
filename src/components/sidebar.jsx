import {
  CircleCheck,
  CirclePlus,
  LayoutDashboard,
  ListTodo,
  LogOut,
} from "lucide-react";

import taskFLowLogo from "../assets/task-logo.jpg";
import { NavLink } from "react-router";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "All Tasks",
    icon: ListTodo,
    path: "/tasks",
  },
  {
    name: "Add New Task",
    icon: CirclePlus,
    path: "/addtask",
  },
  {
    name: "Completed Tasks",
    icon: CircleCheck,
    path: "/completetask",
  },
];
function SideBar({ currentUser, onLogout }) {
  return (
    <section className="sticky top-0 flex h-screen w-[280px] shrink-0 flex-col border-r border-gray-100 bg-white px-3 py-5">
      <div className="mb-10 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <img
            className="h-9 w-9 object-contain"
            src={taskFLowLogo}
            alt="taskflow-logo"
          />

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            TaskFlow
          </h1>
        </div>

        <span className="rounded-full bg-[#e8edff] px-2 py-1 text-xs font-bold text-[#3216b5]">
          v1.0 Pro
        </span>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-[#e3eaff] font-semibold text-[#3216a5]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#3216a5]"
                }`
              }
            >
              <Icon size={21} strokeWidth={2} className="shrink-0" />

              <span className="text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {currentUser && (
        <div className="mt-auto">
          <div className="flex items-center justify-between gap-2 rounded-xl bg-[#f0f3ff] p-3">
            <div className="min-w-0">
              <h3 className=" truncate text-sm font-semibold text-gray-800">
                {currentUser.firstname} {currentUser.lastname}
              </h3>

              <p className="truncate text-xs text-gray-600">
                {currentUser.occupation}
              </p>
            </div>
            <button
              type="button"
              onClick={onLogout}
              aria-label="Log out"
              className="shrink-0 text-gray-700 transition hover:text-[#3216b5]"
            >
              <LogOut size={21} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default SideBar;
