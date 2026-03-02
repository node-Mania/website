import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MonitoringHero } from '@/components/sections/web-security/MonitoringHero';
import { MonitoringPricing } from '@/components/sections/web-security/MonitoringPricing';
import { MonitoringFeatures } from '@/components/sections/web-security/MonitoringFeatures';
import { MonitoringCostCalculator } from '@/components/sections/web-security/MonitoringCostCalculator';
import { MonitoringAlerting } from '@/components/sections/web-security/MonitoringAlerting';
import { MonitoringFAQ } from '@/components/sections/web-security/MonitoringFAQ';
import { getProductsByPids } from '@/lib/services/whmcs.service';
import { CleanProduct } from '@/lib/types/whmcs.types';

export const metadata: Metadata = {
    title: '360° Website & Server Monitoring - Real-Time Alerts | nodeMania',
    description: 'Find and fix website problems before your users do. 360 Monitoring provides real-time uptime checks, performance metrics, and multi-channel alerts.',
    openGraph: {
        title: '360° Monitoring - Safeguard Your Website Health | nodeMania',
        description: 'Comprehensive monitoring for websites and servers with instant alerting.',
        type: 'website',
    },
};

export default async function MonitoringPage() {
    let products: CleanProduct[] = [];

    try {
        // Fetch products in parallel for 360 Monitoring
        // Lite (2), Personal (3), Plus (4), Advance (5), Pro (6), Business (7), Enterprise (8)
        products = await getProductsByPids([2, 3, 4, 5, 6, 7, 8]);
    } catch (error) {
        console.error("Failed to fetch 360 Monitoring products from WHMCS:", error);
    }

    return (
        <main className="min-h-screen bg-white font-sans overflow-x-hidden">
            <Navbar />
            <MonitoringHero />
            <MonitoringPricing products={products} />
            <MonitoringFeatures />
            <MonitoringCostCalculator />
            <MonitoringAlerting />
            <MonitoringFAQ />
            <Footer />
        </main>
    );
}
