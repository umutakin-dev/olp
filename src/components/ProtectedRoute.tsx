"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../context/SessionContext";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoggedIn } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/"); // Redirect to landing page if not logged in
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
        return null; // Render nothing while redirecting
    }

    return <>{children}</>;
}
