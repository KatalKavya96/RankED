import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const MathsQ = () => {
  const navigate = useNavigate();
  const [solvedMap, setSolvedMap] = useState({});
  const [accuracyMap, setAccuracyMap] = useState({});
  const [lastSolvedMap, setLastSolvedMap] = useState({});
  const [weightageMap, setWeightageMap] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  const chaptersM=[{"name":"Basics of Maths", "ques":17 ,"questions":{}},
    {"name":"Quadritic Equations", "ques":172 ,"questions":{}},
    {"name":"Complex Numbers", "ques":194 ,"questions":{}},
    {"name":"Permutation and Combination", "ques":183 ,"questions":{}},
    {"name":"Sequence and Series", "ques":314 ,"questions":{}},
    {"name":"Binomial Theoram", "ques":242 ,"questions":{}},
    {"name":"Trignometic Ratios & Identities", "ques":54 ,"questions":{}},
    {"name":"Straight Lines", "ques":193 ,"questions":{}},
    {"name":"Circle", "ques":180 ,"questions":{}},
    {"name":"Parabola", "ques":127 ,"questions":{}},
    {"name":"Ellipse", "ques":104 ,"questions":{}},
    {"name":"Hyperbola", "ques":90 ,"questions":{}},
    {"name":"Limits", "ques":131 ,"questions":{}},
    {"name":"Statistics", "ques":144 ,"questions":{}},
    {"name":"Sets & Relations", "ques":100 ,"questions":{}},
    {"name":"Matrices", "ques":188 ,"questions":{}},
    {"name":"Determinants", "ques":183 ,"questions":{}},
    {"name":"Inverse Trignometric Functions", "ques":75 ,"questions":{}},
    {"name":"Functions", "ques":194 ,"questions":{}},
    {"name":"Continuity and Differentiability", "ques":138 ,"questions":{}},
    {"name":"Differentiation", "ques":70 ,"questions":{}},
    {"name":"Applications of Derivatives", "ques":263 ,"questions":{}},
    {"name":"Indefinite Integration", "ques":96 ,"questions":{}},
    {"name":"Definite Integration", "ques":275 ,"questions":{}},
    {"name":"Area Under Curves", "ques":159 ,"questions":{}},
    {"name":"Differential Equations", "ques":227 ,"questions":{}},
    {"name":"Vector Algebra", "ques":272 ,"questions":{}},
    {"name":"3D-Geometry", "ques":369 ,"questions":{}},
    {"name":"Probablity", "ques":217 ,"questions":{}},
]

  const totalSubjectQuestions = chaptersM.reduce((sum, ch) => sum + ch.ques, 0);
  const totalSolvedCount = Object.values(solvedMap || {}).reduce((sum, val) => sum + val, 0);

  const averageAcc = Object.values(accuracyMap || {}).map(acc =>
    acc.total > 0 ? (acc.correct / acc.total) * 100 : 0
  );
  const overallAccuracy = averageAcc.length > 0
    ? Math.round(averageAcc.reduce((sum, val) => sum + val, 0) / averageAcc.length)
    : 0;

  const submissionLog = JSON.parse(localStorage.getItem('submissionLog') || '{}');
  const totalSubmissions = Object.values(submissionLog).reduce((sum, val) => sum + val, 0);

  useEffect(() => {
    const updateStats = () => {
      const solvedIds = JSON.parse(localStorage.getItem("solvedQuestions") || "[]");
      const allStats = JSON.parse(localStorage.getItem("allQuestions") || "[]");

      const solvedMap = {};
      const accuracyMap = {};

      allStats.forEach(q => {
        const chapter = q.chapter;
        if (!chapter) return;

        if (solvedIds.includes(q._id)) {
          solvedMap[chapter] = (solvedMap[chapter] || 0) + 1;
        }

        accuracyMap[chapter] = accuracyMap[chapter] || { correct: 0, total: 0 };
        accuracyMap[chapter].total += 1;
        if (q.isCorrect) {
          accuracyMap[chapter].correct += 1;
        }
      });

      setSolvedMap(solvedMap);
      setAccuracyMap(accuracyMap);
    };

    updateStats();
    window.addEventListener('solvedStatsUpdate', updateStats);
    return () => window.removeEventListener('solvedStatsUpdate', updateStats);
  }, []);

  useEffect(() => {
    const totalQues = chaptersM.reduce((acc, ch) => acc + ch.ques, 0);
    const tempMap = {};
    chaptersM.forEach((ch) => {
      const weightage = ((ch.ques / totalQues) * 100).toFixed(1);
      tempMap[ch.name] = Number(weightage);
    });
    setWeightageMap(tempMap);
  }, []);

  const getStatusBadge = (solved, total) => {
    if (solved === 0) return 'Not Started';
    if (solved === total) return 'Mastered';
    return 'In Progress';
  };

  const AnimatedNumber = ({ finalValue }) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      let interval;
      let count = 0;
      interval = setInterval(() => {
        const random = Math.floor(Math.random() * 1000) / 10;
        setValue(random);
        count++;
        if (count > 15) {
          clearInterval(interval);
          setValue(finalValue);
        }
      }, 40);
      return () => clearInterval(interval);
    }, [finalValue]);
    return <span className="text-xs font-semibold text-purple-600">{value.toFixed(1)}%</span>;
  };

  const filteredChapters = [...chaptersM]
    .filter(ch => ch.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') return (weightageMap[a.name] || 0) - (weightageMap[b.name] || 0);
      if (sortOrder === 'desc') return (weightageMap[b.name] || 0) - (weightageMap[a.name] || 0);
      return 0;
    });

  return (
    <>
      <Navbar />
      <div className="flex flex-row w-full mt-24 px-4">

        {/* Sidebar */}
        <div className="w-[250px] border border-black/40 rounded-lg bg-white p-4 h-fit mt-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Filters</h2>
          <input
            type="text"
            placeholder="Search Chapter"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 border border-black/40 rounded-md text-sm"
          />
          <label className="text-sm font-medium">Sort by Weightage</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-2 mt-1 border border-black/40 rounded-md text-sm"
          >
            <option value="default">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {/* Chapter Cards */}
        <div className="flex-1 mx-8">
          {filteredChapters.map((ele) => {
            const solved = solvedMap[ele.name] || 0;
            const percent = Math.round((solved / ele.ques) * 100);
            const accObj = accuracyMap[ele.name] || { correct: 0, total: 0 };
            const accuracy = accObj.total > 0 ? Math.round((accObj.correct / accObj.total) * 100) : 0;
            const lastSolved = lastSolvedMap[ele.name] || 'N/A';
            const status = getStatusBadge(solved, ele.ques);
            const weightage = weightageMap[ele.name] || 0;

            return (
              <div
                key={ele.name}
                onClick={() => navigate(`/maths/${encodeURIComponent(ele.name)}`)}
                className="h-auto w-full border-r-4 border-r-blue-500 border-1 shadow-sm border-black/40 mt-5 rounded-lg p-3 hover:scale-102 transition duration-100 bg-white active:scale-103 cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-lg font-medium">{ele.name}</h1>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-purple-700">Weightage:</span>
                    <AnimatedNumber finalValue={weightage} />
                    <span
                      className={`text-[10px] font-semibold px-2 py-[1px] rounded-full ${
                        weightage <= 3
                          ? 'bg-yellow-200 text-yellow-700'
                          : weightage <= 4.5
                          ? 'bg-green-200 text-green-700'
                          : 'bg-red-200 text-red-700'
                      }`}
                    >
                      {weightage <= 3 ? 'Low' : weightage <= 4.5 ? 'Important' : 'Must Do'}
                    </span>
                  </div>
                </div>
                <p className="text-xs mb-3">{solved} / {ele.ques} Questions Solved</p>
                <div className="w-full bg-gray-300 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full animate-grow transition-all duration-1000"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right mt-1 text-gray-700">{percent}% Completed</p>
                <div className="flex justify-between items-center mt-1">
                  <div className="flex flex-col text-xs text-gray-700">
                    <span>Accuracy: {accuracy}%</span>
                    <span>Last solved on: {lastSolved}</span>
                  </div>
                  <div className="text-xs font-semibold text-blue-600">{status}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subject Stats Card */}
        <div className="min-w-[230px] border border-black/40 rounded-lg p-4 h-fit bg-white mt-5 shadow-sm">
          <h1 className="text-2xl font-bold">Mathematics</h1>
          <p className="text-sm text-gray-600">Total Questions: {totalSubjectQuestions}</p>
          <p className="text-sm text-gray-600">Solved: {totalSolvedCount}</p>
          <p className="text-sm text-gray-600">Accuracy: {overallAccuracy}%</p>
          <p className="text-sm text-gray-600">Submissions: {totalSubmissions}</p>
        </div>
      </div>
    </>
  );
  };
  
  
  export default MathsQ;
  
