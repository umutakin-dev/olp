export type User = {
  id: number;
  email: string;
  password: string; // Hashed password
  role: "instructor" | "student" | "admin";
  created_at?: string; // Optional: Use only if you want to include the timestamp
};
