import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
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
  title: "HackCrate | Your Ultimate Hackathon Hub",
  description: "Discover, track, and dominate the world's most innovative hackathons. Find competitions with valuable rewards and never miss registration deadlines.",
  icons: {
    icon: [
      { url: "/images/favicon.ico", sizes: "any" },
      { url: "/images/icon.svg", type: "image/svg+xml" }
    ],
    apple: "/images/apple-icon.png",
  },
  keywords: ["hackathon", "coding challenge", "programming competition", "tech events", "developer contests", "hackathon finder", "HackCrate", "prize pools", "tech competitions"],
  authors: [{ name: "HackCrate Team" }],
  openGraph: {
    title: "HackCrate | Your Ultimate Hackathon Hub",
    description: "Discover, track, and dominate the world's most innovative hackathons. Find competitions with valuable rewards and never miss registration deadlines.",
    url: "https://hackcrate.dev",
    siteName: "HackCrate",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "HackCrate - Your Ultimate Hackathon Hub"
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0a14" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <div className="scanlines"></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
