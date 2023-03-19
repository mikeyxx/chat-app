import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/index";
import Login from "./pages/Login/Index";
import HomePage from "./pages/HomePage/Index";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/feeds" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
