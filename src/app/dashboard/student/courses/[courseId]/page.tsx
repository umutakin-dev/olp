"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Course } from "@/app/types/course";

export default function ViewCoursePage() {
    const { courseId } = useParams(); // Get course ID from the route params
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const res = await fetch(`/api/courses/${courseId}`); // Fetch course details
                if (!res.ok) {
                    throw new Error("Failed to fetch course details.");
                }
                const data = await res.json();
                setCourse(data.course as Course);
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
        </div>
    );
}
