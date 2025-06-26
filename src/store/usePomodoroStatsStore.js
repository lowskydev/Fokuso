import { create } from "zustand";

const usePomodoroStatsStore = create((set, get) => ({
  // State
  stats: {
    totalSessions: 0,
    totalFocusTime: 0,
    todayFocusTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageSessionLength: 0,
    thisWeekSessions: 0,
    thisMonthSessions: 0,
    totalBreakTime: 0,
  },
  isLoading: false,
  error: null,
  lastFetched: null,

  // Actions
  fetchStats: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats/user-stats/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.statusText}`);
      }

      const data = await response.json();
      
      set({
        stats: {
          totalSessions: data.totalSessions || 0,
          totalFocusTime: data.totalFocusTime || 0,
          todayFocusTime: data.todayFocusTime || 0,
          currentStreak: data.currentStreak || 0,
          longestStreak: data.longestStreak || 0,
          averageSessionLength: data.averageSessionLength || 0,
          thisWeekSessions: data.thisWeekSessions || 0,
          thisMonthSessions: data.thisMonthSessions || 0,
          totalBreakTime: data.totalBreakTime || 0,
        },
        isLoading: false,
        lastFetched: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error fetching pomodoro stats:", error);
      set({
        error: error.message,
        isLoading: false,
      });
    }
  },

  // Create a new focus session
  createSession: async (sessionData) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats/session/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create session: ${response.statusText}`);
      }

      const newSession = await response.json();
      
      // Refresh stats after creating a session
      await get().fetchStats();
      
      return newSession;
    } catch (error) {
      console.error("Error creating session:", error);
      set({ error: error.message });
      throw error;
    }
  },

  // Reset error state
  clearError: () => set({ error: null }),

  // Reset all data
  reset: () => set({
    stats: {
      totalSessions: 0,
      totalFocusTime: 0,
      todayFocusTime: 0,
      currentStreak: 0,
      longestStreak: 0,
      averageSessionLength: 0,
      thisWeekSessions: 0,
      thisMonthSessions: 0,
      totalBreakTime: 0,
    },
    isLoading: false,
    error: null,
    lastFetched: null,
  }),

  // Helper function to check if data needs refresh (older than 5 minutes)
  shouldRefresh: () => {
    const { lastFetched } = get();
    if (!lastFetched) return true;
    
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return new Date(lastFetched) < fiveMinutesAgo;
  },

  // Auto-refresh stats if needed
  fetchStatsIfNeeded: async () => {
    const { shouldRefresh, fetchStats } = get();
    if (shouldRefresh()) {
      await fetchStats();
    }
  },
}));

export default usePomodoroStatsStore;