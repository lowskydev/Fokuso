// src/store/usePomodoroStatsStore.js
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const usePomodoroStatsStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        userStats: {
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
        weeklyData: [],
        hourlyData: [],
        sessions: [],
        isLoading: false,
        error: null,

        // Hydration state
        _hasHydrated: false,
        setHasHydrated: (state) => {
          set({ _hasHydrated: state });
        },

        // Session Management
        createSession: async (sessionData) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          if (!token) {
            set({ error: "No authentication token found" });
            return;
          }

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/stats/session/`,
              {
                method: "POST",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(sessionData),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to create session");
            }

            const newSession = await response.json();

            // Add the new session to local state
            set((state) => ({
              sessions: [newSession, ...state.sessions],
              isLoading: false,
            }));

            // Refresh stats after creating a session
            get().fetchUserStats();
            get().fetchTodayHourlyData();

            return newSession;
          } catch (error) {
            console.error("Error creating session:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        // Fetch User Stats
        fetchUserStats: async () => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          if (!token) {
            set({ error: "No authentication token found" });
            return;
          }

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/stats/user-stats/`,
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to fetch user stats");
            }

            const userStats = await response.json();
            set({ userStats, isLoading: false });
          } catch (error) {
            console.error("Error fetching user stats:", error);
            set({ error: error.message, isLoading: false });
          }
        },

        // Fetch Weekly Data
        fetchWeeklyData: async () => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          if (!token) return;

          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/stats/weekly-data/`,
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.ok) {
              const weeklyData = await response.json();
              set({ weeklyData });
            }
          } catch (error) {
            console.error("Error fetching weekly data:", error);
          }
        },

        // Fetch Today's Hourly Data (for today's progress chart)
        fetchTodayHourlyData: async () => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          if (!token) return;

          try {
            const today = new Date().toISOString().split("T")[0];
            const response = await fetch(
              `${
                import.meta.env.VITE_API_URL
              }/api/stats/sessions/?date=${today}`,
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.ok) {
              const todaySessions = await response.json();

              // Filter only focus sessions
              const focusSessions = todaySessions.filter(
                (session) => session.session_type === "focus"
              );

              // Group sessions by hour
              const sessionsByHour = {};

              // Initialize all hours to 0
              for (let hour = 0; hour < 24; hour++) {
                sessionsByHour[hour] = 0;
              }

              // Count sessions per hour
              focusSessions.forEach((session) => {
                const sessionHour = new Date(session.created_at).getHours();
                sessionsByHour[sessionHour]++;
              });

              // Convert to hourly data format for the chart
              const hourlyData = [];
              for (let hour = 0; hour < 24; hour++) {
                hourlyData.push({
                  hour: hour.toString(),
                  sessions: sessionsByHour[hour],
                });
              }

              set({ hourlyData });
            }
          } catch (error) {
            console.error("Error fetching today's hourly data:", error);
          }
        },

        // Fetch Sessions List
        fetchSessions: async (params = {}) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          if (!token) return;

          set({ isLoading: true, error: null });
          try {
            // Build query parameters
            const queryParams = new URLSearchParams();
            if (params.session_type)
              queryParams.append("session_type", params.session_type);
            if (params.date) queryParams.append("date", params.date);
            if (params.start_date)
              queryParams.append("start_date", params.start_date);
            if (params.end_date)
              queryParams.append("end_date", params.end_date);

            const queryString = queryParams.toString();
            const url = `${import.meta.env.VITE_API_URL}/api/stats/sessions/${
              queryString ? `?${queryString}` : ""
            }`;

            const response = await fetch(url, {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            });

            if (response.ok) {
              const sessions = await response.json();
              set({ sessions, isLoading: false });
            }
          } catch (error) {
            console.error("Error fetching sessions:", error);
            set({ error: error.message, isLoading: false });
          }
        },

        // Fetch All Data (comprehensive fetch)
        fetchAllData: async () => {
          const {
            fetchUserStats,
            fetchWeeklyData,
            fetchTodayHourlyData,
            fetchSessions,
          } = get();

          await Promise.all([
            fetchUserStats(),
            fetchWeeklyData(),
            fetchTodayHourlyData(),
            fetchSessions({
              start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              end_date: new Date().toISOString().split("T")[0],
            }),
          ]);
        },

        // Helper function to record a completed session
        recordSession: async (sessionType, duration) => {
          return get().createSession({
            session_type: sessionType, // 'focus' or 'break'
            duration: duration, // duration in minutes
          });
        },

        // Helper function to get today's sessions count (FOCUS ONLY)
        getTodaySessionsCount: () => {
          const { sessions } = get();
          const today = new Date().toISOString().split("T")[0];
          return sessions.filter(
            (session) =>
              session.created_at.startsWith(today) &&
              session.session_type === "focus" // Only count focus sessions
          ).length;
        },

        // Helper function to get today's focus time
        getTodayFocusTime: () => {
          const { sessions } = get();
          const today = new Date().toISOString().split("T")[0];
          return sessions
            .filter(
              (session) =>
                session.created_at.startsWith(today) &&
                session.session_type === "focus"
            )
            .reduce((total, session) => total + session.duration, 0);
        },

        // Utility Actions
        clearError: () => set({ error: null }),

        reset: () =>
          set({
            userStats: {
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
            weeklyData: [],
            hourlyData: [],
            sessions: [],
            isLoading: false,
            error: null,
          }),
      }),
      {
        name: "pomodoro-stats-storage",
        partialize: (state) => ({
          userStats: state.userStats,
          sessions: state.sessions.slice(0, 50),
        }),
        // Add hydration callback
        onRehydrateStorage: (state) => {
          return () => state?.setHasHydrated(true);
        },
      }
    ),
    { name: "PomodoroStatsStore" }
  )
);

export default usePomodoroStatsStore;
