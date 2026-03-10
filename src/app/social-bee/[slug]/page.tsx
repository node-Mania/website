import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductsByPids } from '@/lib/services/whmcs.service';
import { SocialBeeHero } from '@/components/sections/web-security/social-bee/SocialBeeHero';
import { Check, ArrowRight, Signal } from 'lucide-react';

interface SinglePlanPageProps {
    params: Promise<{ slug: string }>;
}

const planMap: Record<string, number> = {
    'bootstrap': 20,
    'accelerate': 21,
    'pro': 22,
    'pro50': 23,
    'pro-50': 23,
    'pro100': 24,
    'pro-100': 24,
    'pro150': 25,
    'pro-150': 25
};

export async function generateMetadata({ params }: SinglePlanPageProps): Promise<Metadata> {
    const { slug } = await params;
    const pid = planMap[slug.toLowerCase()];
    if (!pid) return { title: 'Product Not Found' };

    const products = await getProductsByPids([pid]);
    const product = products[0];

    return {
        title: `${product?.name || 'SocialBee'} Plan | nodeMania`,
        description: `Everything you need to know about the ${product?.name} SocialBee plan. Get started with professional social media automation by nodeMania.`,
    };
}

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default async function SocialBeePlanPage({ params }: SinglePlanPageProps) {
    const { slug } = await params;
    const pid = planMap[slug.toLowerCase()];

    if (!pid) {
        notFound();
    }

    const products = await getProductsByPids([pid]);
    const product = products[0];

    if (!product) {
        notFound();
    }

    const pricing = product.pricing[0]; // Active currency pricing
    const annualPricing = pricing.cycles.find(c => c.cycle === 'annually');
    const monthlyPricing = pricing.cycles.find(c => c.cycle === 'monthly');

    const displayPrice = annualPricing ? (parseFloat(annualPricing.price) / 12).toFixed(2) : monthlyPricing?.price;

    const planFeatures: Record<number, string[]> = {
        20: ['5 Social Profiles', '1 User per workspace', '1 Workspace', '1,000 Posts/category', 'Social Inbox', 'AI Post Generation', 'Canva, Unsplash, GIPHY', 'Chrome Extension'],
        21: ['10 Social Profiles', '1 User per workspace', '1 Workspace', '5,000 Posts/category', 'Post Recycling', 'AI Content assistant', 'Advanced Scheduling', 'Priority Support'],
        22: ['25 Social Profiles', '3 Users per workspace', '5 Workspaces', 'Unlimited Posts', 'Advanced Analytics', 'Character Counts', 'Custom Categories', 'Team Collaboration'],
        23: ['50 Social Profiles', '5 Users per workspace', '10 Workspaces', 'Unlimited Posts', 'White Label Reports', 'Full Automation', 'Agency Portal', 'Dedicated Support'],
        24: ['100 Social Profiles', '5 Users per workspace', '20 Workspaces', 'Unlimited Posts', 'Dedicated Account Manager', 'Multi-Brand Management', 'Custom User Roles', 'Audit Logs'],
        25: ['150 Social Profiles', '5 Users per workspace', '30 Workspaces', 'Unlimited Posts', 'Concierge Setup', 'VIP Onboarding', 'SLA Guarantee', 'Premium Support'],
    };

    const features = planFeatures[pid];

    return (
        <main className="min-h-screen bg-slate-50 pt-32 pb-24">
            <Navbar />
            <div className="container mx-auto px-6">
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
                            <a
                                href={product.productUrl || '#'}
                                className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-xl shadow-amber-600/25 transition-all hover:-translate-y-1 flex items-center gap-2"
                            >
                                Buy {product.name} Now
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <a
                                href="/web-security/social-bee"
                                className="px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold transition-all hover:-translate-y-1"
                            >
                                Back to All Plans
                            </a>
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="p-8 md:p-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-2xl relative overflow-hidden ring-1 ring-slate-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-10 -mt-10" />

                            <div className="relative z-10 text-center">
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Pricing for {product.name}</p>
                                <div className="flex items-end justify-center gap-1 mb-2">
                                    <span className="text-slate-500 mb-2 text-2xl font-bold">{pricing.prefix}</span>
                                    <span className="text-7xl font-extrabold text-slate-900 tracking-tighter">
                                        {annualPricing ? (parseFloat(annualPricing.price) / 12).toFixed(0) : monthlyPricing?.price}
                                    </span>
                                    <span className="text-slate-500 mb-2 text-2xl font-bold">/mo</span>
                                </div>
                                <p className="text-sm font-bold text-green-600 mb-8 uppercase tracking-widest">
                                    {annualPricing ? 'Billed Annually (Save 17%)' : 'Monthly Billing'}
                                </p>

                                <div className="space-y-4 mb-10 text-left border-y border-slate-100 py-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500 font-medium">Monthly Cost</span>
                                        <span className="text-slate-900 font-bold">{pricing.prefix}{monthlyPricing?.price}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500 font-medium">Billed Annually</span>
                                        <span className="text-slate-900 font-bold">{pricing.prefix}{annualPricing?.price || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                        <span className="text-slate-900 font-bold">Effective Price</span>
                                        <span className="text-amber-600 font-extrabold text-xl">{pricing.prefix}{displayPrice}/mo</span>
                                    </div>
                                </div>

                                <a
                                    href={product.productUrl || '#'}
                                    className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-lg"
                                >
                                    Purchase this Plan
                                    <Signal className="w-5 h-5" />
                                </a>
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
