'use client';

import { motion } from 'framer-motion';
import { Layers, Zap, HeartHandshake, ChartNoAxesCombined } from 'lucide-react';

const FEATURES = [
    {
        title: "Multi-Domain Management",
        description: "Effortlessly manage unlimited websites from a single control panel. Perfect for digital agencies, freelancers, and businesses with multiple brands.",
        icon: Layers,
        color: "bg-purple-500"
    },
    {
        title: "Dedicated Resources",
        description: "Get guaranteed CPU and RAM allocation for your critical business applications. Your performance is isolated and never impacted by other users.",
        icon: Zap,
        color: "bg-amber-500"
    },
    {
        title: "VIP Priority Support",
        description: "Skip the queue with our prioritized support channel. Direct access to Level 3 engineers who understand complex agency requirements.",
        icon: HeartHandshake,
        color: "bg-rose-500"
    },
    {
        title: "Autoscaling servers",
        description: "We created a new kind of autoscaling, so your site gets the power it needs – however busy it gets.",
        icon: ChartNoAxesCombined,
        color: "bg-blue-500"
    }
];

export function BusinessHostingFeatures() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Agency Grade</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-6">
                        Built For High-Volume Needs
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Tools and features designed specifically to help your business scale without technical bottlenecks.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {FEATURES.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${feature.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <div className={`text-${feature.color.replace('bg-', '')} text-opacity-100`}>
                                    <feature.icon className={`w-7 h-7 text-white`} />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
