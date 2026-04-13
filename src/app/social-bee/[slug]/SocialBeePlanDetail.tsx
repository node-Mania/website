'use client';

import { useCurrency } from '@/context/CurrencyContext';
import { resolvePricing } from '@/lib/utils/pricing';
import { resolveProductUrl, cn } from '@/lib/utils';
import { CleanProduct } from '@/lib/types/whmcs.types';
import { Check, ArrowRight, Signal } from 'lucide-react';
import { OrderButton } from '@/components/ui/OrderButton';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { public_routes } from '@/lib/constants/routes';

interface SocialBeePlanDetailProps {
    product: CleanProduct;
    pid: number;
}

const planFeatures: Record<number, string[]> = {
    20: ['5 Social Profiles', '1 User per workspace', '1 Workspace', '1,000 Posts/category', 'Social Inbox', 'AI Post Generation', 'Canva, Unsplash, GIPHY', 'Chrome Extension'],
    21: ['10 Social Profiles', '1 User per workspace', '1 Workspace', '5,000 Posts/category', 'Post Recycling', 'AI Content assistant', 'Advanced Scheduling', 'Priority Support'],
    22: ['25 Social Profiles', '3 Users per workspace', '5 Workspaces', 'Unlimited Posts', 'Advanced Analytics', 'Character Counts', 'Custom Categories', 'Team Collaboration'],
    23: ['50 Social Profiles', '5 Users per workspace', '10 Workspaces', 'Unlimited Posts', 'White Label Reports', 'Full Automation', 'Agency Portal', 'Dedicated Support'],
    24: ['100 Social Profiles', '5 Users per workspace', '20 Workspaces', 'Unlimited Posts', 'Dedicated Account Manager', 'Multi-Brand Management', 'Custom User Roles', 'Audit Logs'],
    25: ['150 Social Profiles', '5 Users per workspace', '30 Workspaces', 'Unlimited Posts', 'Concierge Setup', 'VIP Onboarding', 'SLA Guarantee', 'Premium Support'],
};

export default function SocialBeePlanDetail({ product, pid }: SocialBeePlanDetailProps) {
    const { selectedCurrency, selectedCurrencyId } = useCurrency();

    // Resolve pricing for both monthly and annual to show comparisons
    const monthlyData = resolvePricing(product, selectedCurrency, 'monthly');
    const annualData = resolvePricing(product, selectedCurrency, 'annually');

    // Default to annual if available, otherwise monthly
    const bestBillingMode = annualData.cycle ? 'annually' : 'monthly';
    const activePricing = resolvePricing(product, selectedCurrency, bestBillingMode);

    const features = planFeatures[pid] || [];

    return (
        <main className="min-h-screen bg-slate-50 pt-32 pb-24">
            <Navbar />
            <div className="container mx-auto px-6 mb-80 mt-10">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6">
                            SocialBee {product.name}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Elevate your <span className="text-amber-600"> Social Presence</span> with {product.name}.
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                            Upgrade your social media strategy with the {product.name} plan. Automate scheduling, manage all inboxes in one place, and collaborate with your team effortlessly.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mb-10">
                            {features.map((f, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{f}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <OrderButton
                                product={product}
                                billingMode={bestBillingMode}
                                className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-xl shadow-amber-600/25 transition-all hover:-translate-y-1 flex items-center gap-2"
                            >
                                Buy {product.name} Now
                                <ArrowRight className="w-5 h-5" />
                            </OrderButton>
                            <Link
                                href={public_routes.SocialBee}
                                className="px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold transition-all hover:-translate-y-1"
                            >
                                Back to All Plans
                            </Link>
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="p-8 md:p-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-2xl relative overflow-hidden ring-1 ring-slate-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-10 -mt-10" />

                            <div className="relative z-10 text-center">
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Pricing for {product.name}</p>
                                <div className="flex items-end justify-center gap-1 mb-2">
                                    <span className="text-slate-500 mb-2 text-2xl font-bold">{activePricing.prefix}</span>
                                    <span className="text-7xl font-extrabold text-slate-900 tracking-tighter">
                                        {activePricing.displayPrice.split('.')[0]}
                                    </span>
                                    <span className="text-slate-500 mb-2 text-2xl font-bold">/mo</span>
                                </div>
                                <p className="text-sm font-bold text-green-600 mb-8 uppercase tracking-widest">
                                    {annualData.cycle ? 'Billed Annually (Save 17%)' : 'Monthly Billing'}
                                </p>

                                <div className="space-y-4 mb-10 text-left border-y border-slate-100 py-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500 font-medium">Monthly Cost</span>
                                        <span className="text-slate-900 font-bold">{monthlyData.prefix}{monthlyData.price}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500 font-medium">Billed Annually</span>
                                        <span className="text-slate-900 font-bold">{annualData.prefix}{annualData.price || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                        <span className="text-slate-900 font-bold">Effective Price</span>
                                        <span className="text-amber-600 font-extrabold text-xl">{activePricing.prefix}{activePricing.displayPrice}/mo</span>
                                    </div>
                                </div>

                                <OrderButton
                                    product={product}
                                    billingMode={bestBillingMode}
                                    className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-lg"
                                >
                                    Purchase this Plan
                                    <Signal className="w-5 h-5" />
                                </OrderButton>
                                <p className="mt-6 text-xs text-slate-400 font-medium italic">
                                    *Prices exclusive of applicable taxes. 30-day money back guarantee applies.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
