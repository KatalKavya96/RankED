import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useParams, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

// Helper Functions
const filterQuestions = (questions, filters, search, bookmarked) => {
  const { difficulty, shift, year, bookmarkedOnly } = filters;
  const shiftValue = shift.trim().toLowerCase();

  return questions.filter(q => {
    if (bookmarkedOnly && !bookmarked.includes(q._id)) return false;
    const qYear = String(q.year).trim();
    const qShift = String(q.shift).trim().toLowerCase();
    const qDifficulty = String(q.difficulty).trim().toLowerCase();
    const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase());
    return (
      (!difficulty || qDifficulty === difficulty.toLowerCase()) &&
      (!shift || qShift === shiftValue) &&
      (!year || qYear === year) &&
      matchesSearch
    );
  });
};

const sortQuestions = (questions, sort) => {
  let sorted = [...questions];
  if (sort === 'year-desc') sorted.sort((a, b) => b.year - a.year);
  else if (sort === 'year-asc') sorted.sort((a, b) => a.year - b.year);
  else if (sort === 'difficulty') sorted.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
  return sorted;
};

const paginateQuestions = (questions, currentPage, QUESTIONS_PER_PAGE) => {
  const indexOfLast = currentPage * QUESTIONS_PER_PAGE;
  const indexOfFirst = indexOfLast - QUESTIONS_PER_PAGE;
  return questions.slice(indexOfFirst, indexOfLast);
};

