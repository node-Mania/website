'use client';

import { Check, Zap } from 'lucide-react';
import { useState } from 'react';
import type { ProductGroup, CleanProduct, BillingCycle } from '@/lib/types/whmcs.types';
import { cn, convertStringIntoList } from '@/lib/utils';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type BillingMode = 'monthly' | 'annually';

interface WordPressHostingPricingProps {
    productGroup?: ProductGroup | null;
}

// ─────────────────────────────────────────────
// Fallback Data
// ─────────────────────────────────────────────

const FALLBACK_GROUP: ProductGroup = {
    gid: 12,
    groupName: 'WordPress Hosting',
    products: [
        {
            pid: 10, gid: 12, name: 'WP Starter', slug: 'wp-starter',
            description: 'Optimised for personal WordPress blogs.\nFree SSL Certificate\nWordPress Tools\nStackCache Caching\n100% SSD Storage',
            type: 'hosting', paytype: 'recurring', productUrl: '#',
            pricing: [
                {
                    currency: 'USD', prefix: '$', suffix: ' USD',
                    cycles: [
                        { cycle: 'monthly', price: '5.99', setupFee: '0.00' },
                        { cycle: 'annually', price: '59.88', setupFee: '0.00' },
                    ],
                }
            ],
        },
        {
            pid: 11, gid: 12, name: 'WP Professional', slug: 'wp-professional',
            description: 'Power and speed for business WordPress sites.\nFree WordPress Staging\nGlobal CDN\nAutomatic Updates\nPriority Support\nAdvanced WP Tools',
            type: 'hosting', paytype: 'recurring', productUrl: '#',
            pricing: [
                {
                    currency: 'USD', prefix: '$', suffix: ' USD',
                    cycles: [
                        { cycle: 'monthly', price: '12.99', setupFee: '0.00' },
                        { cycle: 'annually', price: '129.88', setupFee: '0.00' },
                    ],
                }
            ],
        },
        {
            pid: 12, gid: 12, name: 'WP Enterprise', slug: 'wp-enterprise',
            description: 'Maximum performance for high-traffic WP sites.\nAll Pro features\nDedicated Resources\nEnhanced Security\nMulti-site Support\nPerformance Analytics',
            type: 'hosting', paytype: 'recurring', productUrl: '#',
            pricing: [
                {
                    currency: 'USD', prefix: '$', suffix: ' USD',
                    cycles: [
                        { cycle: 'monthly', price: '24.99', setupFee: '0.00' },
                        { cycle: 'annually', price: '249.88', setupFee: '0.00' },
                    ],
                }
            ],
        },
    ],
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function getCycle(product: CleanProduct, cycle: BillingCycle['cycle'], currencyCode: string): BillingCycle | undefined {
    const pricing = product.pricing.find(p => p.currency === currencyCode) ?? product.pricing[0];
    if (!pricing) return undefined;
    return pricing.cycles.find((c) => c.cycle === cycle);
}

function formatPrice(prefix: string, price: string): string {
    const num = parseFloat(price);
    if (isNaN(num) || num < 0) return 'N/A';
    return `${prefix}${num.toFixed(2)}`;
}

function calcDiscount(monthlyPrice: string, annualPrice: string): number {
    const monthly = parseFloat(monthlyPrice);
    const annual = parseFloat(annualPrice);
    if (isNaN(monthly) || isNaN(annual) || monthly <= 0) return 0;
    const fullYear = monthly * 12;
    if (annual >= fullYear) return 0;
    return Math.round(((fullYear - annual) / fullYear) * 100);
}

// ─────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────

interface PriceCardProps {
    product: CleanProduct;
    billingMode: BillingMode;
    currency: string;
    isPopular?: boolean;
}

function PriceCard({ product, billingMode, currency, isPopular }: PriceCardProps) {
    const pricing = product.pricing.find(p => p.currency === currency) ?? product.pricing[0];
    const prefix = pricing?.prefix ?? '$';

    const monthlyCycle = getCycle(product, 'monthly', currency);
    const annualCycle = getCycle(product, 'annually', currency);

    const activeCycle = billingMode === 'monthly' ? monthlyCycle : annualCycle;
    const activePrice = activeCycle?.price ?? null;

    const monthlyEquivalent =
        billingMode === 'annually' && annualCycle
            ? (parseFloat(annualCycle.price) / 12).toFixed(2)
            : null;

    const oldAnnualPrice =
        billingMode === 'annually' && monthlyCycle
            ? (parseFloat(monthlyCycle.price) * 12).toFixed(2)
            : "0";

    const discountPct =
        billingMode === 'annually' && monthlyCycle && annualCycle
            ? calcDiscount(monthlyCycle.price, annualCycle.price)
            : 0;

    const displayPrice =
        billingMode === 'monthly'
            ? (activePrice ? formatPrice(prefix, activePrice) : 'N/A')
            : (monthlyEquivalent ? formatPrice(prefix, monthlyEquivalent) : 'N/A');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={`group relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${isPopular
                ? 'border-2 border-primary shadow-xl shadow-primary/10 bg-gradient-to-b from-blue-50/50 to-white'
                : 'border border-slate-200 bg-white hover:border-primary/60 hover:shadow-lg'
                }`}
        >
            {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                    <Zap className="w-3 h-3" />
                    Most Popular
                </div>
            )}

            {discountPct > 0 && (
                <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    Save {discountPct}%
                </div>
            )}

            <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>

            <div className="mb-8">
                <div className={cn("flex items-center gap-2 mt-4 min-h-[24px]", billingMode === 'annually' && oldAnnualPrice && discountPct > 0 ? "opacity-100" : "opacity-0")}>
                    <span className="text-sm text-slate-400 line-through">
                        {formatPrice(prefix, oldAnnualPrice)}/yr
                    </span>
                    <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                        Annual Deal
                    </span>
                </div>

                <div className="flex items-end gap-1 mt-1">
                    <span className="text-5xl font-extrabold text-slate-900 tracking-tight">
                        {displayPrice}
                    </span>
                    <span className="text-slate-500 mb-1.5 text-sm font-medium">/mo</span>
                </div>

                {billingMode === 'annually' && annualCycle && (
                    <p className="text-xs text-slate-500 mt-2 font-medium">
                        Billed as <span className="text-slate-900">{formatPrice(prefix, annualCycle.price)}</span> yearly
                    </p>
                )}
            </div>

            <a
                href={product.productUrl || '#'}
                className={`w-full text-center px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 mb-8 block ${isPopular
                    ? 'bg-primary text-white hover:bg-primary-700 shadow-md hover:shadow-lg hover:shadow-primary/25'
                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
                    }`}
            >
                Choose {product.name}
            </a>

            <div className="mt-auto">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 text-center border-b border-slate-100 pb-2">WordPress Features</p>
                <ul className="space-y-3">
                    {convertStringIntoList(product.description).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                            <div className="mt-0.5 min-w-[16px]">
                                <Check className="w-4 h-4 text-teal-500" />
                            </div>
                            <span dangerouslySetInnerHTML={{ __html: feat }} />
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export function WordPressHostingPricing({ productGroup }: WordPressHostingPricingProps) {
    const [billingMode, setBillingMode] = useState<BillingMode>('annually');
    const [currency, setCurrency] = useState<string>('USD');

    const group = productGroup || FALLBACK_GROUP;
    const popularIndex = Math.floor((group.products.length) / 2);

    return (
        <section id="pricing" className="py-24 w-full bg-slate-50 border-b border-slate-200">
            <div className="container mx-auto px-6">

                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-4 border border-primary-100">
                        WordPress Pricing
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Optimised for Performance
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Select a WordPress plan carefully crafted to give you the best speed and security from day one.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-16">
                    <div className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm inline-flex items-center relative">
                        <button
                            onClick={() => setBillingMode('monthly')}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 relative z-10",
                                billingMode === 'monthly' ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingMode('annually')}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2 relative z-10",
                                billingMode === 'annually' ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            Annually
                            <span className="bg-teal-100 text-teal-700 text-[10px] uppercase px-2 py-0.5 rounded-full">Save ~15%</span>
                        </button>

                        <motion.div
                            className="absolute top-1.5 bottom-1.5 bg-slate-100 rounded-full z-0"
                            layoutId="billingPillWP"
                            initial={false}
                            animate={{
                                left: billingMode === 'monthly' ? 4 : '50%',
                                right: billingMode === 'monthly' ? '50%' : 4,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </div>
                </div>

                <div className={`grid gap-8 max-w-6xl mx-auto ${group.products.length === 2 ? 'md:grid-cols-2 max-w-3xl' : 'lg:grid-cols-3'}`}>
                    {group.products.map((product, index) => (
                        <PriceCard
                            key={product.pid}
                            product={product}
                            billingMode={billingMode}
                            currency={currency}
                            isPopular={index === popularIndex}
                        />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-slate-500 flex items-center justify-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1"><Check className="w-4 h-4 text-teal-500" /> Pre-installed WordPress</span>
                        <span className="flex items-center gap-1"><Check className="w-4 h-4 text-teal-500" /> Automated Security Updates</span>
                        <span className="flex items-center gap-1"><Check className="w-4 h-4 text-teal-500" /> Free 1-Click Staging</span>
                    </p>
                </div>

            </div>
        </section>
    );
}
