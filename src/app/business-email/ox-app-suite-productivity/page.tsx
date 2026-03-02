import { Metadata } from 'next';
import { getProductsByPids } from '@/lib/services/whmcs.service';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OXAppSuiteProductivityHero } from '@/components/sections/business-email/OXAppSuiteProductivityHero';
import { OXAppSuiteProductivityFeatures } from '@/components/sections/business-email/OXAppSuiteProductivityFeatures';
import { SingleBusinessEmailPricing } from '@/components/sections/business-email/SingleBusinessEmailPricing';
import { OXAppSuiteProductivityFAQ } from '@/components/sections/business-email/OXAppSuiteProductivityFAQ';

export const metadata: Metadata = {
    title: 'OX App Suite + Productivity | nodeMania',
    description: 'Elevate your enterprise with OX App Suite + Productivity. Powerful cloud storage (OX Drive) and online document editing (OX Documents) included.',
};

export default async function OXAppSuiteProductivityPage() {
    // Fetch only OX App Suite + Productivity (34)
    const products = await getProductsByPids([34]);
    const product = products[0];

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-20">
                <OXAppSuiteProductivityHero product={product} />
                <OXAppSuiteProductivityFeatures />
                {product && <SingleBusinessEmailPricing product={product} highlightColor="teal" />}
                <OXAppSuiteProductivityFAQ />
            </div>
            <Footer />
        </main>
    );
}
