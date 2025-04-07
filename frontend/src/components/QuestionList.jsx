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
    return <p className="italic text-gray-500 mt-6">Please select filters to view questions.</p>;
  }

  if (loading) {
    return <p className="text-gray-500 mt-6">Loading questions...</p>;
  }

  if (questions.length === 0) {
    return <p className="text-gray-500 mt-6">No questions found.</p>;
  }

  return (
    <div className="bg-white border rounded shadow overflow-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100 text-sm text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left border-b">#</th>
            <th className="px-4 py-2 text-left border-b">🧠 Title</th>
            <th className="px-4 py-2 text-left border-b">🎯 Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, index) => (
            <tr
              key={q.id}
              className="hover:bg-purple-50 cursor-pointer transition"
              onClick={() => navigate(`/questions/${q.id}`)}
            >
              <td className="px-4 py-2 border-b text-gray-500">{index + 1}</td>
              <td className="px-4 py-2 border-b font-medium text-purple-800">{q.title}</td>
              <td className="px-4 py-2 border-b">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    q.difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : q.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {q.difficulty}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
