'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Zap, ShieldCheck, Leaf, Layout, Settings, RefreshCw, Gauge, History } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const HERO_FEATURES = [
    'Superfast StackCache caching',
    'Automatic WordPress core updates',
    'WordPress Tools & Staging',
    'Global CDN & Acceleration',
    'Optimised Speed and Security',
    '100% SSD Storage',
];

export function WordPressHostingHero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 border-b border-slate-800">

            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl opacity-30" />
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
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-400 text-xs font-semibold uppercase tracking-wider mb-6">
                                <Zap className="w-3 h-3" />
                                <span>Optimised for WordPress</span>
                            </div>

                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                WordPress <span className="text-primary-400">Hosting</span>
                            </motion.h1>

                            <p className="text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
                                Find out why our WordPress platform stands out from the crowd. Our super-fast, super-secure WordPress platform has been optimised for every element of the software.
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
                                        <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="#pricing"
                                    className="px-8 py-3.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-1 flex items-center gap-2"
                                >
                                    View Plans
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="#features"
                                    className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold backdrop-blur-sm transition-all hover:-translate-y-1"
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
                            className="relative aspect-square max-w-[500px] mx-auto"
                        >
                            {/* Abstract Glass Cards */}
                            <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-teal-500 to-green-400 rounded-2xl rotate-12 opacity-80 blur-xl animate-pulse" />
                            <div className="absolute -bottom-5 left-10 w-32 h-32 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-full opacity-60 blur-2xl" />

                            <div className="relative z-10 w-full h-full bg-slate-800/50 rounded-3xl border border-slate-700/50 backdrop-blur-md p-6 shadow-2xl flex items-center justify-center overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-primary/20">
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm0 21.043c-1.391 0-2.693-.348-3.832-.97L13.1 8.522l3.243 8.3c.783-1.096 1.252-2.435 1.252-3.878 0-1.896-.783-3.609-2.035-4.826a.174.174 0 0 1 .13-.044c.435.022.87.044 1.13.044.435 0 .913-.022 1.413-.044a8.139 8.139 0 0 1-5.243 13.013c.022-.043.043-.13.043-.217 0-.348-.065-.87-.13-1.435l-1.478-4.478c.348 0 .696.022.956.022.435 0 .87-.022 1.348-.022l1.043-3.13c-.34.021-.663.033-.956.033-.435 0-.87-.013-1.348-.033L10.74 15.4c-.174-.522-.304-1-.37-1.413L8.847 8.522c-.152.022-.326.044-.5.065-.217.022-.413.022-.609.022-.217 0-.413 0-.63-.022-.174-.021-.348-.043-.5-.065L9.63 17.674c-2.478-1.435-4.13-4.087-4.13-7.143 0-.743.109-1.465.304-2.148L8.717 16.1c.109.326.217.587.304.783a5.043 5.043 0 0 1-1.326.239c-.19.01-.365.01-.522.01-.304 0-.63 0-1.022-.01-.065.26-.11.543-.11.826 0 .543.152 1.043.413 1.5l1.652 4.478a8.239 8.239 0 0 1-4.848-13.013c.304 3.739 1.478 7.391 2.913 11.043a12.043 12.043 0 0 0 5.87-11.043c0-1.043-.348-1.978-.913-2.717z" fill="#21759B" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Optimised Platform</h3>
                                    <div className="grid grid-cols-2 gap-4 w-full">
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                            <Gauge className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Speed</p>
                                            <p className="text-xs font-bold text-white">100/100</p>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                            <ShieldCheck className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Security</p>
                                            <p className="text-xs font-bold text-white">Hardened</p>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                            <RefreshCw className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Updates</p>
                                            <p className="text-xs font-bold text-white">Auto</p>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                            <History className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Backups</p>
                                            <p className="text-xs font-bold text-white">Daily</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Float Cards */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 bg-slate-800 border border-slate-700 p-4 rounded-xl shadow-xl z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500/20 rounded-lg">
                                        <Leaf className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Environment</p>
                                        <p className="text-sm font-bold text-white">100% Renewable</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-6 -left-6 bg-slate-800 border border-slate-700 p-4 rounded-xl shadow-xl z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/20 rounded-lg">
                                        <ShieldCheck className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">WordPress Status</p>
                                        <p className="text-sm font-bold text-white">Secured</p>
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
