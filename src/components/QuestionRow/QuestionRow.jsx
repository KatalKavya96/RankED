import React from "react";

function difficultyColor(d) {
  if (d === "Easy") return "text-emerald-400";
  if (d === "Medium") return "text-yellow-400";
  return "text-red-400";
}

export default function QuestionRow({ q }) {
  return (
    <div className="bg-[#1b1b1b] hover:bg-[#202020] transition rounded-xl px-5 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={`w-2.5 h-2.5 rounded-full ${q.solved ? "bg-emerald-400" : "bg-gray-500"}`} />
        <span className="text-gray-200 font-medium">{q.id}. {q.title}</span>
      </div>

      <div className="flex items-center gap-8">
        <span className="text-sm text-gray-400">49.2%</span>
        <span className={`text-sm font-semibold ${difficultyColor(q.difficulty)}`}>{q.difficulty}</span>
        {/* mini progress bars mimic */}
        <div className="flex gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={`w-2 h-3 rounded-sm ${i * 20 < q.progress ? "bg-gray-400" : "bg-[#2a2a2a]"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
