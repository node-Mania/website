'use client';

import { motion } from 'framer-motion';
import { HeroSection } from './home/HeroSection';
import { TrustBar } from './home/TrustBar';
import { PricingSection } from './home/PricingSection';
import { ComparisonSection } from './home/ComparisonSection';
import { SolutionsSection } from './home/SolutionsSection';
import { PerformanceSection } from './home/PerformanceSection';
import { DataCenterSection } from './home/DataCenterSection';
import { GreenHostingSection } from './home/GreenHostingSection';
import { WhyNodeManiaSection } from './home/WhyNodeManiaSection';
import { PartnersSection } from './home/PartnersSection';
import { TestimonialsSection } from './home/TestimonialsSection';
import { FAQSection } from './home/FAQSection';
import { NewsletterSection } from './home/NewsletterSection';
import type { ProductGroup } from '@/lib/types/whmcs.types';

interface HomeContentProps {
    productGroups?: ProductGroup[];
}

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

export default function HomeContent({ productGroups }: HomeContentProps) {
    return (
        <div className="w-full bg-white overflow-hidden">
            <Reveal>
                <HeroSection />
            </Reveal>
            <Reveal delay={0.1}>
                <TrustBar />
            </Reveal>
            <Reveal>
                <PricingSection productGroups={productGroups} />
            </Reveal>
            <Reveal>
                <ComparisonSection />
            </Reveal>
            <Reveal>
                <SolutionsSection />
            </Reveal>
            <Reveal>
                <PerformanceSection />
            </Reveal>
            <Reveal>
                <DataCenterSection />
            </Reveal>
            <Reveal>
                <GreenHostingSection />
            </Reveal>
            <Reveal>
                <WhyNodeManiaSection />
            </Reveal>
            <Reveal>
                <PartnersSection />
            </Reveal>
            <Reveal>
                <TestimonialsSection />
            </Reveal>
            <Reveal>
                <FAQSection />
            </Reveal>
            <Reveal>
                <NewsletterSection />
            </Reveal>
        </div>
    );
}
