import { CheckCheck, Clock, CalendarDays } from "lucide-react";

export const taskList = [
  {
    id: 1,
    title: "Complete React Job Portal",
    description: "Finalise responsive navbar and dynamic search filters",
    date: "Today, 5:00 PM",
    dateIcon: Clock,
    category: "Work",
    priority: "High",
    completed: false,
    statusIcon: CheckCheck,
  },

  {
    id: 2,
    title: "Study React Router",
    description: "Read documentation on loaders, actions and nested routes",
    date: "Tomorrow",
    dateIcon: CalendarDays,
    category: "Study",
    priority: "Medium",
    completed: false,
    statusIcon: CheckCheck,
  },
  {
    id: 3,
    title: "Review JavaScript Array Methods",
    description: "Practice map, filter, reduce and find algorithms",
    date: "Nov 18, 2024",
    dateIcon: CalendarDays,
    category: "Study",
    priority: "Low",
    completed: true,
    statusIcon: CheckCheck,
  },
  {
    id: 4,
    title: "Build Task Management App",
    description: "Initialize React project with Tailwind CSS and Vite",
    date: "Nov 20, 2024",
    dateIcon: CalendarDays,
    category: "Personal",
    priority: "High",
    completed: false,
    statusIcon: CheckCheck,
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
