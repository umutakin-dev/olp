"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface SessionContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in on initial load
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user);
    }, []);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    };

    return (
        <SessionContext.Provider value={{ isLoggedIn, login, logout }}>
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
