'use client';

import { Check, Zap, Globe } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import type { ProductGroup, CleanProduct, BillingCycle } from '@/lib/types/whmcs.types';
import { cn, convertStringIntoList } from '@/lib/utils';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type BillingMode = 'monthly' | 'annually';

interface PricingSectionProps {
    productGroups?: ProductGroup[];
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Extract a billing cycle from a product's pricing based on currency */
function getCycle(product: CleanProduct, cycle: BillingCycle['cycle'], currencyCode: string): BillingCycle | undefined {
    // Try to find the specific currency, otherwise fallback to the first one available
    const pricing = product.pricing.find(p => p.currency === currencyCode) ?? product.pricing[0];

    if (!pricing) return undefined;
    return pricing.cycles.find((c) => c.cycle === cycle);
}

/** Format a price string like "2.99" → "$2.99" */
function formatPrice(prefix: string, price: string): string {
    const num = parseFloat(price);
    if (isNaN(num) || num < 0) return 'N/A';
    return `${prefix}${num.toFixed(2)}`;
}

/** Calculate discount percentage of annual vs monthly×12 */
function calcDiscount(monthlyPrice: string, annualPrice: string): number {
    const monthly = parseFloat(monthlyPrice);
    const annual = parseFloat(annualPrice);
    if (isNaN(monthly) || isNaN(annual) || monthly <= 0) return 0;
    const fullYear = monthly * 12;
    if (annual >= fullYear) return 0;
    return Math.round(((fullYear - annual) / fullYear) * 100);
}

// ─────────────────────────────────────────────
// Fallback static data (shown when API is unavailable)
// ─────────────────────────────────────────────

const FALLBACK_GROUPS: ProductGroup[] = [
    {
        gid: 1,
        groupName: 'Web Hosting',
        products: [
            {
                pid: 1, gid: 1, name: 'Starter', slug: 'starter',
                description: 'Perfect for personal blogs and small sites.',
                type: 'hosting', paytype: 'recurring', productUrl: '#',
                pricing: [
                    {
                        currency: 'USD', prefix: '$', suffix: ' USD',
                        cycles: [
                            { cycle: 'monthly', price: '2.99', setupFee: '0.00' },
                            { cycle: 'annually', price: '23.88', setupFee: '0.00' },
                        ],
                    },
                    {
                        currency: 'GBP', prefix: '£', suffix: ' GBP',
                        cycles: [
                            { cycle: 'monthly', price: '2.49', setupFee: '0.00' },
                            { cycle: 'annually', price: '19.99', setupFee: '0.00' },
                        ],
                    }
                ],
            },
            {
                pid: 2, gid: 1, name: 'Professional', slug: 'professional',
                description: 'For growing businesses that need more power.',
                type: 'hosting', paytype: 'recurring', productUrl: '#',
                pricing: [
                    {
                        currency: 'USD', prefix: '$', suffix: ' USD',
                        cycles: [
                            { cycle: 'monthly', price: '5.99', setupFee: '0.00' },
                            { cycle: 'annually', price: '47.88', setupFee: '0.00' },
                        ],
                    },
                    {
                        currency: 'GBP', prefix: '£', suffix: ' GBP',
                        cycles: [
                            { cycle: 'monthly', price: '4.99', setupFee: '0.00' },
                            { cycle: 'annually', price: '39.88', setupFee: '0.00' },
                        ],
                    }
                ],
            },
            {
                pid: 3, gid: 1, name: 'Enterprise', slug: 'enterprise',
                description: 'Maximum power & speed for demanding sites.',
                type: 'hosting', paytype: 'recurring', productUrl: '#',
                pricing: [
                    {
                        currency: 'USD', prefix: '$', suffix: ' USD',
                        cycles: [
                            { cycle: 'monthly', price: '12.99', setupFee: '0.00' },
                            { cycle: 'annually', price: '95.88', setupFee: '0.00' },
                        ],
                    },
                    {
                        currency: 'GBP', prefix: '£', suffix: ' GBP',
                        cycles: [
                            { cycle: 'monthly', price: '10.99', setupFee: '0.00' },
                            { cycle: 'annually', price: '79.88', setupFee: '0.00' },
                        ],
                    }
                ],
            },
        ],
    },
];

// ─────────────────────────────────────────────
// Sub-components
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

    // Discount %
    const discountPct =
        billingMode === 'annually' && monthlyCycle && annualCycle
            ? calcDiscount(monthlyCycle.price, annualCycle.price)
            : 0;

    const displayPrice =
        billingMode === 'monthly'
            ? (activePrice ? formatPrice(prefix, activePrice) : 'N/A')
            : (monthlyEquivalent ? formatPrice(prefix, monthlyEquivalent) : 'N/A');

    return (
        <div
            className={`group relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${isPopular
                ? 'border-2 border-primary shadow-xl shadow-primary/10 bg-gradient-to-b from-blue-50/10 to-white'
                : 'border border-slate-200 bg-white hover:border-primary/60'
                }`}
        >
            {/* Popular badge */}
            {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                    <Zap className="w-3 h-3" />
                    Most Popular
                </div>
            )}

