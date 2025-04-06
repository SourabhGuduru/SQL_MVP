import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SQLEditor from "../components/SQLEditor";

const QuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    axios.get(`https://sql-prep-api.onrender.com/questions/${id}`)
      .then((res) => setQuestion(res.data))
      .catch((err) => console.error("Failed to fetch question:", err));
  }, [id]);

  if (!question) {
    return <div className="text-center mt-8">Loading question...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Left Panel - Question */}
      <div className="w-1/3 p-6 border-r overflow-auto">
        <h2 className="text-xl font-bold mb-2">{question.title}</h2>
        <p className="text-gray-700">{question.description}</p>
        <p className="text-sm text-gray-500 mt-4">Difficulty: {question.difficulty}</p>
      </div>

      {/* Middle Panel - SQL Editor */}
      <div className="w-1/3 p-6 border-r">
        <h3 className="text-lg font-semibold mb-2">💻 SQL Editor</h3>
        <SQLEditor />
      </div>

      {/* Right Panel - Output (Mock) */}
      <div className="w-1/3 p-6">
        <h3 className="text-lg font-semibold mb-2">📤 Output</h3>
        <div className="bg-gray-100 border rounded p-4 h-full overflow-auto">
          <p className="text-gray-500">Run query to view output here.</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
