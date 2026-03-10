'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Activity, Globe, ShieldCheck, Server, Building2, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import type { CleanProduct, BillingCycle } from '@/lib/types/whmcs.types';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import { resolvePricing } from '@/lib/utils/pricing';

interface MonitoringPricingProps {
    products: CleanProduct[];
}

type BillingMode = 'monthly' | 'annually';

function formatPrice(prefix: string, price: string): string {
    const num = parseFloat(price);
    if (isNaN(num)) return 'N/A';
    return `${prefix}${num.toFixed(2)}`;
}

function PriceCard({ product, billingMode, currency, isPopular }: { product: CleanProduct, billingMode: BillingMode, currency: string, isPopular?: boolean }) {
    const { prefix, price: rawPrice, displayPrice, cycle: activeCycle } = resolvePricing(product, currency, billingMode);


    // Plan features based on the names provided or common 360 monitoring features
    const getFeatures = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('lite')) return [
            '1 Website Monitoring',
            '10 Minutes Interval',
            'Email Only Alerting',
            '24 Hours Data Retention',
            'Community Support'
        ];
        if (lowerName.includes('personal')) return [
            '5 Websites Monitoring',
            '5 Minutes Interval',
            'Multi-channel Alerting',
            '30 Days Data Retention',
            'Full Site Check: Yes',
            'Standard Priority'
        ];
        if (lowerName.includes('plus')) return [
            '15 Websites Monitoring',
            '60 Seconds Interval',
            'Multi-channel Alerting',
            '30 Days Data Retention',
            '150 Crawl Depth',
            'Full Site Check: Yes'
        ];
        if (lowerName.includes('advance')) return [
            '50 Websites Monitoring',
            '60 Seconds Interval',
            'Multi-channel Alerting',
            '30 Days Data Retention',
            '500 Crawl Depth',
            'High-Priority Crawler'
        ];
        if (lowerName.includes('pro')) return [
            '1 Server Monitoring',
            '20 Websites Monitoring',
            '60 Seconds Interval',
            'Multi-channel Alerting',
            '30 Days Data Retention',
            'Full Site Check: Yes'
        ];
        if (lowerName.includes('business')) return [
            '10 Server Monitoring',
            '200 Websites Monitoring',
            '60 Seconds Interval',
            'Multi-channel Alerting',
            '30 Days Data Retention',
            '1000 Crawl Depth'
        ];
        if (lowerName.includes('enterprise')) return [
            '100 Server Monitoring',
            '2000 Websites Monitoring',
            '60 Seconds Interval',
            'Multi-channel Alerting',
            'Custom Data Retention',
            'Dedicated Account Manager'
        ];

        return ['Uptime Monitoring', 'Performance Metrics', 'Instant Alerts', 'Full Site Check'];
    };

    const features = getFeatures(product.name);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className={cn(
                "relative flex flex-col rounded-3xl p-6 transition-all duration-300 border h-full bg-white",
                isPopular
                    ? "border-primary-500 shadow-xl shadow-primary-500/10"
                    : "border-slate-200 hover:border-primary-300 shadow-sm"
            )}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Most Popular
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2 tracking-tight">{product.name}</h3>
                <div className="flex items-end gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {(rawPrice == '0.00') ? 'Free' : formatPrice(prefix, displayPrice)}
                    </span>
                    <span className="text-slate-500 mb-1 text-sm font-medium">/mo</span>
                </div>
                {billingMode === 'annually' && (
                    <p className={cn("text-[10px] text-green-600 font-bold mt-1 uppercase tracking-tighter", rawPrice == '0.00' ? 'hidden' : '')}>
                        Billed annually ({formatPrice(prefix, rawPrice)})
                    </p>
                )}
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 leading-tight">{feature}</span>
                    </li>
                ))}
            </ul>

            <a
                href={product.productUrl || '#'}
                className={cn(
                    "w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2",
                    isPopular
                        ? "bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-600/20"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                )}
            >
                Order Now
                <Zap className="w-4 h-4" />
            </a>
        </motion.div>
    );
}

