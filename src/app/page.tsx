import { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import HomeContent from '@/components/sections/HomeContent';
import { getProductGroupsByConfig } from "@/lib/services/whmcs.service";
import type { ProductGroup } from "@/lib/types/whmcs.types";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'High-Performance Cloud Hosting for Everyone | nodeMaina',
  description: 'Experience lightning-fast speeds, 99.9% uptime, and 24/7 expert support. Whether you\'re starting a blog or running an enterprise, nodeMaina scales with you.',
  openGraph: {
    title: 'High-Performance Cloud Hosting for Everyone | nodeMaina',
    description: 'Experience lightning-fast speeds, 99.9% uptime, and 24/7 expert support.',
    type: 'website',
  },
};

export default async function HomePage() {
  let productGroups: ProductGroup[] = [];

  try {
    productGroups = await getProductGroupsByConfig([
      { gid: 1, groupName: 'Basic Web Hosting' },
      { gid: 9, groupName: 'Business Web Hosting' },
      { gid: 12, groupName: 'Wordpress Hosting' },
      // { gid: 10, groupName: 'Managed VPS' },
    ]);
    console.log("productGroups", productGroups);
  } catch (error) {
    console.error("[WHMCS] Failed to fetch product groups:", error);
    // Page still renders — PricingSection falls back to static data
  }

  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />
      <HomeContent productGroups={productGroups} />
      <Footer />
    </main>
  );
}
