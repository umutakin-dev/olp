import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

interface SQLiteError extends Error {
  code: string;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, role } = body;

  if (!email || !password || !role) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
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
          db.close();

          if (err) {
            if (err.code === "SQLITE_CONSTRAINT") {
              resolve(
                NextResponse.json(
                  { error: "Email already exists" },
                  { status: 400 },
                ),
              );
            } else {
              resolve(
                NextResponse.json({ error: "Database error" }, { status: 500 }),
              );
            }
          } else {
            resolve(
              NextResponse.json(
                { message: "User registered successfully!" },
                { status: 201 },
              ),
            );
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
