import React, { useState } from "react";
import CompanyFilter from "../components/CompanyFilter";
import QuestionList from "../components/QuestionList";
import SQLEditor from "../components/SQLEditor";
import QuestionPage from "../pages/QuestionPage";

const Home = () => {
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Difficulties");
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        🧠 SQL Interview Prep
      </h1>

      {/* Company Filter */}
      <CompanyFilter onSelect={setSelectedCompany} />

      {/* Difficulty Filter */}
      <div className="mb-6">
        <label
          htmlFor="difficulty"
          className="block text-lg font-semibold mb-2 flex items-center gap-2"
        >
          🎯 Select Difficulty
        </label>
        <select
          id="difficulty"
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

      {/* Question List or SQL Editor View */}
      {!selectedQuestion ? (
        <QuestionList
          company={selectedCompany}
          difficulty={selectedDifficulty}
          onQuestionClick={handleQuestionClick}
        />
      ) : (
        <QuestionPage
          question={selectedQuestion}
          onBack={() => setSelectedQuestion(null)}
        />
      )}
    </div>
  );
};

export default Home;
