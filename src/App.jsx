import ProductivityProgress from "./components/productivityProgress";
import SideBar from "./components/sidebar";
import TaskCard from "./components/taskCard";
import TopNav from "./components/top-nav";

function App() {
  return (
    <>
      <div className="flex min-h-screen bg-[#f7f8fc]">
        <SideBar />
        <main className="flex min-w-0 flex-1 flex-col">
          <TopNav />
          <section className="flex-1 p-5 sm:p-8">
            <TaskCard />
            <ProductivityProgress />
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
