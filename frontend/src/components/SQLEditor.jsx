import React, { useState } from "react";
import axios from "axios";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-github";

const SQLEditor = () => {
  const [query, setQuery] = useState("SELECT * FROM questions;");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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

  return (
    <div className="mt-6 border p-4 rounded shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">📝 Try SQL Query</h3>

      <AceEditor
        mode="sql"
        theme="github"
        value={query}
        onChange={(val) => setQuery(val)}
        name="sql-editor"
        editorProps={{ $blockScrolling: true }}
        className="w-full border"
        height="150px"
      />

      <button
        onClick={runQuery}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ▶️ Run Query
      </button>

      {error && <p className="text-red-500 mt-2">❌ {error}</p>}

      {result && Array.isArray(result) && (
        <div className="mt-4 overflow-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
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
        </div>
      )}

      {typeof result === "string" && (
        <p className="mt-3 text-green-600">✅ {result}</p>
      )}
    </div>
  );
};

export default SQLEditor;
