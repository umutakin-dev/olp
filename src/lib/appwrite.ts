import { Client, Databases } from "node-appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "") // Endpoint from env
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ""); // Project ID from env

// Only set the API key for server-side usage
if (typeof window === "undefined") {
  client.setKey(process.env.APPWRITE_API_KEY || ""); // API key from env
}

export const databases = new Databases(client);
