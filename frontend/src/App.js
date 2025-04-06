import React from "react";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          🧠 SQL Interview Prep
        </h1>
        <Home />
      </div>
    </div>
  );
}

export default App;


