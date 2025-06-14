import { MongoClient } from "mongodb";

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/hackathonDB";
    
    if (cachedClient) {
      return cachedClient;
    }
    
    const client = new MongoClient(uri);
    await client.connect();
    cachedClient = client;
    
    // Test the connection
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connection successful");
    
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}
