"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProtectedRoute from "../../components/ProtectedRoute";

export default function DashboardPage() {
    const [user, setUser] = useState<{ email: string; role: string } | null>(
        null
    );
    const router = useRouter();

    useEffect(() => {
        // Check if user data is stored in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Redirect to login if no session exists
            router.push("/auth/login");
        }
    }, [router]);

    if (!user) return null; // Show nothing while checking session

    return (
        <ProtectedRoute>
            <div className="flex flex-grow flex-col items-center justify-center bg-dracula-background text-dracula-foreground">
                <h1 className="text-4xl font-bold mb-4 text-dracula-purple">
                    Welcome to Your Dashboard
                </h1>
                <p className="text-lg mb-6 text-dracula-comment">
                    You are logged in as{" "}
                    <strong className="text-dracula-yellow">{user.role}</strong>
                    .
                </p>
                {/* Role-Specific Content */}
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
