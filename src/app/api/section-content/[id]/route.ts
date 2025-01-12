import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { databases } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import {
    APPWRITE_DATABASE_ID,
    APPWRITE_CONTENT_COLLECTION_ID,
} from "@/config/appwrite";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: sectionId } = await params;

    if (!sectionId) {
        return NextResponse.json(
            { error: "Missing section ID" },
            { status: 400 }
        );
    }

    try {
        const response = await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_CONTENT_COLLECTION_ID,

            [Query.equal("sectionId", sectionId)]
        );

        return NextResponse.json(
            { content: response.documents },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching content:", error);
        return NextResponse.json(
            { error: "Failed to fetch content" },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: sectionId } = await params;
    const body = await request.json();
    const { type, text } = body;

    if (!sectionId || !type || (type === "text" && !text)) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    try {
        const response = await databases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_CONTENT_COLLECTION_ID,
            "unique()",
            {
                sectionId,
                type,
                text,
                createdAt: new Date().toISOString(),
            }
        );

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error("Error adding content:", error);
        return NextResponse.json(
            { error: "Failed to add content" },
            { status: 500 }
        );
    }
}
