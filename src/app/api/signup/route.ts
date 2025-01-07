import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
import bcrypt from "bcrypt";
import {
    APPWRITE_DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID,
} from "@/config/appwrite";

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password, role } = body;

    if (!email || !password || !role) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const response = await databases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_USER_COLLECTION_ID,
            "unique()",
            {
                email,
                password: hashedPassword,
                role,
            }
        );

        return NextResponse.json(
            {
                message: "User registered successfully!",
                user: {
                    id: response.$id,
                    email: response.email,
                    role: response.role,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error during user registration:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                { error: "Failed to register user", details: error.message },
                { status: 500 }
            );
        } else {
            return NextResponse.json(
                {
                    error: "Failed to register user",
                    details: "Unknown error occurred",
                },
                { status: 500 }
            );
        }
    }
}
