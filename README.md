# **ONLINE LEARNING PLATFORM**

## **STACK**

- Next.js
- TailwindCss
- SQLite

## **API**

### **AUTHENTICATION - SIGNUP AND LOGIN**

#### **1 CREATE DB**

##### **1.1 CREATE SQLITE DB**

```bash
sqlite3 olp.db
```

##### **1.2 CREATE USER TABLE**

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('instructor', 'student', 'admin')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

##### **1.3 VERIFY TABLE**

```bash
.tables
```

##### **1.4 INSERT SEED DATA**

```sql
INSERT INTO users (email, password, role) VALUES ('admin@olp.com', 'test1234', 'admin');
INSERT INTO users (email, password, role) VALUES ('instructor@olp.com', 'test1234', 'instructor');
INSERT INTO users (email, password, role) VALUES ('student@olp.com', 'test1234', 'student');
```

##### **1.5 EXIT SQLITE**

```bash
.exit
```

##### **1.6 OPEN DATABASE** (OPTIONAL)

```bash
sqlite3 olp.db
```

#### **2 INITIALIZE NEXT.JS**

We will assume you have node installed.

##### **2.1 CREATE NEXT.JS PROJECT**

**2.1.1 Create Next.js App**

```bash
npx create-next-app@latest olp
```

**2.1.2 Go Inside the Folder**

```bash
cd olp
```

##### **2.2 START DEVELOPMENT SERVER**

```bash
npm run dev
```

##### **2.3 INSTALL DEPENDENCIES FOR SQLITE AND AUTHENTICATION**

```bash
npm install sqlite3 bcrypt
```

##### **2.4 HASH PASSWORDS**

At this point, you might have noticed that we inserted plain text passwords into
the database. This simply will not do. We will write a small script to remedy
that and update our passwords.

First we will create an encryption script. This script will connect to our
database and encrypt our passwords.

Create a folder called scripts and inside it, create a file called
`hash_passwords.js` and paste the following code inside the file.

```javascript
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const db = new sqlite3.Database("../olp.db");

async function hashPasswords() {
  db.all("SELECT id, password FROM users", async (err, users) => {
    if (err) {
      console.error("Error fetching users:", err);
      return;
    }

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      db.run(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashedPassword, user.id],
        (err) => {
          if (err) {
            console.error(`Error updating user ID ${user.id}:`, err);
          } else {
            console.log(`Password hashed for user ID ${user.id}`);
          }
        },
      );
    }
  });
}

hashPasswords();
```

Then, we run the script.

```bash
node /scripts/hash_passwords.js

```

Finally, we can verify that the password fields were hashed.

```bash
sqlite3 olp.db
```

```sql
SELECT id, email, password FROM users;
```

##### **2.5 AUTH API**

We will create two files to handle the auth scenarios.

One will be for signup and the other for login.

Here is how it will be structured.

```text
src/
├── app/
│   ├── api/
│   │   ├── signup/
│   │   │   └── route.ts
│   │   ├── login/
│   │   │   └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
├── types/
│   └── user.d.ts
olp.db
tsconfig.json
```

First, let's create two folders. When we initialized the next.js project, it
automatically created the src and the app folder inside src.

Under `src`, we will create the `api` folder, then, inside that, we will create
`login` and `signup` folders.

Once these two folders are created, we will create two files under `login` and
`signup` folders. Both of them will be named `route.ts`.

To the route.ts under signup folder, we will copy the following code:

```typescript
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
```

To the route.ts under the login folder, we will copy these code:

```typescript
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
```

Now that we have these api routes, we have to test them. We can test them using
curl, but I prefer to test them using postman. Using postman, we can also create
a collection for our project api. This will allow for rapid testing and will
also act as api documentation.

##### **2.6 POSTMAN SETUP**

You can download and install postman to your local machine or you can access it
from the web.

First, let's check our db first.

Remember, you need to run sqlite3 from where the olp.db file is located,
otherwise, the query would not work.

```bash
sqlite3 olp.db
select * from users;
```

```bash
sqlite> select * from users;
1|admin@olp.com|$2b$10$TzqVoo1Qbn/CM4w4P7sBpQ.l3upmdjIqPqz3oszaioClid3cJ/zlMC|admin|2024-12-21 21:16:54
2|instructor@olp.com|$2b$10$.Oaou/3MUUz9ciMXk6YBgeZpFZA0phbRhFuKFyiH12p7oR29.RQMy|instructor|2024-12-21 21:16:54
3|student@olp.com|$2b$10$55k19HNwzUdQKDuw2LXHSuUym0SrOWCyDqFHLLHY6n.KmTkR8CqBG|student|2024-12-21 21:16:55
sqlite>
```

We have three records in our user table, our seed data.

When we try the signup api, we expect to see another record here.

Let's test.

Open postman.
