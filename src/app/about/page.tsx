import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import AboutHero from '@/components/sections/about/AboutHero';
import SpecialtiesGrid from '@/components/sections/about/SpecialtiesGrid';
import MissionSection from '@/components/sections/about/MissionSection';
import WhyChooseNodeMania from '@/components/sections/about/WhyChooseNodeMania';
import AboutCTA from '@/components/sections/about/AboutCTA';

export const metadata: Metadata = {
    title: 'About Us | NodeMania - Enterprise Cloud Hosting',
    description: 'NodeMania is a cloud-first hosting provider delivering enterprise-grade infrastructure for businesses, developers, and agencies.',
    openGraph: {
        title: 'About Us | NodeMania',
        description: 'Cloud-first hosting provider for businesses, developers, and agencies.',
        images: ['/images/server-farm-705448.jpg'],
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#f7fbff] font-sans overflow-x-hidden">
            <Navbar />
            <article>
                <AboutHero />
                <SpecialtiesGrid />
                <MissionSection />
                <WhyChooseNodeMania />
                <AboutCTA />
            </article>
            <Footer />
        </main>
    );
}
