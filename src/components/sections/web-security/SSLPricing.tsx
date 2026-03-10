'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, Zap, Lock, Globe, Building2, Server } from 'lucide-react';
import type { CleanProduct, BillingCycle } from '@/lib/types/whmcs.types';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import { resolvePricing } from '@/lib/utils/pricing';

type BillingMode = 'annually' | 'biennially';

interface SSLPricingProps {
    rapidSSLProducts: CleanProduct[];
    geoTrustProducts: CleanProduct[];
    digiCertProducts: CleanProduct[];
}

function formatPrice(prefix: string, price: string): string {
    const num = parseFloat(price);
    if (isNaN(num)) return 'N/A';
    return `${prefix}${num.toFixed(2)}`;
}

function PriceCard({ product, billingMode, currency, isPopular }: { product: CleanProduct, billingMode: BillingMode, currency: string, isPopular?: boolean }) {
    const { prefix, price, cycle: activeCycle } = resolvePricing(product, currency, billingMode === 'biennially' ? 'biennially' : 'annually');

    // Per year equivalent
    const perYearPrice = billingMode === 'biennially' ? (parseFloat(price) / 2).toFixed(2) : price;

    const isWildcard = product.name.toLowerCase().includes('wildcard');

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className={cn(
                "relative flex flex-col rounded-3xl p-8 transition-all duration-300 border h-full bg-white",
                isPopular
                    ? "border-primary shadow-xl shadow-primary-500/10"
                    : "border-slate-200 hover:border-primary-300"
            )}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Best Value
                </div>
            )}

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    {isWildcard ? (
                        <div className="p-1 px-2 rounded-md bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-tighter border border-teal-100">
                            Wildcard
                        </div>
                    ) : (
                        <div className="p-1 px-2 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-tighter border border-blue-100">
                            Single Domain
                        </div>
                    )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight min-h-[3rem]">{product.name}</h3>
            </div>

            <div className="mb-8">
                <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        {formatPrice(prefix, perYearPrice)}
                    </span>
                    <span className="text-slate-500 mb-1.5 text-sm font-medium">/yr</span>
                </div>
                {billingMode === 'biennially' && (
                    <p className="text-xs text-slate-500 mt-2">
                        Billed {formatPrice(prefix, price)} for 2 years
                    </p>
                )}
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
                {[
                    { label: 'Validation', val: product.name.includes('EV') ? 'Extended (EV)' : product.name.includes('Business') ? 'Organization (OV)' : 'Domain (DV)' },
                    { label: 'Issuance', val: product.name.includes('EV') ? '1-3 Days' : product.name.includes('Business') ? '1-2 Days' : 'Minutes' },
                    { label: 'Encryption', val: 'Up to 256-bit' },
                    { label: 'Warranty', val: product.name.includes('Secure Site') ? '$1.5M - $2M' : product.name.includes('GeoTrust') ? '$500K - $1.25M' : '$10K' }
                ].map((item, i) => (
                    <li key={i} className="flex justify-between text-sm border-b border-slate-100 pb-2">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="text-slate-900 font-bold">{item.val}</span>
                    </li>
                ))}
            </ul>

            <a
                href={product.productUrl || '#'}
                className={cn(
                    "w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2",
                    isPopular
                        ? "bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-600/20"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                )}
            >
                Buy Now
                <Zap className="w-4 h-4" />
            </a>
        </motion.div>
    );
}

export function SSLPricing({ rapidSSLProducts, geoTrustProducts, digiCertProducts }: SSLPricingProps) {
    const [billingMode, setBillingMode] = useState<BillingMode>('annually');
    const { selectedCurrency: currency } = useCurrency();
    const [activeTab, setActiveTab] = useState<'rapid' | 'geotrust' | 'digicert'>('rapid');

    const tabs = [
        { id: 'rapid', name: 'RapidSSL', icon: Zap, color: 'blue', products: rapidSSLProducts },
        { id: 'geotrust', name: 'GeoTrust', icon: ShieldCheck, color: 'teal', products: geoTrustProducts },
        { id: 'digicert', name: 'DigiCert', icon: Lock, color: 'indigo', products: digiCertProducts },
    ];

    const currentTab = tabs.find(t => t.id === activeTab)!;

    return (
        <section id="pricing" className="py-24 bg-white border-b border-slate-100">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            Choose Your <span className="text-primary-600">Security Certificate</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-10">
                            We provide a wide range of SSL certificates from the world's most trusted authorities.
                        </p>
                    </motion.div>

                    {/* Billing Toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex items-center relative">
                            <button
                                onClick={() => setBillingMode('annually')}
                                className={cn(
                                    "px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative z-10",
                                    billingMode === 'annually' ? "text-slate-900" : "text-slate-500"
                                )}
                            >
                                Annual
                            </button>
                            <button
                                onClick={() => setBillingMode('biennially')}
                                className={cn(
                                    "px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative z-10",
                                    billingMode === 'biennially' ? "text-slate-900" : "text-slate-500"
                                )}
                            >
                                2 Years
                                <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Save Extra</span>
                            </button>
                            <motion.div
                                className="absolute top-1.5 bottom-1.5 bg-white rounded-xl shadow-sm z-0"
                                layoutId="sslBillingPill"
                                animate={{
                                    left: billingMode === 'annually' ? 6 : '50%',
                                    right: billingMode === 'annually' ? '50%' : 6,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        </div>
                    </div>

                    {/* Brand Selector */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={cn(
                                    "flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all border",
                                    activeTab === tab.id
                                        ? "bg-slate-900 text-white border-slate-900 shadow-xl"
                                        : "bg-white text-slate-600 border-slate-200 hover:border-primary-400"
                                )}
                            >
                                <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-primary-400" : "text-slate-400")} />
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {currentTab.products.map((product, index) => (
                                <PriceCard
                                    key={product.pid}
                                    product={product}
                                    currency={currency}
                                    billingMode={billingMode}
                                    isPopular={index === 1 && activeTab === 'rapid'}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
