'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, HardDrive, RefreshCcw, Bell, Lock } from 'lucide-react';
import Link from 'next/link';

export function CodeGuardHero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b border-slate-200">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl opacity-30" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="lg:w-1/2 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-6">
                                <Shield className="w-3 h-3" />
                                <span>CodeGuard Website Backup</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                                Protect your site with <span className="text-primary-600 italic">daily automated</span> backups.
                            </h1>

                            <p className="text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">
                                Get protection against viruses, hackers and even your own code accidentally breaking your site with CodeGuard Website Backup. Every 0.65 seconds, a new web page is infected with malware.
                            </p>

                            <ul className="grid sm:grid-cols-2 gap-3 mb-10">
                                {[
                                    { text: 'Automatic Daily Backups', icon: Clock },
                                    { text: 'Website Time Machine', icon: RefreshCcw },
                                    { text: 'File Change Alert Monitoring', icon: Bell },
                                    { text: 'WordPress Plugin Updates', icon: Lock },
                                    { text: 'Malware Detection & Restore', icon: Shield },
                                ].map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + (index * 0.1) }}
                                        className="flex items-center gap-2 text-slate-700 text-sm font-medium"
                                    >
                                        <feature.icon className="w-4 h-4 text-primary-600 flex-shrink-0" />
                                        <span>{feature.text}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <a
                                    href="#pricing"
                                    className="px-8 py-3.5 bg-primary hover:bg-primary-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/25 flex items-center gap-2 group w-full sm:w-auto justify-center"
                                >
                                    View Plans
                                    <HardDrive className="w-4 h-4" />
                                </a>
                                <Link
                                    href="#features"
                                    className="px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-xl font-bold transition-all w-full sm:w-auto text-center"
                                >
                                    Explore Features
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 w-full relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative aspect-video max-w-[600px] mx-auto flex items-center justify-center p-8"
                        >
                            <div className="absolute inset-0 bg-blue-100 rounded-full blur-[100px] animate-pulse" />

                            <img
                                src="https://my.nodemania.com/assets/img/marketconnect/codeguard/overview-hero.png"
                                alt="CodeGuard Overview"
                                className="relative z-10 w-full h-auto drop-shadow-2xl object-cover rounded-xl border border-slate-200"
                                onError={(e) => {
                                    // Fallback if the WHMCS image isn't available
                                    e.currentTarget.style.display = 'none';
                                }}
                            />

                            {/* Floating Icons */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 p-4 bg-white border border-slate-100 rounded-2xl shadow-xl z-20"
                            >
                                <HardDrive className="w-6 h-6 text-primary-600" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-6 -left-6 p-4 bg-white border border-slate-100 rounded-2xl shadow-xl z-20"
                            >
                                <Clock className="w-6 h-6 text-blue-600" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
