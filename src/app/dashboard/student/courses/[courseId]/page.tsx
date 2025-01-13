"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Course } from "@/app/types/course";
import { Section } from "@/app/types/section";
import { Content } from "@/app/types/content";

// Define a new type for Section with content
type SectionWithContent = Section & {
    content: Content[]; // Add content explicitly
};

export default function ViewCoursePage() {
    const { courseId } = useParams(); // Get course ID from the route params
    const [course, setCourse] = useState<Course | null>(null);
    const [sections, setSections] = useState<SectionWithContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                // Fetch course details
                const courseRes = await fetch(`/api/courses/${courseId}`);
                if (!courseRes.ok) {
                    throw new Error("Failed to fetch course details.");
                }
                const courseData = await courseRes.json();
                setCourse(courseData.course as Course);

                // Fetch sections for the course
                const sectionsRes = await fetch(
                    `/api/sections?courseId=${courseId}`
                );
                if (!sectionsRes.ok) {
                    throw new Error("Failed to fetch sections.");
                }
                const sectionsData = await sectionsRes.json();
                const sectionsWithContent = await Promise.all(
                    sectionsData.sections.map(async (section: Section) => {
                        // Fetch content for each section
                        const contentRes = await fetch(
                            `/api/section-content/${section.$id}`
                        );
                        if (!contentRes.ok) {
                            throw new Error("Failed to fetch section content.");
                        }
                        const contentData = await contentRes.json();
                        return {
                            ...section,
                            content: contentData.content as Content[],
                        };
                    })
                );

                setSections(sectionsWithContent);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err.message);
                    setError(err.message);
                } else {
                    console.error("Unexpected error:", err);
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourseDetails();
        }
    }, [courseId]);

    if (loading) {
        return <p>Loading course details...</p>;
    }

    if (error) {
        return <p className="text-dracula-red">{error}</p>;
    }

    if (!course) {
        return <p className="text-dracula-comment">Course not found.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] bg-dracula-background text-dracula-foreground">
            <h1 className="text-4xl font-bold mb-6 text-dracula-green">
                {course.title}
            </h1>
            <p className="text-lg mb-4 text-dracula-comment">
                {course.description}
            </p>
            <p className="text-lg text-dracula-foreground">
                Price: ${course.price}
            </p>

            {/* Sections */}
            <div className="mt-8 w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-4 text-dracula-purple">
                    Sections
                </h2>
                {sections.length === 0 ? (
                    <p className="text-dracula-comment">
                        No sections available.
                    </p>
                ) : (
                    sections.map((section) => (
                        <div
                            key={section.$id}
                            className="mb-6 p-4 bg-dracula-currentLine rounded shadow"
                        >
                            <h3 className="text-lg font-bold text-dracula-green">
                                {section.title}
                            </h3>
                            <p className="text-dracula-comment">
                                {section.description}
                            </p>

                            {/* Content */}
                            {section.content.length > 0 ? (
                                <ul className="mt-4 space-y-2">
                                    {section.content.map((content) => (
                                        <li
                                            key={content.$id}
                                            className="p-2 bg-dracula-selection rounded"
                                        >
                                            {content.type === "text" ? (
                                                <p className="text-dracula-foreground">
                                                    {content.text}
                                                </p>
                                            ) : (
                                                <p className="text-dracula-comment">
                                                    Unsupported content type
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-4 text-dracula-comment">
                                    No content available.
                                </p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
