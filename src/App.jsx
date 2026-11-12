import ProductivityProgress from "./components/productivityProgress";
import SideBar from "./components/sidebar";
import TaskCard from "./components/taskCard";
import TaskList from "./components/tasklist";
import TopNav from "./components/top-nav";

function App() {
  return (
    <>
      <div className="flex min-h-screen bg-[#f7f8fc]">
        <section className="sticky top-0 h-screen shrink-0">
          <SideBar />
        </section>

        <main className="flex min-w-0 flex-1 flex-col">
          <TopNav className="sticky top-0" />
          <section className="min-w-0 flex-1">
            <TaskCard />
            <TaskList />
            <ProductivityProgress />
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
