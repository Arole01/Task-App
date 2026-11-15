// import SideBar from "../components/sidebar";
// import TopNav from "../components/top-nav";
import TaskCard from "../components/taskCard";
import TaskList from "../components/tasklist";
import ProductivityProgress from "../components/productivityProgress";
function Dashboard(currentUser) {
  return (
    <>
      <main className="flex min-w-0 flex-1 flex-col">
        <section className="min-w-0 flex-1">
          {currentUser && (
            <h1 className="mb-4 text-2xl font-bold text-gray-800">
              Welcome back, {currentUser.firstname}!
            </h1>
          )}
          <TaskCard />
          <TaskList />
          <ProductivityProgress />
        </section>
      </main>
    </>
  );
}

export default Dashboard;