export function MonitoringPricing({ products }: MonitoringPricingProps) {
    const [billingMode, setBillingMode] = useState<BillingMode>('annually');
    const { selectedCurrency: currency } = useCurrency();
    const [activeCategory, setActiveCategory] = useState<'individual' | 'business'>('individual');

    // Split based on user mapping: Lite, Personal, Plus, Advance vs pro, business, Enterprise
    const individualProducts = products.filter(p =>
        p.name.toLowerCase().includes('lite') ||
        p.name.toLowerCase().includes('personal') ||
        p.name.toLowerCase().includes('plus') ||
        p.name.toLowerCase().includes('advance')
    ).sort((a, b) => a.pid - b.pid);

    const businessProducts = products.filter(p =>
        p.name.toLowerCase().includes('pro') ||
        p.name.toLowerCase().includes('business') ||
        p.name.toLowerCase().includes('enterprise')
    ).sort((a, b) => a.pid - b.pid);

    const categories = [
        { id: 'individual', name: 'Site Monitoring', icon: Activity, products: individualProducts },
        { id: 'business', name: 'Server Monitoring', icon: Building2, products: businessProducts },
    ];

    const currentCategory = categories.find(c => c.id === activeCategory)!;

    return (
        <section id="pricing" className="py-24 bg-slate-50 border-b border-slate-200">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Simple, <span className="text-primary-600 italic">Predictable</span> Pricing
                        </h2>
                        <p className="text-lg text-slate-600 mb-10">
                            Monitor anything from a single blog to a massive server infrastructure. Choose the plan that fits your scale.
                        </p>
                    </motion.div>

                    {/* Billing Toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 flex items-center relative shadow-sm">
                            <button
                                onClick={() => setBillingMode('monthly')}
                                className={cn(
                                    "px-6 py-2 rounded-xl text-sm font-bold transition-all relative z-10",
                                    billingMode === 'monthly' ? "text-slate-900" : "text-slate-500"
                                )}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingMode('annually')}
                                className={cn(
                                    "px-6 py-2 rounded-xl text-sm font-bold transition-all relative z-10",
                                    billingMode === 'annually' ? "text-slate-900" : "text-slate-500"
                                )}
                            >
                                Annually
                                <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Save 10%</span>
                            </button>
                            <motion.div
                                className="absolute top-1.5 bottom-1.5 bg-slate-100 rounded-xl z-0 border border-slate-200"
                                layoutId="monBillingPill"
                                animate={{
                                    left: billingMode === 'monthly' ? 6 : '50%',
                                    right: billingMode === 'monthly' ? '50%' : 6,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        </div>
                    </div>

                    {/* Category Selector */}
                    <div className="flex justify-center gap-4 mb-16">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id as any)}
                                className={cn(
                                    "flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all border",
                                    activeCategory === cat.id
                                        ? "bg-slate-900 text-white border-slate-900 shadow-xl"
                                        : "bg-white text-slate-600 border-slate-200 hover:border-primary-400"
                                )}
                            >
                                <cat.icon className={cn("w-5 h-5", activeCategory === cat.id ? "text-primary-400" : "text-slate-400")} />
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {currentCategory.products.map((product, index) => (
                                <PriceCard
                                    key={product.pid}
                                    product={product}
                                    currency={currency}
                                    billingMode={billingMode}
                                    isPopular={product.name.toLowerCase().includes('plus') || product.name.toLowerCase().includes('business')}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* <div className="mt-20 p-8 rounded-[2.5rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-2 tracking-tight">Custom Enterprise Requirements?</h3>
                        <p className="text-slate-400">We offer custom solutions for large-scale monitoring needs and white-label options.</p>
                    </div>
                    <Link href="/contact" className="px-8 py-4 bg-primary-600 hover:bg-primary-500 rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20 text-nowrap">
                        Contact Sales
                    </Link>
                </div> */}
            </div>
        </section>
    );
}
