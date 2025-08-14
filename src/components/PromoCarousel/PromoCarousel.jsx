import React from "react";

export default function PromoCarousel({ cards }) {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1 pr-2">
      {cards.map((c) => (
        <div
          key={c.id}
          className="min-w-[360px] h-36 rounded-2xl p-5 bg-gradient-to-r from-[#7c4dff] to-[#3d5afe] text-white flex flex-col justify-between shadow-md"
        >
          <div>
            <div className="text-sm opacity-90">{c.subtitle}</div>
            <div className="text-xl font-bold">{c.title}</div>
          </div>
          <button className="self-start bg-white/95 text-[#1b1b1b] text-sm px-3 py-1 rounded-lg font-semibold hover:bg-white">
            {c.cta}
          </button>
        </div>
      ))}
    </div>
  );
}
