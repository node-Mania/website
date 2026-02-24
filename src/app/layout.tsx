import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TawkTo from "@/components/TawkTo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "nodeMania | Premium Node.js Hosting",
  description: "Fast, Secure, Scalable hosting for modern applications. Powered by 100% NVMe Storage and AI-DDoS Protection.",
  openGraph: {
    title: "nodeMania | Premium Node.js Hosting",
    description: "Fast, Secure, Scalable hosting for modern applications.",
    type: "website",
    siteName: "nodeMania",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
        {children}
        <TawkTo />
      </body>
    </html>
  );
}
