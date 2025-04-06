import React, { useState } from "react";
import CompanyFilter from "../components/CompanyFilter";
import QuestionList from "../components/QuestionList";
import SQLEditor from "../components/SQLEditor";

const Home = () => {
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Difficulties");
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const clearFilters = () => {
    setSelectedCompany("All Companies");
    setSelectedDifficulty("All Difficulties");
    setSelectedQuestion(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        🧠 SQL Interview Prep
      </h1>

      {/* Company Filter */}
      <CompanyFilter onSelect={setSelectedCompany} />

      {/* Difficulty Filter */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2 flex items-center gap-2">
          🎯 Select Difficulty
        </label>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="All Difficulties">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Clear Filters */}
      {(selectedCompany !== "All Companies" || selectedDifficulty !== "All Difficulties") && (
        <div className="mb-6">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Questions */}
      <QuestionList
        company={selectedCompany}
        difficulty={selectedDifficulty}
        onQuestionClick={setSelectedQuestion}
      />

      {/* SQL Editor */}
      {selectedQuestion && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">📝 {selectedQuestion.title}</h2>
          <p className="text-gray-700 mb-4">{selectedQuestion.description}</p>
          <SQLEditor />
        </div>
      )}
    </div>
  );
};

export default Home;
