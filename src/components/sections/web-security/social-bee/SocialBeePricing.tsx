'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Signal, LayoutGrid, Users } from 'lucide-react';
import type { CleanProduct, BillingCycle } from '@/lib/types/whmcs.types';
import { cn, resolveProductUrl } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import { resolvePricing } from '@/lib/utils/pricing';

interface SocialBeePricingProps {
    products: CleanProduct[];
}

type BillingMode = 'monthly' | 'annually';

function formatPrice(prefix: string, price: string): string {
    const num = parseFloat(price);
    if (isNaN(num)) return 'N/A';
    return `${prefix}${num.toFixed(2)}`;
}

function PriceCard({ product, billingMode, currency, isPopular }: { product: CleanProduct, billingMode: BillingMode, currency: string, isPopular?: boolean }) {
    const { selectedCurrencyId } = useCurrency();
    const { prefix, displayPrice: priceValue, price: rawPrice } = resolvePricing(product, currency, billingMode);
    const productUrl = resolveProductUrl(product, selectedCurrencyId, billingMode);

    const price = hideDecimals(priceValue);

    function hideDecimals(p: string) {
        return Math.floor(parseFloat(p)).toString();
    }

    const cents = (parseFloat(priceValue) % 1).toFixed(2).substring(1);

    // Plan features extraction from content or manual
    const features_map: Record<number, string[]> = {
        20: ['5 Social Profiles', '1 User per workspace', '1 Workspace', '1,000 Posts/category', 'Social Inbox'],
        21: ['10 Social Profiles', '1 User per workspace', '1 Workspace', '5,000 Posts/category', 'Post Recycling'],
        22: ['25 Social Profiles', '3 Users per workspace', '5 Workspaces', 'Unlimited Posts', 'Advanced Analytics'],
        23: ['50 Social Profiles', '5 Users per workspace', '10 Workspaces', 'Unlimited Posts', 'White Label Reports'],
        24: ['100 Social Profiles', '5 Users per workspace', '20 Workspaces', 'Unlimited Posts', 'Dedicated Account Manager'],
        25: ['150 Social Profiles', '5 Users per workspace', '30 Workspaces', 'Unlimited Posts', 'Concierge Setup'],
    };

    const features = features_map[product.pid] || ['Social Media Automation', 'AI Content Generation', 'Scheduling & Queuing', 'Performance Reports'];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className={cn(
                "relative flex flex-col rounded-3xl p-6 transition-all duration-300 border h-full bg-white",
                isPopular
                    ? "border-amber-500 shadow-xl shadow-amber-500/10"
                    : "border-slate-200 hover:border-amber-300 shadow-sm"
            )}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg text-nowrap">
                    Most Popular
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2 tracking-tight">{product.name}</h3>
                <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        {prefix}{price}
                    </span>
                    <span className="text-lg font-bold text-slate-900 mb-1">{cents}</span>
                    <span className="text-slate-500 mb-1 text-sm font-medium">/mo</span>
                </div>
                {billingMode === 'annually' && (
                    <p className="text-[10px] text-green-600 font-bold mt-1 uppercase tracking-tighter">
                        Billed annually ({prefix}{rawPrice})
                    </p>
                )}
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 leading-tight">{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="space-y-3">
                <a
                    href={productUrl}
                    className={cn(
                        "w-full py-3 px-6 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2",
                        isPopular
                            ? "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                    )}
                >
                    Buy Now
                    <Signal className="w-4 h-4" />
                </a>
                <a
                    href={`/web-security/social-bee/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="w-full py-2.5 px-6 rounded-xl font-bold text-xs text-slate-500 hover:text-slate-900 transition-all text-center flex items-center justify-center"
                >
                    View Plan Details
                </a>
            </div>
        </motion.div>
    );
}

export function SocialBeePricing({ products }: SocialBeePricingProps) {
    const [billingMode, setBillingMode] = useState<BillingMode>('annually');
    const { selectedCurrency: currency } = useCurrency();
    const [activeCategory, setActiveCategory] = useState<'standard' | 'agency'>('standard');

    // Categorize products
    const standardIds = [20, 21, 22];
    const agencyIds = [23, 24, 25];

    const standardProducts = products.filter(p => standardIds.includes(p.pid)).sort((a, b) => a.pid - b.pid);
    const agencyProducts = products.filter(p => agencyIds.includes(p.pid)).sort((a, b) => a.pid - b.pid);

    const categories = [
        { id: 'standard', name: 'Standard Plans', icon: LayoutGrid, products: standardProducts },
        { id: 'agency', name: 'Agency Plans', icon: Users, products: agencyProducts },
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
                            Start Growing on <span className="text-amber-600 italic">Social Media</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-10">
                            Choose the perfect plan for your social media goals. Scaling from solo creators to large agencies.
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
                                <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">-17%</span>
                            </button>
                            <motion.div
                                className="absolute top-1.5 bottom-1.5 bg-slate-100 rounded-xl z-0 border border-slate-200"
                                layoutId="sbBillingPill"
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
                                        : "bg-white text-slate-600 border-slate-200 hover:border-amber-400"
                                )}
                            >
                                <cat.icon className={cn("w-5 h-5", activeCategory === cat.id ? "text-amber-400" : "text-slate-400")} />
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
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
                        >
                            {currentCategory.products.map((product, index) => (
                                <PriceCard
                                    key={product.pid}
                                    product={product}
                                    currency={currency}
                                    billingMode={billingMode}
                                    isPopular={product.pid === 22 || product.pid === 24}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-20 text-center">
                    <p className="text-slate-500 text-sm">
                        All plans include a 30-day money-back guarantee. No hidden fees. Cancel anytime.
                    </p>
                </div>
            </div>
        </section>
    );
}
