import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        user: null,

        login: (token, user = null) => {
          set({ token, user }, false, "auth/login");
        },

        logout: () => {
          set({ token: null, user: null }, false, "auth/logout");
        },

        isAuthenticated: () => !!get().token,
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({ token: state.token, user: state.user }),
      }
    ),
    { name: "AuthStore" }
  )
);

export default useAuthStore;
