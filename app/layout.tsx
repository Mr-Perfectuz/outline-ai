import type { Metadata } from "next";
import { IBM_Plex_Serif, Mona_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import Navbar from "@/components/Navbar";

const ibmPlexSans = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-ibm-plex-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const monaSans = Mona_Sans({
  variable: "--font-mona-sans", 
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Outline AI",
  description: "Transform your books into structured data with Outline AI. Our advanced AI technology extracts key information, making it easy to organize and analyze your content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${monaSans.variable} relative font-sans h-full antialiased`}
    >
      <body>
        <ClerkProvider>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
