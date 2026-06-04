import {
  Search,
  Bell,
  Plus,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";

const Topbar = () => {
  return (

    <div className="sticky top-0 z-[999] h-20 border-b border-white/5 bg-black/80 backdrop-blur-2xl px-4 sm:px-6 flex items-center justify-between">

      <div className="flex items-center gap-4 w-full max-w-xl">

        <div className="relative w-full">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

          <input
            type="text"
            placeholder="Search repositories, PRs, reports..."
            className="w-full h-12 rounded-2xl bg-[#111113] border border-white/5 pl-12 pr-5 outline-none focus:border-orange-500 transition-all duration-300 text-sm"
          />

        </div>

      </div>

      <div className="flex items-center gap-2 sm:gap-3 ml-4">

        <button className="hidden md:flex h-12 px-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium items-center gap-3 hover:opacity-90 transition-all duration-300 whitespace-nowrap">

          <Plus className="w-5 h-5" />

          New Project

        </button>

        <ThemeToggle />

        <button className="relative w-12 h-12 rounded-2xl bg-[#111113] border border-white/5 flex items-center justify-center hover:bg-white/5 transition-all duration-300 shrink-0">

          <Bell className="w-5 h-5" />

          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-orange-500"></div>

        </button>

        <img
          src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
          alt="profile"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl object-cover border border-white/10 shrink-0"
        />

      </div>

    </div>
  );
};

export default Topbar;