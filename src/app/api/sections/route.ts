import { NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { databases } from "@/lib/appwrite";
import {
    APPWRITE_DATABASE_ID,
    APPWRITE_SECTION_COLLECTION_ID,
} from "@/config/appwrite";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
        return NextResponse.json(
            { error: "Missing course ID" },
            { status: 400 }
        );
    }

    try {
        const response = await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_SECTION_COLLECTION_ID,
            [Query.equal("courseId", courseId)]
        );

        return NextResponse.json(
            { sections: response.documents },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching sections:", error);
        return NextResponse.json(
            { error: "Failed to fetch sections" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    const { courseId, title, description } = body;

    if (!courseId || !title) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    try {
        const response = await databases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_SECTION_COLLECTION_ID,
            "unique()",
            {
                courseId,
                title,
                description,
                createdAt: new Date().toISOString(),
            }
        );

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error("Error adding section:", error);
        return NextResponse.json(
            { error: "Failed to add section" },
            { status: 500 }
        );
    }
}
