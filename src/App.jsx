import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AnalysisHistory from "./pages/AnalysisHistory";
import AnalysisDetail from "./pages/AnalysisDetail";
import SkillGapOverview from "./pages/SkillGapOverview";

function App() {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <AnalysisHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history/:id"
          element={
            <ProtectedRoute>
              <AnalysisDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <SkillGapOverview />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
