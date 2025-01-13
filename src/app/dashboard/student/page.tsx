"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@/app/types/course";
import { useSession } from "@/context/SessionContext";

export default function StudentDashboard() {
    const router = useRouter();
    const { user } = useSession(); // Access session data
    const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
    const [availableFilter, setAvailableFilter] = useState("");
    const [enrolledFilter, setEnrolledFilter] = useState("");

    const [loadingAvailable, setLoadingAvailable] = useState(true);
    const [loadingEnrolled, setLoadingEnrolled] = useState(true);
    const [errorAvailable, setErrorAvailable] = useState("");
    const [errorEnrolled, setErrorEnrolled] = useState("");

    const studentId = user?.id; // Retrieve studentId from session

    // Fetch available courses from the backend API
    useEffect(() => {
        if (!studentId) return;

        const fetchAvailableCourses = async () => {
            try {
                const res = await fetch("/api/courses");
                if (!res.ok) {
                    throw new Error("Failed to fetch available courses.");
                }
                const data = await res.json();
                setAvailableCourses(data.courses as Course[]);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err.message);
                    setErrorAvailable(err.message);
                } else {
                    console.error("Unexpected error", err);
                    setErrorAvailable("An unexpected error occurred.");
                }
            } finally {
                setLoadingAvailable(false);
            }
        };

        // Fetch enrolled courses
        const fetchEnrolledCourses = async () => {
            try {
                const res = await fetch(
                    `/api/enrollments?studentId=${studentId}`
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch enrolled courses.");
                }
                const data = await res.json();
                const courses = data.enrollments
                    .filter(
                        (enrollment: { course: Course }) => enrollment.course
                    )
                    .map((enrollment: { course: Course }) => enrollment.course);
                setEnrolledCourses(courses);

                // Remove already enrolled courses from available courses
                setAvailableCourses((prevAvailableCourses) =>
                    prevAvailableCourses.filter(
                        (course) =>
                            !courses.some(
                                (enrolled: Course) =>
                                    enrolled.$id === course.$id
                            )
                    )
                );
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err.message);
                    setErrorEnrolled(err.message);
                } else {
                    console.error("Unexpected error", err);
                    setErrorEnrolled("An unexpected error occurred.");
                }
            } finally {
                setLoadingEnrolled(false);
            }
        };

        fetchAvailableCourses();
        fetchEnrolledCourses();
    }, [studentId]);

    // Handle enrollment
    const handleEnroll = async (courseId: string) => {
        try {
            const res = await fetch("/api/enrollments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId, courseId }),
            });

            if (!res.ok) {
                const errorData: { error: string } = await res.json();
                throw new Error(errorData.error || "Failed to enroll.");
            }

            const enrolledCourse = availableCourses.find(
                (course) => course.$id === courseId
            );

            if (enrolledCourse) {
                // Move the course from available to enrolled
                setEnrolledCourses((prev) => [...prev, enrolledCourse]);
                setAvailableCourses((prev) =>
                    prev.filter((course) => course.$id !== courseId)
                );
            }

            alert("Enrolled successfully!");
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
                alert(`Error: ${err.message}`);
            } else {
                console.error("Unexpected error", err);
                alert("An unexpected error occurred.");
            }
        }
    };

    const handleAvailableFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvailableFilter(e.target.value);
    };

    const handleEnrolledFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnrolledFilter(e.target.value);
    };

    const filteredAvailableCourses = availableCourses.filter((course) =>
        course.title.toLowerCase().includes(availableFilter.toLowerCase())
    );

    const filteredEnrolledCourses = enrolledCourses.filter((course) =>
        course.title.toLowerCase().includes(enrolledFilter.toLowerCase())
    );

    return (
        <div className="flex w-5/6 h-[calc(100vh-6rem)] bg-dracula-background text-dracula-foreground">
            {/* Available Courses Section */}
            <div className="w-1/2 p-4 border-r border-dracula-comment overflow-y-scroll hide-scrollbar">
                <h2 className="text-2xl font-bold mb-4 text-dracula-purple">
                    Available Courses
                </h2>
                {/* Filter Input */}
                <input
                    type="text"
                    placeholder="Filter available courses..."
                    value={availableFilter}
                    onChange={handleAvailableFilter}
                    className="mb-4 w-full px-4 py-2 border border-dracula-selection rounded bg-dracula-background text-dracula-foreground"
                />
                {loadingAvailable ? (
                    <p className="text-dracula-comment">Loading...</p>
                ) : errorAvailable ? (
                    <p className="text-dracula-red">{errorAvailable}</p>
                ) : (
                    <ul className="space-y-4">
                        {filteredAvailableCourses.map((course) => (
                            <li
                                key={course.$id}
                                className="flex justify-between items-center p-6 bg-dracula-currentLine rounded shadow"
                            >
                                <div>
                                    <h3 className="text-lg font-bold text-dracula-green">
                                        {course.title}
                                    </h3>
                                    <p className="text-dracula-comment">
                                        {course.description}
                                    </p>
                                </div>
                                <button
                                    className="px-4 py-2 bg-dracula-cyan text-dracula-background rounded hover:bg-dracula-purple"
                                    onClick={() => handleEnroll(course.$id)}
                                >
                                    Enroll
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Enrolled Courses Section */}
            <div className="w-1/2 p-4 overflow-y-scroll hide-scrollbar">
                <h2 className="text-2xl font-bold mb-4 text-dracula-purple">
                    Enrolled Courses
                </h2>
                {/* Filter Input */}
                <input
                    type="text"
                    placeholder="Filter enrolled courses..."
                    value={enrolledFilter}
                    onChange={handleEnrolledFilter}
                    className="mb-4 w-full px-4 py-2 border border-dracula-selection rounded bg-dracula-background text-dracula-foreground"
                />
                {loadingEnrolled ? (
                    <p className="text-dracula-comment">Loading...</p>
                ) : errorEnrolled ? (
                    <p className="text-dracula-red">{errorEnrolled}</p>
                ) : (
                    <ul className="space-y-4">
                        {filteredEnrolledCourses.map((course) => (
                            <li
                                key={course.$id}
                                className="flex justify-between items-center p-6 bg-dracula-currentLine rounded shadow"
                            >
                                <div>
                                    <h3 className="text-lg font-bold text-dracula-green">
                                        {course.title}
                                    </h3>
                                    <p className="text-dracula-comment">
                                        {course.description}
                                    </p>
                                </div>
                                <button
                                    className="px-4 py-2 bg-dracula-red text-dracula-background rounded hover:bg-dracula-orange"
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/student/courses/${course.$id}`
                                        )
                                    }
                                >
                                    View Course
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
