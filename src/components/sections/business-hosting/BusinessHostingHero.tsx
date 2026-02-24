'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, TrendingUp, ShieldCheck, Leaf, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const HERO_FEATURES = [
    'Host Unlimited Websites',
    'Free Domain & SSL Certificate',
    'Priority 24/7 Agency Support',
    'Automated Daily Backups',
    'Free Staging Environments',
    'White-Label Ready',
];

export function BusinessHostingHero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 border-b border-slate-800">

            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl opacity-30" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="lg:w-1/2 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
                                <Briefcase className="w-3 h-3" />
                                <span>Built for Agencies & Businesses</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                                Scale Your <span className="text-indigo-400">Digital Empire</span>
                            </h1>

                            <p className="text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
                                High-performance business hosting designed for agencies and growing enterprises. Manage multiple sites with ease, speed, and total reliability.
                            </p>

                            {/* Feature List */}
                            <ul className="grid sm:grid-cols-2 gap-3 mb-10">
                                {HERO_FEATURES.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + (index * 0.1) }}
                                        className="flex items-center gap-2 text-slate-300 text-sm font-medium"
                                    >
                                        <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="#pricing"
                                    className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-1 flex items-center gap-2"
                                >
                                    View Business Plans
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="#features"
                                    className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold backdrop-blur-sm transition-all hover:-translate-y-1"
                                >
                                    Agency Features
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hero Visual */}
                    <div className="lg:w-1/2 w-full relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative aspect-square max-w-[500px] mx-auto"
                        >
                            {/* Abstract Glass Cards */}
                            <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-400 rounded-2xl rotate-12 opacity-80 blur-xl animate-pulse" />
                            <div className="absolute -bottom-5 left-10 w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full opacity-60 blur-2xl" />

                            <div className="relative z-10 w-full h-full bg-slate-800/50 rounded-3xl border border-slate-700/50 backdrop-blur-md p-6 shadow-2xl flex items-center justify-center overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Placeholder for a powerful server/dashboard illustration */}
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/business-server.svg" // Placeholder SVG
                                        alt="Business Hosting Server"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        onError={(e) => {
                                            // Fallback if image missing (simple localized handling logic if needed, or just rely on alt)
                                            // In a real app we might want a placeholder component
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Float Cards */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 bg-slate-800 border border-slate-700 p-4 rounded-xl shadow-xl z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                                        <TrendingUp className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Uptime Guarantee</p>
                                        <p className="text-sm font-bold text-white">99.99% SLA</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-6 -left-6 bg-slate-800 border border-slate-700 p-4 rounded-xl shadow-xl z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500/20 rounded-lg">
                                        <ShieldCheck className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">DDoS Protection</p>
                                        <p className="text-sm font-bold text-white">Enterprise Ready</p>
                                    </div>
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
