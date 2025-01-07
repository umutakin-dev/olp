"use client";

import { useState } from "react";
import { useSession } from "@/context/SessionContext";

export default function InstructorDashboard() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Use session context to retrieve the logged-in user
    const { user } = useSession();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Ensure the user is valid and has the role of 'instructor'
            if (!user || user.role !== "instructor") {
                setMessage(
                    "You must be logged in as an instructor to create a course."
                );
                return;
            }

            const res = await fetch("/api/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    instructorId: user.id, // Dynamic instructor ID from SessionContext
                }),
            });

            if (res.ok) {
                const { message } = await res.json();
                setMessage(message);
                setFormData({ title: "", description: "", price: "" });
            } else {
                const { error } = await res.json();
                setMessage(error);
            }
        } catch (error) {
            console.error("Error creating course:", error);
            setMessage("Failed to create course. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-grow bg-dracula-background text-dracula-foreground">
            <main className="flex flex-col items-center justify-center flex-grow">
                <form
                    className="w-96 p-6 bg-dracula-currentLine rounded-lg shadow-md"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-semibold mb-4 text-dracula-green">
                        Create a New Course
                    </h2>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block font-medium mb-1 text-dracula-foreground"
                        >
                            Course Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-dracula-selection rounded bg-dracula-background text-dracula-foreground focus:ring-dracula-purple focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block font-medium mb-1 text-dracula-foreground"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-dracula-selection rounded bg-dracula-background text-dracula-foreground focus:ring-dracula-purple focus:outline-none"
                            rows={4}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="price"
                            className="block font-medium mb-1 text-dracula-foreground"
                        >
                            Price ($)
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-dracula-selection rounded bg-dracula-background text-dracula-foreground focus:ring-dracula-purple focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-dracula-green text-dracula-background py-2 rounded hover:bg-dracula-cyan focus:ring-dracula-purple focus:outline-none"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Course"}
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-center text-dracula-yellow font-medium">
                        {message}
                    </p>
                )}
            </main>
        </div>
    );
}
