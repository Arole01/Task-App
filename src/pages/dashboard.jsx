import TaskCard from "../components/taskCard";
import TaskList from "../components/tasklist";
import ProductivityProgress from "../components/productivityProgress";
import UpcomingTasks from "../components/upcomingTasks";
import Footer from "../components/footer";
import DailyMotivation from "../components/daily-motivation";

function Dashboard({ currentUser, tasks, setTasks }) {
  return (
    <>
      <main className="flex min-w-0 flex-1 flex-col">
        <section className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {currentUser && (
            <div className="mb-6">
              <h1 className="mb-4 pl-8 text-2xl font-bold text-gray-800">
                Welcome back, {currentUser.firstname}!
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Here's an overview of your productivity today.
              </p>
            </div>
          )}
          <TaskCard tasks={tasks} />

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="min-w-0 lg:col-span-3">
              <TaskList tasks={tasks} setTasks={setTasks} />
            </div>

            <div className="min-w-0 space-y-6 lg:col-span-2 gap-5">
              <DailyMotivation />
              <ProductivityProgress tasks={tasks} />

              <UpcomingTasks tasks={tasks} />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

export default Dashboard;
