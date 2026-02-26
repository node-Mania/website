import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WebHostingHero } from '@/components/sections/web-hosting/WebHostingHero';
import { WebHostingPricing } from '@/components/sections/web-hosting/WebHostingPricing';
import { WebHostingFeatures } from '@/components/sections/web-hosting/WebHostingFeatures';
import { WebHostingTechSpecs } from '@/components/sections/web-hosting/WebHostingTechSpecs';
import { WebHostingFAQ } from '@/components/sections/web-hosting/WebHostingFAQ';
import { HostingSecurity } from '@/components/sections/hosting-shared/HostingSecurity';
import { getProductGroupsByConfig } from "@/lib/services/whmcs.service";

export const metadata: Metadata = {
    title: 'Basic Web Hosting - Blazing-Fast & Secure | nodeMania',
    description: 'Experience lightning-fast speeds, 99.9% uptime, and 24/7 expert support with our Basic Web Hosting plans. Perfect for blogs, portfolios, and small businesses.',
    openGraph: {
        title: 'Basic Web Hosting - Blazing-Fast & Secure | nodeMania',
        description: 'Blazing-Fast, Reliable & Secure Web Hosting at Unbeatable Prices.',
        type: 'website',
    },
};

export default async function WebHostingPage() {
    let productGroup = null;

    try {
        const groups = await getProductGroupsByConfig([
            { gid: 1, groupName: 'Basic Web Hosting' }
        ]);

        if (groups && groups.length > 0) {
            productGroup = groups[0];
        }
    } catch (error) {
        console.error("Failed to fetch WHMCS products for Web Hosting page:", error);
        // Will fallback to static data in component
    }

    return (
        <main className="min-h-screen bg-white font-sans overflow-x-hidden">
            <Navbar />
            <WebHostingHero />
            <WebHostingPricing productGroup={productGroup} />
            <WebHostingFeatures />
            <HostingSecurity />
            <WebHostingTechSpecs />
            <WebHostingFAQ />
            <Footer />
        </main>
    );
}
