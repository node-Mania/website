'use client';

import { FAQAccordion } from '@/components/ui/FAQAccordion';

const FAQS = [
    {
        question: 'How is Business Hosting different from Web Hosting?',
        answer: 'Business Hosting is designed for higher performance and reliability. It includes more dedicated CPU and RAM resources, unlimited website hosting, prioritized support, and advanced features like Redis caching and staging environments, making it ideal for agencies and high-traffic sites.'
    },
    {
        question: 'Can I host multiple websites on one plan?',
        answer: 'Yes! All our Business Hosting plans come with the ability to host unlimited websites. You can manage all your client sites or personal projects from a single, easy-to-use control panel.'
    },
    {
        question: 'What is "White-Label" hosting?',
        answer: 'White-label hosting allows you to remove our branding from the control panel and replace it with your own agency name and logo. This lets you resell hosting services to your clients while maintaining a professional, consistent brand experience.'
    },
    {
        question: 'Do you offer free migrations for multiple sites?',
        answer: 'Absolutely. Our expert migration team will handle the transfer of all your existing websites, databases, and emails from your previous provider to nodeMania for free. We ensure zero downtime during the process.'
    },
    {
        question: 'Is SSH access included?',
        answer: 'Yes, SSH access is included with all Business Hosting plans, giving advanced users and developers secure command-line access to manage their files, databases, and execute commands like WP-CLI.'
    },
    {
        question: 'What happens if I outgrow my plan?',
        answer: 'Scaling is seamless. You can upgrade to a higher tier Business plan or move to our VPS/Dedicated solutions at any time with just a few clicks, without any interruption to your services.'
    }
];

export function BusinessHostingFAQ() {
    return (
        <section className="py-24 bg-white">
            <FAQAccordion faqs={FAQS} />
        </section>
    );
}
