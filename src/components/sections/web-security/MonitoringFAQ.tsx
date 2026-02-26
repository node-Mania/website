'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
    {
        question: "What is 360 Site Monitoring?",
        answer: "360 Site Monitoring is a comprehensive tool that tracks your website's uptime, performance, and health. It scans your site regularly from global locations to ensure it's accessible and performing optimally for all visitors."
    },
    {
        question: "How does Performance Monitoring work?",
        answer: "It measures technical metrics like Time to First Byte (TTFB), DNS lookup time, and total connection time. By analyzing these from 26 global locations, it identifies bottlenecks specific to certain regions or network providers."
    },
    {
        question: "What locations are supported for monitoring?",
        answer: "We monitor your website from over 26 different global locations, covering North America, Europe, Asia, and Australia to ensure a truly global perspective on your site's availability."
    },
    {
        question: "How does SSL Monitoring work?",
        answer: "Our system automatically checks your SSL/TLS certificates and alerts you well in advance of their expiration date, ensuring your visitors always have a secure, encrypted connection to your site."
    },
    {
        question: "Are there any extra fees for notifications?",
        answer: "Multi-channel notifications (Email, Slack, Discord, etc.) are included in your plan based on the alerting level (Email only for Lite, Multi-channel for all others). There are no hidden per-alert fees."
    },
    {
        question: "Can I upgrade my plan later?",
        answer: "Yes, you can upgrade or downgrade your monitoring plan at any time through your client portal. Changes are processed immediately, and pricing is adjusted proportionally."
    },
    {
        question: "How does the Full Site Check work?",
        answer: "The Full Site Check crawls your entire website to find broken links, missing resources (like images or CSS files), and JavaScript errors that might degrade the user experience or affect your SEO rankings."
    }
];

export function MonitoringFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider mb-6">
                                <HelpCircle className="w-3 h-3" />
                                <span>Common Questions</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                                Frequently Asked <br />
                                <span className="text-primary-600">Questions</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Everything you need to know about our 360° Monitoring solution and how it helps protect your digital assets.
                            </p>
                            <div className="p-6 rounded-3xl bg-primary-50 border border-primary-100">
                                <h4 className="font-bold text-primary-900 mb-2 tracking-tight">Need more help?</h4>
                                <p className="text-sm text-primary-700 leading-relaxed mb-4">Our support team is available 24/7 to answer any technical questions you might have.</p>
                                <button
                                    onClick={() => window.Tawk_API.maximize()}
                                    className="text-primary-600 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                    Contact Support
                                    <Plus className="w-4 h-4 rotate-45" />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-2/3">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={cn(
                                        "rounded-3xl border transition-all overflow-hidden",
                                        openIndex === index
                                            ? "border-primary-200 bg-primary-50/30"
                                            : "border-slate-200 bg-white hover:border-slate-300 shadow-sm"
                                    )}
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between p-6 text-left"
                                    >
                                        <span className={cn(
                                            "text-lg font-bold tracking-tight transition-colors",
                                            openIndex === index ? "text-primary-900" : "text-slate-900"
                                        )}>
                                            {faq.question}
                                        </span>
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                            openIndex === index ? "bg-primary-600 text-white rotate-180" : "bg-slate-100 text-slate-400"
                                        )}>
                                            {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
