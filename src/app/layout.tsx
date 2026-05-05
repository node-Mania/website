import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TawkTo from "@/components/TawkTo";
import PromoPopup from "@/components/layout/PromoPopup";
import Analytics from "@/components/analytics/Analytics";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { getCurrencies } from "@/lib/services/whmcs.service";
import { WhmcsCurrency } from "@/lib/types/whmcs.types";

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


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let currencies: WhmcsCurrency[] = [];
  try {
    currencies = await getCurrencies();
  } catch (err) {
    console.error("Failed to fetch currencies in layout:", err);
  }

  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
        <Analytics />
        <CurrencyProvider initialCurrencies={currencies}>
          {children}
        </CurrencyProvider>
        <TawkTo />
        <PromoPopup />
      </body>
    </html>
  );
}
