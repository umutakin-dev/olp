"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useSession } from "../../context/SessionContext";

export default function DashboardPage() {
    const { user } = useSession();

    // Show a loading state while user is being fetched
    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-dracula-background text-dracula-foreground">
                <p className="text-lg text-dracula-comment">Loading...</p>
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <div className="flex flex-col items-center justify-center w-full h-full bg-dracula-background text-dracula-foreground">
                <h1 className="text-4xl font-bold mb-4 text-dracula-purple">
                    Welcome to Your Dashboard
                </h1>
                <p className="text-lg mb-6 text-dracula-comment">
                    You are logged in as{" "}
                    <strong className="text-dracula-yellow">{user.role}</strong>
                    .
                </p>
                <div className="p-6 bg-dracula-currentLine rounded shadow-md">
                    {user.role === "admin" && (
                        <p className="text-dracula-green">Admin Panel</p>
                    )}
                    {user.role === "instructor" && (
                        <p className="text-dracula-orange">
                            Instructor Dashboard
                        </p>
                    )}
                    {user.role === "student" && (
                        <p className="text-dracula-pink">Student Dashboard</p>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
