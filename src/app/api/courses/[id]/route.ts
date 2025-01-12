import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { databases } from "@/lib/appwrite";
import {
    APPWRITE_DATABASE_ID,
    APPWRITE_COURSE_COLLECTION_ID,
} from "@/config/appwrite";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Ensure params is typed as a Promise
) {
    const { id } = await params; // Await the params object

    if (!id) {
        return NextResponse.json(
            { error: "Missing course ID" },
            { status: 400 }
        );
    }

    try {
        // Fetch the course document from Appwrite using the ID
        const response = await databases.getDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_COURSE_COLLECTION_ID,
            id
        );

        // Respond with the course details
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
// import { NextRequest } from "next/server";

// export async function GET(
//     request: NextRequest,
//     { params }: { params: Promise<{ id: string }> } // Ensure params is typed as a Promise
// ) {
//     const { id } = await params; // Await the params object

//     if (!id) {
//         return NextResponse.json(
//             { error: "Missing course ID" },
//             { status: 400 }
//         );
//     }

//     // Replace this with your actual database call
//     return NextResponse.json({ course: { id, name: "Sample Course" } });
// }

// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// export async function GET(
//     request: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     const { id } = params;
//     return NextResponse.json({ id });
// }

// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// // Handle dynamic `id` from URL
// export async function GET(
//     request: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     console.log("Params received:", params);
//     return NextResponse.json({ message: `Received ID: ${params.id}` });
// }

// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// // A minimal static API response
// export async function GET(request: NextRequest) {
//     const xxx = request.url;
//     console.log(xxx);
//     return NextResponse.json({ message: "Static response for testing!" });
// }

// import { NextResponse } from "next/server";
// import { databases } from "@/lib/appwrite";
// import {
//     APPWRITE_DATABASE_ID,
//     APPWRITE_COURSE_COLLECTION_ID,
// } from "@/config/appwrite";
// import type { NextRequest } from "next/server";

// export async function GET(
//     request: NextRequest,
//     { params }: { params: { id: string } } // Explicitly typing params
// ) {
//     const id = params.id; // Safely access `id`

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
//     req: Request,
//     { params }: { params: Record<string, string> } // Correctly use Record<string, string>
// ) {
//     const id = params.id; // Safely extract `id`

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

// interface ContextParams {
//     params: { id: string };
// }

// export async function GET(
//     req: Request,
//     context: ContextParams // Explicitly define the type for context
// ) {
//     const id = context.params.id; // Safely extract `id`

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
//     req: Request,
//     { params }: { params: Record<string, string> } // Updated type definition
// ) {
//     const id = params.id; // Extract the ID directly

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
//     req: Request,
//     context: { params: { id: string } } // params is a direct property
// ) {
//     // Await the params as per the latest Next.js API requirements
//     const { id } = await Promise.resolve(context.params);

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
//     req: Request,
//     context: { params: () => Promise<{ id: string }> } // params is now a function returning a Promise
// ) {
//     const { id } = await context.params(); // Await the params function

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

// // API Route for dynamic course ID
// export async function GET(
//     req: Request,
//     { params }: { params: { id: string } } // Destructure params correctly
// ) {
//     const id = await params.id; // Await the params object to ensure it's resolved

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

// // API Route for dynamic course ID
// export async function GET(req: Request, context: { params: { id: string } }) {
//     const { id } = context.params; // Correct way to extract the dynamic ID

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

// // Explicitly define the type of the context parameter
// export async function GET(
//     req: Request,
//     context: { params: Record<string, string> }
// ) {
//     const { params } = context; // Extract params safely
//     const id = params.id; // Get the dynamic route parameter

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
