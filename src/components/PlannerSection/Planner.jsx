import React from "react";
import { IconBook, IconCap, IconStar, IconNote, IconLock, IconGlobe } from "../Icons/Icons.jsx";

export default function Sidebar() {
  return (
    <aside className="bg-[#151515] text-white w-72 min-w-72 h-screen p-4 flex flex-col border-r border-[#2b2b2b]">
      {/* Primary buttons */}
      <button className="flex items-center gap-3 bg-[#242424] hover:bg-[#2a2a2a] px-4 py-3 rounded-xl font-semibold">
        <IconBook className="w-5 h-5" /> Library
      </button>
      <button className="flex items-center gap-3 mt-3 px-4 py-3 rounded-xl hover:bg-[#242424] font-semibold">
        <IconCap className="w-5 h-5" /> Study Plan
      </button>

      <div className="h-px bg-[#2b2b2b] my-5" />

      {/* My Lists */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-300 font-semibold">My Lists</span>
        <button className="text-gray-400 hover:text-white text-xl leading-none">+</button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3 hover:bg-[#242424] px-2 py-2 rounded cursor-pointer">
          <IconStar className="w-5 h-5 text-yellow-400" />
          <span>Favorite</span>
          <IconLock className="w-5 h-5 text-gray-400 ml-auto" />
        </div>

        <div className="flex items-center gap-3 hover:bg-[#242424] px-2 py-2 rounded cursor-pointer">
          <IconNote className="w-5 h-5 text-blue-200" />
          <span>Revise</span>
          <IconGlobe className="w-5 h-5 text-gray-400 ml-auto" />
        </div>

        <div className="flex items-center gap-3 hover:bg-[#242424] px-2 py-2 rounded cursor-pointer">
          <IconNote className="w-5 h-5 text-blue-200" />
          <span>Redo</span>
          <IconLock className="w-5 h-5 text-gray-400 ml-auto" />
        </div>
      </div>

      {/* spacer */}
      <div className="flex-1" />
    </aside>
  );
}
