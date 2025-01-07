"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";

interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
}

export default function InstructorDashboard() {
    const router = useRouter();
    const { user } = useSession();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            if (!user || user.role !== "instructor") return;

            try {
                const res = await fetch(`/api/courses?instructorId=${user.id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch courses");
                }
                const data = await res.json();
                setCourses(data.courses);
            } catch (err) {
                console.error(err);
                setError("Failed to load courses.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [user]);

    return (
        <div className="flex flex-col flex-grow bg-dracula-background text-dracula-foreground">
            <main className="flex flex-col items-center justify-start flex-grow p-6">
                <h1 className="text-3xl font-bold mb-6">
                    Instructor Dashboard
                </h1>
                <button
                    onClick={() =>
                        router.push("/dashboard/instructor/create-course")
                    }
                    className="px-6 py-3 bg-dracula-green text-dracula-background rounded hover:bg-dracula-cyan focus:ring-dracula-purple mb-6"
                >
                    Create a New Course
                </button>
                {loading ? (
                    <p>Loading courses...</p>
                ) : error ? (
                    <p className="text-dracula-red">{error}</p>
                ) : courses.length === 0 ? (
                    <p>No courses created yet.</p>
                ) : (
                    <div className="w-full max-w-4xl">
                        <table className="w-full text-left bg-dracula-currentLine rounded-lg overflow-hidden">
                            <thead className="bg-dracula-selection text-dracula-foreground">
                                <tr>
                                    <th className="px-4 py-2">Title</th>
                                    <th className="px-4 py-2">Description</th>
                                    <th className="px-4 py-2">Price ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr
                                        key={course.id} // Unique key prop
                                        className="hover:bg-dracula-comment transition-colors"
                                    >
                                        <td className="px-4 py-2">
                                            {course.title}
                                        </td>
                                        <td className="px-4 py-2">
                                            {course.description}
                                        </td>
                                        <td className="px-4 py-2">
                                            {course.price}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
