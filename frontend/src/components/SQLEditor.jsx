import React, { useState } from "react";
import AceEditor from "react-ace";
import axios from "axios";

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";

const SQLEditor = () => {
  const [query, setQuery] = useState("SELECT * FROM questions;");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  const runQuery = async () => {
    try {
      const res = await axios.post("https://sql-prep-api.onrender.com/run_sql", { query });
      setResult(res.data.result || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setResult([]);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">💻 Try Your SQL</h2>
      <AceEditor
        mode="sql"
        theme="monokai"
        name="sql_editor"
        width="100%"
        height="200px"
        fontSize={14}
        value={query}
        onChange={setQuery}
        editorProps={{ $blockScrolling: true }}
      />
      <button
        onClick={runQuery}
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Run Query
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {result.length > 0 && (
        <div className="mt-4 border p-3 rounded bg-gray-100">
          <table className="text-sm w-full">
            <thead>
              <tr>
                {Object.keys(result[0]).map((key) => (
                  <th key={key} className="text-left pr-4 font-medium">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="pr-4">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SQLEditor;
