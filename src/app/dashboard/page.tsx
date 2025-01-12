"use client";

import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
    const { user } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/auth/login");
        } else {
            router.push(`/dashboard/${user.role}`);
        }
    }, [user, router]);

    return <p>Loading...</p>;
}