            {/* Discount badge */}
            {discountPct > 0 && (
                <div className="absolute top-4 right-4 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full">
                    Save {discountPct}%
                </div>
            )}

            {/* Plan name & description */}
            <h3 className="text-xl font-bold text-slate-800">{product.name}</h3>
            {/* <p className="text-sm text-slate-500 mb-6 leading-relaxed">{product.short_description}</p> */}

            {/* Price block */}
            <div className="mb-6">
                {/* Old price (crossed out) — annual mode only */}
                {/* {billingMode === 'annually' && oldAnnualPrice && discountPct > 0 && ( */}
                <div className={cn("flex items-center gap-2 mt-4", billingMode === 'annually' && oldAnnualPrice && discountPct > 0 ? "" : "hidden")}>
                    <span className="text-sm text-slate-400 line-through">
                        {formatPrice(prefix, oldAnnualPrice)}/yr
                    </span>
                    <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                        Annual deal
                    </span>
                </div>
                {/* )} */}

                {/* Main price */}
                <div className="flex items-end gap-1 mt-3">
                    <span className="text-5xl font-extrabold text-primary tracking-tight">
                        {displayPrice}
                    </span>
                    <span className="text-slate-500 mb-1.5 text-sm">/mo</span>
                </div>

                {/* Annual total */}
                {billingMode === 'annually' && annualCycle && (
                    <p className="text-xs text-slate-500 mt-1">
                        Billed as{' '}
                        <span className="font-semibold text-slate-700">
                            {formatPrice(prefix, annualCycle.price)}
                        </span>{' '}
                        per year
                    </p>
                )}
            </div>

            {/* CTA Button */}
            <a
                href={product.productUrl || '#'}
                className={`w-full text-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 mb-8 block ${isPopular
                    ? 'bg-primary text-white hover:bg-primary/80 shadow-md hover:shadow-lg hover:shadow-primary/25'
                    : 'border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-primary/50'
                    }`}
            >
                Get Started
            </a>

            {/* Features */}
            <ul className="space-y-3 mt-auto">
                {convertStringIntoList(product.description).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: feat }} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export function PricingSection({ productGroups }: PricingSectionProps) {
    const groups = (productGroups && productGroups.length > 0) ? productGroups : FALLBACK_GROUPS;

    const [activeGid, setActiveGid] = useState<number>(groups[0]?.gid ?? 0);
    const [billingMode, setBillingMode] = useState<BillingMode>('annually');

    // Extract available currencies from the first product of the groups to keep UI consistent


    const [currency, setCurrency] = useState<string>('USD');



    const currentGroup = useMemo(
        () => groups.find((g) => g.gid === activeGid) ?? groups[0],
        [groups, activeGid]
    );

    // Determine which product is "popular" (middle one by default)
    const popularIndex = Math.floor((currentGroup?.products.length ?? 0) / 2);

    return (
        <section className="py-24 w-full bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary-600 bg-blue-50 px-4 py-1.5 rounded-full mb-4">
                        Pricing Plans
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Choose Your Perfect Plan
                    </h2>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto">
                        Scalable solutions for every stage of your growth. No hidden fees.
                    </p>
                </div>

                {/* Controls Bar: Currency + Billing */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">



                    {/* Billing Toggle */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <span className={`text-sm font-medium transition-colors ${billingMode === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>
                                Monthly
                            </span>

                            {/* Toggle Switch */}
                            <button
                                onClick={() => setBillingMode((m) => (m === 'monthly' ? 'annually' : 'monthly'))}
                                className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${billingMode === 'annually' ? 'bg-blue-600' : 'bg-slate-300'
                                    }`}
                                aria-label="Toggle billing period"
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${billingMode === 'annually' ? 'translate-x-7' : 'translate-x-0'
                                        }`}
                                />
                            </button>

                            <span className={`text-sm font-medium transition-colors ${billingMode === 'annually' ? 'text-slate-900' : 'text-slate-400'}`}>
                                Annually
                                <span className="ml-2 inline-block text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                                    Save up to 10%
                                </span>
                            </span>
                        </div>
                    </div>

                </div>

                {/* Category Tabs */}
                <div className="flex justify-center gap-2 mb-12 flex-wrap">
                    {groups.map((group) => (
                        <button
                            key={group.gid}
                            onClick={() => setActiveGid(group.gid)}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeGid === group.gid
                                ? 'bg-primary text-white shadow-md shadow-primary-600/20'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-400 hover:text-primary-600'
                                }`}
                        >
                            {group.groupName}
                        </button>
                    ))}
                </div>

                {/* Pricing Cards */}
                <div className={`grid gap-8 max-w-6xl mx-auto ${(currentGroup?.products.length ?? 0) === 2
                    ? 'md:grid-cols-2 max-w-3xl'
                    : 'md:grid-cols-3'
                    }`}>
                    {currentGroup?.products.map((product, index) => (
                        <PriceCard
                            key={product.pid}
                            product={product}
                            billingMode={billingMode}
                            currency={currency}
                            isPopular={index === popularIndex}
                        />
                    ))}
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-slate-400 mt-10">
                    All plans include free SSL, 99.9% uptime SLA, and 24/7 support.
                    Prices shown in {currency}.
                </p>
            </div>
        </section>
    );
}
