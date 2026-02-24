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

interface BusinessHostingPricingProps {
    productGroup?: ProductGroup | null;
}

// ─────────────────────────────────────────────
// Fallback Data for Business Plans
// ─────────────────────────────────────────────

const FALLBACK_GROUP: ProductGroup = {
    gid: 2,
    groupName: 'Business Hosting',
    products: [
        {
            pid: 101, gid: 2, name: 'Startup', slug: 'startup',
            description: '<li>Host Up to 10 Websites</li><li>100GB NVMe SSD Storage</li><li>Unmetered Bandwidth</li><li>Free SSL Certificates</li><li>Daily Automated Backups</li><li>24/7 Priority Support</li>',
            type: 'hosting', paytype: 'recurring', productUrl: '#',
            pricing: [
                {
                    currency: 'USD', prefix: '$', suffix: ' USD',
                    cycles: [
                        { cycle: 'monthly', price: '9.99', setupFee: '0.00' },
                        { cycle: 'annually', price: '99.90', setupFee: '0.00' },
                    ],
                },
                {
                    currency: 'GBP', prefix: '£', suffix: ' GBP',
                    cycles: [
                        { cycle: 'monthly', price: '7.99', setupFee: '0.00' },
                        { cycle: 'annually', price: '79.90', setupFee: '0.00' },
                    ],
                }
            ],
        },
        {
            pid: 102, gid: 2, name: 'Agency Pro', slug: 'agency-pro',
            description: '<li>Host Unlimited Websites</li><li>250GB NVMe SSD Storage</li><li>Unlimited Bandwidth</li><li>White-Label Control Panel</li><li>Free Staging Environments</li><li>Free Dedicated IP</li>',
            type: 'hosting', paytype: 'recurring', productUrl: '#',
            pricing: [
                {
                    currency: 'USD', prefix: '$', suffix: ' USD',
                    cycles: [
                        { cycle: 'monthly', price: '29.99', setupFee: '0.00' },
                        { cycle: 'annually', price: '299.90', setupFee: '0.00' },
                    ],
                },
                {
                    currency: 'GBP', prefix: '£', suffix: ' GBP',
                    cycles: [
                        { cycle: 'monthly', price: '24.99', setupFee: '0.00' },
                        { cycle: 'annually', price: '249.90', setupFee: '0.00' },
                    ],
                }
            ],
        },
        {
            pid: 103, gid: 2, name: 'Enterprise', slug: 'business-enterprise',
            description: '<li>Unlimited Websites & Storage</li><li>High-Performance CPUs</li><li>Redis Object Caching Pro</li><li>Advanced Security Suite</li><li>VIP Priority Support Queue</li><li>Free Migration for All Sites</li>',
            type: 'hosting', paytype: 'recurring', productUrl: '#',
            pricing: [
                {
                    currency: 'USD', prefix: '$', suffix: ' USD',
                    cycles: [
                        { cycle: 'monthly', price: '59.99', setupFee: '0.00' },
                        { cycle: 'annually', price: '599.90', setupFee: '0.00' },
                    ],
                },
                {
                    currency: 'GBP', prefix: '£', suffix: ' GBP',
                    cycles: [
                        { cycle: 'monthly', price: '49.99', setupFee: '0.00' },
                        { cycle: 'annually', price: '499.90', setupFee: '0.00' },
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

    // For annual: show monthly equivalent (annual / 12)
    const monthlyEquivalent =
        billingMode === 'annually' && annualCycle
            ? (parseFloat(annualCycle.price) / 12).toFixed(2)
            : null;

    // Old price (monthly × 12) shown crossed out in annual mode
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
            className={`group relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${isPopular
                ? 'border-2 border-indigo-500 shadow-xl shadow-indigo-500/10 bg-gradient-to-b from-indigo-50/50 to-white'
                : 'border border-slate-200 bg-white hover:border-indigo-500/60 hover:shadow-lg'
                }`}
        >
            {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                    <Zap className="w-3 h-3" />
                    Best for Agencies
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
                        Business Deal
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
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg hover:shadow-indigo-500/25'
                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
                    }`}
            >
                Start with {product.name}
            </a>

            <div className="mt-auto">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Detailed Features</p>
                <ul className="space-y-3">
                    {convertStringIntoList(product.description).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                            <div className="mt-0.5 min-w-[16px]">
                                <Check className="w-4 h-4 text-indigo-500" />
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

export function BusinessHostingPricing({ productGroup }: BusinessHostingPricingProps) {
    const [billingMode, setBillingMode] = useState<BillingMode>('annually');
    const [currency, setCurrency] = useState<string>('USD');

    // Use passed group or fallback
    const group = productGroup || FALLBACK_GROUP;

    // Determine "popular" (middle one)
    const popularIndex = Math.floor((group.products.length) / 2);

    return (
        <section id="pricing" className="py-24 w-full bg-slate-50 border-b border-slate-200">
            <div className="container mx-auto px-6">

                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-4 border border-indigo-100">
                        High Performance
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Power Your Growth
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Premium resources, prioritized support, and scalability for serious businesses.
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
                            <span className="bg-teal-100 text-teal-700 text-[10px] uppercase px-2 py-0.5 rounded-full">Save 2 Months</span>
                        </button>

                        {/* Animated background pill */}
                        <motion.div
                            className="absolute top-1.5 bottom-1.5 bg-slate-100 rounded-full z-0"
                            layoutId="billingPill"
                            initial={false}
                            animate={{
                                left: billingMode === 'monthly' ? 4 : '50%',
                                right: billingMode === 'monthly' ? '50%' : 4,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </div>
                </div>

                {/* Cards Grid */}
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
                        <span className="flex items-center gap-1"><Check className="w-4 h-4 text-indigo-500" /> Premium Migration</span>
                        <span className="flex items-center gap-1"><Check className="w-4 h-4 text-indigo-500" /> 60-Day Money-Back Guarantee</span>
                        <span className="flex items-center gap-1"><Check className="w-4 h-4 text-indigo-500" /> 99.99% Uptime SLA</span>
                    </p>
                </div>

            </div>
        </section>
    );
}
