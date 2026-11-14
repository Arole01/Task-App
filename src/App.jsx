import { useState } from "react";
import { Routes, Route } from "react-router";
import TopNav from "./components/top-nav";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Sidebar from "./components/sidebar";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  return (
    <>
      <div className="flex min-h-screen bg-[#f7f8fc]">
        <section className="sticky top-0 h-screen shrink-0">
          <Sidebar />
        </section>

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNav isAuthenticated={isAuthenticated} />

          <main className="flex-1 min-w-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/login"
                element={<Login setAuthenticated={setAuthenticated} />}
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
