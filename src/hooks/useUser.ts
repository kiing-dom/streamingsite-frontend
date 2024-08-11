import { useEffect } from "react";
import { useUserStore } from "../state/userStore";

export const useUser = (userId: number | null) => {
    const { user, fetchUser, clearUser } = useUserStore();

    useEffect(() => {
        if(userId) {
            fetchUser(userId);
        } else {
            clearUser();
        }
    }, [userId, fetchUser, clearUser]);

    return user;
};