import { Metadata } from 'next';
import { getProductsByPids } from '@/lib/services/whmcs.service';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OXAppSuiteHero } from '@/components/sections/business-email/OXAppSuiteHero';
import { OXAppSuiteFeatures } from '@/components/sections/business-email/OXAppSuiteFeatures';
import { SingleBusinessEmailPricing } from '@/components/sections/business-email/SingleBusinessEmailPricing';
import { OXAppSuiteFAQ } from '@/components/sections/business-email/OXAppSuiteFAQ';

export const metadata: Metadata = {
    title: 'OX App Suite | nodeMania',
    description: 'Powerful OX App Suite email solution with 10GB/50GB storage, sync across all devices, aliases, forwarders, and premium anti-spam protection.',
};

export default async function OXAppSuitePage() {
    // Fetch only OX App Suite (33)
    const products = await getProductsByPids([33]);
    const product = products[0];

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-20">
                <OXAppSuiteHero product={product} />
                <OXAppSuiteFeatures />
                {product && <SingleBusinessEmailPricing product={product} highlightColor="blue" />}
                <OXAppSuiteFAQ />
            </div>
            <Footer />
        </main>
    );
}
