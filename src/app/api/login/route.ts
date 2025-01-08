import { NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { databases } from "@/lib/appwrite";
import {
    APPWRITE_DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID,
} from "@/config/appwrite";
import bcrypt from "bcrypt";
import type { User } from "@/types/user";

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json(
            { error: "Missing email or password" },
            { status: 400 }
        );
    }

    try {
        const response = await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_USER_COLLECTION_ID,
            [Query.equal("email", email)]
        );

        if (response.documents.length === 0) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const userDoc = response.documents[0];

        const user: User = {
            id: userDoc.$id,
            email: userDoc.email,
            password: userDoc.password,
            role: userDoc.role,
            created_at: userDoc.created_at,
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 401 }
            );
        }

        const res = NextResponse.json(
            {
                message: "Login successful",
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 200 }
        );

        // Set cookie for session
        res.cookies.set(
            "user",
            JSON.stringify({ id: user.id, role: user.role }),
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            }
        );

        return res;
    } catch (error) {
        console.error("Error during login:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                { error: "Failed to login user", details: error.message },
                { status: 500 }
            );
        } else {
            return NextResponse.json(
                {
                    error: "Failed to login user",
                    details: "Unknown error occurred",
                },
                { status: 500 }
            );
        }
    }
}
