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
    },
    {
      title: "Lorem Hackathon 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      dates: ["Jan 1st - Jan 2nd"],
      about: [
        "Lorem ipsum dolor",
        "sit amet, consectetur",
        "adipiscing elit"
      ]
    },
    {
      title: "Lorem Hackathon 2",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      dates: ["Feb 3rd - Feb 4th"],
      about: [
        "Sed do eiusmod",
        "tempor incididunt",
        "ut labore et dolore"
      ]
    },
    {
      title: "Lorem Hackathon 3",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      dates: ["Mar 5th - Mar 6th"],
      about: [
        "Ut enim ad minim",
        "veniam, quis nostrud",
        "exercitation ullamco"
      ]
    },
    {
      title: "Lorem Hackathon 4",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      dates: ["Apr 7th - Apr 8th"],
      about: [
        "Duis aute irure",
        "dolor in reprehenderit",
        "voluptate velit esse"
      ]
    },
    {
      title: "Lorem Hackathon 5",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      dates: ["May 9th - May 10th"],
      about: [
        "Excepteur sint occaecat",
        "cupidatat non proident",
        "sunt in culpa"
      ]
    },
    {
      title: "Lorem Hackathon 6",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      dates: ["Jun 11th - Jun 12th"],
      about: [
        "Lorem ipsum dolor",
        "sit amet, consectetur",
        "adipiscing elit"
      ]
    },
    {
      title: "Lorem Hackathon 7",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      dates: ["Jul 13th - Jul 14th"],
      about: [
        "Sed do eiusmod",
        "tempor incididunt",
        "ut labore et dolore"
      ]
    },
    {
      title: "Lorem Hackathon 8",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      dates: ["Aug 15th - Aug 16th"],
      about: [
        "Ut enim ad minim",
        "veniam, quis nostrud",
        "exercitation ullamco"
      ]
    },
    {
      title: "Lorem Hackathon 9",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      dates: ["Sep 17th - Sep 18th"],
      about: [
        "Duis aute irure",
        "dolor in reprehenderit",
        "voluptate velit esse"
      ]
    },
    {
      title: "Lorem Hackathon 10",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      dates: ["Oct 19th - Oct 20th"],
      about: [
        "Excepteur sint occaecat",
        "cupidatat non proident",
        "sunt in culpa"
      ]
    },
    {
      title: "Lorem Hackathon 11",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      dates: ["Nov 21st - Nov 22nd"],
      about: [
        "Lorem ipsum dolor",
        "sit amet, consectetur",
        "adipiscing elit"
      ]
    },
    {
      title: "Lorem Hackathon 12",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      dates: ["Dec 23rd - Dec 24th"],
      about: [
        "Sed do eiusmod",
        "tempor incididunt",
        "ut labore et dolore"
      ]
    },
    {
      title: "Lorem Hackathon 13",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      dates: ["Jan 25th - Jan 26th"],
      about: [
        "Ut enim ad minim",
        "veniam, quis nostrud",
        "exercitation ullamco"
      ]
    },
    {
      title: "Lorem Hackathon 14",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      dates: ["Feb 27th - Feb 28th"],
      about: [
        "Duis aute irure",
        "dolor in reprehenderit",
        "voluptate velit esse"
      ]
    },
    {
      title: "Lorem Hackathon 15",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      dates: ["Mar 1st - Mar 2nd"],
      about: [
        "Excepteur sint occaecat",
        "cupidatat non proident",
        "sunt in culpa"
      ]
    },
    {
      title: "Lorem Hackathon 16",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      dates: ["Apr 3rd - Apr 4th"],
      about: [
        "Lorem ipsum dolor",
        "sit amet, consectetur",
        "adipiscing elit"
      ]
    },
    {
      title: "Lorem Hackathon 17",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      dates: ["May 5th - May 6th"],
      about: [
        "Sed do eiusmod",
        "tempor incididunt",
        "ut labore et dolore"
      ]
    },
    {
      title: "Lorem Hackathon 18",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      dates: ["Jun 7th - Jun 8th"],
      about: [
        "Ut enim ad minim",
        "veniam, quis nostrud",
        "exercitation ullamco"
      ]
    },
    {
      title: "Lorem Hackathon 19",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      dates: ["Jul 9th - Jul 10th"],
      about: [
        "Duis aute irure",
        "dolor in reprehenderit",
        "voluptate velit esse"
      ]
    },
    {
      title: "Lorem Hackathon 20",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      dates: ["Aug 11th - Aug 12th"],
      about: [
        "Excepteur sint occaecat",
        "cupidatat non proident",
        "sunt in culpa"
      ]
    }
  ]

  return NextResponse.json(mockData)
}
