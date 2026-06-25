import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AuthContextType } from "@/features/auth/types/authContext";
import type { Token } from "@/features/auth/types/token";
import type { User } from "@/features/auth/types/user.type";

const useAuth = create<AuthContextType>()(
    persist(
        (set) => ({
            token: null,
            profile: null,
            logIn: (token: Token) => set({ token }),
            logOut: () => {
                set({ token: null, profile: null });
            },
            setProfile: (profile: User) => {
                const baseUrl = import.meta.env.VITE_API_BASE_URL;
                const updatedProfile = {
                    ...profile,
                    logo: profile.profile.logo
                        ? `${baseUrl}${profile.profile.logo}`
                        : null,
                };
                set({ profile: updatedProfile });
            },
        }),
        {
            name: "auth", // Key for localStorage
        },
    ),
);

export default useAuth;
