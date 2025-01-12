import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { databases } from "@/lib/appwrite";
import {
    APPWRITE_DATABASE_ID,
    APPWRITE_COURSE_COLLECTION_ID,
} from "@/config/appwrite";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { error: "Missing course ID" },
            { status: 400 }
        );
    }

    try {
        const response = await databases.getDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_COURSE_COLLECTION_ID,
            id
        );

        return NextResponse.json({ course: response }, { status: 200 });
    } catch (error) {
        console.error("Error fetching course details:", error);
        return NextResponse.json(
            { error: "Failed to fetch course details" },
            { status: 500 }
        );
    }
}
