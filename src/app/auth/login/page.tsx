"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            const { user } = await res.json();
            router.push(`/dashboard?role=${user.role}`);
        } else {
            alert("Login failed! Please check your email and password.");
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-full">
            <form
                className="w-80 p-6 bg-dracula-currentLine rounded shadow-md"
                onSubmit={handleSubmit}
            >
                <h1 className="text-4xl font-bold mb-6 text-dracula-purple text-center">
                    Log In
                </h1>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-dracula-foreground"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-dracula-selection rounded bg-dracula-background text-dracula-foreground focus:outline-none focus:ring-2 focus:ring-dracula-purple"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-dracula-foreground"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-dracula-selection rounded bg-dracula-background text-dracula-foreground focus:outline-none focus:ring-2 focus:ring-dracula-purple"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-dracula-green text-dracula-background py-2 rounded hover:bg-dracula-cyan focus:outline-none focus:ring-2 focus:ring-dracula-purple"
                >
                    Log In
                </button>
            </form>
        </div>
    );
}
