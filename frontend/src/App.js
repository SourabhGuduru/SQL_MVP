import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuestionPage from "./pages/QuestionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions/:id" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;



