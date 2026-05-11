import type { Metadata } from "next";
import { Inter, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soudas Sur | UI/UX Designer & Visual Storyteller",
  description: "A creative digital playground portfolio by Soudas Sur, blending pixel-art aesthetics, playful motion, and thoughtful UI/UX design.",
};

import CustomCursor from "@/components/CustomCursor";
import GlobalCompanion from "@/components/GlobalCompanion";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${pixelifySans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-background text-primary overflow-x-hidden">
        <CustomCursor />
        <GlobalCompanion />
        {children}
      </body>
    </html>
  );
}
