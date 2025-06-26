// src/store/useFlashcardStore.js
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useFlashcardStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        decks: [],
        flashcards: [],
        isLoading: false,
        error: null,
        dailyStats: null,
        reviewsToday: 0,
        isRefreshing: false,

        // Hydration state
        _hasHydrated: false,
        setHasHydrated: (state) => {
          set({ _hasHydrated: state });
        },

        // Deck Actions
        fetchDecks: async () => {
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
              `${import.meta.env.VITE_API_URL}/api/flashcards/decks/`,
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to fetch decks");
            }

            const decks = await response.json();
            set({ decks, isLoading: false });
          } catch (error) {
            console.error("Error fetching decks:", error);
            set({ error: error.message, isLoading: false });
          }
        },

        createDeck: async (deckData) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/flashcards/decks/`,
              {
                method: "POST",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(deckData),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to create deck");
            }

            const newDeck = await response.json();
            set((state) => ({
              decks: [newDeck, ...state.decks],
              isLoading: false,
            }));
            return newDeck;
          } catch (error) {
            console.error("Error creating deck:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        updateDeck: async (deckId, deckData) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/flashcards/decks/${deckId}/`,
              {
                method: "PATCH",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(deckData),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to update deck");
            }

            const updatedDeck = await response.json();
            set((state) => ({
              decks: state.decks.map((deck) =>
                deck.id === deckId ? updatedDeck : deck
              ),
              isLoading: false,
            }));
            return updatedDeck;
          } catch (error) {
            console.error("Error updating deck:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        deleteDeck: async (deckId) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/flashcards/decks/${deckId}/`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to delete deck");
            }

            set((state) => ({
              decks: state.decks.filter((deck) => deck.id !== deckId),
              isLoading: false,
            }));
          } catch (error) {
            console.error("Error deleting deck:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        // Flashcard Actions
        fetchFlashcards: async (deckId = null) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          if (!token) {
            set({ error: "No authentication token found" });
            return;
          }

          set({ isLoading: true, error: null });
          try {
            let url = `${import.meta.env.VITE_API_URL}/api/flashcards/`;
            if (deckId) {
              url += `?deck=${deckId}`;
            }

            const response = await fetch(url, {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            });

            if (!response.ok) {
              throw new Error("Failed to fetch flashcards");
            }

            const flashcards = await response.json();
            set({ flashcards, isLoading: false });
          } catch (error) {
            console.error("Error fetching flashcards:", error);
            set({ error: error.message, isLoading: false });
          }
        },

        createFlashcard: async (flashcardData) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/flashcards/`,
              {
                method: "POST",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(flashcardData),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to create flashcard");
            }

            const newFlashcard = await response.json();
            set((state) => ({
              flashcards: [newFlashcard, ...state.flashcards],
              isLoading: false,
            }));
            return newFlashcard;
          } catch (error) {
            console.error("Error creating flashcard:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        updateFlashcard: async (flashcardId, flashcardData) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/flashcards/${flashcardId}/`,
              {
                method: "PATCH",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(flashcardData),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to update flashcard");
            }

            const updatedFlashcard = await response.json();
            set((state) => ({
              flashcards: state.flashcards.map((flashcard) =>
                flashcard.id === flashcardId ? updatedFlashcard : flashcard
              ),
              isLoading: false,
            }));
            return updatedFlashcard;
          } catch (error) {
            console.error("Error updating flashcard:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        deleteFlashcard: async (flashcardId) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/flashcards/${flashcardId}/`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to delete flashcard");
            }

            set((state) => ({
              flashcards: state.flashcards.filter(
                (flashcard) => flashcard.id !== flashcardId
              ),
              isLoading: false,
            }));
          } catch (error) {
            console.error("Error deleting flashcard:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        reviewFlashcard: async (flashcardId, grade) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${
                import.meta.env.VITE_API_URL
              }/api/flashcards/${flashcardId}/review/`,
              {
                method: "POST",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ grade }),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to review flashcard");
            }

            const reviewResult = await response.json();

            // Update the flashcard with new review data
            set((state) => {
              // Update dailyStats with the new review
              const updatedDailyStats = state.dailyStats
                ? {
                    ...state.dailyStats,
                    flashcards_reviewed:
                      reviewResult.reviews_today ||
                      state.dailyStats.flashcards_reviewed + 1,
                    correct_reviews:
                      grade > 1
                        ? state.dailyStats.correct_reviews + 1
                        : state.dailyStats.correct_reviews,
                    incorrect_reviews:
                      grade === 1
                        ? state.dailyStats.incorrect_reviews + 1
                        : state.dailyStats.incorrect_reviews,
                    accuracy_percentage:
                      reviewResult.accuracy_percentage ||
                      Math.round(
                        ((grade > 1
                          ? state.dailyStats.correct_reviews + 1
                          : state.dailyStats.correct_reviews) /
                          (state.dailyStats.flashcards_reviewed + 1)) *
                          100
                      ),
                  }
                : {
                    flashcards_reviewed: 1,
                    correct_reviews: grade > 1 ? 1 : 0,
                    incorrect_reviews: grade === 1 ? 1 : 0,
                    accuracy_percentage: grade > 1 ? 100 : 0,
                  };

              return {
                flashcards: state.flashcards.map((flashcard) =>
                  flashcard.id === flashcardId
                    ? {
                        ...flashcard,
                        next_review: reviewResult.new_next_review,
                        interval: reviewResult.new_interval,
                        ease_factor: reviewResult.new_ease_factor,
                        repetition: reviewResult.new_repetition,
                        is_learning: reviewResult.is_learning,
                      }
                    : flashcard
                ),
                isLoading: false,
                reviewsToday:
                  reviewResult.reviews_today || state.reviewsToday + 1,
                dailyStats: updatedDailyStats,
              };
            });

            return reviewResult;
          } catch (error) {
            console.error("Error reviewing flashcard:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        reviewFlashcardBackground: async (flashcardId, grade) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          try {
            const response = await fetch(
              `${
                import.meta.env.VITE_API_URL
              }/api/flashcards/${flashcardId}/review/`,
              {
                method: "POST",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ grade }),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to review flashcard");
            }

            const reviewResult = await response.json();

            set((state) => {
              // Update dailyStats with the new review
              const updatedDailyStats = state.dailyStats
                ? {
                    ...state.dailyStats,
                    flashcards_reviewed:
                      reviewResult.reviews_today ||
                      state.dailyStats.flashcards_reviewed + 1,
                    correct_reviews:
                      grade > 1
                        ? state.dailyStats.correct_reviews + 1
                        : state.dailyStats.correct_reviews,
                    incorrect_reviews:
                      grade === 1
                        ? state.dailyStats.incorrect_reviews + 1
                        : state.dailyStats.incorrect_reviews,
                    accuracy_percentage:
                      reviewResult.accuracy_percentage ||
                      Math.round(
                        ((grade > 1
                          ? state.dailyStats.correct_reviews + 1
                          : state.dailyStats.correct_reviews) /
                          (state.dailyStats.flashcards_reviewed + 1)) *
                          100
                      ),
                  }
                : {
                    flashcards_reviewed: 1,
                    correct_reviews: grade > 1 ? 1 : 0,
                    incorrect_reviews: grade === 1 ? 1 : 0,
                    accuracy_percentage: grade > 1 ? 100 : 0,
                  };

              return {
                flashcards: state.flashcards.map((flashcard) =>
                  flashcard.id === flashcardId
                    ? {
                        ...flashcard,
                        next_review: reviewResult.new_next_review,
                        interval: reviewResult.new_interval,
                        ease_factor: reviewResult.new_ease_factor,
                        repetition: reviewResult.new_repetition,
                        is_learning: reviewResult.is_learning,
                      }
                    : flashcard
                ),
                reviewsToday:
                  reviewResult.reviews_today || state.reviewsToday + 1,
                dailyStats: updatedDailyStats,
              };
            });

            return reviewResult;
          } catch (error) {
            console.error("Error reviewing flashcard:", error);
            set({ error: error.message });
            throw error;
          }
        },

        // Fetch today's review stats
        fetchTodayStats: async () => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          if (!token) return;

          // Prevent multiple simultaneous calls
          const currentState = get();
          if (currentState.isRefreshing) {
            console.log("fetchTodayStats already in progress, skipping...");
            return;
          }

          set({ isRefreshing: true });

          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/flashcards/today-stats/`,
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.ok) {
              const stats = await response.json();
              set({
                dailyStats: stats,
                reviewsToday: stats.flashcards_reviewed,
                isRefreshing: false,
              });
            } else {
              set({ isRefreshing: false });
            }
          } catch (error) {
            console.error("Error fetching today's stats:", error);
            set({ isRefreshing: false });
          }
        },

        // Fetch daily stats for a date range
        fetchDailyStats: async (days = 30) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          if (!token) return;

          try {
            const response = await fetch(
              `${
                import.meta.env.VITE_API_URL
              }/api/flashcards/daily-stats/?days=${days}`,
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.ok) {
              const dailyStatsArray = await response.json();
              set({ dailyStats: dailyStatsArray });
            }
          } catch (error) {
            console.error("Error fetching daily stats:", error);
          }
        },

        // Initialize daily stats if not present
        initializeDailyStats: () => {
          set((state) => {
            if (!state.dailyStats && state._hasHydrated) {
              return {
                ...state,
                dailyStats: {
                  flashcards_reviewed: 0,
                  correct_reviews: 0,
                  incorrect_reviews: 0,
                  accuracy_percentage: 100,
                },
              };
            }
            return state;
          });
        },

        // Utility Actions
        clearError: () => set({ error: null }),

        reset: () =>
          set({
            decks: [],
            flashcards: [],
            isLoading: false,
            error: null,
            dailyStats: null,
            reviewsToday: 0,
          }),
      }),
      {
        name: "flashcard-storage",
        partialize: (state) => ({
          decks: state.decks,
          reviewsToday: state.reviewsToday,
          dailyStats: state.dailyStats,
        }),
        // Add hydration callback
        onRehydrateStorage: (state) => {
          return () => state?.setHasHydrated(true);
        },
      }
    ),
    { name: "FlashcardStore" }
  )
);

export default useFlashcardStore;
