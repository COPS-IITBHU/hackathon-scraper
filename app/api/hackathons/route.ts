import { NextResponse } from "next/server"

export async function GET() {
  const mockData = [
    {
      is_hackathon: true,
      name: "KU Hackathon 2025",
      date: "Deadline: The last date for the registration is 10th January 2025",
      link: "https://kalingauniversity.ac.in/kuhackathon2025/",
      description: "Based on 4 Domains- Smart Automation, Green Technology, Smart City and Block Chain Technology.",
      type: null,
      category: ["Software Development", "AI"],
      "prize pool": "Rs. 22.5k",
      "image sources": [
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://s3-h2s-v2.s3.ap-south-1.amazonaws.com/2024-01-23T07%3A02%3A23.941Z-SIH%20Creative%20Banner%20%281%29.png"
      ],
    },
    // Add more mock hackathon data here...
  ]

  return NextResponse.json(mockData)
}
