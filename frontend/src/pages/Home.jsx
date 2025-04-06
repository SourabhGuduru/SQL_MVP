import React, { useState } from "react";
import CompanyFilter from "../components/CompanyFilter";
import QuestionList from "../components/QuestionList";

const Home = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      {/* Company Filter */}
      <CompanyFilter onSelect={setSelectedCompany} />

      {/* Difficulty Filter */}
      <div className="mb-6 mt-4">
        <h2 className="text-xl font-semibold mb-2">Filter by Difficulty</h2>
        <div className="flex gap-2">
          {["Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedDifficulty(level)}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* 📋 Questions */}
      <QuestionList
        company={selectedCompany}
        difficulty={selectedDifficulty}
        search={searchTerm}
      />
    </div>
  );
};

export default Home;


