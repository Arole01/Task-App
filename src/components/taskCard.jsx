import colors from "tailwindcss/colors";
import CofeeCup from "../assets/tea-cup.jpg";
import {
  FolderOpen,
  CircleCheck,
  MoreHorizontal,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

const taskCards = [
  {
    title: "TOTAL TASKS",
    count: 24,
    subtitle: "+3 since yesterday",
    icon: FolderOpen,
    color: "#555555",
    bgcolor: "#E4EBFC",
  },

  {
    title: "COMPLETED",
    count: 12,
    subtitle: "50% completed",
    icon: CircleCheck,
    color: "#006747",
    bgcolor: "#6AEFC1",
  },

  {
    title: "PENDING",
    count: 8,
    subtitle: "4 due this week",
    icon: MoreHorizontal,
    color: "#555555",
    bgcolor: "#E2E3EF",
  },

  {
    title: "OVERDUE",
    count: 4,
    subtitle: "Needs attention",
    icon: AlertCircle,
    color: "#B91C1C",
    bgcolor: "#FCE0E0",
  },
];

function TaskCard() {
  return (
    <>
      <div className="w-full bg-[#f7f8fc] px-6 pt-2 pb-2">
        <div className="flex justify-between items-center w-full mb-4">
          <div>
            <h1 className="text-[22px] font-bold text-black leading-tight tracking-tight">
              Good morning, David!
            </h1>
            <p className="text-[12px] font-semibold text-[#646e7f] tracking-widest">
              Here's what's happening with your tasks today.
            </p>
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-full"
              src={CofeeCup}
              alt="cofee-cup"
            />
          </div>
        </div>
        <button className="flex items-center justify-center gap-4 w-full h-10 bg-[#3015b9] hover:bg-[#26109c] text-white text-xl font-semibold rounded-2xl md:rounded-[28px] shadow-lg cursor-pointer transition-colors duration-300">
          + Add New Task
        </button>
      </div>

      <div className="grid grid-cols-2 gap-[20px]">
        {taskCards.map((card, index) => (
          <div
            className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            key={index}
          >
            <div className="flex items-center justify-between mb-5">
              <h3
                className="text-base font-semibold"
                style={{ color: card.color }}
              >
                {card.title}
              </h3>

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: card.bgcolor }}
              >
                <card.icon size={24} className={card.color} />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {card.count}
            </h1>

            <p className="text-sm font-medium" style={{ color: card.color }}>
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskCard;
