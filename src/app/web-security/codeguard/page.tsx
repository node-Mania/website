import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CodeGuardHero } from '@/components/sections/web-security/CodeGuardHero';
import { CodeGuardPricing } from '@/components/sections/web-security/CodeGuardPricing';
import { CodeGuardFeatures } from '@/components/sections/web-security/CodeGuardFeatures';
import { CodeGuardFAQ } from '@/components/sections/web-security/CodeGuardFAQ';
import { getProductsByPids } from '@/lib/services/whmcs.service';
import { CleanProduct } from '@/lib/types/whmcs.types';

export const metadata: Metadata = {
    title: 'CodeGuard Website Backup & Malware Protection | nodeMania',
    description: 'Protect your website with daily automated backups. Get protection against viruses, hackers and even your own code accidentally breaking your site with CodeGuard Website Backup.',
    openGraph: {
        title: 'CodeGuard Website Backup & Malware Protection | nodeMania',
        description: 'Protect your site from data loss and corruption, as well as against threats from viruses, hackers and malware with Daily Automated Website Backups from CodeGuard.',
        type: 'website',
    },
};

export default async function CodeGuardPage() {
    let products: CleanProduct[] = [];

    try {
        products = await getProductsByPids([35, 36, 37, 38, 39, 40, 41]);
    } catch (error) {
        console.error("Failed to fetch CodeGuard products from WHMCS:", error);
    }

    return (
        <main className="min-h-screen bg-white font-sans overflow-x-hidden">
            <Navbar />
            <CodeGuardHero />
            <CodeGuardPricing products={products} />
            <CodeGuardFeatures />
            <CodeGuardFAQ />
            <Footer />
        </main>
    );
}
