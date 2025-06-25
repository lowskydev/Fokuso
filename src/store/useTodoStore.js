import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useTodoStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        todos: [],
        tags: [],
        isLoading: false,
        error: null,

        // Todo Actions
        fetchTodos: async () => {
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
              `${import.meta.env.VITE_API_URL}/api/todos/`,
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to fetch todos");
            }

            const todos = await response.json();
            set({ todos, isLoading: false });
          } catch (error) {
            console.error("Error fetching todos:", error);
            set({ error: error.message, isLoading: false });
          }
        },

        createTodo: async (todoData) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/todos/`,
              {
                method: "POST",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(todoData),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to create todo");
            }

            const newTodo = await response.json();
            set((state) => ({
              todos: [newTodo, ...state.todos],
              isLoading: false,
            }));
            return newTodo;
          } catch (error) {
            console.error("Error creating todo:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        updateTodo: async (todoId, todoData) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/todos/${todoId}/`,
              {
                method: "PATCH",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(todoData),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to update todo");
            }

            const updatedTodo = await response.json();
            set((state) => ({
              todos: state.todos.map((todo) =>
                todo.id === todoId ? updatedTodo : todo
              ),
              isLoading: false,
            }));
            return updatedTodo;
          } catch (error) {
            console.error("Error updating todo:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        toggleTodo: async (todoId) => {
          const todo = get().todos.find((t) => t.id === todoId);
          if (!todo) return;

          return get().updateTodo(todoId, { completed: !todo.completed });
        },

        deleteTodo: async (todoId) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/todos/${todoId}/`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to delete todo");
            }

            set((state) => ({
              todos: state.todos.filter((todo) => todo.id !== todoId),
              isLoading: false,
            }));
          } catch (error) {
            console.error("Error deleting todo:", error);
            set({ error: error.message, isLoading: false });
            throw error;
          }
        },

        // Tag Actions
        fetchTags: async () => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          if (!token) return;

          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/todos/tags/`,
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.ok) {
              const tags = await response.json();
              set({ tags });
            }
          } catch (error) {
            console.error("Error fetching tags:", error);
          }
        },

        createTag: async (tagData) => {
          const token = localStorage.getItem("auth-storage")
            ? JSON.parse(localStorage.getItem("auth-storage")).state.token
            : null;

          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/todos/tags/`,
              {
                method: "POST",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(tagData),
              }
            );

            if (response.ok) {
              const newTag = await response.json();
              set((state) => ({
                tags: [newTag, ...state.tags],
              }));
              return newTag;
            }
          } catch (error) {
            console.error("Error creating tag:", error);
            throw error;
          }
        },

        // Utility Actions
        clearError: () => set({ error: null }),

        reset: () =>
          set({
            todos: [],
            tags: [],
            isLoading: false,
            error: null,
          }),
      }),
      {
        name: "todo-storage",
        partialize: (state) => ({
          // Only persist todos and tags, don't persist loading states or errors
          todos: state.todos,
          tags: state.tags,
        }),
      }
    ),
    { name: "TodoStore" }
  )
);

export default useTodoStore;
