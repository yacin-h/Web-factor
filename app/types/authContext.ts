import type { Token } from "./token";
import type { User } from "./user";

export type AuthContextType = {
    token: null | Token;
    profile: User | null;
    logIn: (token: Token) => void;
    logOut: () => void;
    setProfile: (profile: User) => void;
};
