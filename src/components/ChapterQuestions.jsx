import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

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

  useEffect(() => {
    localStorage.setItem('bookmarked', JSON.stringify(bookmarked));
  }, [bookmarked]);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/questions?subject=Physics&chapter=${chapter}`)
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

  const handleOptionSelect = (qId, option) => {
    if (!checked[qId]) {
      setSelectedOptions(prev => ({ ...prev, [qId]: option }));
    }
  };

  const handleCheckAnswer = (qId) => {
    if (selectedOptions[qId]) {
      setChecked(prev => ({ ...prev, [qId]: true }));
      setShowResult(prev => ({ ...prev, [qId]: true }));
  
      const question = questions.find(q => q._id === qId);
      const selected = selectedOptions[qId];
      const correct = question.answer === selected;
  
      // Log submission for heatmap (or streak)
      const today = new Date().toISOString().split('T')[0];
      const log = JSON.parse(localStorage.getItem('submissionLog') || '{}');
      log[today] = (log[today] || 0) + 1;
      localStorage.setItem('submissionLog', JSON.stringify(log));
  
      // Track solved or wrong question
      const solved = JSON.parse(localStorage.getItem('solvedQuestions') || '[]');
      const wrong = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
      const stats = JSON.parse(localStorage.getItem('allQuestions') || '[]');
  
      // Avoid logging same question multiple times
      const alreadyLogged = stats.some(entry => entry._id === qId);
      if (!alreadyLogged) {
        stats.push({
          _id: qId,
          difficulty: question.difficulty,
          question: question.question,
          isCorrect: correct,
          timestamp: today,
        });
        localStorage.setItem('allQuestions', JSON.stringify(stats));
      }
  
      if (correct && !solved.includes(qId)) {
        solved.push(qId);
        localStorage.setItem('solvedQuestions', JSON.stringify(solved));
      } else if (!correct && !wrong.includes(qId)) {
        wrong.push(qId);
        localStorage.setItem('wrongQuestions', JSON.stringify(wrong));
      }
    }
  };
  

  const handleRedo = (qId) => {
    setSelectedOptions(prev => ({ ...prev, [qId]: '' }));
    setShowResult(prev => ({ ...prev, [qId]: false }));
    setChecked(prev => ({ ...prev, [qId]: false }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(optionRefs).forEach(([id, ref]) => {
        if (ref && !ref.contains(event.target)) {
          setSelectedOptions(prev => ({ ...prev, [id]: '' }));
          setShowResult(prev => ({ ...prev, [id]: false }));
          setChecked(prev => ({ ...prev, [id]: false }));
        }
      });
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options); // Example: "April 25, 2025"
  };

  return (
    <>
      <Navbar />
      <div className="p-6 mt-20">
        <h1 className="text-3xl font-medium mb-10 border border-black">{chapter} Questions</h1>

        {/* Sticky Filters */}
        <div className="sticky top-22 z-10  p-4 rounded-xl bg-black/85 text-white/90  shadow-[3px_7px_7px_2px_rgba(0,0,0,0.5)] mb-15  flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-1 rounded-lg text-sm flex-1 min-w-[200px] placeholder-white/90"
          />

          <select name="difficulty" onChange={handleFilterChange} value={filters.difficulty} className="border p-1 text-sm rounded-lg">
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select name="shift" onChange={handleFilterChange} value={filters.shift} className="border p-1 text-sm rounded-lg">
            <option value="">All Shifts</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>

          <select name="year" onChange={handleFilterChange} value={filters.year} className="border p-1 text-sm rounded-lg">
            <option value="">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          <label className="flex items-center gap-2 text-xs">
          <input
            className="accent-green-500 w-4 h-5 "
            type="checkbox"
            checked={filters.bookmarkedOnly}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                bookmarkedOnly: e.target.checked,
              }))
            }
          />Show Bookmarked</label>

          <button onClick={resetFilters} className="bg-red-500/70 text-white p-2 text-sm rounded-lg">
            Reset Filters
          </button>
        </div>

        {/* Questions */}
        {currentQuestions.map((q, idx) => (
          <div key={q._id} ref={el => optionRefs[q._id] = el} className="ml-10 mr-10 mb-20 p-7 bg-black/88 text-white  shadow-[3px_7px_7px_2px_rgba(0,0,0,0.5)] rounded-xl relative">
            <div className="text-sm text-gray-600 mb-2 italic">
              <span className="absolute top-4 right-5 bg-green-500/70 text-white/90 px-4 py-1 text-xs rounded-lg">
                {q.source ? q.source : "N/A"}
              </span>
            </div>
            <h2 className="font-light ml-4 text-xl mt-10 mb-6">Q{(currentPage - 1) * QUESTIONS_PER_PAGE + idx + 1}.   {q.question}</h2>

            <ul className="ml-4 mt-2 list-none space-y-4">
              {q.options.map((opt, i) => {
                const isSelected = selectedOptions[q._id] === opt;
                const isCorrect = q.answer === opt;
                const show = showResult[q._id];

                return (
                  <li
                    key={i}
                    className={`cursor-pointer p-2 rounded-xl border ${
                      show && checked[q._id] && isSelected && isCorrect ? 'bg-green-500/10 border-green-600' :
                      show && checked[q._id] && isSelected && !isCorrect ? 'bg-red-500/10 border-red-500' :
                      isSelected ? 'bg-blue-700/10 border-blue-400' : 'hover:bg-white/15'
                    }`}
                    onClick={() => !checked[q._id] && handleOptionSelect(q._id, opt)}
                  >
                    <span className="font-semibold mr-3 border border-white px-2 py-1 rounded-xl">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </li>
                );
              })}
            </ul>

            {!checked[q._id] && selectedOptions[q._id] && (
              <button
                onClick={() => handleCheckAnswer(q._id)}
                className="ml-4 mt-1 mr-2 bg-blue-600 text-sm text-white/90 px-3 py-1 rounded-xl cursor-pointer"
              >
                Check Answer
              </button>
            )}

            {checked[q._id] && (
              <button
                onClick={() => handleRedo(q._id)}
                className="mt-5 ml-4 mr-5 text-sm bg-blue-600/60 border border-blue-500 cursor-pointer text-white/90 px-4 py-1 rounded-xl"
              >
                Redo
              </button>
            )}

            {checked[q._id] && (
              <>
                {selectedOptions[q._id] !== q.answer && (
                  <div className="text-green-600 text-xl mt-5 ml-4">✅ Correct Answer: {q.answer}</div>
                )}
                <p className="text-lg ml-4 text-white/70 italic mt-2">
                  {q.explanation ? `Explanation: ${q.explanation}` : 'No explanation provided.'}
                </p>
              </>
            )}

            <button
              className={`ml-4 mt-5 text-black text-sm px-2 py-1 rounded-xl cursor-pointer ${bookmarked.includes(q._id) ? 'bg-yellow-300' : 'bg-green-400/90'}`}
              onClick={() => {
                setBookmarked(prev => prev.includes(q._id) ? prev.filter(id => id !== q._id) : [...prev, q._id]);
              }}
            >
              {bookmarked.includes(q._id) ? '★ Bookmarked' : '☆ Bookmark'}
            </button>

            {checked[q._id] && (
              <>
                {
                }
              </>
)}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >Prev</button>
        <span className="self-center">Page {currentPage} of {Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE)}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE)}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >Next</button>
      </div>
    </>
  );
};

export default ChapterQuestions;
