'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Globe, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const HERO_FEATURES = [
    'Secure your connection & hide IP',
    'Block malware, trackers, and ads',
    'Blazing speeds & unlimited bandwidth',
    'A truly global VPN server network',
    'Extra features for extra security',
    '15-day money-back guarantee',
];

export function NordVPNHero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b border-slate-200">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 text-slate-900">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-3xl opacity-30" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
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
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-6">
                                <Lock className="w-3 h-3" />
                                <span>Advanced Cybersecurity</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                                Cybersecurity. <span className="text-primary-600">Built for everyday.</span>
                            </h1>

                            <p className="text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">
                                Secure your connection and hide your IP. Block malware, trackers, and ads. Enjoy ultimate online privacy with the fastest VPN on the market.
                            </p>

                            {/* Feature List */}
                            <ul className="grid sm:grid-cols-2 gap-3 mb-10">
                                {HERO_FEATURES.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + (index * 0.1) }}
                                        className="flex items-center gap-2 text-slate-700 text-sm font-medium"
                                    >
                                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="#pricing"
                                    className="px-8 py-3.5 bg-primary hover:bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-1 flex items-center gap-2"
                                >
                                    Get NordVPN Now
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="#features"
                                    className="px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-xl font-bold transition-all hover:-translate-y-1"
                                >
                                    Learn More
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
                            className="relative aspect-square max-w-[500px] mx-auto flex items-center justify-center"
                        >
                            {/* Animated Security Orb */}
                            <div className="absolute inset-0 bg-slate-100 rounded-full blur-[100px] animate-pulse" />

                            <div className="relative z-10 w-full h-full max-h-[400px] max-w-[400px] bg-white/80 rounded-[2.5rem] border border-slate-200 backdrop-blur-xl p-8 shadow-2xl flex flex-col items-center justify-center overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-50" />

                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 5, 0, -5, 0]
                                    }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative z-20"
                                >
                                    <div className="w-32 h-32 bg-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary-600/50 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                                        <Shield className="w-16 h-16 text-white" />
                                    </div>
                                </motion.div>

                                <div className="mt-8 text-center relative z-20">
                                    <div className="h-1.5 w-48 bg-slate-100 rounded-full mx-auto mb-4 overflow-hidden border border-slate-200">
                                        <motion.div
                                            animate={{ x: [-200, 200] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="h-full w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
                                        />
                                    </div>
                                    <p className="text-slate-400 font-mono text-sm uppercase tracking-tighter">SECURING CONNECTION...</p>
                                    <p className="text-teal-600 font-bold mt-1 uppercase tracking-widest text-xs">Protected & Anonymous</p>
                                </div>

                                {/* Floating Elements */}
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-10 right-10 p-3 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200"
                                >
                                    <Lock className="w-6 h-6 text-primary-600" />
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 15, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-10 left-10 p-3 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200"
                                >
                                    <Globe className="w-6 h-6 text-teal-600" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
