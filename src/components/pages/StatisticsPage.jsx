// src/components/pages/StatisticsPage.jsx
"use client";
import { StatsHeader } from "@/components/statistics/StatsHeader";
import { StatsOverview } from "@/components/statistics/StatsOverview";
import { TodayProgress } from "@/components/statistics/TodayProgress";
import { WeeklyOverview } from "@/components/statistics/WeeklyOverview";
import { DetailedStats } from "@/components/statistics/DetailedStats";
import { Achievements } from "@/components/statistics/Achievements";
import useFlashcardStore from "@/store/useFlashcardStore";
import usePomodoroStatsStore from "@/store/usePomodoroStatsStore";
import { useHydration } from "@/hooks/useHydration";

import { useEffect } from "react";

function StatisticsPage() {
  // Get flashcard data
  const {
    reviewsToday,
    dailyStats,
    fetchTodayStats,
    fetchDailyStats,
    initializeDailyStats,
    _hasHydrated: flashcardHydrated,
  } = useFlashcardStore();

  // Get Pomodoro data
  const {
    userStats,
    weeklyData,
    hourlyData,
    fetchAllData,
    getTodaySessionsCount,
    getTodayFocusTime,
    isLoading,
    _hasHydrated: pomodoroHydrated,
  } = usePomodoroStatsStore();

  // Wait for both stores to hydrate
  const hasHydrated = useHydration(useFlashcardStore, usePomodoroStatsStore);

  useEffect(() => {
    // Only fetch data after hydration is complete
    if (hasHydrated) {
      initializeDailyStats();
      fetchTodayStats();
      fetchDailyStats(7);
      fetchAllData();
    }
  }, [
    hasHydrated,
    fetchTodayStats,
    fetchDailyStats,
    fetchAllData,
    initializeDailyStats,
  ]);

  // Show loading state while hydrating
  if (!hasHydrated) {
    return (
      <div className="space-y-8 pb-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your progress...</p>
          </div>
        </div>
      </div>
    );
  }

  // Combine real data from both sources
  const combinedStats = {
    // Pomodoro stats from API
    totalSessions: userStats.totalSessions,
    totalFocusTime: userStats.totalFocusTime,
    todayFocusTime: userStats.todayFocusTime,
    currentStreak: userStats.currentStreak,
    longestStreak: userStats.longestStreak,
    averageSessionLength: userStats.averageSessionLength,
    thisWeekSessions: userStats.thisWeekSessions,
    thisMonthSessions: userStats.thisMonthSessions,
    totalBreakTime: userStats.totalBreakTime,

    // Flashcard data from existing store with fallbacks
    flashcardsReviewedToday: reviewsToday || 0,
    totalFlashcards: 156, // This could come from flashcard store
    correctAnswers: dailyStats?.correct_reviews || 0,
    incorrectAnswers: dailyStats?.incorrect_reviews || 0,
    cardsToReview: 12, // This could be calculated from due flashcards
    averageAccuracy: dailyStats?.accuracy_percentage || 100,
  };

  // Use real hourly data from API or fallback to empty array
  const realHourlyData =
    hourlyData.length > 0
      ? hourlyData
      : [
          { hour: "6", sessions: 0 },
          { hour: "7", sessions: 0 },
          { hour: "8", sessions: 0 },
          { hour: "9", sessions: 0 },
          { hour: "10", sessions: 0 },
          { hour: "11", sessions: 0 },
          { hour: "12", sessions: 0 },
          { hour: "13", sessions: 0 },
          { hour: "14", sessions: 0 },
          { hour: "15", sessions: 0 },
          { hour: "16", sessions: 0 },
          { hour: "17", sessions: 0 },
          { hour: "18", sessions: 0 },
          { hour: "19", sessions: 0 },
          { hour: "20", sessions: 0 },
          { hour: "21", sessions: 0 },
          { hour: "22", sessions: 0 },
        ];

  // Use real weekly data from API or fallback
  const realWeeklyData =
    weeklyData.length > 0
      ? weeklyData
      : [
          { day: "Mon", sessions: 0, focusTime: 0 },
          { day: "Tue", sessions: 0, focusTime: 0 },
          { day: "Wed", sessions: 0, focusTime: 0 },
          { day: "Thu", sessions: 0, focusTime: 0 },
          { day: "Fri", sessions: 0, focusTime: 0 },
          { day: "Sat", sessions: 0, focusTime: 0 },
          { day: "Sun", sessions: 0, focusTime: 0 },
        ];

  // Dynamic achievements based on real data
  const achievements = [
    {
      title: "First Timer",
      description: "Complete your first Pomodoro session",
      earned: combinedStats.totalSessions >= 1,
    },
    {
      title: "Consistency King",
      description: "7-day streak achieved",
      earned: combinedStats.currentStreak >= 7,
    },
    {
      title: "Focus Master",
      description: "Complete 100 sessions",
      earned: combinedStats.totalSessions >= 100,
    },
    {
      title: "Marathon Runner",
      description: "Focus for 10 hours in a day",
      earned: combinedStats.todayFocusTime >= 600,
    },
    {
      title: "Week Warrior",
      description: "Complete 50 sessions in a week",
      earned: combinedStats.thisWeekSessions >= 50,
    },
    {
      title: "Century Club",
      description: "Complete 500 total sessions",
      earned: combinedStats.totalSessions >= 500,
    },
    {
      title: "Flashcard Novice",
      description: "Review 10 flashcards in a day",
      earned: combinedStats.flashcardsReviewedToday >= 10,
    },
    {
      title: "Perfect Score",
      description: "Achieve 100% accuracy in flashcard review",
      earned: combinedStats.flashcardsReviewedToday > 0,
    },
  ];

  // Show loading state for API calls (but not hydration)
  if (isLoading && combinedStats.totalSessions === 0) {
    return (
      <div className="space-y-8 pb-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your progress...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      <StatsHeader />
      <StatsOverview stats={combinedStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TodayProgress stats={combinedStats} hourlyData={realHourlyData} />
        <WeeklyOverview weeklyData={realWeeklyData} />
      </div>

      <DetailedStats stats={combinedStats} />
      <Achievements achievements={achievements} />
    </div>
  );
}

export default StatisticsPage;
