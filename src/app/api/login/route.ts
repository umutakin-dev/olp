import { NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { databases } from "@/lib/appwrite";
import bcrypt from "bcrypt";

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
        // Use Query.equal for the correct filter
        const response = await databases.listDocuments(
            "677d29f70023c8163ec9", // Database ID
            "677d29fc00392e98bc88", // Collection ID
            [Query.equal("email", email)]
        );

        // Check if user exists
        if (response.documents.length === 0) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Get the first document
        const user = response.documents[0];

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 401 }
            );
        }

        // Respond with user data
        return NextResponse.json(
            {
                message: "Login successful",
                user: { id: user.$id, email: user.email, role: user.role },
            },
            { status: 200 }
        );
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
