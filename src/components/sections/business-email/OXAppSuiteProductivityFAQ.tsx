'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "What is OX App Suite + Productivity?",
        answer: "OX App Suite + Productivity includes the full OX App Suite email suite, along with OX Drive (enterprise cloud storage) and OX Documents (live, in-browser collaborative document editing)."
    },
    {
        question: "Can I collaborate with my team in real-time?",
        answer: "Yes. With OX Documents, you and your team can open and edit Text documents or Spreadsheets simultaneously right from your browser, securely syncing changes in real-time."
    },
    {
        question: "Are OX Documents compatible with Microsoft Office?",
        answer: "OX Documents features deep compatibility with Microsoft Office file formats. You can edit DOCX, XLSX, and PPTX files natively without loss of formatting or data."
    },
    {
        question: "How much storage is included with OX Drive?",
        answer: "Storage limits vary based on the specific plan level selected. It tightly integrates with your email to streamline saving attachments directly to the cloud."
    },
    {
        question: "Does it work seamlessly on mobile?",
        answer: "Yes, OX App Suite syncs your emails, calendars, tasks, and cloud storage natively across Apple, Android, and Windows devices via modern synchronization technologies."
    }
];

export function OXAppSuiteProductivityFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                        Productivity FAQs
                    </h2>
                    <p className="text-lg text-slate-600">
                        Learn more about how OX App Suite + Productivity enhances your workflow.
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
                                    ? 'bg-white border-teal-200 shadow-md'
                                    : 'bg-slate-50 border-slate-200 hover:border-teal-300 hover:bg-slate-100/50'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex justify-between items-center w-full p-6 text-left"
                            >
                                <span className={`font-semibold text-lg ${openIndex === index ? 'text-teal-700' : 'text-slate-900'}`}>
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className={`flex-shrink-0 ml-4 ${openIndex === index ? 'text-teal-600' : 'text-slate-400'}`}
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
