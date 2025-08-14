import React from "react";

export default function ChipsRow({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
      {items.map((it) => (
        <span key={it.id} className="flex items-center gap-2">
          {it.name}
          <span className="bg-[#2a2a2a] text-gray-300 text-xs px-2 py-0.5 rounded-full">{it.count}</span>
        </span>
      ))}
    </div>
  );
}
