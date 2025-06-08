import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import VantaBackground from "../components/VantaBackground";
import { ThemeProvider } from "next-themes";
import { Orbitron } from "next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Replace the problematic cyberpunk font with Orbitron
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-cyberpunk",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hackathon_X | Find Your Next Hackathon Challenge",
  description: "Discover and explore the best hackathons worldwide with our advanced hackathon scraper. Filter by date, prize pool, and categories.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["hackathon", "coding challenge", "programming competition", "tech events", "developer contests"],
  authors: [{ name: "Hackathon_X Team" }],
  openGraph: {
    title: "Hackathon_X | Find Your Next Hackathon Challenge",
    description: "Discover and explore the best hackathons worldwide with our advanced hackathon scraper.",
    url: "https://hackathon-x.vercel.app",
    siteName: "Hackathon_X",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <VantaBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
