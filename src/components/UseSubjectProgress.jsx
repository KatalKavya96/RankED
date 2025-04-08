import { useEffect, useState } from "react";

const UseSubjectProgress = (subject, totalQuestions) => {
  const [solved, setSolved] = useState(0);

  const updateProgress = () => {
    const solvedQuestions = JSON.parse(localStorage.getItem("solvedQuestions") || "[]");
    const allStats = JSON.parse(localStorage.getItem("allQuestions") || "[]");

    const matched = solvedQuestions.filter((qId) => {
      const q = allStats.find(q => q._id === qId);
      return q?.subject?.toLowerCase() === subject.toLowerCase();
    });

    setSolved(matched.length);
  };

  useEffect(() => {
    updateProgress();

    // Listen to solvedStatsUpdate
    window.addEventListener("solvedStatsUpdate", updateProgress);
    return () => window.removeEventListener("solvedStatsUpdate", updateProgress);
  }, []);

  return { solved, total: totalQuestions };
};

export default UseSubjectProgress;
