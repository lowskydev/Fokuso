import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PomodoroPage from "@/components/PomodoroPage"


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pomodoropage" element={<PomodoroPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/testdashboard" element={<div>Test Dashboard</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;