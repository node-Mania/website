import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WordPressHostingHero } from '@/components/sections/wordpress-hosting/WordPressHostingHero';
import { WordPressHostingPricing } from '@/components/sections/wordpress-hosting/WordPressHostingPricing';
import { WordPressHostingFeatures } from '@/components/sections/wordpress-hosting/WordPressHostingFeatures';
import { WordPressHostingDetails } from '@/components/sections/wordpress-hosting/WordPressHostingDetails';
import { WordPressHostingFAQ } from '@/components/sections/wordpress-hosting/WordPressHostingFAQ';
import { getProductGroupsByConfig } from "@/lib/services/whmcs.service";

export const metadata: Metadata = {
    title: 'WordPress Hosting - Turbo-Charged & Secure | nodeMania',
    description: 'Experience the ultimate WordPress performance with our optimised platform. Automatic updates, StackCache caching, and global CDN included.',
    openGraph: {
        title: 'WordPress Hosting - Turbo-Charged & Secure | nodeMania',
        description: 'Optimised for power, speed, and security. Find out why our WordPress platform stands out from the crowd.',
        type: 'website',
    },
};

export default async function WordPressHostingPage() {
    let productGroup = null;

    try {
        const groups = await getProductGroupsByConfig([
            { gid: 12, groupName: 'Wordpress Hosting' }
        ]);

        if (groups && groups.length > 0) {
            productGroup = groups[0];
        }
    } catch (error) {
        console.error("Failed to fetch WHMCS products for WordPress Hosting page:", error);
    }

    return (
        <main className="min-h-screen bg-white font-sans overflow-x-hidden">
            <Navbar />
            <WordPressHostingHero />
            <WordPressHostingPricing productGroup={productGroup} />
            <WordPressHostingFeatures />
            <WordPressHostingDetails />
            <WordPressHostingFAQ />
            <Footer />
        </main>
    );
}
