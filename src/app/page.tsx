import { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import HomeContent from '@/components/sections/HomeContent';


export const metadata: Metadata = {
  title: 'High-Performance Cloud Hosting for Everyone | nodeMaina',
  description: 'Experience lightning-fast speeds, 99.9% uptime, and 24/7 expert support. Whether you\'re starting a blog or running an enterprise, nodeMaina scales with you.',
  openGraph: {
    title: 'High-Performance Cloud Hosting for Everyone | nodeMaina',
    description: 'Experience lightning-fast speeds, 99.9% uptime, and 24/7 expert support.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />
      <HomeContent />
      <Footer />
    </main>
  );
}
