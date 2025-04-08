import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const ChemistryQ = () => {
    const navigate = useNavigate();
    const [solvedMap, setSolvedMap] = useState({});
    const [accuracyMap, setAccuracyMap] = useState({});
    const [lastSolvedMap, setLastSolvedMap] = useState({});
    const [weightageMap, setWeightageMap] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('default');
  
    const chaptersC=[{"name":"Basic Concepts of Chemistry", "ques":180 ,"questions":{}},
      {"name":"Structure of Atom", "ques":215 ,"questions":{}},
      {"name":"Classification of Elements and Periodicity in Properties", "ques":157 ,"questions":{}},
      {"name":"Chemical Bonding and Molecular Structure", "ques":280 ,"questions":{}},
      {"name":"Thermodynamics", "ques":227 ,"questions":{}},
      {"name":"Chemical Equilibrium", "ques":106 ,"questions":{}},
      {"name":"Ionic Equilibrium", "ques":134 ,"questions":{}},
      {"name":"Redox Reactions", "ques":98 ,"questions":{}},
      {"name":"p-Block Elements (Group 13 & 14)", "ques":84 ,"questions":{}},
      {"name":"General Organic Chemistry", "ques":390 ,"questions":{}},
      {"name":"Hydrocarbons", "ques":203 ,"questions":{}},
      {"name":"Solutions", "ques":193 ,"questions":{}},
      {"name":"Electrochemistry", "ques":204 ,"questions":{}},
      {"name":"Chemical Kinetics", "ques":193 ,"questions":{}},
      {"name":"p-Block Elements (Group 15, 16, 17 & 18)", "ques":180 ,"questions":{}},
      {"name":"d and f Block Elements", "ques":224 ,"questions":{}},
      {"name":"Coordination Compounds", "ques":319 ,"questions":{}},
      {"name":"Haloalkanes and Haloarenes", "ques":170 ,"questions":{}},
      {"name":"Alcohols, Phenols and Ethers", "ques":175 ,"questions":{}},
      {"name":"Aldehydes and Ketones", "ques":148 ,"questions":{}},
      {"name":"Carboxylic Acids Derivatives", "ques":67 ,"questions":{}},
      {"name":"Amines", "ques":180 ,"questions":{}},
      {"name":"Biomolecules", "ques":183 ,"questions":{}},
      {"name":"Practical Chemistry", "ques":32 ,"questions":{}},
  ]
  
    const totalSubjectQuestions = chaptersC.reduce((sum, ch) => sum + ch.ques, 0);
    const totalSolvedCount = Object.values(solvedMap || {}).reduce((sum, val) => sum + val, 0);
    const averageAcc = Object.values(accuracyMap || {});
    const overallAccuracy = averageAcc.length > 0 ? Math.round(averageAcc.reduce((sum, val) => sum + val, 0) / averageAcc.length) : 0;
    const submissionLog = JSON.parse(localStorage.getItem('submissionLog') || '{}');
    const totalSubmissions = Object.values(submissionLog).reduce((sum, val) => sum + val, 0);
  
    useEffect(() => {
      const updateStats = () => {
        const solved = JSON.parse(localStorage.getItem('solvedQuestions') || '[]');
        const allStats = JSON.parse(localStorage.getItem('allQuestions') || '[]');
        const chapterSolved = {};
        const chapterAccuracy = {};
        const chapterLastSolved = {};
  
        for (let chapter of chaptersC) {
          const filtered = allStats.filter(q =>
            (q.isCorrect === true || (q.isCorrect === undefined && solved.includes(q._id))) &&
            q.chapter?.toLowerCase() === chapter.name.toLowerCase()
          );
          const uniqueSet = new Set(filtered.map(q => q._id));
          chapterSolved[chapter.name] = uniqueSet.size;
  
          const chapterEntries = allStats.filter(q => q.chapter?.toLowerCase() === chapter.name.toLowerCase());
          const correct = chapterEntries.filter(q => q.isCorrect).length;
          const total = chapterEntries.length;
          chapterAccuracy[chapter.name] = total > 0 ? Math.round((correct / total) * 100) : 0;
  
          const lastSolvedDate = chapterEntries.reduce((latest, q) => {
            const ts = new Date(q.timestamp);
            return ts > latest ? ts : latest;
          }, new Date(0));
          chapterLastSolved[chapter.name] = lastSolvedDate.toDateString() !== 'Thu Jan 01 1970' ? lastSolvedDate.toLocaleDateString() : 'N/A';
        }
  
        setSolvedMap(chapterSolved);
        setAccuracyMap(chapterAccuracy);
        setLastSolvedMap(chapterLastSolved);
      };
  
      updateStats();
      window.addEventListener('solvedStatsUpdate', updateStats);
      return () => window.removeEventListener('solvedStatsUpdate', updateStats);
    }, []);
  
    useEffect(() => {
      const totalQues = chaptersC.reduce((acc, ch) => acc + ch.ques, 0);
      const tempMap = {};
      chaptersC.forEach((ch) => {
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
  
    

      const filteredChapters = [...chaptersC]
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
          <div className="w-[250px] border border-gray-300 rounded-lg bg-white p-4 h-fit">
            <h2 className="text-lg font-semibold mb-3">Filters</h2>
            <input
              type="text"
              placeholder="Search Chapter"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md text-sm"
            />
            <label className="text-sm font-medium">Sort by Weightage</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md text-sm"
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
              const accuracy = accuracyMap[ele.name] || 0;
              const lastSolved = lastSolvedMap[ele.name] || 'N/A';
              const status = getStatusBadge(solved, ele.ques);
              const weightage = weightageMap[ele.name] || 0;
      
              return (
                <div
                  key={ele.name}
                  onClick={() => navigate(`/chemistry/${encodeURIComponent(ele.name)}`)}
                  className="h-auto w-full border-r-4 border-r-orange-500 border-2 border-black/60 mt-5 rounded-lg p-3 hover:scale-102 transition duration-100 bg-white active:scale-103 cursor-pointer"
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
                            : weightage <= 5
                            ? 'bg-green-200 text-green-700'
                            : 'bg-red-200 text-red-700'
                        }`}
                      >
                        {weightage <= 3 ? 'Low' : weightage <= 5 ? 'Important' : 'Must Do'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs mb-3">{solved} / {ele.ques} Questions Solved</p>
                  <div className="w-full bg-gray-300 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-orange-500 h-2.5 rounded-full animate-grow transition-all duration-1000"
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
          <div className="min-w-[230px] border border-black/60 rounded-lg p-4 h-fit bg-white shadow-md">
            <h1 className="text-2xl font-bold">Physics</h1>
            <p className="text-sm text-gray-600">Total Questions: {totalSubjectQuestions}</p>
            <p className="text-sm text-gray-600">Solved: {totalSolvedCount}</p>
            <p className="text-sm text-gray-600">Accuracy: {overallAccuracy}%</p>
            <p className="text-sm text-gray-600">Submissions: {totalSubmissions}</p>
          </div>
      
        </div>
      </>
    );
  };
  
  export default ChemistryQ;
  
