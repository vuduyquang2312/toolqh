import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AuthModal from "./components/AuthModal";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SlotDetail from "./pages/SlotDetail";
function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthModal mode="login" />} />
          <Route path="/register" element={<AuthModal mode="register" />} />
          <Route path="/slot/:id" element={<SlotDetail />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={2500} />
      </>
    </Router>
  );
}

export default App;
