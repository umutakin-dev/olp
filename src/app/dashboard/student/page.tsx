"use client";

import { useState } from "react";

export default function StudentDashboard() {
    const mockAvailableCourses = Array.from({ length: 20 }, (_, i) => ({
        id: `${i + 1}`,
        title: `Available Course ${i + 1}`,
        description: `Description of Available Course ${i + 1}`,
    }));

    const mockEnrolledCourses = Array.from({ length: 10 }, (_, i) => ({
        id: `e${i + 1}`,
        title: `Enrolled Course ${i + 1}`,
        description: `Description of Enrolled Course ${i + 1}`,
    }));

    const [availableCourses, setAvailableCourses] =
        useState(mockAvailableCourses);
    const [enrolledCourses, setEnrolledCourses] = useState(mockEnrolledCourses);

    const [availableFilter, setAvailableFilter] = useState("");
    const [enrolledFilter, setEnrolledFilter] = useState("");

    const handleAvailableFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvailableFilter(e.target.value);
        if (e.target.value) {
            setAvailableCourses(
                mockAvailableCourses.filter((course) =>
                    course.title
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                )
            );
        } else {
            setAvailableCourses(mockAvailableCourses);
        }
    };

    const handleEnrolledFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnrolledFilter(e.target.value);
        if (e.target.value) {
            setEnrolledCourses(
                mockEnrolledCourses.filter((course) =>
                    course.title
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                )
            );
        } else {
            setEnrolledCourses(mockEnrolledCourses);
        }
    };

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
                {/* Filter Input */}
                <input
                    type="text"
                    placeholder="Filter enrolled courses..."
                    value={enrolledFilter}
                    onChange={handleEnrolledFilter}
                    className="mb-4 w-full px-4 py-2 border border-dracula-selection rounded bg-dracula-background text-dracula-foreground"
                />
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
