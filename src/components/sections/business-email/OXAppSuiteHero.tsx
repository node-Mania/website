'use client';

import { motion } from 'framer-motion';
import { Mail, Cloud, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { CleanProduct } from '@/lib/types/whmcs.types';

export function OXAppSuiteHero({ product }: { product?: CleanProduct }) {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
            {/* Background Background effects */}
            <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[bottom_1px_center]" />
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Section (Left) */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <Link href="/business-email" className="inline-block text-blue-600 hover:text-blue-700 font-medium text-sm mb-4 transition-colors">
                            &larr; Back to Business Email
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8 mx-auto lg:mx-0"
                        >
                            <Mail className="w-4 h-4" />
                            OX App Suite
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-8"
                        >
                            The Complete <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                                Email Solution
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                        >
                            Upgrade your business communication with OX App Suite. Get a massive mailbox, advanced spam protection, and native sync across all your devices, all in one seamless package.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link
                                href="#pricing"
                                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                            >
                                Start Upgrading
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image Section (Right) */}
                    <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative w-full max-w-md aspect-square md:aspect-auto md:h-[500px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-full blur-3xl" />
                            <div className="relative z-10 w-full h-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-2xl p-8 flex flex-col justify-center items-center">
                                {/* Visual placeholder for email app/dashboard */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-100 rounded-full blur-2xl opacity-50 z-0"></div>
                                <Globe className="w-32 h-32 text-slate-300 mb-8 relative z-10 drop-shadow-lg" />
                                <Cloud className="absolute top-1/2 right-1/4 w-16 h-16 text-blue-500 drop-shadow-xl z-20 animate-bounce" />
                                <div className="text-center relative z-10 mt-4">
                                    <h3 className="text-2xl font-bold text-slate-800">OX App Suite</h3>
                                    <p className="text-slate-500 mt-2">Professional Webmail & Calendaring</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
