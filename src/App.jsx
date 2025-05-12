import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PomodoroPage from "@/components/pages/PomodoroPage"
import PrivateRoute from "@/components/PrivateRoute";
import TestDashboard from "@/components/TestDashboard";



function AppContent() {
  const location = useLocation();

  // Define routes where the Navbar should be visible
  const showNavbar = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/testdashboard" element={<TestDashboard />} />
          <Route path="/pomodoropage" element={<PomodoroPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}