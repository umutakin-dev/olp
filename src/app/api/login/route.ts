import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";
// import { User } from "@/types/user";
import { User } from "../../types/user";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing email or password" },
      { status: 400 },
    );
  }

  try {
    const db = new sqlite3.Database("./olp.db");

    return new Promise((resolve) => {
      db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err: Error | null, user: User) => {
          db.close();

          if (err) {
            resolve(
              NextResponse.json({ error: "Database error" }, { status: 500 }),
            );
          } else if (!user) {
            resolve(
              NextResponse.json({ error: "User not found" }, { status: 404 }),
            );
          } else {
            const isPasswordValid = await bcrypt.compare(
              password,
              user.password,
            );

            if (!isPasswordValid) {
              resolve(
                NextResponse.json(
                  { error: "Invalid password" },
                  { status: 401 },
                ),
              );
            } else {
              resolve(
                NextResponse.json(
                  {
                    message: "Login successful",
                    user: { id: user.id, email: user.email, role: user.role },
                  },
                  { status: 200 },
                ),
              );
            }
          }
        },
      );
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
