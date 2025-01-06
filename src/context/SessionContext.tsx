"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
    email: string;
    role: string;
}

interface SessionContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(storedUser)); // Directly parse the user object
        }
    }, []);

    const login = (user: User) => {
        setIsLoggedIn(true);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <SessionContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};

// Custom hook to use session context
export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
};
