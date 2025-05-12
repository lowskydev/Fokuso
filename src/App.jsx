import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import Navbar from "./components/Navbar";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import PomodoroPage from "@/components/pages/PomodoroPage"
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";
import CalendarPage from "@/components/pages/CalendarPage";
import TodoPage from "@/components/pages/TodoPage";
import StatsPage from "@/components/pages/StatsPage";
import { ThemeProvider } from "./components/theme-provider";



function AppContent() {
  const location = useLocation();

  // Define routes where the Navbar should be visible
  const showNavbar = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="/dashboard/pomodoro" element={<PomodoroPage />} />
              <Route path="/dashboard/calendar" element={<CalendarPage />} />
              <Route path="/dashboard/todo" element={<TodoPage />} />
              <Route path="/dashboard/stats" element={<StatsPage />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
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