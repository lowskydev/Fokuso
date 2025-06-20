"use client"
import { StatsHeader } from "@/components/statistics/StatsHeader"
import { StatsOverview } from "@/components/statistics/StatsOverview"
import { TodayProgress } from "@/components/statistics/TodayProgress"
import { WeeklyOverview } from "@/components/statistics/WeeklyOverview"
import { DetailedStats } from "@/components/statistics/DetailedStats"
import { Achievements } from "@/components/statistics/Achievements"


function StatisticsPage() {
  // Dummy data - will be replaced with real database queries later
  const stats = {
    totalSessions: 247,
    totalFocusTime: 6175, // in minutes
    todayFocusTime: 125, // in minutes
    currentStreak: 12,
    longestStreak: 28,
    averageSessionLength: 25,
    thisWeekSessions: 18,
    thisMonthSessions: 73,
    totalBreakTime: 1235, // in minutes

    // Flashcard data
    flashcardsReviewedToday: 24,
    totalFlashcards: 156,
    correctAnswers: 18,
    incorrectAnswers: 6,
    cardsToReview: 12,
  }

  // Hourly data for today's progress graph
  const hourlyData = [
    { hour: "6", sessions: 0 },
    { hour: "7", sessions: 0 },
    { hour: "8", sessions: 1 },
    { hour: "9", sessions: 2 },
    { hour: "10", sessions: 3 },
    { hour: "11", sessions: 3 },
    { hour: "12", sessions: 4 },
    { hour: "13", sessions: 4 },
    { hour: "14", sessions: 5 },
    { hour: "15", sessions: 5 },
    { hour: "16", sessions: 5 },
    { hour: "17", sessions: 5 },
    { hour: "18", sessions: 5 },
    { hour: "19", sessions: 5 },
    { hour: "20", sessions: 5 },
    { hour: "21", sessions: 5 },
    { hour: "22", sessions: 7 },
  ]

  const weeklyData = [
    { day: "Mon", sessions: 4, focusTime: 100 },
    { day: "Tue", sessions: 3, focusTime: 75 },
    { day: "Wed", sessions: 5, focusTime: 125 },
    { day: "Thu", sessions: 2, focusTime: 50 },
    { day: "Fri", sessions: 3, focusTime: 75 },
    { day: "Sat", sessions: 0, focusTime: 0 },
    { day: "Sun", sessions: 7, focusTime: 175 },
  ]

  const achievements = [
    { title: "First Timer", description: "Complete your first Pomodoro session", earned: true },
    { title: "Consistency King", description: "7-day streak achieved", earned: true },
    { title: "Focus Master", description: "Complete 100 sessions", earned: true },
    { title: "Marathon Runner", description: "Focus for 10 hours in a day", earned: false },
    { title: "Week Warrior", description: "Complete 50 sessions in a week", earned: false },
    { title: "Century Club", description: "Complete 500 total sessions", earned: false },
  ]

return (
    <div className="space-y-8 pb-8">
      <StatsHeader />
      <StatsOverview stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TodayProgress stats={stats} hourlyData={hourlyData} />
        <WeeklyOverview weeklyData={weeklyData} />
      </div>

      <DetailedStats stats={stats} />
      <Achievements achievements={achievements} />
    </div>
  )
}

export default StatisticsPage