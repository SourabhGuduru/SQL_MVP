import React, { useState } from "react";
import CompanyFilter from "../components/CompanyFilter";
import QuestionList from "../components/QuestionList";
import SQLEditor from "../components/SQLEditor";

const Home = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const clearFilters = () => {
    setSelectedCompany("");
    setSelectedDifficulty("");
    setSelectedQuestion(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        🧠 SQL Interview Prep
      </h1>

      {/* Filters */}
      <CompanyFilter onSelect={setSelectedCompany} />

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

      {(selectedCompany || selectedDifficulty) && (
        <div className="mb-6">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Show Questions Only When Filters Are Selected */}
      {selectedCompany && selectedDifficulty && !selectedQuestion && (
        <QuestionList
          company={selectedCompany}
          difficulty={selectedDifficulty}
          onQuestionClick={setSelectedQuestion}
        />
      )}

      {/* Show Selected Question + SQL Editor */}
      {selectedQuestion && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-2xl font-bold mb-2">{selectedQuestion.title}</h2>
          <p className="text-gray-600 mb-4">{selectedQuestion.description}</p>
          <SQLEditor />
          <button
            onClick={() => setSelectedQuestion(null)}
            className="mt-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            🔙 Back to Questions
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
