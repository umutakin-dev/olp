"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Course } from "@/types/course";

export default function CourseDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const res = await fetch(`/api/courses/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch course details");
                }
                const data = await res.json();
                setCourse(data.course);
            } catch (err) {
                console.error(err);
                setError("Failed to load course details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]);

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
            <div className="flex flex-col items-center justify-center w-full max-w-3xl px-4">
                <h1 className="text-4xl font-bold mb-6 text-dracula-purple">
                    {course.title}
                </h1>
                <p className="mb-4 text-lg text-dracula-comment">
                    {course.description}
                </p>
                <p className="mb-6 text-lg text-dracula-foreground">
                    Price: ${course.price}
                </p>
                <button
                    onClick={() => router.back()}
                    className="px-6 py-3 bg-dracula-green text-dracula-background rounded hover:bg-dracula-cyan focus:ring-dracula-purple"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}
