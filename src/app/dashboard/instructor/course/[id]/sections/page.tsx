"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Section } from "@/app/types/section";

export default function ManageSectionsPage() {
    const { id: courseId } = useParams();
    const [sections, setSections] = useState<Section[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    console.log("Params:", courseId);

    // Fetch sections for the course
    useEffect(() => {
        const fetchSections = async () => {
            try {
                const res = await fetch(`/api/sections?courseId=${courseId}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch sections.");
                }
                const data = await res.json();
                setSections(data.sections);
            } catch (err) {
                console.error(err);
                setError("Error fetching sections.");
            } finally {
                setLoading(false);
            }
        };
        fetchSections();
    }, [courseId]);

    // Handle adding a new section
    const handleAddSection = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/sections", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId, title, description }),
            });
            if (!res.ok) {
                throw new Error("Failed to add section.");
            }
            const newSection = await res.json();
            setSections((prev: Section[]) => [...prev, newSection]);
            setTitle("");
            setDescription("");
        } catch (err) {
            console.error(err);
            setError("Error adding section.");
        }
    };

    // console.log("Params:", params);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] bg-dracula-background text-dracula-foreground">
            <h1 className="text-3xl font-bold mb-6">Manage Sections</h1>
            {loading ? (
                <p>Loading sections...</p>
            ) : error ? (
                <p className="text-dracula-red">{error}</p>
            ) : (
                <ul className="w-full max-w-3xl mb-6">
                    {sections.map((section) => (
                        <li
                            key={section.$id}
                            className="p-4 border-b border-dracula-comment"
                        >
                            <h2 className="text-lg font-bold">
                                {section.title}
                            </h2>
                            <p className="text-sm text-dracula-comment">
                                {section.description}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            <form
                onSubmit={handleAddSection}
                className="w-full max-w-3xl bg-dracula-currentLine p-4 rounded"
            >
                <h2 className="text-lg font-bold mb-4">Add New Section</h2>
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-dracula-foreground"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-dracula-selection rounded bg-dracula-background text-dracula-foreground"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-dracula-foreground"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-dracula-selection rounded bg-dracula-background text-dracula-foreground"
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-3 bg-dracula-green text-dracula-background rounded hover:bg-dracula-cyan"
                >
                    Add Section
                </button>
            </form>
        </div>
    );
}
