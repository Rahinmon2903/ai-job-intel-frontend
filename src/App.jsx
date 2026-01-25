import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AnalysisHistory from "./pages/AnalysisHistory";
import SkillGapOverview from "./pages/SkillGapOverview";
import Navbar from "./components/NavBar";
import AnalysisDetail from "./pages/AnalysisDetails";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/history" element={<AnalysisHistory />} />
      <Route path="/skills" element={<SkillGapOverview />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/history/:id" element={<AnalysisDetail />} />
    </Routes>
    </>
  );
}

export default App;
