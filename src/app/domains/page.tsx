import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DomainsHero } from '@/components/sections/domains/DomainsHero';
import { TLDPricingTable } from '@/components/sections/domains/TLDPricingTable';
import { DomainFeatures } from '@/components/sections/domains/DomainFeatures';
import { DomainFAQ } from '@/components/sections/domains/DomainFAQ';
import { getTldPricing } from "@/lib/services/whmcs.service";
import { TldPricing } from "@/lib/types/whmcs.types";

export const metadata: Metadata = {
    title: 'Domain Names - Search & Register Your Perfect Domain | nodeMania',
    description: 'Find and register the perfect domain name with nodeMania. Free privacy protection, competitive pricing, and 24/7 expert support.',
    openGraph: {
        title: 'Domain Names - Search & Register Your Perfect Domain | nodeMania',
        description: 'Find and register the perfect domain name with nodeMania. Explore hundreds of TLDs at the best prices.',
        type: 'website',
    },
};

export default async function DomainsPage() {
    let tldData: {
        currency: { id: number; code: string; prefix: string; suffix: string; };
        tlds: TldPricing[];
    } = {
        currency: { id: 2, code: 'GBP', prefix: '£', suffix: 'GBP' },
        tlds: []
    };

    try {
        tldData = await getTldPricing();

        console.log(tldData);
    } catch (error) {
        console.error("Failed to fetch TLD pricing for Domains page:", error);
    }

    return (
        <main className="min-h-screen bg-white font-sans overflow-x-hidden">
            <Navbar />
            <DomainsHero tlds={tldData.tlds} currency={tldData.currency} />
            {tldData.tlds.length > 0 && (
                <TLDPricingTable tlds={tldData.tlds} currency={tldData.currency} />
            )}
            <DomainFeatures />
            <DomainFAQ />
            <Footer />
        </main>
    );
}
