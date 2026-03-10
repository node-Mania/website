import { Metadata } from 'next';
import { getProductsByPids } from '@/lib/services/whmcs.service';
import { SocialBeeHero } from '@/components/sections/web-security/social-bee/SocialBeeHero';
import { SocialBeeFeatures } from '@/components/sections/web-security/social-bee/SocialBeeFeatures';
import { SocialBeePricing } from '@/components/sections/web-security/social-bee/SocialBeePricing';
import { SocialBeeFAQ } from '@/components/sections/web-security/social-bee/SocialBeeFAQ';

export const metadata: Metadata = {
    title: 'SocialBee - Smart Social Media Automation | nodeMania',
    description: 'Automate your social media tasks, create high-quality content, and scale your social presence with SocialBee. Unified social inbox, team collaboration, and more.',
};

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default async function SocialBeePage() {
    const products = await getProductsByPids([20, 21, 22, 23, 24, 25]);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <SocialBeeHero />
            <SocialBeeFeatures />
            <SocialBeePricing products={products} />
            <SocialBeeFAQ />
            <Footer />
        </main>
    );
}
