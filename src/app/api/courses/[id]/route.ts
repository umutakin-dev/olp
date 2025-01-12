import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
import {
    APPWRITE_DATABASE_ID,
    APPWRITE_COURSE_COLLECTION_ID,
} from "@/config/appwrite";

export async function GET(
    request: Request,
    { params }: { params: { id: string } } // Use the correct typing
) {
    const { id } = params;

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
        console.error("Error fetching course:", error);
        return NextResponse.json(
            { error: "Failed to fetch course" },
            { status: 500 }
        );
    }
}

// import { NextResponse } from "next/server";
// import { databases } from "@/lib/appwrite";
// import {
//     APPWRITE_DATABASE_ID,
//     APPWRITE_COURSE_COLLECTION_ID,
// } from "@/config/appwrite";

// export async function GET(
//     request: Request,
//     { params }: { params: { id: string } } // Properly destructure the dynamic params
// ) {
//     const { id } = await params; // Await the params

//     if (!id) {
//         return NextResponse.json(
//             { error: "Missing course ID" },
//             { status: 400 }
//         );
//     }

//     try {
//         const response = await databases.getDocument(
//             APPWRITE_DATABASE_ID,
//             APPWRITE_COURSE_COLLECTION_ID,
//             id
//         );

//         return NextResponse.json({ course: response }, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching course details:", error);
//         return NextResponse.json(
//             { error: "Failed to fetch course details" },
//             { status: 500 }
//         );
//     }
// }
