'use client';

import { motion } from 'framer-motion';
import { Check, Mail, Zap } from 'lucide-react';
import type { CleanProduct } from '@/lib/types/whmcs.types';
import { useCurrency } from '@/context/CurrencyContext';
import { resolvePricing } from '@/lib/utils/pricing';
import { resolveProductUrl } from '@/lib/utils';

export function BusinessEmailPricing({ products }: { products: CleanProduct[] }) {
    const { selectedCurrency: currency, selectedCurrencyId } = useCurrency();
    if (!products || products.length === 0) return null;

    return (
        <section id="pricing" className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            Simple, Transparent <span className="text-primary-600">Pricing</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Choose the plan that fits your business needs. Upgrade or downgrade anytime.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 justify-center">
                        {products.map((product, index) => {
                            const { prefix, displayPrice: perMonth, cycle, } = resolvePricing(product, currency, 'monthly');

                            if (!cycle) return null;

                            const isPro = product.name.toLowerCase().includes('productivity');

                            return (
                                <motion.div
                                    key={product.pid}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 border bg-white ${isPro
                                        ? "border-primary-500 shadow-xl shadow-primary-500/10 scale-105 z-10"
                                        : "border-slate-200 hover:border-primary-300 hover:shadow-lg"
                                        }`}
                                >
                                    {isPro && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="mb-6 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h3>
                                            <p className="text-sm text-slate-500">{product.description || 'Power up your business email.'}</p>
                                        </div>
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isPro ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-600'}`}>
                                            <Mail className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div className="mb-8 border-b border-slate-100 pb-8">
                                        <div className="flex items-end gap-1 mb-2">
                                            <span className="text-5xl font-extrabold text-slate-900 tracking-tight">
                                                {prefix}{perMonth}
                                            </span>
                                            <span className="text-slate-500 mb-1.5 text-sm font-medium">/mo</span>
                                        </div>
                                        {/* {false && (
                                            <p className="text-xs text-green-600 font-semibold bg-green-50 rounded-lg p-2 inline-block border border-green-100">
                                                Billed {cycle.cycle}
                                            </p>
                                        )} */}
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-grow">

                                        {([
                                            '10GB - 50GB Email Storage',
                                            'Webmail, Calendar, Tasks & Contacts',
                                            'Premium Anti-Spam & Anti-Virus',
                                            'Mobile & Desktop Sync (IMAP/CalDAV)',
                                            isPro ? 'OX Drive (Cloud File Storage)' : 'Standard Features',
                                            isPro ? 'OX Documents (Text, Spreadsheets, Presentations)' : 'Reliable & Secure',
                                        ]
                                        ).map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                                <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                                                <span dangerouslySetInnerHTML={{ __html: feature }} />
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href={resolveProductUrl(product, selectedCurrencyId, 'monthly')}
                                        className={`w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${isPro
                                            ? "bg-primary text-white hover:bg-primary-600 shadow-lg shadow-primary/20"
                                            : "bg-slate-900 text-white hover:bg-slate-800"
                                            }`}
                                    >
                                        Get Started
                                        <Zap className="w-4 h-4" />
                                    </a>

                                    <a
                                        href={`business-email/${product.name.toLowerCase().replace(/[\s\+]+/g, '-')}`}
                                        className="w-full py-2.5 px-6 rounded-xl font-bold text-xs text-slate-500 hover:text-slate-900 transition-all text-center flex items-center justify-center"
                                    >
                                        View Plan Details
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
