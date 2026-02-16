'use client';

import { FAQAccordion } from '@/components/ui/FAQAccordion';

const faqs = [
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. We also support cryptocurrency payments for selected regions.'
    },
    {
        question: 'Can I upgrade my plan later?',
        answer: 'Yes, you can upgrade your plan at any time directly from your dashboard. The cost difference will be calculated on a pro-rata basis, so you only pay for the remaining time in your billing cycle.'
    },
    {
        question: 'Do you offer free migration?',
        answer: 'Absolutely! Our expert support team will migrate your website from your current host to nodeMaina free of charge. We ensure zero downtime during the transfer process.'
    },
    {
        question: 'Is there a money-back guarantee?',
        answer: 'Yes, we offer a 30-day money-back guarantee on all our shared and cloud hosting plans. If you\'re not satisfied with our service for any reason, we\'ll refund your payment in full.'
    }
];

export function FAQSection() {


    return (
        <FAQAccordion faqs={faqs} />
    );
}
