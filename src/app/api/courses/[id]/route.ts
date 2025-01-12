import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
import {
    APPWRITE_DATABASE_ID,
    APPWRITE_COURSE_COLLECTION_ID,
} from "@/config/appwrite";

// Explicitly define the type of the context parameter
export async function GET(
    req: Request,
    context: { params: Record<string, string> }
) {
    const { params } = context; // Extract params safely
    const id = params.id; // Get the dynamic route parameter

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

// import { NextResponse } from "next/server";
// import { databases } from "@/lib/appwrite";
// import {
//     APPWRITE_DATABASE_ID,
//     APPWRITE_COURSE_COLLECTION_ID,
// } from "@/config/appwrite";

// export async function GET(
//     request: Request,
//     context: { params: { id: string } } // Context for dynamic route parameters
// ) {
//     const { params } = context; // Correctly extract params from context
//     const { id } = params; // Extract the ID from params

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

// import { NextResponse } from "next/server";
// import { databases } from "@/lib/appwrite";
// import {
//     APPWRITE_DATABASE_ID,
//     APPWRITE_COURSE_COLLECTION_ID,
// } from "@/config/appwrite";
// import type { NextRequest } from "next/server";

// interface RouteContext {
//     params: Record<string, string>; // Define params as a record with string keys and values
// }

// export async function GET(req: NextRequest, context: RouteContext) {
//     const params = context.params;
//     const id = params?.id; // Safely access id

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

// import { NextResponse } from "next/server";
// import { databases } from "@/lib/appwrite";
// import {
//     APPWRITE_DATABASE_ID,
//     APPWRITE_COURSE_COLLECTION_ID,
// } from "@/config/appwrite";
// import type { NextRequest } from "next/server";

// // Fix for stricter Vercel type checks
// export async function GET(
//     req: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     const { id } = params;

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

// import { NextResponse } from "next/server";
// import { databases } from "@/lib/appwrite";
// import {
//     APPWRITE_DATABASE_ID,
//     APPWRITE_COURSE_COLLECTION_ID,
// } from "@/config/appwrite";

// export async function GET(req: Request, context: { params: { id: string } }) {
//     const { id } = context.params;

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

// import { NextResponse } from "next/server";
// import { databases } from "@/lib/appwrite";
// import {
//     APPWRITE_DATABASE_ID,
//     APPWRITE_COURSE_COLLECTION_ID,
// } from "@/config/appwrite";

// export async function GET(
//     request: Request,
//     { params }: { params: { id: string } } // Use the correct typing
// ) {
//     const { id } = params;

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
//         console.error("Error fetching course:", error);
//         return NextResponse.json(
//             { error: "Failed to fetch course" },
//             { status: 500 }
//         );
//     }
// }

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
