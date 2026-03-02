import { getProductsByPids } from '@/lib/services/whmcs.service';
import EmailServicesSingleHero from '@/components/sections/email-services/EmailServicesSingleHero';
import EmailServicesSinglePricing from '@/components/sections/email-services/EmailServicesSinglePricing';
import EmailServicesFeatures from '@/components/sections/email-services/EmailServicesFeatures';
import EmailServicesFAQ from '@/components/sections/email-services/EmailServicesFAQ';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const SLUG_TO_PID: Record<string, number> = {
    'incoming-scanning': 27,
    'outgoing-scanning': 28,
    'incoming-and-archiving-bundle': 29,
    'outgoing-and-archiving-bundle': 30,
    'incoming-and-outgoing-bundle': 31,
    'incoming-outgoing-and-archiving-bundle': 32,
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const pid = SLUG_TO_PID[params.slug];
    if (!pid) {
        return {
            title: 'Not Found | Email Services',
        };
    }

    const products = await getProductsByPids([pid]);
    const product = products[0];

    return {
        title: `${product?.name || 'Email Services'} | nodeMania`,
        description: `Protect your network with our premium ${product?.name || 'Email Service'} solution.`,
    };
}

export default async function SingleEmailServicePage({ params }: { params: { slug: string } }) {
    const pid = SLUG_TO_PID[params.slug];
    if (!pid) {
        return <div className="py-24 text-center">Plan not found</div>;
    }

    const products = await getProductsByPids([pid]);
    const product = products[0];

    if (!product) {
        return <div className="py-24 text-center">Plan details not available</div>;
    }

    return (
        <main className="bg-white min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow pt-20">
                <EmailServicesSingleHero product={product} />
                <EmailServicesFeatures />
                <EmailServicesSinglePricing product={product} />
                <EmailServicesFAQ />
            </div>
            <Footer />
        </main>
    );
}

export async function generateStaticParams() {
    return Object.keys(SLUG_TO_PID).map((slug) => ({
        slug,
    }));
}
