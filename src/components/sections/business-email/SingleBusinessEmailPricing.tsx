'use client';

import { motion } from 'framer-motion';
import { Check, Mail, Zap } from 'lucide-react';
import type { CleanProduct } from '@/lib/types/whmcs.types';
import { useCurrency } from '@/context/CurrencyContext';
import { resolvePricing } from '@/lib/utils/pricing';
import { resolveProductUrl } from '@/lib/utils';

export function SingleBusinessEmailPricing({ product, highlightColor = 'blue' }: { product: CleanProduct, highlightColor?: 'blue' | 'teal' }) {
    if (!product) return null;

    const { selectedCurrency: currency, selectedCurrencyId } = useCurrency();
    const pricing = product.pricing.find(p => p.currency === currency) ?? product.pricing[0];
    // const prefix = pricing?.prefix ?? '$'; // Removed as resolvePricing provides it

    if (!pricing || pricing.cycles.length === 0) return null;

    const validCycles = pricing.cycles.filter(c => parseFloat(c.price) > 0);

    const colors = {
        blue: {
            border: 'border-blue-500',
            bg: 'bg-blue-600',
            hoverBg: 'hover:bg-blue-700',
            shadow: 'shadow-blue-500/10',
            buttonShadow: 'shadow-blue-500/20',
            hoverBorder: 'hover:border-blue-300'
        },
        teal: {
            border: 'border-teal-500',
            bg: 'bg-teal-600',
            hoverBg: 'hover:bg-teal-700',
            shadow: 'shadow-teal-500/10',
            buttonShadow: 'shadow-teal-500/20',
            hoverBorder: 'hover:border-teal-300'
        }
    };

    const scheme = colors[highlightColor];

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
                            Choose Your <span className={`text-${highlightColor}-600`}>Billing Cycle</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Flexible payments for professional business email.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-5xl mx-auto flex justify-center">
                    <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl">
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
                                        ? `${scheme.border} shadow-xl ${scheme.shadow} scale-105 z-10`
                                        : `border-slate-200 ${scheme.hoverBorder} hover:shadow-lg`
                                        }`}
                                >
                                    {isPopular && (
                                        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${scheme.bg} text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg`}>
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
                                            <Check className={`w-5 h-5 text-${highlightColor}-500 flex-shrink-0`} />
                                            <span>Full {product.name} Access</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-slate-700">
                                            <Check className={`w-5 h-5 text-${highlightColor}-500 flex-shrink-0`} />
                                            <span>Webmail & Device Sync</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-slate-700">
                                            <Check className={`w-5 h-5 text-${highlightColor}-500 flex-shrink-0`} />
                                            <span>24/7 Premium Support</span>
                                        </li>
                                    </ul>

                                    <a
                                        href={resolveProductUrl(product, selectedCurrencyId, cycle.cycle)}
                                        className={`w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${isPopular
                                            ? `${scheme.bg} text-white ${scheme.hoverBg} shadow-lg ${scheme.buttonShadow}`
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
