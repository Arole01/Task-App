import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import TopNav from "./components/top-nav";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Sidebar from "./components/sidebar";
import { Toaster } from "sonner";
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

  const isAuthenticated = !!currentUser;
  const handleLogin = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  };
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const location = useLocation();
  const showSidebar =
    location.pathname !== "/login" && location.pathname !== "/register";
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex min-h-screen bg-[#f7f8fc]">
        {showSidebar && (
          <section className="sticky top-0 h-screen shrink-0">
            <Sidebar currentUser={currentUser} onLogout={handleLogout} />
          </section>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          {showSidebar && (
            <TopNav currentUser={currentUser} onLogout={handleLogout} />
          )}

          <main className="flex-1 min-w-0">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    tasks={tasks}
                    setTasks={setTasks}
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
                  <AddTask currentUser={currentUser} setTasks={setTasks} />
                }
              />
              <Route
                path="/tasks"
                element={<AllTasks tasks={tasks} setTasks={setTasks} />}
              />

              <Route
                path="/completetask"
                element={<CompletedTasks tasks={tasks} setTasks={setTasks} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
