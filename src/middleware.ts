import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const user = req.cookies.get("user");

    console.log("Middleware triggered for:", req.url);

    // Redirect unauthenticated users trying to access /dashboard
    if (!user && url.pathname.startsWith("/dashboard")) {
        console.log("Redirecting to login due to missing authentication.");
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Prevent logged-in users from accessing /auth/login or /auth/signup
    if (
        user &&
        (url.pathname === "/auth/login" || url.pathname === "/auth/signup")
    ) {
        const userData = JSON.parse(user.value);
        return NextResponse.redirect(
            new URL(`/dashboard/${userData.role}`, req.url)
        );
    }

    // Pass through without modifying cookies
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*"],
};
