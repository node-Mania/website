'use client';

import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import type { CleanProduct } from '@/lib/types/whmcs.types';
import { useCurrency } from '@/context/CurrencyContext';
import { resolvePricing } from '@/lib/utils/pricing';
import { resolveProductUrl } from '@/lib/utils';

export function NordVPNPricing({ product }: { product: CleanProduct | null }) {
    if (!product) return null;

    const { selectedCurrency: currency, selectedCurrencyId } = useCurrency();
    const pricing = product.pricing.find(p => p.currency === currency) ?? product.pricing[0];

    if (!pricing || pricing.cycles.length === 0) return null;

    // We can show up to 3 cycles (e.g. Monthly, Annually, Biennially)
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
                            Choose How <span className="text-primary-600">You Pay</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Secure your online life today with a 15-day money-back guarantee.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 justify-center">
                        {validCycles.map((cycle, index) => {
                            const { prefix, displayPrice: perMonth, price: priceTotal } = resolvePricing(product, currency, cycle.cycle);

                            const months = cycle.cycle === 'monthly' ? 1
                                : cycle.cycle === 'annually' ? 12
                                    : cycle.cycle === 'biennially' ? 24
                                        : cycle.cycle === 'triennially' ? 36
                                            : cycle.cycle === 'quarterly' ? 3
                                                : cycle.cycle === 'semiannually' ? 6 : 1;

                            const isPopular = cycle.cycle === 'annually' || cycle.cycle === 'biennially';

                            return (
                                <motion.div
                                    key={cycle.cycle}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 border bg-white ${isPopular
                                        ? "border-primary-500 shadow-xl shadow-primary-500/10 scale-105 z-10"
                                        : "border-slate-200 hover:border-primary-300 hover:shadow-lg"
                                        }`}
                                >
                                    {isPopular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
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
                                        {[
                                            'Secure, high-speed VPN',
                                            'Malware protection',
                                            'Tracker and ad blocker',
                                            'No bandwidth limits',
                                            'Up to 6 devices',
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                                <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href={resolveProductUrl(product, selectedCurrencyId, cycle.cycle)}
                                        className={`w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${isPopular
                                            ? "bg-primary text-white hover:bg-primary-500 shadow-lg shadow-primary/20"
                                            : "bg-slate-900 text-white hover:bg-slate-800"
                                            }`}
                                    >
                                        Buy Now
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
