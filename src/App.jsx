import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router";
import TopNav from "./components/top-nav";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Sidebar from "./components/sidebar";
import { Toaster, toast } from "sonner";
import AddTask from "./pages/add-task";
import { taskList } from "./data/tasks";
import AllTasks from "./pages/all-tasks";
import CompletedTasks from "./pages/completed-tasks";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : taskList;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((previousTheme) => (previousTheme === "light" ? "dark" : "light"));
  };

  const isAuthenticated = !!currentUser;

  const handleLogin = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const navigate = useNavigate();

  const handleRequireLogin = () => {
    if (!currentUser) {
      toast.error("Please log in to manage your tasks.");
      navigate("/login");
      return false;
    }

    return true;
  };

  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const showSidebar = !isAuthPage;

  return (
    <>
      <Toaster position="top-right" richColors />

      <div
        className={`flex min-h-screen ${
          theme === "dark" ? "dark bg-gray-950" : "bg-[#f7f8fc]"
        }`}
      >
        {showSidebar && (
          <section className="sticky top-0 h-screen shrink-0">
            <Sidebar
              currentUser={currentUser}
              onLogout={handleLogout}
              onRequireLogin={handleRequireLogin}
            />
          </section>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          {showSidebar && (
            <TopNav
              currentUser={currentUser}
              onLogout={handleLogout}
              tasks={tasks}
              theme={theme}
              onToggleTheme={handleToggleTheme}
            />
          )}

          <main className="min-w-0 flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    tasks={tasks}
                    setTasks={setTasks}
                    onRequireLogin={handleRequireLogin}
                  />
                }
              />

              <Route
                path="/login"
                element={<Login setCurrentUser={handleLogin} />}
              />

              <Route path="/register" element={<Register />} />

              <Route
                path="/addtask"
                element={
                  <AddTask
                    currentUser={currentUser}
                    setTasks={setTasks}
                    onRequireLogin={handleRequireLogin}
                  />
                }
              />

              <Route
                path="/tasks"
                element={
                  <AllTasks
                    tasks={tasks}
                    setTasks={setTasks}
                    currentUser={currentUser}
                    onRequireLogin={handleRequireLogin}
                  />
                }
              />

              <Route
                path="/completetask"
                element={
                  <CompletedTasks
                    tasks={tasks}
                    setTasks={setTasks}
                    currentUser={currentUser}
                    onRequireLogin={handleRequireLogin}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
