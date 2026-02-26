'use client';

import { FAQAccordion } from '@/components/ui/FAQAccordion';

const NORDVPN_FAQS = [
    {
        question: 'What is Double VPN?',
        answer: 'Double VPN is an advanced security feature that routes your internet traffic through two VPN servers instead of one, encrypting your data twice. It adds an extra layer of protection, making it twice as hard for hackers to decipher your data. This is especially useful when a high level of online security is required due to strict regulations or censorship.'
    },
    {
        question: 'How many devices can I use with NordVPN?',
        answer: 'You can secure up to 6 devices simultaneously with a single account, including your router. This covers all your popular platforms like Windows, macOS, Linux, Android, and iOS.'
    },
    {
        question: 'Does NordVPN keep logs?',
        answer: "No. NordVPN operates on a strict no-logs policy, meaning we don't track, collect, or share your private data. It's nobody's business what you do online."
    },
    {
        question: 'What happens if my VPN connection drops?',
        answer: 'NordVPN includes an automatic Kill Switch. If your VPN connection drops unexpectedly, the Kill Switch will immediately block your internet connection, ensuring that your data and IP address stay safe and do not leak out.'
    },
    {
        question: 'Is there a money-back guarantee?',
        answer: 'Yes! We offer a 15-day money-back guarantee. You can try our secure, high-speed VPN completely risk-free.'
    }
];

export function NordVPNFAQ() {
    return (
        <section id="faq" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                        Frequently Asked <span className="text-primary-600">Questions</span>
                    </h2>
                    <p className="text-lg text-slate-600">
                        Everything you need to know about protecting your online presence with NordVPN.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <FAQAccordion faqs={NORDVPN_FAQS} />
                </div>
            </div>
        </section>
    );
}
