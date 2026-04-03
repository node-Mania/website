"use client";

import { useState } from "react";
import { Search, Loader2, CheckCircle2, XCircle, ShoppingCart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { TldPricing, DomainWhoisResponse } from "@/lib/types/whmcs.types";

interface DomainCheckResponse {
    success: boolean;
    target?: DomainWhoisResponse;
    suggestions?: DomainWhoisResponse[];
    error?: string;
    hasMore?: boolean;
    page?: number;
}

interface DomainAvailabilitySearchProps {
    tlds: TldPricing[];
    currency: {
        prefix: string;
        suffix: string;
        code: string;
    };
    className?: string;
}

export function DomainAvailabilitySearch({
    tlds,
    currency,
    className,
}: DomainAvailabilitySearchProps) {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [result, setResult] = useState<DomainCheckResponse | null>(null);
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isAiMode, setIsAiMode] = useState(false);

    const handleSearch = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setHasSearched(true);
        setResult(null);
        setPage(1);
        
        try {
            if (isAiMode) {
                const res = await fetch(`/api/domains/ai-suggest?prompt=${encodeURIComponent(query.trim())}`);
                const data: DomainCheckResponse = await res.json();
                setResult(data);
            } else {
                // 1. Fetch exact match INSTANTLY
                const exactRes = await fetch(`/api/domains/check?domain=${encodeURIComponent(query.trim())}&exactOnly=true`);
                const exactData: DomainCheckResponse = await exactRes.json();
                setResult(exactData);
                
                // 2. Fetch suggestions silently in the background
                setIsLoadingMore(true);
                fetch(`/api/domains/check?domain=${encodeURIComponent(query.trim())}&page=1`)
                    .then(res => res.json())
                    .then((data: DomainCheckResponse) => {
                        setResult(prev => {
                            if (!prev || !prev.success) return data;
                            return {
                                ...prev,
                                suggestions: data.suggestions,
                                hasMore: data.hasMore,
                                page: data.page
                            };
                        });
                    })
                    .catch(err => console.error("Failed background suggestions:", err))
                    .finally(() => setIsLoadingMore(false));
            }
        } catch (error) {
            console.error("Domain search error:", error);
            setResult({ success: false, error: "Failed to check domain availability." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMore = async () => {
        if (!query.trim() || isLoadingMore || !result?.hasMore) return;
        
        setIsLoadingMore(true);
        const nextPage = page + 1;
        setPage(nextPage);

        try {
            const res = await fetch(`/api/domains/check?domain=${encodeURIComponent(query.trim())}&page=${nextPage}`);
            const data: DomainCheckResponse = await res.json();
            
            if (data.success && data.suggestions) {
                setResult(prev => {
                    if (!prev) return data;
                    return {
                        ...prev,
                        suggestions: [...(prev.suggestions || []), ...(data.suggestions || [])],
                        hasMore: data.hasMore,
                        page: data.page
                    };
                });
            }
        } catch (error) {
            console.error("Domain load more error:", error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    const getPriceForDomain = (domainName: string) => {
        let ext = "";
        const parts = domainName.split('.');
        if (parts.length > 1) {
            ext = parts.slice(1).join('.');
        }

        const tldData = tlds.find(t => t.extension === ext);
        if (tldData && tldData.register) {
            // usually register price is an object for different years. grab 1 year.
            const priceVal = Object.values(tldData.register)[0];
            return priceVal ? `${currency.prefix}${priceVal}` : "N/A";
        }
        return "N/A";
    };

    const handleBuy = (domainName: string) => {
        const searchUrl = `https://my.nodemania.com/cart.php?a=add&domain=register&query=${encodeURIComponent(domainName)}`;
        window.location.href = searchUrl;
    };

    return (
        <div className={cn("w-full max-w-4xl mx-auto flex flex-col items-center", className)}>
            <form onSubmit={handleSearch} className="relative group w-full mb-8 z-20 flex flex-col gap-4">
                {/* Mode Toggle */}
                <div className="flex justify-center w-full">
                    <button
                        type="button"
                        onClick={() => {
                            setIsAiMode(!isAiMode);
                            setResult(null);
                            setHasSearched(false);
                        }}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2 backdrop-blur-md",
                            isAiMode 
                                ? "bg-indigo-50/80 border-indigo-200 text-indigo-700 shadow-lg shadow-indigo-500/10" 
                                : "bg-white/80 border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
                        )}
                    >
                        {isAiMode ? (
                            <>
                                <Sparkles className="w-4 h-4" />
                                AI Matchmaker Mode Enabled
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4" />
                                Exact Domain Search
                            </>
                        )}
                    </button>
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative flex flex-col md:flex-row gap-3 p-3 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-primary/5 focus-within:border-primary/30 transition-all duration-500"
                >
                    <div className="relative flex-1">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center">
                                <Search className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={isAiMode ? "Describe your brand... (e.g. A fast cloud hosting startup)" : "Enter your perfect domain name..."}
                            className="w-full h-16 md:h-20 pl-24 pr-6 bg-transparent text-xl text-slate-900 placeholder:text-slate-400 focus:outline-none"
                            autoComplete="off"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading || !query}
                        className="h-16 md:h-20 px-12 rounded-[1.8rem] bg-primary hover:bg-primary/95 text-white text-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all shrink-0 disabled:opacity-80"
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin p-0" />
                        ) : (
                            <>
                                Search
                            </>
                        )}
                    </Button>
                </motion.div>
            </form>

            <AnimatePresence mode="wait">
                {hasSearched && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className="w-full"
                    >
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                                <p className="text-slate-500 animate-pulse font-medium">
                                    {isAiMode ? "Brainstorming and checking WHMCS..." : "Checking availability globally..."}
                                </p>
                            </div>
                        ) : result && result.success && result.target ? (
                            <div className="flex flex-col gap-8 w-full mt-2">
                                {/* Primary Target Result */}
                                <motion.div 
                                    className={cn(
                                        "p-6 md:p-8 rounded-3xl border-2 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all",
                                        result.target.status === 'available' 
                                            ? "bg-green-50/50 border-green-200 shadow-green-500/10"
                                            : "bg-red-50/50 border-red-100 shadow-red-500/10"
                                    )}
                                    layout
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={cn(
                                            "w-16 h-16 rounded-full flex items-center justify-center shrink-0",
                                            result.target.status === 'available' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                                        )}>
                                            {result.target.status === 'available' ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-2xl font-bold text-slate-800 break-all">{result.target.domain}</h3>
                                            <p className={cn("text-sm font-semibold mt-1", 
                                                result.target.status === 'available' ? "text-green-600" : "text-red-500"
                                            )}>
                                                {result.target.status === 'available' ? 'Available to register!' : 'This domain is taken'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {result.target.status === 'available' && (
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-sm text-slate-500 font-medium">Starting at</p>
                                                <p className="text-3xl font-black text-slate-900">{getPriceForDomain(result.target.domain)}<span className="text-base text-slate-500 font-medium">/yr</span></p>
                                            </div>
                                            <Button 
                                                onClick={() => handleBuy(result.target!.domain)}
                                                className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-lg active:scale-95 transition-all text-lg font-bold"
                                            >
                                                <ShoppingCart className="w-5 h-5 mr-2" /> Buy Now
                                            </Button>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Background Suggestions Loader */}
                                {(!result.suggestions || result.suggestions.length === 0) && isLoadingMore && (
                                    <div className="mt-8 flex flex-col items-center justify-center py-10 bg-white/50 border border-slate-200 rounded-3xl shadow-sm backdrop-blur-sm">
                                        <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
                                        <p className="text-slate-500 font-medium">Finding smart alternatives...</p>
                                    </div>
                                )}

                                {/* Suggestions Table */}
                                {result.suggestions && result.suggestions.length > 0 && (
                                    <div className="mt-8 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                            <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                                <Search className="w-5 h-5 text-primary" /> Recommended Alternatives
                                            </h4>
                                        </div>
                                        <div className="w-full overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-slate-200 bg-slate-50 text-sm uppercase tracking-wider text-slate-500">
                                                        <th className="py-4 px-6 font-semibold">Domain Name</th>
                                                        <th className="py-4 px-6 font-semibold">Status</th>
                                                        <th className="py-4 px-6 font-semibold">Price/yr</th>
                                                        <th className="py-4 px-6 font-semibold text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {result.suggestions.map((suggestion, idx) => (
                                                        <motion.tr 
                                                            key={suggestion.domain}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: (idx % 8) * 0.05 }}
                                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors group"
                                                        >
                                                            <td className="py-5 px-6">
                                                                <span className="font-bold text-slate-800 text-lg group-hover:text-primary transition-colors">{suggestion.domain}</span>
                                                            </td>
                                                            <td className="py-5 px-6">
                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-semibold">
                                                                    <CheckCircle2 className="w-4 h-4" /> Available
                                                                </span>
                                                            </td>
                                                            <td className="py-5 px-6">
                                                                <span className="font-black text-slate-900">{getPriceForDomain(suggestion.domain)}</span>
                                                            </td>
                                                            <td className="py-5 px-6 text-right">
                                                                <Button 
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handleBuy(suggestion.domain);
                                                                    }}
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="rounded-xl border-primary/20 hover:bg-primary/5 text-primary font-bold group-hover:border-primary/50"
                                                                >
                                                                    <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                                                                </Button>
                                                            </td>
                                                        </motion.tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                        {result.hasMore && (
                                            <div className="p-6 border-t border-slate-100 flex justify-center bg-slate-50/30">
                                                <Button 
                                                    onClick={handleLoadMore} 
                                                    disabled={isLoadingMore}
                                                    variant="outline" 
                                                    className="rounded-full px-8 border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400 font-semibold shadow-sm"
                                                >
                                                    {isLoadingMore ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                                    Load More Suggestions
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center p-8 bg-red-50 text-red-500 rounded-3xl border border-red-100 mt-2">
                                <XCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
                                <p className="font-semibold">{result?.error || "We couldn't check that domain right now."}</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
