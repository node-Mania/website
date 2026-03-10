'use client';

import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import type { CleanProduct } from '@/lib/types/whmcs.types';
import { useCurrency } from '@/context/CurrencyContext';

export default function EmailServicesSinglePricing({ product }: { product: CleanProduct }) {
    if (!product) return null;

    const { selectedCurrency: currency } = useCurrency();
    const pricing = product.pricing.find(p => p.currency === currency) ?? product.pricing[0];
    const prefix = pricing?.prefix ?? '$';

    if (!pricing || pricing.cycles.length === 0) return null;

    // Show cycles that have a price > 0
    const validCycles = pricing.cycles.filter(c => parseFloat(c.price) > 0);

    return (
        <section id="pricing" className="py-24 bg-slate-50 border-t border-b border-slate-100 relative">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            Choose Your <span className="text-blue-600">Billing Cycle</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Flexible payments for professional email security.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-5xl mx-auto flex justify-center">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {validCycles.map((cycle, index) => {
                            const months = cycle.cycle === 'monthly' ? 1
                                : cycle.cycle === 'annually' ? 12
                                    : cycle.cycle === 'biennially' ? 24
                                        : cycle.cycle === 'triennially' ? 36
                                            : cycle.cycle === 'quarterly' ? 3
                                                : cycle.cycle === 'semiannually' ? 6 : 1;

                            const priceTotal = parseFloat(cycle.price);
                            const perMonth = (priceTotal / months).toFixed(2);

                            const isPopular = cycle.cycle === 'annually' || cycle.cycle === 'biennially';

                            return (
                                <motion.div
                                    key={cycle.cycle}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 border bg-white ${isPopular
                                        ? "border-blue-500 shadow-xl shadow-blue-500/10 scale-105 z-10"
                                        : "border-slate-200 hover:border-blue-300 hover:shadow-lg"
                                        }`}
                                >
                                    {isPopular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                            Best Value
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-slate-900 capitalize mb-2">{cycle.cycle}</h3>
                                        <p className="text-sm text-slate-500">Billed {cycle.cycle}</p>
                                    </div>

                                    <div className="mb-8 border-b border-slate-100 pb-8">
                                        <div className="flex items-end gap-1 mb-2">
                                            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                                {prefix}{perMonth}
                                            </span>
                                            <span className="text-slate-500 mb-1.5 text-sm font-medium">/mo</span>
                                        </div>
                                        {months > 1 && (
                                            <p className="text-xs text-green-600 font-semibold bg-green-50 rounded-lg p-2 inline-block border border-green-100">
                                                Total price {prefix}{priceTotal} for {months} months
                                            </p>
                                        )}
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-grow">
                                        <li className="flex items-start gap-3 text-sm text-slate-700">
                                            <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                                            <span>Full {product.name} Access</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-slate-700">
                                            <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                                            <span>24/7 Premium Support</span>
                                        </li>
                                    </ul>

                                    <a
                                        href={`${product.productUrl}&billingcycle=${cycle.cycle}`}
                                        className={`w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${isPopular
                                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                                            : "bg-slate-900 text-white hover:bg-slate-800"
                                            }`}
                                    >
                                        Place Order
                                        <Zap className="w-4 h-4" />
                                    </a>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
