'use client';

import { FAQAccordion } from '@/components/ui/FAQAccordion';

const FAQS = [
    {
        question: 'What is autoscaling, and how does it benefit my websites?',
        answer: 'Autoscaling automatically adjusts server resources like CPU, memory, and bandwidth based on real-time traffic. This ensures that your websites remain fast and responsive during high traffic periods without any manual intervention.'
    },
    {
        question: 'How does the One-Click Migration tool work?',
        answer: 'Our One-Click Migration tool simplifies the process of transferring your website, databases, and emails to our platform. You just provide the login details for your current host, and our tool handles the rest, ensuring a smooth transition with no data loss or downtime.'
    },
    {
        question: 'What security measures do you have in place?',
        answer: 'We take security seriously. Our platform offers DDoS protection, WAF (Web Application Firewall), malware scanning, and two-factor authentication. Additionally, all sites come with free SSL certificates for encrypted communication, and we’re fully PCI compliant for secure ecommerce hosting.'
    },
    {
        question: 'Do you limit resources per account?',
        answer: 'No, there are no LVE limits on our platform, meaning your websites aren’t capped artificially. Resources like CPU and memory scale dynamically to meet demand, ensuring consistent performance.'
    },
    {
        question: 'Is your hosting platform suitable for business websites?',
        answer: 'Absolutely. Our platform is designed for business-grade hosting. It’s PCI compliant, supports autoscaling, and comes with enterprise-level security features, making it ideal for ecommerce sites and businesses that require the highest levels of security and reliability.'
    }
];

export function WebHostingFAQ() {
    return (
        <section className="py-24 bg-white">
            <FAQAccordion faqs={FAQS} />
        </section>
    );
}
