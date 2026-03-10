'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Server, AlertCircle } from 'lucide-react';
import type { CleanProduct } from '@/lib/types/whmcs.types';
import { useCurrency } from '@/context/CurrencyContext';
import { resolvePricing } from '@/lib/utils/pricing';

export default function EmailServicesPricing({ products }: { products: CleanProduct[] }) {
    if (!products || products.length === 0) {
        return (
            <div className="py-24 text-center">
                <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No email service plans available at the moment.</p>
            </div>
        );
    }

    // Attempt to parse out currency/cycle formatting
    const { selectedCurrency: currency } = useCurrency();

    return (
        <section id="pricing" className="py-24 bg-slate-50 border-t border-b border-slate-100">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            Choose Your <span className="text-blue-600">Protection</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Select the email service that best fits your business needs. Upgrade or downgrade at any time.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {products.map((product, index) => {
                        const { prefix, displayPrice: priceDisplay, cycle } = resolvePricing(product, currency, 'monthly');

                        let subText = '';
                        if (cycle) {
                            subText = `/${cycle.cycle === 'monthly' ? 'mo' : cycle.cycle}`;
                        }

                        // Determine highlighting (e.g. Bundles are popular)
                        const isBundle = product.name.toLowerCase().includes('bundle');

                        return (
                            <motion.div
                                key={product.pid}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 border bg-white ${isBundle
                                    ? "border-blue-500 shadow-xl shadow-blue-500/10 scale-105 z-10"
                                    : "border-slate-200 hover:border-blue-300 hover:shadow-lg"
                                    }`}
                            >
                                {isBundle && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                        Best Value
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-900 capitalize mb-2">{product.name}</h3>
                                    <p className="text-sm text-slate-500">Perfect for enhanced security.</p>
                                </div>

                                <div className="mb-8 border-b border-slate-100 pb-8 flex-grow">
                                    <div className="flex items-end gap-1">
                                        <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                            {prefix}{priceDisplay}
                                        </span>
                                        <span className="text-slate-500 mb-1.5 text-sm font-medium">{subText}</span>
                                    </div>
                                    <div className="mt-4 prose prose-sm prose-slate" dangerouslySetInnerHTML={{ __html: product.description }} />
                                </div>

                                <a
                                    href={product.productUrl}
                                    className={`w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${isBundle
                                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25"
                                        : "bg-slate-900 text-white hover:bg-slate-800"
                                        }`}
                                >
                                    Order Now
                                    <ShieldCheck className="w-4 h-4" />
                                </a>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
