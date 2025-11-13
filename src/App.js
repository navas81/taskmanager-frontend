import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";


import ProtectedRoute from "./components/ProtectedRoute";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
      </Routes>3
      <ToastContainer />
    </Router>
  );
}

export default App;
