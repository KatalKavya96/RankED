import React, { useEffect, useState } from 'react';
import RecentSolves from './RecentSolved';
const SolvedStats = () => {
  const [questions, setQuestions] = useState([]);
  const [accuracy, setAccuracy] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  const totalQuestions = {
    Easy: 50,
    Medium: 30,
    Hard: 20 
  };

  const updateSolvedStats = () => {
    const solvedIds = JSON.parse(localStorage.getItem('solvedQuestions') || '[]');
    const allQuestions = JSON.parse(localStorage.getItem('allQuestions') || '[]');
    const wrongLog = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
    const totalAttempts = solvedIds.length + wrongLog.length;
    const acc = totalAttempts > 0 ? Math.round((solvedIds.length / totalAttempts) * 100) : 0;
    setAccuracy(acc);

    const updated = allQuestions.map(q => ({ ...q, isSolved: solvedIds.includes(q._id) }));
    setQuestions(updated);

    const heatmapLog = JSON.parse(localStorage.getItem('submissionLog') || '{}');
    setTotalSubmissions(Object.values(heatmapLog).reduce((sum, val) => sum + val, 0));
  };

  useEffect(() => {
    updateSolvedStats();
    const handleStorageChange = () => updateSolvedStats();
    window.addEventListener('solvedStatsUpdate', handleStorageChange);

    const interval = setInterval(updateSolvedStats, 2000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('solvedStatsUpdate', handleStorageChange);
    };
  }, []);

  const difficultyStats = ['Easy', 'Medium', 'Hard'].map(level => {
    const levelQs = questions.filter(q => q.difficulty === level);
    const solved = levelQs.filter(q => q.isSolved).length;
    return { level, solved, total: totalQuestions[level] };
  });

  const totalSolved = difficultyStats.reduce((sum, stat) => sum + stat.solved, 0);

  const colors = {
    Easy: '#06b6d4',
    Medium: '#facc15',
    Hard: '#ef4444'
  };

  return (
    <section className="h-auto w-full max-w-[950px] mx-auto border border-black rounded-xl text-white bg-zinc-900   px-5 py-5 ">
      <div className="flex justify-between items-start gap-6 flex-wrap">
        {/* Circular Segmented Progress */}
        <div className="relative group" style={{ width: 130, height: 130 }}>
          <svg width="130" height="130" viewBox="0 0 36 36" className="rotate-[-90deg]">
          

            {(() => {
              const radius = 15.9155;
              const circumference = 2 * Math.PI * radius;
              let offset = 0;

              <circle
                cx="18"
                cy="18"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.5)"  // Light transparent ring
                strokeWidth="2.2"
            />

              return difficultyStats.map(({ level, solved, total }) => {
                const percent = total > 0 ? solved / total : 0;
                const length = circumference * percent;
                const dashArray = `${length} ${circumference - length}`;
                const dashOffset = -offset;
                offset += length;
                return (
                  <circle
                    key={level}
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    stroke={colors[level]}
                    strokeWidth="2.2"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    style={{
                      transition: 'stroke-dasharray 0.6s ease, stroke-dashoffset 0.6s ease',
                      
                    }}
                  />
                );
              });
            })()}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none group-hover:opacity-0 transition-opacity">
            <strong className="text-4xl text-white/90">{totalSolved}</strong>
            <span className="text-xs text-white/70">of {Object.values(totalQuestions).reduce((a, b) => a + b, 0)}</span>
            <p className="text-xs text-green-400 mt-2">✓ Solved</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className='text-xs text-white/80'>Accuracy : </span>  {accuracy}%
          </div>
        </div>

        {/* Difficulty Stats */}
        <div className="flex flex-col gap-2 w-full max-w-[200px]">
          {difficultyStats.map(({ level, solved, total }) => (
            <div
              key={level}
              className="flex justify-between items-center p-2 bg-[#2b2b2b] rounded-md cursor-pointer hover:bg-[#3b3b3b]"
              onClick={() => console.log(`Filter: ${level}`)}
            >
              <span
                className={`font-semibold ${
                  level === 'Easy'
                    ? 'text-cyan-400/90'
                    : level === 'Medium'
                    ? 'text-yellow-400/90'
                    : 'text-red-400/90'
                }`}
              >
                {level}.
              </span>
              <span className="text-xs text-white/90">
                {solved}/{total} ({Math.round((solved / (total || 1)) * 100)}%)
              </span>
            </div>
          ))}
        </div>

        {/* Recent Solves Component */}
        {/* <RecentSolves questions={questions} />  Pass the questions prop */}
      </div>
    </section>
  );
};

export default SolvedStats;
