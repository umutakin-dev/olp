"use client";

import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { user } = useSession();
    const router = useRouter();

    if (!user) {
        router.push("/auth/login");
        return null;
    }

    const handleNavigation = () => {
        router.push(`/dashboard/${user.role}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-dracula-background text-dracula-foreground">
            <h1 className="text-3xl font-bold mb-6">
                Welcome to the Dashboard
            </h1>
            <button
                onClick={handleNavigation}
                className="px-6 py-3 bg-dracula-green text-dracula-background rounded hover:bg-dracula-cyan focus:ring-dracula-purple"
            >
                Go to {user.role.charAt(0).toUpperCase() + user.role.slice(1)}{" "}
                Dashboard
            </button>
        </div>
    );
}
