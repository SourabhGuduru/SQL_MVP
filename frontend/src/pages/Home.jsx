import React, { useState } from "react";
import CompanyFilter from "../components/CompanyFilter";
import QuestionList from "../components/QuestionList";

const Home = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  return (
    <div>
      <CompanyFilter onSelect={setSelectedCompany} />
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Filter by Difficulty</h2>
        <div className="flex gap-2">
          {["Easy", "Medium", "Hard"].map(level => (
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

      <QuestionList company={selectedCompany} difficulty={selectedDifficulty} />
    </div>
  );
};

export default Home;

