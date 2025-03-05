import { MongoClient } from "mongodb";

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("Please define the MONGO_URI environment variable inside .env");
  }
  
  if (cachedClient) {
    return cachedClient;
  }
  
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}
