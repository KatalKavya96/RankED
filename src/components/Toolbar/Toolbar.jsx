// src/components/Toolbar.jsx
import React, { useState } from "react";
// Adjust this path if your Icons file is elsewhere:
import { IconSearch, IconSort, IconFilter } from "../Icons/Icons.jsx";

export default function Toolbar({
  onSearchChange,
  onSortClick,
  onFilterClick,
  solved = 0,
  total = 0,
  placeholder = "Search questions",
}) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearchChange && onSearchChange(val);
  };

  return (
    <div className="flex items-center gap-3 mt-5">
      {/* Search */}
      <div className="flex items-center gap-2 bg-[#202020] px-3 py-2 rounded-xl text-gray-300 w-full max-w-[360px]">
        <IconSearch className="w-5 h-5" />
        <input
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="bg-transparent outline-none text-sm w-full placeholder:text-gray-500"
        />
      </div>

      {/* Sort */}
      <button
        type="button"
        onClick={onSortClick}
        className="bg-[#202020] hover:bg-[#262626] px-3 py-2 rounded-xl"
        title="Sort"
      >
        <IconSort className="w-5 h-5 text-gray-300" />
      </button>

      {/* Filter */}
      <button
        type="button"
        onClick={onFilterClick}
        className="bg-[#202020] hover:bg-[#262626] px-3 py-2 rounded-xl"
        title="Filter"
      >
        <IconFilter className="w-5 h-5 text-gray-300" />
      </button>

      {/* Solved stats */}
      <div className="ml-auto text-sm text-gray-300 flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full" />
        {solved}/{total} Solved
        <button
          type="button"
          className="ml-3 text-gray-400 hover:text-white"
          title="Refresh"
          onClick={() => onSearchChange && onSearchChange(query)}
        >
          ⟲
        </button>
      </div>
    </div>
  );
}
