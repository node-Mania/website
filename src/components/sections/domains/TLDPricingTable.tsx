"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TldPricing } from "@/lib/types/whmcs.types";
import { Button } from "@/components/ui/Button";
import { Search, ShoppingCart, ArrowRight, Filter, Lock, X, Globe } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TLDPricingTableProps {
    tlds: TldPricing[];
    currency: {
        prefix: string;
        suffix: string;
        code: string;
    };
}

const POPULAR_EXTENSIONS = ["com", "net", "org", "co", "info", "me", "biz"];

export function TLDPricingTable({ tlds, currency }: TLDPricingTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTld, setSelectedTld] = useState<TldPricing | null>(null);
    const [domainName, setDomainName] = useState("");

    // Extract unique categories from TLDs
    const dynamicCategories = useMemo(() => {
        const cats = new Set<string>();
        tlds.forEach(tld => {

            if (tld.categories && Array.isArray(tld.categories)) {

                if (!tld.categories?.includes("Popular")) {

                    tld.categories.forEach(c => cats.add(c));
                }
            }
        });

        // console.log(cats);

        const sortedCats = Array.from(cats).sort();
        return [
            { label: "All", value: "all" },
            { label: "Popular", value: "popular" },
            ...sortedCats.map(c => ({ label: c, value: c.toLowerCase() }))
        ];
    }, [tlds]);

    // Filter TLDs based on category and search query
    const filteredTlds = useMemo(() => {
        let list = [...tlds];

        // Apply category filter
        if (activeCategory !== "all") {
            if (activeCategory === "popular") {
                list = list.filter(tld => POPULAR_EXTENSIONS.includes(tld.extension.toLowerCase()));
            } else {
                list = list.filter(tld =>
                    tld.categories?.some(c => c.toLowerCase() === activeCategory)
                );
            }
        }

        // Apply search query
        if (searchQuery.trim()) {
            list = list.filter(tld =>
                tld.extension.toLowerCase().includes(searchQuery.toLowerCase().replace(".", ""))
            );
        }

        // Default limit if showing everything and no search
        if (!searchQuery.trim() && activeCategory === "all") {
            return list.slice(0, 15);
        }

        return list.slice(0, 50); // Increased limit for filtered views
    }, [tlds, searchQuery, activeCategory]);

    const handleOpenModal = (tld: TldPricing) => {
        setSelectedTld(tld);
        setIsModalOpen(true);
        setDomainName("");
    };

    const handlePurchase = () => {
        if (!domainName.trim() || !selectedTld) return;
        const fullDomain = `${domainName.trim().toLowerCase()}.${selectedTld.extension}`;
        const url = `https://my.nodemania.com/cart.php?a=add&domain=register&query=${encodeURIComponent(fullDomain)}`;
        window.location.href = url;
    };

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Competitive <span className="text-primary">Pricing</span> for Everyone
                        </h2>
                        <p className="text-slate-600 font-medium">
                            Choose from hundreds of domain extensions. No hidden fees, just transparent pricing with free privacy protection included for life.
                        </p>
                    </div>

                    {/* Table Search */}
                    <div className="w-full md:w-80 group">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search extensions (e.g. .com, .net)..."
                                className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm group-hover:shadow-md"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap items-center gap-2 mb-8">
                    {dynamicCategories.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setActiveCategory(cat.value)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-bold transition-all border",
                                activeCategory === cat.value
                                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-primary/30 hover:text-primary"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                    {activeCategory !== "all" && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveCategory("all")}
                            className="text-slate-400 hover:text-primary font-bold text-xs"
                        >
                            Reset
                        </Button>
                    )}
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="px-8 py-6 text-sm font-bold text-slate-900 uppercase tracking-wider">Extension</th>
                                    <th className="px-8 py-6 text-sm font-bold text-slate-900 uppercase tracking-wider">Registration</th>
                                    <th className="px-8 py-6 text-sm font-bold text-slate-900 uppercase tracking-wider">Transfer</th>
                                    <th className="px-8 py-6 text-sm font-bold text-slate-900 uppercase tracking-wider">Renewal</th>
                                    <th className="px-8 py-6 text-right text-sm font-bold text-slate-900 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredTlds.length > 0 ? (
                                    filteredTlds.map((tld, idx) => (
                                        <motion.tr
                                            key={tld.extension}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="hover:bg-slate-50/50 transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-black text-slate-900">
                                                        .{tld.extension}
                                                    </span>
                                                    {idx < 3 && !searchQuery && (
                                                        <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-tight">Popular</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-xl font-bold text-slate-900">
                                                        {currency.prefix}{tld.register["1"] || tld.register["0"]}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase">per year</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-slate-600 font-semibold font-sans">
                                                    {currency.prefix}{tld.transfer["1"] || tld.transfer["0"]}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-slate-600 font-semibold font-sans">
                                                    {currency.prefix}{tld.renew["1"] || tld.renew["0"]}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button
                                                    onClick={() => handleOpenModal(tld)}
                                                    className="inline-flex items-center justify-center rounded-xl px-6 h-11 text-sm font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all active:scale-95 whitespace-nowrap"
                                                >
                                                    Add to Cart
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                                                    <Search className="w-8 h-8 text-slate-300" />
                                                </div>
                                                <p className="text-slate-500 font-bold text-lg">No extensions found matching your filters</p>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => {
                                                        setSearchQuery("");
                                                        setActiveCategory("all");
                                                    }}
                                                    className="text-primary hover:text-primary/80 font-bold"
                                                >
                                                    Clear all filters
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-sm mb-6 flex items-center justify-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-green-500" />
                        All prices shown include WHOIS Privacy Protection free forever.
                    </p>
                    <Link
                        href="https://my.nodemania.com/cart.php?a=add&domain=register"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold transition-colors group"
                    >
                        View All supported extensions
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Registration Modal */}
            <AnimatePresence>
                {isModalOpen && selectedTld && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                                    <Globe className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">Register Your Domain</h3>
                                <p className="text-slate-500 font-medium font-sans">Enter the name you want to register with the <span className="text-primary font-bold">.{selectedTld.extension}</span> extension.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="relative">
                                    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                                        <input
                                            type="text"
                                            value={domainName}
                                            onChange={(e) => setDomainName(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handlePurchase()}
                                            placeholder="your-awesome-brand"
                                            autoFocus
                                            className="flex-1 h-16 pl-6 bg-transparent text-lg md:text-xl font-bold text-slate-900 outline-none placeholder:text-slate-300 min-w-0"
                                        />
                                        <div className="h-16 px-4 md:px-6 flex items-center bg-white border-l border-slate-100 shrink-0">
                                            <span className={cn(
                                                "font-black text-slate-900 whitespace-nowrap",
                                                selectedTld.extension.length > 8 ? "text-lg md:text-xl" : "text-xl md:text-2xl"
                                            )}>
                                                .{selectedTld.extension}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm font-bold text-slate-400 flex items-center gap-2">
                                        <Lock className="w-3.5 h-3.5 text-green-500" />
                                        Free WHOIS Privacy protection included
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pb-4">
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Price / Year</span>
                                        <span className="text-xl font-bold text-slate-900">{currency.prefix}{selectedTld.register["1"] || selectedTld.register["0"]}</span>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Renewal Price</span>
                                        <span className="text-xl font-bold text-slate-900">{currency.prefix}{selectedTld.renew["1"] || selectedTld.renew["0"]}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={handlePurchase}
                                    disabled={!domainName.trim()}
                                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/95 text-white font-black text-xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3"
                                >
                                    Purchase Domain
                                    <ArrowRight className="w-6 h-6" />
                                </Button>

                                <p className="text-center text-xs text-slate-400 font-medium">
                                    By clicking purchase, you will be redirected to our secure cart area to complete your order.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
