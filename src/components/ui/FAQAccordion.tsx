'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
    question: string;
    answer: string;
}


export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-slate-50 w-full">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${activeIndex === idx
                                ? 'border-primary shadow-md'
                                : 'border-slate-200 hover:border-primary/50'
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                            >
                                <span className={`text-lg font-semibold transition-colors duration-300 ${activeIndex === idx ? 'text-primary' : 'text-slate-900'
                                    }`}>
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: activeIndex === idx ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${activeIndex === idx ? 'text-primary' : 'text-slate-400'
                                        }`} />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {activeIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-6 pb-6 text-slate-600">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
