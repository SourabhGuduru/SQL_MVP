import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionList = ({ company, difficulty }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (company) params.append("company", company);
    if (difficulty) params.append("difficulty", difficulty);

    const endpoint = `http://localhost:5000/questions?${params.toString()}`;

    axios.get(endpoint)
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, [company, difficulty]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Questions</h2>
      {questions.length === 0 ? (
        <p className="text-gray-500">No questions found.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-2">
          {questions.map(q => (
            <li key={q.id}>
              <div className="font-medium">{q.title}</div>
              <div className="text-sm text-gray-600">Difficulty: {q.difficulty}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;

