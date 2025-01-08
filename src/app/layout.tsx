"use client";

import "./global.css";
import { SessionProvider, useSession } from "../context/SessionContext";
import { useRouter } from "next/navigation";

function Header() {
    const { isLoggedIn, user, logout } = useSession();
    const router = useRouter();

    const handleTitleClick = () => {
        if (isLoggedIn) {
            router.push(`/dashboard/${user?.role}`);
        } else {
            router.push("/");
        }
    };

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" }); // Clear server-side cookie
        logout(); // Clear client-side state and localStorage
        router.push("/");
    };

    return (
        <header className="w-full p-4 bg-dracula-currentLine text-dracula-foreground flex items-center justify-between">
            <h1
                className="text-lg font-bold cursor-pointer hover:text-dracula-green"
                onClick={handleTitleClick}
            >
                Online Learning Platform
            </h1>
            {isLoggedIn && (
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-dracula-red text-dracula-background rounded hover:bg-dracula-orange"
                >
                    Logout
                </button>
            )}
        </header>
    );
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-dracula-background text-dracula-foreground flex flex-col">
                <SessionProvider>
                    {/* Header */}
                    <Header />
                    {/* Main Content */}
                    <main className="flex-grow flex items-center justify-center">
                        {children}
                    </main>
                </SessionProvider>
            </body>
        </html>
    );
}
