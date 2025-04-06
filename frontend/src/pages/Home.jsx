import React, { useState } from "react";
import CompanyFilter from "../components/CompanyFilter";
import QuestionList from "../components/QuestionList";
import SQLEditor from "../components/SQLEditor";

const Home = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const clearFilters = () => {
    setSelectedCompany("");
    setSelectedDifficulty("");
    setSearchTerm("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 flex items-center justify-center gap-2">
        <span role="img" aria-label="brain">🧠</span> SQL Interview Prep
      </h1>

      {/* Filters */}
      <CompanyFilter onSelect={setSelectedCompany} />

      {/* Difficulty Dropdown */}
      <div className="mb-6">
        <label htmlFor="difficulty" className="block text-lg font-semibold mb-2">
          🎯 Filter by Difficulty
        </label>
        <select
          id="difficulty"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All Levels</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      {(selectedCompany || selectedDifficulty || searchTerm) && (
        <div className="mb-6">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Question List */}
      <QuestionList
        company={selectedCompany}
        difficulty={selectedDifficulty}
        search={searchTerm}
      />

      {/* SQL Editor */}
      <div className="mt-10">
        <SQLEditor />
      </div>
    </div>
  );
};

export default Home;
