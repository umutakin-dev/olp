import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import {
    APPWRITE_DATABASE_ID,
    APPWRITE_ENROLLMENT_COLLECTION_ID,
    APPWRITE_COURSE_COLLECTION_ID,
} from "@/config/appwrite";
// import { Enrollment } from "@/app/types/enrollment";

// GET: Fetch enrolled courses for a student
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    // Check if `studentId` is provided
    if (!studentId) {
        return NextResponse.json(
            { error: "Student ID is required to fetch enrollments." },
            { status: 400 }
        );
    }

    try {
        let response;

        // If `studentId` is provided, filter enrollments by `studentId`

        if (studentId) {
            response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_ENROLLMENT_COLLECTION_ID,
                [Query.equal("studentId", studentId)]
            );
        } else {
            // Fetch all enrollments if `studentId` is not provided
            response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_ENROLLMENT_COLLECTION_ID
            );
        }

        // Fetch associated course details for each enrollment
        const enrollmentsWithCourses = await Promise.all(
            response.documents.map(async (enrollment) => {
                const course = await databases.getDocument(
                    APPWRITE_DATABASE_ID,
                    APPWRITE_COURSE_COLLECTION_ID,
                    enrollment.courseId
                );
                return { ...enrollment, course };
            })
        );

        return NextResponse.json(
            { enrollments: enrollmentsWithCourses },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        return NextResponse.json(
            { error: "Failed to fetch enrollments" },
            { status: 500 }
        );
    }
}

// POST: Enroll a student in a course
export async function POST(req: Request) {
    const body = await req.json();
    const { studentId, courseId } = body;

    if (!studentId || !courseId) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    try {
        // Check if enrollment already exists
        const existingEnrollment = await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_ENROLLMENT_COLLECTION_ID,
            [
                Query.equal("studentId", studentId),
                Query.equal("courseId", courseId),
            ]
        );

        if (existingEnrollment.documents.length > 0) {
            return NextResponse.json(
                { error: "Student is already enrolled in this course." },
                { status: 400 }
            );
        }

        // Create new enrollment
        const response = await databases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_ENROLLMENT_COLLECTION_ID,
            "unique()",
            {
                studentId,
                courseId,
                createdAt: new Date().toISOString(),
            }
        );

        return NextResponse.json(
            {
                message: "Enrollment successful!",
                enrollment: response,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating enrollment:", error);
        return NextResponse.json(
            { error: "Failed to enroll in course" },
            { status: 500 }
        );
    }
}
