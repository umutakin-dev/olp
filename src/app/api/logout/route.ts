import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json(
        { message: "Logged out successfully" },
        { status: 200 }
    );

    // Clear the user cookie
    response.cookies.set("user", "", {
        path: "/",
        expires: new Date(0),
    });

    return response;
}
