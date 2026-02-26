'use client';

import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { motion } from 'framer-motion';

const faqs = [
    {
        question: "What is CodeGuard?",
        answer: "CodeGuard is a fully automated website backup service that gives you complete protection against data loss and malware."
    },
    {
        question: "Why do I need CodeGuard?",
        answer: "CodeGuard provides an independent offsite backup solution for your website along with daily monitoring to ensure your website is online and malware free."
    },
    {
        question: "How does it work?",
        answer: "CodeGuard takes daily automated snapshots of your website. Using these snapshots, you can restore your entire site or a specific file to an earlier version at any time."
    },
    {
        question: "What if I run out of storage?",
        answer: "Switching plans is easy! You can upgrade and increase your disk storage allowance in just a few simple clicks via our client area."
    },
    {
        question: "Where are backups stored?",
        answer: "Backups are stored on Amazon Web Services Simple Storage System which provides market leading resiliance and redundancy for your backups."
    },
    {
        question: "Are the backups encrypted?",
        answer: "Yes, backups are stored encrypted using the AES-256 Encryption Standard."
    },
    {
        question: "Do you backup databases?",
        answer: "Yes, databases can be backed up also. Database backups are supported for MySQL and MSSQL databases."
    },
    {
        question: "What is File Change Alert Monitoring?",
        answer: "CodeGuard can monitor and notify you by email when your website changes to alert you to new threats and malware."
    },
    {
        question: "What happens if my site gets infected?",
        answer: "With CodeGuard's daily snapshots, if your website gets attacked, you can restore to a previous uninfected version at any time."
    }
];

export function CodeGuardFAQ() {
    return (
        <section className="py-24 bg-slate-50 border-b border-slate-200">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Frequently Asked <span className="text-primary-600 italic">Questions</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Got questions? We've got answers about CodeGuard.
                        </p>
                    </motion.div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
                    <FAQAccordion faqs={faqs} />
                </div>
            </div>
        </section>
    );
}
