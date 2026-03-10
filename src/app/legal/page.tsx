import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import LegalArchive from "@/components/sections/legal/LegalArchive";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Legal Center | nodeMania",
    description: "Browse our terms and conditions, privacy policies, and service level agreements (SLAs). Our commitment to transparency and fairness.",
    openGraph: {
        title: "Legal Center | nodeMania",
        description: "Browse our legal policies and service agreements.",
    },
};

export default function LegalPage() {
    return (
        <main className="min-h-screen bg-background font-sans overflow-x-hidden">
            <Navbar />
            <div className="pt-24">
                <LegalArchive />
            </div>
            <Footer />
        </main>
    );
}
