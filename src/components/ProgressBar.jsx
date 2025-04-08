// ProgressBar.jsx
import React, { useEffect, useRef, useState } from "react";

const ProgressBar = ({ solved, total, barColor = 'bg-orange-400' }) => {
  const percentage = total ? (solved / total) * 100 : 0;
  const progressRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (progressRef.current) observer.observe(progressRef.current);
    return () => {
      if (progressRef.current) observer.unobserve(progressRef.current);
    };
  }, []);

  return (
    <div ref={progressRef} className="mt-3">
      <div className="flex justify-between text-sm text-black/60 mb-1">
        <span>{solved}/{total} solved</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-[1500ms] ${barColor}`}
          style={{
            width: inView ? `${percentage}%` : `0%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
