// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import NewInterviewPage from "./pages/NewInterviewPage";
import ResultsPage from "./pages/ResultsPage";
import SessionPage from "./pages/SessionPage";
import HistoryPage from "./pages/HistoryPage";

import Navbar from "./components/Navbar";
import Guide from "./components/Guide";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* ------Public ---------*/}
        <Route path="/" element={<LandingPage />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/*----Protected------*/}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview/new"
          element={
            <ProtectedRoute>
              <NewInterviewPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview/:id/session"
          element={
            <ProtectedRoute>
              <SessionPage />
            </ProtectedRoute>
          }
        />

        <Route 
        path="/interview/:id/results"
        element={
          <ProtectedRoute>
            <ResultsPage />
          </ProtectedRoute>
        }
        />
        <Route 
          path="/interview/history"
          element={
            <ProtectedRoute>
               <HistoryPage />
            </ProtectedRoute>
            
          }
        />



      </Routes>
    </>
  );
};

export default App;
