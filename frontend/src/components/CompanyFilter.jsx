import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyFilter = ({ onSelect }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/companies")
      .then(res => setCompanies(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Filter by Company</h2>
      <div className="flex flex-wrap gap-2">
        {companies.map(c => (
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
