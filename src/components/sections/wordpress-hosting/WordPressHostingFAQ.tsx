'use client';

import { FAQAccordion } from '@/components/ui/FAQAccordion';

const WP_FAQS = [
    {
        question: "Is WordPress pre-installed on this hosting?",
        answer: "Yes, we pre-install WordPress for you so you can get started right away. Simply purchase a WordPress package, choose your settings, and you're all set."
    },
    {
        question: "What is StackCache?",
        answer: "StackCache is a custom-built WordPress plugin created by us to edge-cache your content. It ensures that your pages load lightning-fast by serving them directly from our edge nodes."
    },
    {
        question: "Can I migrate my existing WordPress site?",
        answer: "Absolutely! We offer hassle-free migrations of existing WordPress websites. Our platform is designed to make the transition as smooth as possible."
    },
    {
        question: "How do automatic updates work?",
        answer: "We automatically update the WordPress core for you whenever security or maintenance updates are released. This keeps your site secure while you focus on your business."
    },
    {
        question: "Can I use other types of software on this platform?",
        answer: "To keep our WordPress platform running optimally, we only allow WordPress to be installed. If you need to install other software, our standard Web Hosting plans are a better choice."
    },
    {
        question: "Is the CDN included for free?",
        answer: "Yes, our state-of-the-art Global Content Delivery Network (CDN) is included with all WordPress hosting packages to improve loading speeds for users worldwide."
    }
];

export function WordPressHostingFAQ() {
    return <FAQAccordion faqs={WP_FAQS} />;
}
