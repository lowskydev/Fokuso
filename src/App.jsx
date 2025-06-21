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
import { ThemeProvider } from "./components/theme-provider";
import PageNotFound from "./components/pages/PageNotFound";
import StatisticsPage from "./components/pages/StatisticsPage";
import FlashcardsPage from "./components/pages/FlashcardPage";
import FlashcardDeckPage from "./components/pages/FlashcardDeckPage";
import FlashcardLearnPage from "./components/pages/FlashcardLearnPage";



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
              <Route path="pomodoro" element={<PomodoroPage />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="todo" element={<TodoPage />} />
              <Route path="stats" element={<StatisticsPage />} />
              <Route path="flashcards" element={<FlashcardsPage />} />
              <Route path="flashcards/deck/:deckId" element={<FlashcardDeckPage />} />
              <Route path="flashcards/learn/:deckId" element={<FlashcardLearnPage />} />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
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