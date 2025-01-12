"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Content } from "@/app/types/content";

export default function ManageSectionContentPage() {
    const { sectionId } = useParams();
    console.log("Resolved sectionId:", sectionId);

    const [contentList, setContentList] = useState<Content[]>([]);
    const [textContent, setTextContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch(`/api/section-content/${sectionId}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch content.");
                }
                const data = await res.json();
                setContentList(data.content);
            } catch (err) {
                console.error(err);
                setError("Error fetching content.");
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [sectionId]);

    const handleAddContent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("SECTION ID: ", sectionId);

            const res = await fetch(`/api/section-content/${sectionId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sectionId,
                    type: "text",
                    text: textContent,
                }),
            });
            if (!res.ok) {
                throw new Error("Failed to add content.");
            }
            const newContent = await res.json();
            setContentList((prev) => [...prev, newContent]);
            setTextContent("");
        } catch (err) {
            console.error(err);
            setError("Error adding content.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] bg-dracula-background text-dracula-foreground">
            <h1 className="text-3xl font-bold mb-6">Manage Section Content</h1>
            {loading ? (
                <p>Loading content...</p>
            ) : error ? (
                <p className="text-dracula-red">{error}</p>
            ) : (
                <ul className="w-full max-w-3xl mb-6">
                    {contentList.map((content) => (
                        <li
                            key={content.$id}
                            className="p-4 border-b border-dracula-comment"
                        >
                            <p className="text-sm text-dracula-comment">
                                {content.text}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            <form
                onSubmit={handleAddContent}
                className="w-full max-w-3xl bg-dracula-currentLine p-4 rounded"
            >
                <h2 className="text-lg font-bold mb-4">Add Text Content</h2>
                <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    className="w-full px-4 py-2 border border-dracula-selection rounded bg-dracula-background text-dracula-foreground"
                    placeholder="Enter your text content here..."
                />
                <button
                    type="submit"
                    className="mt-4 px-6 py-3 bg-dracula-green text-dracula-background rounded hover:bg-dracula-cyan"
                >
                    Add Content
                </button>
            </form>
        </div>
    );
}
