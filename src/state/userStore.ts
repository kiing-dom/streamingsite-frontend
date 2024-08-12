import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface UserState {
  user: any | null;
  username: string | null;
  password: string | null;
  fetchUser: (id: number) => Promise<void>;
  clearUser: () => void;
  setCredentials: (username: string, password: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      username: null,
      password: null,
      fetchUser: async (id: number) => {
        const state = get();
        try {
          const { username, password } = state;
          if (!username || !password)
            throw new Error("No credentials available");

          const encodedCredentials = btoa(`${username}:${password}`);
          const response = await axios.get(
            `http://localhost:8080/api/users/${id}`,
            {
              headers: {
                Authorization: `Basic ${encodedCredentials}`,
              },
            }
          );
          set({ user: response.data });
        } catch (error) {
          console.error("Failed to fetch user: ", error);
        }
      },
      clearUser: () => set({ user: null, username: null, password: null }),
      setCredentials: (username, password) => set({ username, password }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        username: state.username,
        password: state.password,
      }),
    }
  )
);
