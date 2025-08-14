import React from "react";

export default function SubjectTabs({ items }) {
  return (
    <div className="flex gap-4 mt-4">
      {items.map((t, i) => (
        <button
          key={t.id}
          className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
            i === 0
              ? "bg-white text-black"
              : "bg-[#2a2a2a] text-gray-200 hover:bg-[#313131]"
          }`}
        >
          {/* small left dot */}
          <span className={`inline-block w-2 h-2 rounded-full ${i === 0 ? "bg-black" : "bg-gray-400"}`}></span>
          {t.name}
        </button>
      ))}
    </div>
  );
}
