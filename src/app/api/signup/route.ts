import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";
import { User } from "../../types/user"; // Adjust this import based on your structure

interface SQLiteError extends Error {
    code: string;
}

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
        const db = new sqlite3.Database("./olp.db");

        return new Promise((resolve) => {
            db.run(
                "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
                [email, hashedPassword, role],
                function (err: SQLiteError | null) {
                    if (err) {
                        db.close();
                        if (err.code === "SQLITE_CONSTRAINT") {
                            resolve(
                                NextResponse.json(
                                    { error: "Email already exists" },
                                    { status: 400 }
                                )
                            );
                        } else {
                            resolve(
                                NextResponse.json(
                                    { error: "Database error" },
                                    { status: 500 }
                                )
                            );
                        }
                    } else {
                        // Query the newly created user
                        db.get(
                            "SELECT id, email, role FROM users WHERE email = ?",
                            [email],
                            (
                                err: SQLiteError | null,
                                user: Pick<User, "id" | "email" | "role">
                            ) => {
                                db.close();
                                if (err) {
                                    resolve(
                                        NextResponse.json(
                                            { error: "Database error" },
                                            { status: 500 }
                                        )
                                    );
                                } else {
                                    resolve(
                                        NextResponse.json(
                                            {
                                                message:
                                                    "User registered successfully!",
                                                user, // Return only id, email, and role
                                            },
                                            { status: 201 }
                                        )
                                    );
                                }
                            }
                        );
                    }
                }
            );
        });
    } catch (error) {
        console.error("Signup error:", error); // Optional: Log the error
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// import { NextResponse } from "next/server";
// import sqlite3 from "sqlite3";
// import bcrypt from "bcrypt";

// import { User } from "../../types/user"; // Adjust this import based on your structure

// interface SQLiteError extends Error {
//     code: string;
// }

// export async function POST(req: Request) {
//     const body = await req.json();
//     const { email, password, role } = body;

//     if (!email || !password || !role) {
//         return NextResponse.json(
//             { error: "Missing required fields" },
//             { status: 400 }
//         );
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const db = new sqlite3.Database("./olp.db");

//         return new Promise((resolve) => {
//             db.run(
//                 "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
//                 [email, hashedPassword, role],
//                 function (err: SQLiteError | null) {
//                     if (err) {
//                         db.close();
//                         if (err.code === "SQLITE_CONSTRAINT") {
//                             resolve(
//                                 NextResponse.json(
//                                     { error: "Email already exists" },
//                                     { status: 400 }
//                                 )
//                             );
//                         } else {
//                             resolve(
//                                 NextResponse.json(
//                                     { error: "Database error" },
//                                     { status: 500 }
//                                 )
//                             );
//                         }
//                     } else {
//                         // Query the newly created user
//                         db.get(
//                             "SELECT id, email, role FROM users WHERE email = ?",
//                             [email],
//                             (err: SQLiteError | null, user) => {
//                                 db.close();
//                                 if (err) {
//                                     resolve(
//                                         NextResponse.json(
//                                             { error: "Database error" },
//                                             { status: 500 }
//                                         )
//                                     );
//                                 } else {
//                                     resolve(
//                                         NextResponse.json(
//                                             {
//                                                 message:
//                                                     "User registered successfully!",
//                                                 user, // Return the user object
//                                             },
//                                             { status: 201 }
//                                         )
//                                     );
//                                 }
//                             }
//                         );
//                     }
//                 }
//             );
//         });
//     } catch (error) {
//         console.error("Signup error:", error); // Log the error
//         return NextResponse.json(
//             { error: "Internal server error" },
//             { status: 500 }
//         );
//     }
//     // catch (error) {
//     //     return NextResponse.json(
//     //         { error: "Internal server error" },
//     //         { status: 500 }
//     //     );
//     // }
// }
