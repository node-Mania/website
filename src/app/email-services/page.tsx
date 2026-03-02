import { getProductsByPids } from '@/lib/services/whmcs.service';
import EmailServicesHero from '@/components/sections/email-services/EmailServicesHero';
import EmailServicesFeatures from '@/components/sections/email-services/EmailServicesFeatures';
import EmailServicesPricing from '@/components/sections/email-services/EmailServicesPricing';
import EmailServicesFAQ from '@/components/sections/email-services/EmailServicesFAQ';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Product IDs:
// Incoming Scanning -> 27
// Outgoing Scanning -> 28
// Incoming & Archiving Bundle -> 29
// Outgoing & Archiving Bundle -> 30
// Incoming & Outgoing Bundle -> 31
// Incoming, Outgoing & Archiving Bundle -> 32

const EMAIL_SERVICES_PIDS = [27, 28, 29, 30, 31, 32];

export const metadata = {
    title: 'Professional Email Security & Archiving | nodeMania',
    description: 'Take back control of your inbox. Eliminate spam and viruses before they reach your network with our premium email filtering and archiving solutions.',
};

export default async function EmailServicesPage() {
    const products = await getProductsByPids(EMAIL_SERVICES_PIDS);

    return (
        <main className="bg-white min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow pt-20">
                <EmailServicesHero />
                <EmailServicesFeatures />
                <EmailServicesPricing products={products} />
                <EmailServicesFAQ />
            </div>
            <Footer />
        </main>
    );
}
