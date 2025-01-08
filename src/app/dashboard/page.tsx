"use client";

import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
    const { user } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            // Redirect to login if the user is not logged in
            router.push("/auth/login");
        } else {
            // Redirect to the respective dashboard based on user role
            router.push(`/dashboard/${user.role}`);
        }
    }, [user, router]);

    return <p>Loading...</p>; // Placeholder while redirection occurs
}
