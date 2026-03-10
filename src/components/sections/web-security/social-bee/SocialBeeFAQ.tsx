'use client';

import { motion } from 'framer-motion';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Mail, MessageCircle, HelpCircle } from 'lucide-react';

const faqItems = [
    {
        question: "Which platforms does SocialBee support?",
        answer: "SocialBee allows you to manage and schedule content for Facebook, Instagram, Threads, X (formerly Twitter), LinkedIn, Pinterest, Google Business Profile, TikTok, YouTube, and Bluesky."
    },
    {
        question: "What's the difference between Pro and Agency plans?",
        answer: "The main differences are the number of social profiles, workspaces, and users. The Pro plan supports 25 profiles and 3 users, while Agency plans (Pro50, Pro100, Pro150) scale up to 150 profiles and 30 users per workspace."
    },
    {
        question: "Where are SocialBee's servers located?",
        answer: "SocialBee's servers are located in Ireland, Europe, ensuring compliance with data protection standards and providing reliable uptime."
    },
    {
        question: "What kind of support is available?",
        answer: "SocialBee offers support through calls, live chat, and email. It is one of the few social media management tools that still offers on-call support for its users."
    },
    {
        question: "Is there a money-back guarantee?",
        answer: "Yes, all SocialBee plans come with a 30-day money-back guarantee. If you're not satisfied within the first month, we'll provide a full refund, no questions asked."
    },
    {
        question: "Can I upgrade or downgrade my plan later?",
        answer: "Absolutely! You can change your plan at any time through the nodeMania client area. Changes are pro-rated, so you only pay for what you use."
    }
];

export function SocialBeeFAQ() {
    return (
        <section id="faq" className="py-24 bg-white border-b border-slate-200">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                                Frequently Asked <span className="text-amber-600 italic">Questions</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                                Everything you need to know about SocialBee. Can't find the answer you're looking for? Reach out to our team.
                            </p>

                            <div className="space-y-4">
                                <a
                                    href="https://my.nodemania.com/contact.php"
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-100 group hover:shadow-lg transition-all"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Email Us</p>
                                        <p className="text-xs text-slate-500">Response within 24 hours</p>
                                    </div>
                                </a>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100 group hover:shadow-lg transition-all cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Live Chat</p>
                                        <p className="text-xs text-slate-500">Instant help from experts</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-2/3">
                        <FAQAccordion faqs={faqItems} />
                    </div>
                </div>
            </div>
        </section>
    );
}
