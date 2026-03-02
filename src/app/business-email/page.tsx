import { Metadata } from 'next';
import { getProductsByPids } from '@/lib/services/whmcs.service';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BusinessEmailHero } from '@/components/sections/business-email/BusinessEmailHero';
import { BusinessEmailFeatures } from '@/components/sections/business-email/BusinessEmailFeatures';
import { BusinessEmailPricing } from '@/components/sections/business-email/BusinessEmailPricing';
import { BusinessEmailFAQ } from '@/components/sections/business-email/BusinessEmailFAQ';

export const metadata: Metadata = {
    title: 'Professional Business Email | nodeMania',
    description: 'Get powerful OX App Suite email and productivity apps built for any-size business and budget. Secure, reliable email with huge mailboxes and 99.9% uptime.',
};

export default async function BusinessEmailPage() {
    // Fetch both OX App Suite (33) and OX App Suite + Productivity (34)
    const products = await getProductsByPids([33, 34]);

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-20">
                <BusinessEmailHero />
                <BusinessEmailFeatures />
                <BusinessEmailPricing products={products} />
                <BusinessEmailFAQ />
            </div>
            <Footer />
        </main>
    );
}
