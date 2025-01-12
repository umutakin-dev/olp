import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import {
    APPWRITE_DATABASE_ID,
    APPWRITE_COURSE_COLLECTION_ID,
} from "@/config/appwrite";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const instructorId = searchParams.get("instructorId");

    try {
        let response;

        // If `instructorId` is provided, filter courses by `instructorId`
        if (instructorId) {
            response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_COURSE_COLLECTION_ID,
                [Query.equal("instructorId", instructorId)]
            );
        } else {
            // Fetch all courses if `instructorId` is not provided
            response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_COURSE_COLLECTION_ID
            );
        }

        return NextResponse.json(
            { courses: response.documents },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json(
            { error: "Failed to fetch courses" },
            { status: 500 }
        );
    }
}

// POST method remains the same (for instructors creating courses)
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

// import { NextResponse } from "next/server";
// import { databases } from "@/lib/appwrite";
// import { Query } from "node-appwrite";
// import {
//     APPWRITE_DATABASE_ID,
//     APPWRITE_COURSE_COLLECTION_ID,
// } from "@/config/appwrite";

// export async function GET(req: Request) {
//     const { searchParams } = new URL(req.url);
//     const instructorId = searchParams.get("instructorId");

//     if (!instructorId) {
//         return NextResponse.json(
//             { error: "Missing instructor ID" },
//             { status: 400 }
//         );
//     }

//     try {
//         const response = await databases.listDocuments(
//             APPWRITE_DATABASE_ID,
//             APPWRITE_COURSE_COLLECTION_ID,
//             [Query.equal("instructorId", instructorId)]
//         );

//         return NextResponse.json(
//             { courses: response.documents },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("Error fetching courses:", error);
//         return NextResponse.json(
//             { error: "Failed to fetch courses" },
//             { status: 500 }
//         );
//     }
// }

// export async function POST(req: Request) {
//     const body = await req.json();
//     const { title, description, price, instructorId } = body;

//     if (!title || !price || !instructorId) {
//         return NextResponse.json(
//             { error: "Missing required fields" },
//             { status: 400 }
//         );
//     }

//     try {
//         const response = await databases.createDocument(
//             APPWRITE_DATABASE_ID,
//             APPWRITE_COURSE_COLLECTION_ID,
//             "unique()",
//             {
//                 title,
//                 description,
//                 price,
//                 instructorId,
//                 created_at: new Date().toISOString(),
//             }
//         );

//         return NextResponse.json(
//             {
//                 message: "Course created successfully!",
//                 course: response,
//             },
//             { status: 201 }
//         );
//     } catch (error) {
//         console.error("Error during course creation:", error);
//         if (error instanceof Error) {
//             return NextResponse.json(
//                 { error: "Failed to create course", details: error.message },
//                 { status: 500 }
//             );
//         } else {
//             return NextResponse.json(
//                 {
//                     error: "Failed to create course",
//                     details: "Unknown error occurred",
//                 },
//                 { status: 500 }
//             );
//         }
//     }
// }
