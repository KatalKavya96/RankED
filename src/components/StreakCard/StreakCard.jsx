import React from "react";

export default function StreakCard() {
  return (
    <aside className="w-60 min-w-80 h-fit bg-[#191919] text-gray-200 rounded-2xl p-5 border border-[#2b2b2b]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">Day 13</div>
          <div className="text-xs text-gray-400">09:09:38 left</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full w-12 h-12 grid place-items-center font-bold">8</div>
      </div>

      {/* mini calendar dots */}
      <div className="grid grid-cols-7 gap-3 mt-5 text-center text-sm">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className={`w-6 h-6 rounded-full grid place-items-center border ${i < 16 ? "border-blue-500 text-blue-500" : "border-[#2a2a2a] text-[#2a2a2a]"}`}>✓</div>
        ))}
      </div>

      <div className="mt-5 bg-[#232323] rounded-xl p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Weekly Premium</span>
          <span className="text-gray-400">1 day left</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          {["W1","W2","W3","W4","W5"].map((w, i)=>(
            <div key={w} className={`px-3 py-1 rounded-lg text-xs ${i<2 ? "bg-orange-600/30 text-orange-300" : "bg-[#2a2a2a] text-gray-400"}`}>{w}</div>
          ))}
        </div>
        <div className="mt-4 text-emerald-400 text-sm">0 Redeem</div>
      </div>

      <div className="text-right mt-3 text-sm text-gray-400">Rules</div>
    </aside>
  );
}
