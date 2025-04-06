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
      .catch(() => setError("Failed to load companies"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mb-6">
      <label
        htmlFor="company"
        className="block text-lg font-semibold mb-2 flex items-center gap-2"
      >
        🏢 Select a Company
      </label>

      {loading && <p className="text-gray-500">⏳ Loading companies...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <select
          id="company"
          onChange={(e) => onSelect(e.target.value)}
          defaultValue="All Companies"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All Companies">All Companies</option>
          {companies.map((company) => (
            <option key={company.id} value={company.name}>
              {company.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CompanyFilter;

