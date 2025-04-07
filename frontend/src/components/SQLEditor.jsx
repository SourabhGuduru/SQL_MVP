import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-github";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuestionPage = ({ question }) => {
  const [query, setQuery] = useState("SELECT * FROM questions;");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const runQuery = async () => {
    try {
      const res = await axios.post("https://sql-prep-api.onrender.com/run-sql", {
        query,
      });

      if (res.data.success) {
        setResult(res.data.rows || res.data.message);
        setError("");
      } else {
        setError(res.data.error);
        setResult(null);
      }
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  if (!question) return <div className="p-4">Question not found.</div>;

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel – Question Detail */}
      <div className="bg-white border p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          📄 {question.title}
        </h2>
        <p className="mb-4 text-gray-700">{question.description}</p>
        <p className="text-sm text-gray-600 mb-6">Difficulty: {question.difficulty}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200 transition"
        >
          ← Back to Questions
        </button>
      </div>

      {/* Middle Panel – SQL Editor */}
      <div className="w-full bg-white border p-4 rounded shadow overflow-auto flex flex-col">
        <h3 className="text-lg font-semibold mb-2">🧠 SQL Editor</h3>

        <AceEditor
          mode="sql"
          theme="github"
          value={query}
          onChange={(val) => setQuery(val)}
          name="sql-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="300px"
          fontSize={16}
          className="rounded border"
        />

        <button
          onClick={runQuery}
          className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-medium"
        >
          ▶️ Run Query
        </button>

        {error && <p className="text-red-500 mt-2">❌ {error}</p>}
      </div>

      {/* Right Panel – Output */}
      <div className="w-full bg-white border p-4 rounded shadow overflow-auto">
        <h3 className="text-lg font-semibold mb-2">📊 Output</h3>

        {result && Array.isArray(result) && result.length > 0 ? (
          <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
            <thead>
              <tr>
                {Object.keys(result[0] || {}).map((col) => (
                  <th key={col} className="border px-3 py-2 text-left bg-gray-100">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, idx) => (
                    <td key={idx} className="border px-3 py-2">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : result && typeof result === "string" ? (
          <p className="text-green-600">✅ {result}</p>
        ) : (
          <p className="text-gray-400">Run query to see output here.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
