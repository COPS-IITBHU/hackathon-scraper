import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    // Try to connect to MongoDB
    const client = await connectToDatabase();
    const db = client.db("hackathonDB");
    const hackathons = await db.collection("hackathons").find({}).toArray();
    
    // Return the hackathons array (empty or populated)
    return NextResponse.json(hackathons);
  } catch (error) {
    console.error("Database connection or query failed:", error);
    // Return empty array instead of error to handle gracefully on the frontend
    return NextResponse.json([], { status: 200 });
  }
}
