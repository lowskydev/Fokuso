// src/store/useCalendarStore.js
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useCalendarStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        events: {},
        isLoading: false,
        error: null,

        // Event Actions
        fetchEvents: async (params = {}) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          if (!token) {
            set({ error: "No authentication token found" });
            return;
          }

          set({ isLoading: true, error: null });
          try {
            // Build query parameters
            const queryParams = new URLSearchParams();
            if (params.start_date)
              queryParams.append("start_date", params.start_date);
            if (params.end_date)
              queryParams.append("end_date", params.end_date);
            if (params.type) queryParams.append("type", params.type);
            if (params.search) queryParams.append("search", params.search);

            const queryString = queryParams.toString();
            const url = `${
              import.meta.env.VITE_API_URL
            }/api/calendars/events/grouped/${
              queryString ? `?${queryString}` : ""
            }`;

            const response = await fetch(url, {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            });

            if (!response.ok) {
              throw new Error("Failed to fetch events");
            }

            const events = await response.json();
            set({ events, isLoading: false });
          } catch (error) {
            console.error("Error fetching events:", error);
            set({ error: error.message, isLoading: false });
          }
        },

        fetchTodayEvents: async () => {
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
              `${import.meta.env.VITE_API_URL}/api/calendars/events/today/`,
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to fetch today's events");
            }

            const todayEvents = await response.json();
            const today = new Date().toISOString().split("T")[0];

            set((state) => ({
              events: {
                ...state.events,
                [today]: todayEvents,
              },
              isLoading: false,
            }));
          } catch (error) {
            console.error("Error fetching today's events:", error);
            set({ error: error.message, isLoading: false });
          }
        },

        createEvent: async (eventData) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/calendars/events/`,
              {
                method: "POST",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to create event");
            }

            const newEvent = await response.json();

            // Add the new event to the local state
            const dateKey = eventData.date;
            set((state) => ({
              events: {
                ...state.events,
                [dateKey]: [
                  ...(state.events[dateKey] || []),
                  {
                    id: newEvent.id,
                    title: newEvent.title,
                    time: newEvent.time,
                    endTime: newEvent.endTime,
                    type: newEvent.type,
                    duration: newEvent.duration,
                  },
                ],
              },
              isLoading: false,
            }));

            return newEvent;
          } catch (error) {
            console.error("Error creating event:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        updateEvent: async (eventId, eventData) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${
                import.meta.env.VITE_API_URL
              }/api/calendars/events/${eventId}/`,
              {
                method: "PATCH",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to update event");
            }

            const updatedEvent = await response.json();

            // Update the event in local state with proper date handling
            set((state) => {
              const newEvents = { ...state.events };
              let oldDateKey = null;
              let eventFound = false;

              // Find the event's current date key
              Object.keys(newEvents).forEach((dateKey) => {
                const eventIndex = newEvents[dateKey].findIndex(
                  (event) => event.id === eventId
                );
                if (eventIndex !== -1) {
                  oldDateKey = dateKey;
                  eventFound = true;
                }
              });

              if (eventFound && oldDateKey) {
                const newDateKey = eventData.date;

                // Create the updated event object
                const updatedEventObj = {
                  id: updatedEvent.id,
                  title: updatedEvent.title,
                  time: updatedEvent.time,
                  endTime: updatedEvent.endTime,
                  type: updatedEvent.type,
                  duration: updatedEvent.duration,
                };

                // If date changed, move event to new date
                if (oldDateKey !== newDateKey) {
                  // Remove from old date
                  newEvents[oldDateKey] = newEvents[oldDateKey].filter(
                    (event) => event.id !== eventId
                  );

                  // Clean up empty date keys
                  if (newEvents[oldDateKey].length === 0) {
                    delete newEvents[oldDateKey];
                  }

                  // Add to new date
                  if (!newEvents[newDateKey]) {
                    newEvents[newDateKey] = [];
                  }
                  newEvents[newDateKey].push(updatedEventObj);
                } else {
                  // Same date, just update in place
                  newEvents[oldDateKey] = newEvents[oldDateKey].map((event) =>
                    event.id === eventId ? updatedEventObj : event
                  );
                }
              }

              return {
                events: newEvents,
                isLoading: false,
              };
            });

            return updatedEvent;
          } catch (error) {
            console.error("Error updating event:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        deleteEvent: async (eventId) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${
                import.meta.env.VITE_API_URL
              }/api/calendars/events/${eventId}/`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to delete event");
            }

            // Remove the event from local state
            set((state) => {
              const newEvents = { ...state.events };

              // Remove the event from all date keys
              Object.keys(newEvents).forEach((dateKey) => {
                newEvents[dateKey] = newEvents[dateKey].filter(
                  (event) => event.id !== eventId
                );

                // Remove empty date keys
                if (newEvents[dateKey].length === 0) {
                  delete newEvents[dateKey];
                }
              });

              return {
                events: newEvents,
                isLoading: false,
              };
            });
          } catch (error) {
            console.error("Error deleting event:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        // Utility Actions
        clearError: () => set({ error: null }),

        reset: () =>
          set({
            events: {},
            isLoading: false,
            error: null,
          }),

        // Helper function to get events for a specific date
        getEventsForDate: (date) => {
          const state = get();
          return state.events[date] || [];
        },

        // Helper function to get all events as array
        getAllEvents: () => {
          const state = get();
          return Object.values(state.events).flat();
        },
      }),
      {
        name: "calendar-storage",
        partialize: (state) => ({
          // Only persist events, don't persist loading states or errors
          events: state.events,
        }),
      }
    ),
    { name: "CalendarStore" }
  )
);

export default useCalendarStore;
