import { NextResponse } from 'next/server'

export async function GET() {
  const mockData = [
    {
      title: "2025 Season Schedule // Major League Hacking",
      description: "Find, compete, and earn points at the largest, most diverse hacker events in the world.",
      dates: ["Dec 28th - 29th", "Jan 3rd - 5th", "Jan 3rd - 5th", "Jan 10th - 16th"],
      about: [
        "Find, compete, and earn points",
        "at the largest, most diverse hacker events",
        "in the world."
      ]
    },
    {
      title: "HackMIT 2025",
      description: "Join us for 24 hours of hacking, learning, and innovation at MIT!",
      dates: ["Sep 15th - 16th"],
      about: [
        "24-hour hackathon",
        "Workshops and tech talks",
        "Networking opportunities"
      ]
    },
    {
      title: "Global AI Hackathon",
      description: "Develop cutting-edge AI solutions to real-world problems.",
      dates: ["Mar 22nd - 24th"],
      about: [
        "Focus on artificial intelligence",
        "Open to developers worldwide",
        "Mentorship from industry experts"
      ]
    },
    {
      title: "EcoHack 2025",
      description: "Create sustainable tech solutions for a greener future.",
      dates: ["Apr 5th - 7th"],
      about: [
        "Sustainability-focused hackathon",
        "Collaboration with environmental organizations",
        "Prizes for most impactful projects"
      ]
    }
  ]

  return NextResponse.json(mockData)
}

