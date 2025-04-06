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
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        🧠 SQL Interview Prep
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Company Filter */}
      <CompanyFilter onSelect={setSelectedCompany} />

      {/* Difficulty Filter */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          🎯 Filter by Difficulty
        </label>
        <div className="flex gap-3">
          {["Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedDifficulty(level)}
              className={`px-4 py-2 rounded text-white transition ${
                selectedDifficulty === level
                  ? "bg-purple-700"
                  : "bg-purple-500 hover:bg-purple-600"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCompany || selectedDifficulty || searchTerm) && (
        <div className="mb-6">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Questions List */}
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
