import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BusinessHostingHero } from '@/components/sections/business-hosting/BusinessHostingHero';
import { BusinessHostingPricing } from '@/components/sections/business-hosting/BusinessHostingPricing';
import { BusinessHostingFeatures } from '@/components/sections/business-hosting/BusinessHostingFeatures';
import { BusinessHostingTechSpecs } from '@/components/sections/business-hosting/BusinessHostingTechSpecs';
import { BusinessHostingFAQ } from '@/components/sections/business-hosting/BusinessHostingFAQ';
import { getProductGroupsByConfig } from "@/lib/services/whmcs.service";

export const metadata: Metadata = {
    title: 'Business Web Hosting - Agency & Enterprise Grade | nodeMania',
    description: 'Scale your business with high-performance hosting designed for agencies. Unlimited sites, priority support, and enterprise security.',
    openGraph: {
        title: 'Business Web Hosting - Agency & Enterprise Grade | nodeMania',
        description: 'Scale your business with high-performance hosting designed for agencies. Unlimited sites, priority support, and enterprise security.',
        type: 'website',
    },
};

export default async function BusinessHostingPage() {
    let productGroup = null;

    try {
        // Fetch product group with ID 2 (Assuming 'Business Web Hosting' is ID 2 based on convention or placeholder)
        // If the ID is different in the real WHMCS, it needs to be updated here.
        const groups = await getProductGroupsByConfig([
            { gid: 9, groupName: 'Business Web Hosting' }
        ]);

        if (groups && groups.length > 0) {
            productGroup = groups[0];
        }
    } catch (error) {
        console.error("Failed to fetch WHMCS products for Business Hosting page:", error);
        // Will fallback to static data in component
    }

    return (
        <main className="min-h-screen bg-white font-sans overflow-x-hidden">
            <Navbar />
            <BusinessHostingHero />
            <BusinessHostingPricing productGroup={productGroup} />
            <BusinessHostingFeatures />
            <BusinessHostingTechSpecs />
            <BusinessHostingFAQ />
            <Footer />
        </main>
    );
}
