import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

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
      })
      .catch(err => console.error(err));
  }, [chapter]);

  useEffect(() => {
    const { difficulty, shift, year } = filters;
    const shiftValue = shift.trim().toLowerCase();
    const filtered = questions.filter(q => {
      if (filters.bookmarkedOnly && !bookmarked.includes(q._id)) return false;
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
    let sorted = [...filtered];
    if (sort === 'year-desc') sorted.sort((a, b) => b.year - a.year);
    else if (sort === 'year-asc') sorted.sort((a, b) => a.year - b.year);
    else if (sort === 'difficulty') sorted.sort((a, b) => a.difficulty.localeCompare(b.difficulty));

    setFilteredQuestions(sorted);
  }, [filters, search, questions, sort, bookmarked]);

  const indexOfLast = currentPage * QUESTIONS_PER_PAGE;
  const indexOfFirst = indexOfLast - QUESTIONS_PER_PAGE;
  const currentQuestions = filteredQuestions.slice(indexOfFirst, indexOfLast);

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

  return (
    <>
      <Navbar />
      <div className="p-6 mt-20">
        <h1 className="text-2xl font-bold mb-10">{chapter} Questions</h1>

        {/* Sticky Filters */}
        <div className="sticky top-16 z-10 bg-[#f9f9f9] p-4 rounded shadow mb-15 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded flex-1 min-w-[200px]"
          />

          <select name="difficulty" onChange={handleFilterChange} value={filters.difficulty} className="border p-2 rounded">
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select name="shift" onChange={handleFilterChange} value={filters.shift} className="border p-2 rounded">
            <option value="">All Shifts</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>

          <select name="year" onChange={handleFilterChange} value={filters.year} className="border p-2 rounded">
            <option value="">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          <select onChange={(e) => setSort(e.target.value)} value={sort} className="border p-2 rounded">
            <option value="">Sort By</option>
            <option value="year-desc">Year ↓</option>
            <option value="year-asc">Year ↑</option>
            <option value="difficulty">Difficulty</option>
          </select>

          <button onClick={resetFilters} className="bg-red-500 text-white px-4 py-2 rounded">
            Reset Filters
          </button>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={filters.bookmarkedOnly} onChange={(e) => setFilters(prev => ({ ...prev, bookmarkedOnly: e.target.checked }))} />
            Show Only Bookmarked
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={showAnswers} onChange={() => setShowAnswers(!showAnswers)} />
            Show Answers
          </label>
        </div>

        {/* Questions */}
        {currentQuestions.map((q, idx) => (
          <div key={q._id} ref={el => optionRefs[q._id] = el} className="ml-10 mr-10 mb-20 p-5 bg-white border shadow rounded">
            <div className="text-sm text-gray-600 mb-2 italic">
              {q.date} • {q.shift} • {q.difficulty} • {q.year} • {q.type}
            </div>
            <h2 className="font-semibold">{idx + 1}. {q.question}</h2>

            <ul className="ml-4 mt-2 list-none space-y-2">
              {q.options.map((opt, i) => {
                const isSelected = selectedOptions[q._id] === opt;
                const isCorrect = q.answer === opt;
                const show = showResult[q._id];

                return (
                  <li
                    key={i}
                    className={`cursor-pointer p-2 rounded border ${
                      show && checked[q._id] && isSelected && isCorrect ? 'bg-green-200 border-green-600' :
                      show && checked[q._id] && isSelected && !isCorrect ? 'bg-red-200 border-red-600' :
                      isSelected ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => !checked[q._id] && handleOptionSelect(q._id, opt)}
                  >
                    <span className="font-semibold mr-3 border border-black px-2 py-1 rounded-xl">
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
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
              >
                Check Answer
              </button>
            )}

            {checked[q._id] && (
              <button
                onClick={() => handleRedo(q._id)}
                className="mt-2 ml-3 bg-gray-300 text-black px-4 py-1 rounded"
              >
                Redo
              </button>
            )}

            {checked[q._id] && showResult[q._id] && selectedOptions[q._id] !== q.answer && (
              <div className="text-green-600 text-sm mt-2">✅ Correct Answer: {q.answer}</div>
            )}

            <button
              className={`mt-2 text-sm px-2 py-1 rounded ${bookmarked.includes(q._id) ? 'bg-yellow-300' : 'bg-gray-200'}`}
              onClick={() => {
                setBookmarked(prev => prev.includes(q._id) ? prev.filter(id => id !== q._id) : [...prev, q._id]);
              }}
            >
              {bookmarked.includes(q._id) ? '★ Bookmarked' : '☆ Bookmark'}
            </button>

            {checked[q._id] && showAnswers && (
              <>
                <p className="text-green-600 text-sm mt-2">✅ Correct: {q.answer}</p>
                <p className="text-sm text-gray-600 italic">Explanation: {q.explanation}</p>
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
