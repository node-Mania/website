'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "Is OX App Suite compatible with Outlook?",
        answer: "Yes, OX App Suite fully integrates with Microsoft Outlook. You can view, send, and access all your emails just like you would with Exchange."
    },
    {
        question: "Can I sync OX App Suite with my Android or iPhone?",
        answer: "Absolutely. OX App Suite features native integration and ActiveSync (depending on your plan) for both iOS and Android, allowing complete mobile synchronization across calendars, contacts, and emails."
    },
    {
        question: "How does the Anti-Spam protection work?",
        answer: "OX App Suite utilizes industry-standard premium filtering to scan and bounce threats before they reach your inbox, saving you time and protecting your devices from malicious software."
    },
    {
        question: "Can I use my own domain?",
        answer: "Yes! OX App Suite is designed to make your business look professional. You can easily connect your own domain (e.g., you@yourcompany.com)."
    },
    {
        question: "Is it easy to migrate my existing emails?",
        answer: "Our support team provides detailed guides to assist with IMAP migrations, ensuring none of your legacy emails are lost during the switch."
    }
];

export function OXAppSuiteFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-slate-600">
                        Everything you need to know about OX App Suite.
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
