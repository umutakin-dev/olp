# ONLINE LEARNING PLATFORM

## STACK

- Next.js
- SQLite

## SCENARIOS

### AUTH SCENARIOS - SIGNUP / LOGIN

#### 1. CREATE DB

##### 1. CREATE SQLITE DB

```bash
sqlite3 olp.db
```

##### 2. CREATE USER TABLE

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('instructor', 'student', 'admin')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

##### 3. VERIFY TABLE

```bash
.tables
```

##### 4. INSERT SEED DATA

```sql
INSERT INTO users (email, password, role) VALUES ('admin@olp.com', 'test1234', 'admin');
INSERT INTO users (email, password, role) VALUES ('instructor@olp.com', 'test1234', 'instructor');
INSERT INTO users (email, password, role) VALUES ('student@olp.com', 'test1234', 'student');
```

##### 5. EXIT SQLITE

```bash
.exit
```

##### 6. OPEN DATABASE (OPTIONAL)

```bash
sqlite3 olp.db
```

#### 2. INITIALIZE NEXT.JS

We will assume you have node installed.

##### 1. CREATE NEXT.JS PROJECT
