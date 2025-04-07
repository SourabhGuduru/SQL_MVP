import React, { useState } from "react";
import axios from "axios";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-github";

const SQLEditor = ({ defaultQuery = "SELECT * FROM your_table;" }) => {
  const [query, setQuery] = useState(defaultQuery);
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
      setError(err.message || "Network error");
      setResult(null);
    }
  };

  return (
    <div className="bg-white border rounded shadow p-4 flex flex-col h-full">
      <h3 className="text-lg font-semibold mb-2">🧪 SQL Editor</h3>

      <AceEditor
        mode="sql"
        theme="github"
        value={query}
        onChange={(val) => setQuery(val)}
        name="sql-editor"
        editorProps={{ $blockScrolling: true }}
        className="w-full border"
        height="200px"
        fontSize={14}
      />

      <button
        onClick={runQuery}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 self-start"
      >
        ▶️ Run Query
      </button>

      {/* Output Section */}
      <div className="mt-4 overflow-auto">
        {error && (
          <p className="text-red-500 whitespace-pre-wrap">❌ {error}</p>
        )}

        {Array.isArray(result) && result.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300 mt-2 text-sm">
              <thead>
                <tr>
                  {Object.keys(result[0]).map((col) => (
                    <th
                      key={col}
                      className="border px-3 py-2 text-left bg-gray-100"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="border px-3 py-2">
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
          <p className="text-green-600 mt-2">✅ {result}</p>
        )}
      </div>
    </div>
  );
};

export default SQLEditor;
