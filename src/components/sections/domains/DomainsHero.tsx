"use client";

import { motion } from "framer-motion";
import { DomainAvailabilitySearch } from "@/components/sections/domains/DomainAvailabilitySearch";
import { Globe, CheckCircle } from "lucide-react";
import { TldPricing } from "@/lib/types/whmcs.types";
import { useMemo, useState, useEffect } from "react";
import { useCurrency } from '@/context/CurrencyContext';

interface TLDPricingTableProps {
    tlds: TldPricing[];
    currency: {
        prefix: string;
        suffix: string;
        code: string;
    };
}
export function DomainsHero({ tlds: initialTlds, currency: initialCurrency }: TLDPricingTableProps) {
    const { currencies, selectedCurrency } = useCurrency();
    const activeCurrency = currencies.find(c => c.code === selectedCurrency);

    const [tlds, setTlds] = useState<TldPricing[]>(initialTlds);
    const [currency, setCurrency] = useState(initialCurrency);

    useEffect(() => {
        if (!activeCurrency) return;

        // Skip fetch if it matches initial and we just loaded
        if (activeCurrency.code === initialCurrency.code && tlds === initialTlds) return;

        fetch(`/api/domains/tlds?currencyId=${activeCurrency.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setTlds(data.tlds);
                    setCurrency(data.currency);
                }
            });
    }, [activeCurrency?.id]);

    const popularTlds = useMemo(() => {
        const targetExtensions = ['com', 'net', 'io', 'ai'];
        const filteredDomains = tlds.filter((item) =>
            targetExtensions.includes(item.extension)
        );
        return filteredDomains;
    }, [tlds]);

    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b border-slate-200">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -z-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 -z-0 w-1/3 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-primary text-xs font-bold mb-6"
                    >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Trusted by 2M+ active users</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight"
                    >
                        Find Your Perfect <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Domain Name</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto font-medium"
                    >
                        Start your journey with the perfect address. Secure your brand identity today with our competitive hosting-integrated domain registration.
                    </motion.p>

                    <DomainAvailabilitySearch tlds={tlds} currency={currency} />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest"
                    >
                        <div className="flex gap-8">
                            {
                                popularTlds.map((tld, index) => (
                                    <span key={index} className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2">.{tld.extension} <span className="text-slate-900 font-black">{currency.prefix}{Object.values(tld.register)[0]}</span></span>
                                ))
                            }
                        </div>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-6 mt-12 opacity-80"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-semibold text-slate-700">Free Privacy Protection</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-semibold text-slate-700">Instant Setup</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-semibold text-slate-700">Full DNS Control</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
