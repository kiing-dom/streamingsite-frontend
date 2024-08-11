import { create } from 'zustand';
import axios from 'axios';

interface UserState {
    user: any | null;
    fetchUser: (id: number) => Promise<void>;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    fetchUser: async (id: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/${id}`);
            set({ user: response.data });

        } catch (error) {
            console.error("Failed to fetch user: ", error);
        }
    },
    clearUser: () => set({ user: null}),
}));