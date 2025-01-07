import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
// import { Query } from "node-appwrite";
import {
    APPWRITE_DATABASE_ID,
    APPWRITE_COURSE_COLLECTION_ID,
} from "@/config/appwrite";

export async function POST(req: Request) {
    const body = await req.json();
    const { title, description, price, instructorId } = body;

    if (!title || !price || !instructorId) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    try {
        const response = await databases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_COURSE_COLLECTION_ID,
            "unique()",
            {
                title,
                description,
                price,
                instructorId,
                created_at: new Date().toISOString(),
            }
        );

        return NextResponse.json(
            {
                message: "Course created successfully!",
                course: response,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error during course creation:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                { error: "Failed to create course", details: error.message },
                { status: 500 }
            );
        } else {
            return NextResponse.json(
                {
                    error: "Failed to create course",
                    details: "Unknown error occurred",
                },
                { status: 500 }
            );
        }
    }
}
