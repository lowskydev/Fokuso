"use client";
import { StatsHeader } from "@/components/statistics/StatsHeader";
import { StatsOverview } from "@/components/statistics/StatsOverview";
import { TodayProgress } from "@/components/statistics/TodayProgress";
import { WeeklyOverview } from "@/components/statistics/WeeklyOverview";
import { DetailedStats } from "@/components/statistics/DetailedStats";
import { Achievements } from "@/components/statistics/Achievements";
import useFlashcardStore from "@/store/useFlashcardStore";

import { useEffect } from "react";
import usePomodoroStatsStore from "../../store/usePomodoroStatsStore";

function StatisticsPage() {
  // Dummy data - will be replaced with real database queries later

  const { reviewsToday, dailyStats, fetchTodayStats, fetchDailyStats } =
    useFlashcardStore();

  const {
    stats: pomodoroStats,
    fetchStats,
    fetchStatsIfNeeded,
    isLoading,
    error
  } = usePomodoroStatsStore();

  useEffect(() => {
    fetchTodayStats();
    fetchDailyStats(7); // Get last 7 days

    //Fetch pomodoro stats
    fetchStatsIfNeeded();
  }, [fetchTodayStats, fetchDailyStats, fetchStatsIfNeeded]);

  const stats = {
    totalSessions: pomodoroStats.totalSessions,
    totalFocusTime: pomodoroStats.totalFocusTime, // in minutes
    todayFocusTime: pomodoroStats.todayFocusTime, // in minutes
    currentStreak: pomodoroStats.currentStreak,
    longestStreak: pomodoroStats.longestStreak,
    averageSessionLength: pomodoroStats.averageSessionLength,
    thisWeekSessions: pomodoroStats.thisWeekSessions,
    thisMonthSessions: pomodoroStats.thisMonthSessions,
    totalBreakTime: pomodoroStats.totalBreakTime, // in minutes

    // Flashcard data
    flashcardsReviewedToday: 24,
    totalFlashcards: 156,
    correctAnswers: 18,
    incorrectAnswers: 6,
    cardsToReview: 12,
  };

  // Hourly data for today's progress graph
  // At which hour the user has completed how many sessions (not cumulative)
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
  ];

  const weeklyData = [
    { day: "Mon", sessions: 4, focusTime: 100 },
    { day: "Tue", sessions: 3, focusTime: 75 },
    { day: "Wed", sessions: 5, focusTime: 125 },
    { day: "Thu", sessions: 2, focusTime: 50 },
    { day: "Fri", sessions: 3, focusTime: 75 },
    { day: "Sat", sessions: 0, focusTime: 0 },
    { day: "Sun", sessions: 7, focusTime: 175 },
  ];

  // Dynamic achievements based on actual data
  const achievements = [
    {
      title: "First Timer",
      description: "Complete your first Pomodoro session",
      earned: stats.totalSessions >= 1,
    },
    {
      title: "Consistency King",
      description: "7-day streak achieved",
      earned: stats.currentStreak >= 7,
    },
    {
      title: "Focus Master",
      description: "Complete 100 sessions",
      earned: stats.totalSessions >= 100,
    },
    {
      title: "Marathon Runner",
      description: "Focus for 10 hours in a day",
      earned: stats.todayFocusTime >= 600,
    },
    {
      title: "Week Warrior",
      description: "Complete 50 sessions in a week",
      earned: stats.thisWeekSessions >= 50,
    },
    {
      title: "Century Club",
      description: "Complete 500 total sessions",
      earned: stats.totalSessions >= 500,
    },
  ];

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
  );
}

export default StatisticsPage;
