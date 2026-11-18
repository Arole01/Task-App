const getDateOffset = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const taskList = [
  {
    id: 1,
    title: "Complete React Job Portal",
    description: "Finalise responsive navbar and dynamic search filters",
    date: getDateOffset(0),
    category: "Work",
    priority: "High",
    completed: false,
  },

  {
    id: 2,
    title: "Study React Router",
    description: "Read documentation on loaders, actions and nested routes",
    date: getDateOffset(1),
    category: "Study",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Review JavaScript Array Methods",
    description: "Practice map, filter, reduce and find algorithms",
    date: getDateOffset(2),
    category: "Study",
    priority: "Low",
    completed: true,
  },
  {
    id: 4,
    title: "Build Task Management App",
    description: "Initialize React project with Tailwind CSS and Vite",
    date: getDateOffset(4),
    category: "Personal",
    priority: "High",
    completed: false,
  },
];

export const priorityStyles = {
  High: {
    color: "#DC2626",
    background: "#FEE2E2",
    indicator: "#DC2626",
  },
  Medium: {
    color: "#B45309",
    background: "#FEF3C7",
    indicator: "#B45309",
  },
  Low: {
    color: "#047857",
    background: "#D1FAE5",
    indicator: "#047857",
  },
};
