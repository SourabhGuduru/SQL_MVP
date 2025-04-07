import React, { useState } from "react";
import CompanyFilter from "../components/CompanyFilter";
import QuestionList from "../components/QuestionList";

const Home = () => {
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Difficulties");
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        💼 SQL Interview Questions
      </h1>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block font-semibold mb-1">🔎 Search</label>
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-4 py-2 rounded shadow-sm"
          />
        </div>

        <div className="flex-1">
          <CompanyFilter onSelect={setSelectedCompany} />
        </div>

        <div className="flex-1">
          <label className="block font-semibold mb-1">🎯 Difficulty</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full border px-4 py-2 rounded shadow-sm"
          >
            <option value="All Difficulties">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Question Table */}
      <QuestionList
        company={selectedCompany}
        difficulty={selectedDifficulty}
        search={search}
      />
    </div>
  );
};

export default Home;
