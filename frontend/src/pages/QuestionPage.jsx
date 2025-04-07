import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-github";

const QuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [query, setQuery] = useState("SELECT * FROM questions;");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://sql-prep-api.onrender.com/questions/${id}`)
      .then((res) => setQuestion(res.data))
      .catch(() => setQuestion(null))
      .finally(() => setLoading(false));
  }, [id]);

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

  if (loading) return <div className="p-6 text-gray-600">Loading question...</div>;
  if (!question) return <div className="p-6 text-red-500">❌ Question not found.</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-screen p-4">
      {/* Left Panel – Question Info */}
      <div className="w-full lg:w-1/3 bg-white border p-4 rounded shadow overflow-auto relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-sm"
        >
          🔙 Back
        </button>

        <h2 className="text-xl font-bold mb-2 mt-10">📄 {question.title}</h2>
        <p className="text-gray-700 mb-2">{question.description}</p>
        <p className="text-sm text-gray-500 mb-4">🎯 Difficulty: {question.difficulty}</p>

        {/* Schema Display */}
        {question.schema_description && (
          <div className="mt-4">
            <h4 className="font-semibold text-gray-800 mb-2">📐 Table Schema</h4>
            <div className="bg-gray-50 p-3 rounded shadow-sm overflow-auto">
              <table className="w-full table-auto text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-2 font-semibold text-gray-700 border-b">🧾 Column</th>
                    <th className="text-left p-2 font-semibold text-gray-700 border-b">🧬 Type</th>
                  </tr>
                </thead>
                <tbody>
                  {question.schema_description.split(/,|\n/).map((line, idx) => {
                    const [rawCol, ...rest] = line.trim().split(/\s+/);
                    const col = rawCol?.replace(/[:(]/g, "");
                    const type = rest.join(" ")?.replace(/[),]/g, "");
                    return (
                      <tr key={idx}>
                        <td className="p-2 border-b font-mono text-gray-800">{col}</td>
                        <td className="p-2 border-b text-gray-600">{type}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Middle Panel – SQL Editor */}
      <div className="w-full lg:w-1/3 bg-white border p-4 rounded shadow overflow-auto">
        <h3 className="text-lg font-semibold mb-2">🧠 SQL Editor</h3>
        <AceEditor
          mode="sql"
          theme="github"
          value={query}
          onChange={(val) => setQuery(val)}
          name="sql-editor"
          editorProps={{ $blockScrolling: true }}
          className="w-full border"
          height="200px"
        />
        <button
          onClick={runQuery}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ▶️ Run Query
        </button>
        {error && <p className="text-red-500 mt-2">❌ {error}</p>}
      </div>

      {/* Right Panel – Output */}
      <div className="w-full lg:w-1/3 bg-white border p-4 rounded shadow overflow-auto">
        <h3 className="text-lg font-semibold mb-2">📊 Output</h3>
        {result && Array.isArray(result) ? (
          <div className="overflow-auto">
            <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
              <thead>
                <tr>
                  {Object.keys(result[0] || {}).map((col) => (
                    <th key={col} className="border px-3 py-2 bg-gray-100 text-left">
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
          </div>
        ) : typeof result === "string" ? (
          <p className="text-green-600 mt-2">✅ {result}</p>
        ) : (
          <p className="text-gray-500 mt-2">Run query to see output here.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;

