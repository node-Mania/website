'use client';

import { motion } from 'framer-motion';
import { Mail, Briefcase, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { CleanProduct } from '@/lib/types/whmcs.types';

export function OXAppSuiteProductivityHero({ product }: { product?: CleanProduct }) {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
            {/* Background Background effects */}
            <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[bottom_1px_center]" />
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-teal-400 opacity-20 blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Section (Left) */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <Link href="/business-email" className="inline-block text-teal-600 hover:text-teal-700 font-medium text-sm mb-4 transition-colors">
                            &larr; Back to Business Email
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-8 mx-auto lg:mx-0"
                        >
                            <Briefcase className="w-4 h-4" />
                            OX App Suite + Productivity
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-8"
                        >
                            Enterprise Email, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                                Supercharged
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                        >
                            Get the full power of OX App Suite, plus complete access to OX Drive and OX Documents. The ultimate enterprise-level productivity suite for your workflow.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link
                                href="#pricing"
                                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20"
                            >
                                Get Unlocked
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
                            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 rounded-full blur-3xl" />
                            <div className="relative z-10 w-full h-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-2xl p-8 flex flex-col justify-center items-center">
                                {/* Visual placeholder for email app/dashboard */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-100 rounded-full blur-2xl opacity-50 z-0"></div>
                                <Mail className="w-32 h-32 text-slate-300 mb-8 relative z-10 drop-shadow-lg" />
                                <FileText className="absolute top-1/2 right-1/4 w-16 h-16 text-teal-500 drop-shadow-xl z-20 animate-bounce" />
                                <div className="text-center relative z-10 mt-4">
                                    <h3 className="text-2xl font-bold text-slate-800">App Suite + Productivity</h3>
                                    <p className="text-slate-500 mt-2">Email, Docs & Drive Integration</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
