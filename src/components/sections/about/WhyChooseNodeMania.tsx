'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, Layers, BadgeDollarSign, HeadphonesIcon, CheckCircle2 } from 'lucide-react';

const reasons = [
    {
        title: 'Built for Uptime',
        desc: 'Our infrastructure is designed for maximum reliability with no single point of failure.',
        icon: Target,
        color: 'bg-green-50 text-green-600',
        borderColor: 'border-green-100',
    },
    {
        title: 'Designed for Scale',
        desc: 'Seamlessly upgrade resources as your business grows without downtime or migrations.',
        icon: TrendingUp,
        color: 'bg-blue-50 text-blue-600',
        borderColor: 'border-blue-100',
    },
    {
        title: 'Enterprise Architecture',
        desc: 'Leverage the power of top-tier data centers and enterprise-grade hardware.',
        icon: Layers,
        color: 'bg-indigo-50 text-indigo-600',
        borderColor: 'border-indigo-100',
    },
    {
        title: 'Transparent Pricing',
        desc: 'No hidden fees, no surprise renewals. Clear pricing that fits your budget.',
        icon: BadgeDollarSign,
        color: 'bg-amber-50 text-amber-600',
        borderColor: 'border-amber-100',
    },
    {
        title: 'Real Expert Support',
        desc: 'Talk to real humans who know hosting. Our specialists are available 24/7.',
        icon: HeadphonesIcon,
        color: 'bg-primary/10 text-primary',
        borderColor: 'border-primary/10',
    },
];

export default function WhyChooseNodeMania() {
    return (
        <section className="py-24 bg-[#f7fbff] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-slate-100">
                                <CheckCircle2 className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                                Why Businesses <br /> Choose <span className="text-gradient">NodeMania</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                We don't just host websites; we build the foundation for your digital success with superior infrastructure and human-centric service.
                            </p>
                            <div className="pt-6">
                                <ul className="space-y-4">
                                    {['99.9% Uptime SLA', 'Anytime Resource Scaling', '24/7/365 Expert Human Support'].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 font-semibold text-slate-700">
                                            <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center">
                                                <CheckCircle2 className="w-3.3 h-3.3 text-accent" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reasons.map((reason, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`bg-white p-8 rounded-3xl shadow-sm border ${reason.borderColor} hover:shadow-xl transition-all duration-300 group`}
                            >
                                <div className={`w-14 h-14 ${reason.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <reason.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{reason.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {reason.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
