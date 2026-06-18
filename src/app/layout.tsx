import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://roboskills.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Roboskills — Teach any robot a new skill",
    template: "%s · Roboskills",
  },
  description:
    "Pick your robot, choose a behavior, click train. We run the reinforcement learning in simulation and hand you a policy that deploys to real hardware.",
  keywords: [
    "robotics",
    "reinforcement learning",
    "sim-to-real",
    "Petoi Bittle",
    "quadruped",
    "physical AI",
  ],
  openGraph: {
    title: "Roboskills — Teach any robot a new skill",
    description:
      "Reinforcement learning in the cloud, a deployable policy in minutes.",
    url: siteUrl,
    siteName: "Roboskills",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roboskills — Teach any robot a new skill",
    description:
      "Reinforcement learning in the cloud, a deployable policy in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">{children}</body>
    </html>
  );
}
