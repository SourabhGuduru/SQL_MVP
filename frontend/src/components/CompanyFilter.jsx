import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyFilter = ({ onSelect }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://sql-prep-api.onrender.com/companies")
      .then((res) => setCompanies(res.data))
      .catch((err) => setError("Failed to load companies"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Filter by Company</h2>

      {loading && <p className="text-gray-500">Loading companies...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-2 mt-2">
        <button
          onClick={() => onSelect("")}
          className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-200"
        >
          All
        </button>
        {companies.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.name)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompanyFilter;

