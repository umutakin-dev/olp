"use client";

import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const role = searchParams.get("role");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">
                Welcome to Your Dashboard
            </h1>
            <p className="text-lg">
                You are logged in as <strong>{role}</strong>.
            </p>
            {/* Add role-specific content */}
        </div>
    );
}