const ChapterQuestions = () => {
  const { chapter: chapterName } = useParams();
  const optionRefs = {};
  const QUESTIONS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarked, setBookmarked] = useState(() => JSON.parse(localStorage.getItem('bookmarked')) || []);
  const [sort, setSort] = useState('');
  const { chapter } = useParams();
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filters, setFilters] = useState({ difficulty: '', shift: '', year: '', bookmarkedOnly: false });
  const [search, setSearch] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResult, setShowResult] = useState({});
  const [checked, setChecked] = useState({});
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const subject = pathParts[1]?.charAt(0).toUpperCase() + pathParts[1]?.slice(1);
  const subjectFromURL = pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1);
  const { user } = useUser();

  const syncProgressToDB = async () => {
    try {
      const solved = JSON.parse(localStorage.getItem('solvedQuestions') || '[]');
      const bookmarked = JSON.parse(localStorage.getItem('bookmarked') || '[]');
      const submissionLog = JSON.parse(localStorage.getItem('submissionLog') || '{}');
      const correctSubmissions = parseInt(localStorage.getItem('correctSubmissions') || '0');
      if (user) {
        await axios.patch(`http://localhost:5001/api/user/${user.uid}`, {
          solvedQuestions: solved,
          bookmarkedQuestions: bookmarked,
          submissionLog,
          correctSubmissions
        });
        console.log("✅ Progress synced to MongoDB");
      }
    } catch (err) {
      console.error("❌ Failed to sync progress", err);
    }
  };

  useEffect(() => {
    localStorage.setItem('bookmarked', JSON.stringify(bookmarked));
  }, [bookmarked]);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/questions?subject=${subject}&chapter=${chapter}`)
    .then(res => {
        setQuestions(res.data);
        setFilteredQuestions(res.data);
        console.log(res)
      })
      .catch(err => console.error(err));
  }, [chapter]);

  useEffect(() => {
    let filtered = filterQuestions(questions, filters, search, bookmarked);
    let sorted = sortQuestions(filtered, sort);
    setFilteredQuestions(sorted);
  }, [filters, search, questions, sort, bookmarked]);

  const currentQuestions = paginateQuestions(filteredQuestions, currentPage, QUESTIONS_PER_PAGE);

  const handleCheckAnswer = (qId) => {
    if (selectedOptions[qId]) {
      setChecked(prev => ({ ...prev, [qId]: true }));
      setShowResult(prev => ({ ...prev, [qId]: true }));
      const question = questions.find(q => q._id === qId);
      const selected = selectedOptions[qId];
      const correct = question.answer === selected;
      const today = new Date().toISOString().split('T')[0];
      const submissionLog = JSON.parse(localStorage.getItem('submissionLog') || '{}');
      submissionLog[today] = (submissionLog[today] || 0) + 1;
      localStorage.setItem('submissionLog', JSON.stringify(submissionLog));
      if (correct) {
        const correctSub = Number(localStorage.getItem('correctSubmissions') || '0');
        localStorage.setItem('correctSubmissions', String(correctSub + 1));
      }
      const stats = JSON.parse(localStorage.getItem('allQuestions') || '[]');
      const alreadyLogged = stats.some(entry => entry._id === qId);
      if (!alreadyLogged) {
        stats.push({
          _id: qId,
          difficulty: question.difficulty,
          question: question.question,
          chapter: chapterName || question.chapter || "unknown",
          subject: question.subject || subjectFromURL || "unknown",
          isCorrect: correct,
          timestamp: today,
        });
        localStorage.setItem('allQuestions', JSON.stringify(stats));
      }
      let solved = JSON.parse(localStorage.getItem('solvedQuestions') || '[]');
      let wrong = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
      const alreadySolved = solved.includes(qId);
      const alreadyWrong = wrong.includes(qId);
      if (correct) {
        if (alreadyWrong) {
          wrong = wrong.filter(id => id !== qId);
          localStorage.setItem('wrongQuestions', JSON.stringify(wrong));
        }
        if (!alreadySolved) {
          solved.push(qId);
          localStorage.setItem('solvedQuestions', JSON.stringify(solved));
          window.dispatchEvent(new Event("solvedStatsUpdate"));
        }
      }
      if (!correct && !alreadyWrong && !alreadySolved) {
        wrong.push(qId);
        localStorage.setItem('wrongQuestions', JSON.stringify(wrong));
      }
      syncProgressToDB();
    }
  };

  const handleRedo = (qId) => {
    setSelectedOptions(prev => ({ ...prev, [qId]: '' }));
    setShowResult(prev => ({ ...prev, [qId]: false }));
    setChecked(prev => ({ ...prev, [qId]: false }));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE)));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setSort('');
    setFilters({ difficulty: '', shift: '', year: '', bookmarkedOnly: false });
    setSearch('');
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row p-6 mt-20 gap-6">
        {/* Left Sidebar Filters */}
        <div className="w-full md:w-[250px] border border-black/40 rounded-lg bg-white p-4 h-fit shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Filters</h2>
          <input type="text" placeholder="Search question..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-2 mb-4 border border-black/40 rounded-md text-sm" />
          <select name="difficulty" onChange={handleFilterChange} value={filters.difficulty} className="w-full p-2 mb-4 border border-black/40 rounded-md text-sm">
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select name="shift" onChange={handleFilterChange} value={filters.shift} className="w-full p-2 mb-4 border border-black/40 rounded-md text-sm">
            <option value="">All Shifts</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
          <select name="year" onChange={handleFilterChange} value={filters.year} className="w-full p-2 mb-4 border border-black/40 rounded-md text-sm">
            <option value="">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
          <label className="flex items-center gap-2 text-sm mb-4">
            <input type="checkbox" className="accent-green-500" checked={filters.bookmarkedOnly} onChange={(e) => setFilters(prev => ({ ...prev, bookmarkedOnly: e.target.checked }))} /> Show Bookmarked
          </label>
          <button onClick={resetFilters} className="w-full bg-red-500 text-white py-2 rounded-md text-sm">Reset Filters</button>
        </div>

        {/* Question Cards */}
        <div className="flex-1 ">
          <h1 className="text2xl font-medium mb-2">{chapter} Questions</h1>
          {currentQuestions.map((q, idx) => (
            <div key={q._id} ref={el => optionRefs[q._id] = el} className="w-[950px] mb-7 p-2 bg-white text-black shadow-xl rounded-xl relative border border-black/45">
              <div className="text-sm text-gray-600 italic">
                <span className="absolute bottom-2 right-3 bg-green-500/90 text-white/90 px-4 py-1 text-xs rounded-lg">{q.source || "N/A"}</span>
              </div>
              <h2 className="font-light ml-2 text-lg mt-1 mb-2">Q{(currentPage - 1) * QUESTIONS_PER_PAGE + idx + 1}. {q.question}</h2>
              <ul className="ml-1 mt-1 list-none space-y-1">
                {q.options.map((opt, i) => {
                  const isSelected = selectedOptions[q._id] === opt;
                  const isCorrect = q.answer === opt;
                  const show = showResult[q._id];
                  return (
                    <li key={i} className={`cursor-pointer p-0.1 rounded-lg border ${
                      show && checked[q._id] && isSelected && isCorrect
                        ? 'bg-green-500/10 border-green-600'
                        : show && checked[q._id] && isSelected && !isCorrect
                        ? 'bg-red-500/10 border-red-500'
                        : isSelected
                        ? 'bg-blue-700/10 border-blue-400'
                        : 'hover:bg-black/10'
                    }`} onClick={() => !checked[q._id] && handleOptionSelect(q._id, opt)}>
                      <span className="font-semibold mr-5 ml-3 rounded-xl">{String.fromCharCode(65 + i)}</span> {opt}
                    </li>
                  );
                })}
              </ul>
              {!checked[q._id] && selectedOptions[q._id] && (
                <button onClick={() => handleCheckAnswer(q._id)} className="ml-1 mt-1 mr-2 bg-blue-600 text-xs text-white/90 px-3 py-1 rounded-lg cursor-pointer">Check Answer</button>
              )}
              {checked[q._id] && (
                <button onClick={() => handleRedo(q._id)} className="mt-3 ml-1 mr-5 text-xs bg-blue-600 border border-blue-500 cursor-pointer text-white/90 px-4 py-1 rounded-lg">Redo</button>
              )}
              {checked[q._id] && selectedOptions[q._id] !== q.answer && (
                <div className="text-green-600 text-xl mt-5 ml-4">✅ Correct Answer: {q.answer}</div>
              )}
              {checked[q._id] && (
                <p className="text-lg ml-4 text-black/70 italic mt-2">{q.explanation ? `Explanation: ${q.explanation}` : 'No explanation provided.'}</p>
              )}
              <button className={`ml-1 mt-5 text-black text-xs px-2 py-1 rounded-lg cursor-pointer ${bookmarked.includes(q._id) ? 'bg-yellow-300' : 'bg-green-400/90'}`} onClick={() => {
                setBookmarked(prev => prev.includes(q._id) ? prev.filter(id => id !== q._id) : [...prev, q._id]);
              }}>{bookmarked.includes(q._id) ? '★ Bookmarked' : '☆ Bookmark'}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">Prev</button>
        <span className="self-center">Page {currentPage} of {Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE)}</span>
        <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE)} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">Next</button>
      </div>
    </>
  );
};

export default ChapterQuestions;
