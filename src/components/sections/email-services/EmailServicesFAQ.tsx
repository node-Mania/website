'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "Why do you need a professional Incoming Filter?",
        answer: "If your inbox is crowded with unsolicited bulk mail every day, that's a sign you need a professional Incoming Filter solution. It stops network threats at the border, giving you full protection."
    },
    {
        question: "How does the Incoming Email Filter work?",
        answer: "Once your domain is deployed to the Incoming Filter, email will securely pass through the SpamExperts filtering cloud. Emails are deeply analyzed in real time. Spam is quarantined, and clean mail is sent to your email server. No local configurations required."
    },
    {
        question: "What is Outgoing Email filtering?",
        answer: "Outgoing Email Filtering safeguards your IT infrastructure reputation by blocking spam and viruses from leaving your network, ensuring your IP doesn't end up on public blacklists."
    },
    {
        question: "Do I really need Email Archiving?",
        answer: "Yes, email archiving is critical to preserve a secure, tamper-proof backup of all your mail. This is vital for legal compliance and 'eDiscovery' purposes, as well as an easy way to recover lost or accidentally deleted emails."
    },
    {
        question: "Can I bundle these services?",
        answer: "Absolutely. We offer complete bundles taking care of Incoming filtering, Outgoing filtering, and Email Archiving all in one robust and cost-effective package."
    }
];

export default function EmailServicesFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-slate-600">
                        Everything you need to know about our Email Services and SpamExperts solutions.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            key={index}
                            className={`mb-4 rounded-2xl border transition-all duration-300 ${openIndex === index
                                    ? 'bg-white border-blue-200 shadow-md'
                                    : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-slate-100/50'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex justify-between items-center w-full p-6 text-left"
                            >
                                <span className={`font-semibold text-lg ${openIndex === index ? 'text-blue-700' : 'text-slate-900'}`}>
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className={`flex-shrink-0 ml-4 ${openIndex === index ? 'text-blue-600' : 'text-slate-400'}`}
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
