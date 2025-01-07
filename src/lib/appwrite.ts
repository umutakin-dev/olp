// import { Client, Databases } from "appwrite";
import { Client, Databases } from "node-appwrite";

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
    .setProject("677d299600369820814a") // Your Appwrite project ID
    .setKey(
        "standard_6f3f6bf8bf8dc1f265a8583ceb59af90aeae3496b5ede5c9b7da487a1747b9493bb2ca5e3a02387f7089c2e3a8a066c8ef1cc999f9ef71bc1082d9658f9b108e03a469a0205aabcbe5e3c539621263aa204dc49b35d1b0f66ba3ca824081f630bdd405323a91df2aa8410ac981ef8ee033a8d185d19036c20d039923f50463d1"
    );

export const databases = new Databases(client);
