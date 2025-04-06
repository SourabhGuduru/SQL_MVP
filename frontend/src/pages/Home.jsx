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
    <div className="p-4">
      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      {/* Filters */}
      <CompanyFilter onSelect={setSelectedCompany} />

      <div className="mb-6 mt-4">
        <h2 className="text-xl font-semibold mb-2">Filter by Difficulty</h2>
        <div className="flex gap-2">
          {["Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedDifficulty(level)}
              className={`px-4 py-2 rounded text-white ${
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
        <button
          onClick={clearFilters}
          className="mb-6 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Clear Filters
        </button>
      )}

      {/* Questions List */}
      <QuestionList
        company={selectedCompany}
        difficulty={selectedDifficulty}
        search={searchTerm}
      />

      {/* SQL Editor */}
      <SQLEditor />
    </div>
  );
};

export default Home;

