'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Zap, ShieldCheck, Leaf, Server } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrency } from '@/context/CurrencyContext';
import { resolvePricing } from '@/lib/utils/pricing';
import type { ProductGroup } from '@/lib/types/whmcs.types';

const HERO_FEATURES = [
    'Lightning-Fast Speeds',
    'Ultra-Reliable, High-Availability Platform',
    '24x7 Expert Support',
    'Quick & Easy One-Click Migrations',
    'Enterprise-Grade Security As Standard',
    '100% Green Hosting',
];

export function WebHostingHero({ productGroup }: { productGroup?: ProductGroup | null }) {
    const { selectedCurrency: currency } = useCurrency();

    // Find the starting price (lowest price among products)
    const startingPrice = productGroup?.products.reduce((acc, product) => {
        const { price, prefix } = resolvePricing(product, currency, 'annually');
        const numPrice = parseFloat(price) / 12; // Monthly equivalent
        if (numPrice < acc.value) {
            return { value: numPrice, prefix };
        }
        return acc;
    }, { value: Infinity, prefix: '$' });

    const displayPrice = startingPrice && startingPrice.value !== Infinity
        ? startingPrice.value.toFixed(2)
        : null;
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
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-6">
                                <Zap className="w-3 h-3" />
                                <span>Next-Gen Cloud Hosting</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                                Web Hosting <span className="text-primary-600">Reimagined</span>
                            </h1>

                            <p className="text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">
                                Blazing-Fast, Reliable & Secure Web Hosting {displayPrice && startingPrice && (
                                    <>
                                        starting from <span className="font-bold text-slate-900">{startingPrice.prefix}{displayPrice}/mo</span>.
                                    </>
                                )} Scale your business with infrastructure designed for performance.
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
                                    className="px-8 py-3.5 bg-primary hover:bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-1 flex items-center gap-2"
                                >
                                    Get Started
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
                            {/* Animated Background Blob */}
                            <div className="absolute inset-0 bg-slate-100 rounded-full blur-[100px] animate-pulse" />

                            <div className="relative z-10 w-full h-full bg-white/80 rounded-[2.5rem] border border-slate-200 backdrop-blur-xl p-8 shadow-2xl flex items-center justify-center overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-50" />

                                <div className="relative w-full h-full">
                                    <Image
                                        src="/green-server.png"
                                        alt="High Performance Server"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>

                            {/* Float Cards */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 bg-white border border-slate-100 p-4 rounded-xl shadow-xl z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <Leaf className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">Energy Source</p>
                                        <p className="text-sm font-bold text-slate-900">100% Green</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-6 -left-6 bg-white border border-slate-100 p-4 rounded-xl shadow-xl z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary-50 rounded-lg">
                                        <ShieldCheck className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">Security Status</p>
                                        <p className="text-sm font-bold text-slate-900">Protected</p>
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
