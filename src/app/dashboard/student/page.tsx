"use client";

import { useState } from "react";

export default function StudentDashboard() {
    // Mock data for available and enrolled courses
    const [availableCourses] = useState(
        Array.from({ length: 20 }, (_, i) => ({
            id: `${i + 1}`,
            title: `Available Course ${i + 1}`,
            description: `Description of Available Course ${i + 1}`,
        }))
    );

    const [enrolledCourses] = useState(
        Array.from({ length: 10 }, (_, i) => ({
            id: `e${i + 1}`,
            title: `Enrolled Course ${i + 1}`,
            description: `Description of Enrolled Course ${i + 1}`,
        }))
    );

    return (
        <div className="flex w-5/6 h-[calc(100vh-6rem)] bg-dracula-background text-dracula-foreground">
            {/* Available Courses Section */}
            <div className="w-1/2 p-4 border-r border-dracula-comment overflow-y-scroll hide-scrollbar">
                <h2 className="text-2xl font-bold mb-4 text-dracula-purple">
                    Available Courses
                </h2>
                <ul className="space-y-4">
                    {availableCourses.map((course) => (
                        <li
                            key={course.id}
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
                                onClick={() =>
                                    alert(`Enrolling in ${course.title}`)
                                }
                            >
                                Enroll
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Enrolled Courses Section */}
            <div className="w-1/2 p-4 overflow-y-scroll hide-scrollbar">
                <h2 className="text-2xl font-bold mb-4 text-dracula-purple">
                    Enrolled Courses
                </h2>
                <ul className="space-y-4">
                    {enrolledCourses.map((course) => (
                        <li
                            key={course.id}
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
                                onClick={() => alert(`Viewing ${course.title}`)}
                            >
                                View Course
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
