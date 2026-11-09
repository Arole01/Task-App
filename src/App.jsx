import MyTasks from "./components/priorityBadge";
import ProductivityProgress from "./components/productivityProgress";
import TaskCard from "./components/taskCard";
import TopNav from "./components/top-nav";

function App() {
  return (
    <>
      <TopNav />
      <TaskCard />
      <ProductivityProgress />
      <MyTasks />
    </>
  );
}

export default App;
