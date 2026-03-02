'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { CleanProduct } from '@/lib/types/whmcs.types';

export default function EmailServicesSingleHero({ product }: { product: CleanProduct }) {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.05),transparent_50%)]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <Link href="/email-services" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-8 group font-medium">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to All Email Services
                </Link>

                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 font-medium text-sm mb-6 mx-auto lg:mx-0 border border-blue-200 backdrop-blur-sm shadow-sm w-fit capitalize"
                        >
                            <ShieldCheck className="w-4 h-4" />
                            <span>{product.name}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-8"
                        >
                            Professional <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                                {product.name}
                            </span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            <div className="prose prose-slate prose-lg" dangerouslySetInnerHTML={{ __html: product.description }} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
                        >
                            <Link href="#pricing" className="group flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25">
                                Select Plan Options
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image / Graphic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-full lg:w-1/2 relative flex justify-center"
                    >
                        <div className="relative w-full max-w-lg aspect-square">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-full blur-3xl" />
                            <div className="relative z-10 w-full h-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-2xl p-8 flex flex-col justify-center items-center">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-teal-100 rounded-full blur-2xl opacity-50 z-0"></div>
                                <Mail className="w-32 h-32 text-slate-300 mb-8 relative z-10 drop-shadow-lg" />
                                <ShieldCheck className="absolute top-1/2 right-1/4 w-16 h-16 text-blue-500 drop-shadow-xl z-20 animate-bounce" />
                                <div className="text-center relative z-10 mt-4">
                                    <h3 className="text-2xl font-bold text-slate-800">{product.name}</h3>
                                    <p className="text-slate-500 mt-2">Active Email Protection</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
