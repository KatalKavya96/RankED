import React from 'react';

const RecentSolves = ({ questions }) => {
  return (
    <div className="flex-1 min-w-[200px]">
      <h2 className="text-sm font-semibold mb-2 text-gray-300">Recent Solves</h2>
      <ul className="text-sm space-y-1 max-h-[140px] overflow-y-auto pr-2">
        {questions
          .filter(q => q.isSolved)
          .slice(-5)
          .reverse()
          .map((q, i) => (
            <li key={i} className="text-white/80 truncate hover:text-white">
              {q.question}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecentSolves;
