import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuestionList = ({ company, difficulty }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();
    if (company && company !== "All Companies") params.append("company", company);
    if (difficulty && difficulty !== "All Difficulties") params.append("difficulty", difficulty);

    axios
      .get(`https://sql-prep-api.onrender.com/questions?${params.toString()}`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Failed to load questions", err))
      .finally(() => setLoading(false));
  }, [company, difficulty]);

  if (!company && !difficulty) {
    return <p className="italic text-gray-500 mt-6">Please select both a company and difficulty level to view questions.</p>;
  }

  if (loading) {
    return <p className="text-gray-500 mt-6">Loading questions...</p>;
  }

  if (questions.length === 0) {
    return <p className="text-gray-500 mt-6">No questions found for the selected filters.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">🧠 Questions</h2>
      <ul className="space-y-4">
        {questions.map((q) => (
          <li
            key={q.id}
            className="bg-white p-4 border rounded shadow hover:bg-gray-50 cursor-pointer transition"
            onClick={() => navigate(`/questions/${q.id}`)}
          >
            <div className="font-semibold text-lg">{q.title}</div>
            <div className="text-sm text-gray-600">Difficulty: {q.difficulty}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
