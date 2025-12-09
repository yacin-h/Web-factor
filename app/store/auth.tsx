import type { AuthContextType } from "@/types/authContext";
import type { Token } from "@/types/token";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // use local storage to persist the token data
    const [token, setToken] = useState<Token | null>(() => {
        const saved = localStorage.getItem('token');
        return saved ? JSON.parse(saved) : null;
    });

    React.useEffect(() => {
        if (token) {
            localStorage.setItem('token', JSON.stringify(token));
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const logIn = (token: Token) => {
        setToken(token);
    };
    const logOut = () => {
        setToken(null);
    };
    return (
        <AuthContext.Provider value={{ token, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
