import profileImage from "../assets/profile-image.jpeg";
import { Bell, Search } from "lucide-react";

function TopNav() {
  return (
    <nav className="w-full bg-[#f8f9fd]">
      <header className="flex h-16 items-center justify-between px-5 sm:px-8 ">
        <div className="flex items-center w-[300px] max-w-[55%] gap-3 rounded-lg bg-[#f0f2fa] px-3 py-2">
          <Search
            size={20}
            strokeWidth={2}
            className="shrink-0 text-gray-600"
          />
          <input
            type="text"
            placeholder="Search tasks or projects....."
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-5">
          <button className="relative text-gray-700 hover:text-purple-700">
            <Bell className="w-6 h-6" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-white bg-red-600"></span>
          </button>
          <div className="h-8 w-px bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <img
              className="h-9 w-9 rounded-full border border-gray-200 object-cover"
              src={profileImage}
              alt="profile-image"
            />
            <span className="text-sm font-medium text-gray-800">David</span>
          </div>
        </div>
      </header>
    </nav>
  );
}

export default TopNav;
