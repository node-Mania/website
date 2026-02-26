import { Metadata } from 'next';
import { getProductsByPids } from '@/lib/services/whmcs.service';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { NordVPNHero } from '@/components/sections/web-security/nordvpn/NordVPNHero';
import { NordVPNFeatures } from '@/components/sections/web-security/nordvpn/NordVPNFeatures';
import { NordVPNUseCases } from '@/components/sections/web-security/nordvpn/NordVPNUseCases';
import { NordVPNPricing } from '@/components/sections/web-security/nordvpn/NordVPNPricing';
import { NordVPNFAQ } from '@/components/sections/web-security/nordvpn/NordVPNFAQ';

export const metadata: Metadata = {
    title: 'NordVPN | nodeMania',
    description: 'Secure your connection, hide your IP, and block malware with NordVPN from nodeMania. The fastest and most secure VPN.',
};

export default async function NordVPNPage() {
    // Standard VPN plan id is 26
    const [standardPlan] = await getProductsByPids([26]);

    return (
        <main className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
            <Navbar />
            <article>
                {/* Hero Section */}
                <NordVPNHero />

                {/* Features Section */}
                <NordVPNFeatures />

                {/* Pricing / Billing Cycles */}
                {standardPlan && (
                    <NordVPNPricing product={standardPlan} />
                )}

                {/* Specific Use Cases */}
                <NordVPNUseCases />

                {/* FAQ */}
                <NordVPNFAQ />
            </article>
            <Footer />
        </main>
    );
}
