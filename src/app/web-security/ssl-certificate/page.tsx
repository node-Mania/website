import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SSLHero } from '@/components/sections/web-security/SSLHero';
import { SSLFeatures } from '@/components/sections/web-security/SSLFeatures';
import { SSLTypes } from '@/components/sections/web-security/SSLTypes';
import { SSLPricing } from '@/components/sections/web-security/SSLPricing';
import { SSLWildcard } from '@/components/sections/web-security/SSLWildcard';
import { SSLFAQ } from '@/components/sections/web-security/SSLFAQ';
import { getProductsByPids } from '@/lib/services/whmcs.service';
import { CleanProduct } from '@/lib/types/whmcs.types';

export const metadata: Metadata = {
    title: 'SSL Certificates - Secure Your Website & Boost SEO | nodeMania',
    description: 'Protect your website and customers with globally trusted SSL certificates from RapidSSL, GeoTrust, and DigiCert. Automated issuance and renewal.',
    openGraph: {
        title: 'SSL Certificates - Secure Your Website & Boost SEO | nodeMania',
        description: 'Establish trust and security with our premium SSL solutions.',
        type: 'website',
    },
};

export default async function SSLCertificatePage() {
    let rapidSSLProducts: CleanProduct[] = [];
    let geoTrustProducts: CleanProduct[] = [];
    let digiCertProducts: CleanProduct[] = [];

    try {
        // Fetch products in parallel
        const [rapid, geo, digi] = await Promise.all([
            getProductsByPids([9, 10]),
            getProductsByPids([11, 12, 13, 14, 15]),
            getProductsByPids([16, 17, 18, 19])
        ]);

        rapidSSLProducts = rapid;
        geoTrustProducts = geo;
        digiCertProducts = digi;
    } catch (error) {
        console.error("Failed to fetch SSL products from WHMCS:", error);
    }

    return (
        <main className="min-h-screen bg-white font-sans overflow-x-hidden">
            <Navbar />
            <SSLHero />
            <SSLPricing
                rapidSSLProducts={rapidSSLProducts}
                geoTrustProducts={geoTrustProducts}
                digiCertProducts={digiCertProducts}
            />
            <SSLWildcard />
            <SSLTypes />
            <SSLFeatures />
            <SSLFAQ />
            <Footer />
        </main>
    );
}
