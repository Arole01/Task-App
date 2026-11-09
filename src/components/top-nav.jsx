import image from "../assets/task-logo.jpg";
import profileImage from "../assets/profile-image.jpeg";
import { Bell } from "lucide-react";

function TopNav() {
  return (
    <nav className="bg-white flex justify-between items-center w-full p-[25px 50px] border-b border-[#ddd] sticky top-0">
      <div className="flex items-center gap-3 ">
        <div className="w-12 h-12 rounded-xl  flex items-center justify-center p-2">
          <img
            className="w-full h-full object-contain"
            src={image}
            alt="task-app logo"
          />
        </div>

        <div>
          <h1 className="text-[22px] font-bold text-black leading-tight tracking-tight">
            TaskFlow
          </h1>
          <p className="text-[12px] font-semibold text-[#646e7f] tracking-widest uppercase">
            DASHBOARD
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-[#646e7f] hover:text-[#0e1629] transition-colors">
          <Bell className="w-6 h-6" />
        </button>
        <img
          className="w-[50px] h-[50px] rounded-full object-cover"
          src={profileImage}
          alt="profile-image"
        />
      </div>
    </nav>
  );
}

export default TopNav;
