import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db("hackathonDB"); 
    const hackathons = await db.collection("hackathons").find({}).toArray();
    return NextResponse.json(hackathons);
  } catch (error) {
    console.error("Database connection or query failed:", error);
    return NextResponse.error();
  }
}
