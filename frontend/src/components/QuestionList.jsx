import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionList = ({ company, difficulty, onQuestionClick }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (company) params.append("company", company);
    if (difficulty) params.append("difficulty", difficulty);

    axios
      .get(`https://sql-prep-api.onrender.com/questions?${params.toString()}`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  }, [company, difficulty]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Questions</h2>
      {questions.length === 0 ? (
        <p className="text-gray-500">No questions found.</p>
      ) : (
        <ul className="space-y-3">
          {questions.map((q) => (
            <li
              key={q.id}
              onClick={() => onQuestionClick(q)}
              className="cursor-pointer p-3 bg-white border rounded hover:bg-gray-50 transition"
            >
              <div className="font-medium">{q.title}</div>
              <div className="text-sm text-gray-500">Difficulty: {q.difficulty}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;
