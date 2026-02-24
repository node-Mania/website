"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "How long does domain registration take?",
        answer: "Domain registration is usually instantaneous. Once you complete the payment, our system sends the request to the registry, and your domain will be activated and visible in your dashboard within minutes."
    },
    {
        question: "Is domain privacy really free at nodeMaina?",
        answer: "Yes! At nodeMaina, we believe privacy is a fundamental right. We include WHOIS Privacy Protection free of charge with all eligible domain registrations and renewals forever, saving you up to $15/year compared to other registrars."
    },
    {
        question: "Can I transfer my existing domain to nodeMaina?",
        answer: "Absolutely! Transferring your domain is a simple process. You'll need an authorization code (EPP key) from your current registrar and ensure the domain is unlocked. Most transfers also include a 1-year extension of your current expiry date."
    },
    {
        question: "What happens if I miss a renewal payment?",
        answer: "We offer a 30-day grace period for most TLDs where you can renew at normal prices. We'll send you multiple reminders before and after the expiry date to ensure you don't lose your valuable digital assets."
    },
    {
        question: "Do you offer bulk domain registration discounts?",
        answer: "Yes, we offer tiered pricing for customers managing large portfolios. Contact our sales team if you plan to register or transfer more than 50 domains for a custom quote."
    }
];

export function DomainFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold mb-6">
                            <HelpCircle className="w-4 h-4" />
                            <span>Common Questions</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">Frequently Asked <span className="text-primary">Questions</span></h2>
                        <p className="text-slate-600 font-medium">Everything you need to know about domain registration and management at nodeMaina.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "overflow-hidden rounded-2xl border transition-all duration-300",
                                    openIndex === idx
                                        ? "bg-white border-primary/20 shadow-xl shadow-primary/5"
                                        : "bg-slate-50 border-slate-100 hover:border-primary/20 hover:bg-white"
                                )}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left"
                                >
                                    <span className={cn(
                                        "text-lg font-bold transition-colors",
                                        openIndex === idx ? "text-primary" : "text-slate-900"
                                    )}>{faq.question}</span>
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                        openIndex === idx ? "bg-primary text-white rotate-180" : "bg-white text-slate-400 group-hover:text-primary"
                                    )}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-8 pb-8 text-slate-600 font-medium leading-relaxed border-t border-slate-50 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
