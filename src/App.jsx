import { useState } from "react";
import { Routes, Route } from "react-router";
import TopNav from "./components/top-nav";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Sidebar from "./components/sidebar";
import { Toaster } from "sonner";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!currentUser;
  const handleLogin = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex min-h-screen bg-[#f7f8fc]">
        {isAuthenticated && (
          <section className="sticky top-0 h-screen shrink-0">
            <Sidebar currentUser={currentUser} onLogout={handleLogout} />
          </section>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNav urrentUser={currentUser} onLogout={handleLogout} />

          <main className="flex-1 min-w-0">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/login"
                element={<Login setCurrentUser={handleLogin} />}
              />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
