"use client";

import { useState } from "react";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface DomainSearchBarProps {
    variant?: "hero" | "minimal";
    className?: string;
    placeholder?: string;
}

export function DomainSearchBar({
    variant = "hero",
    className,
    placeholder = "Enter your perfect domain name..."
}: DomainSearchBarProps) {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        // Direct redirection to WHMCS cart as requested
        const domain = query.trim();
        const searchUrl = `https://my.nodemania.com/cart.php?a=add&domain=register&query=${encodeURIComponent(domain)}`;

        window.location.href = searchUrl;
    };

    if (variant === "minimal") {
        return (
            <form
                onSubmit={handleSearch}
                className={cn("flex gap-2 max-w-2xl mx-auto", className)}
            >
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={"Find your domain..."}
                        className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
                <Button
                    type="submit"

                    className="h-12 px-8 font-medium"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
                    Search
                </Button>
            </form>
        );
    }

    return (
        <div className={cn("w-full max-w-4xl mx-auto", className)}>
            <form
                onSubmit={handleSearch}
                className="relative group"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative flex flex-col md:flex-row gap-3 p-3 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-primary/5 focus-within:border-primary/30 transition-all duration-500"
                >
                    <div className="relative flex-1">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                                <Search className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={placeholder}
                            className="w-full h-16 md:h-20 pl-22 pr-6 bg-transparent text-xl  text-slate-900 placeholder:text-slate-400 focus:outline-none"
                        />
                    </div>
                    <Button
                        type="submit"
                        // disabled={isLoading || !query}
                        className="h-16 md:h-20 px-12 rounded-[1.8rem] bg-primary hover:bg-primary/95 text-white  text-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all group shrink-0 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin p-0" />
                        ) : (
                            <>
                                Search Domains
                                <div className="ml-3 p-1 rounded-lg bg-primary  transition-colors">
                                    <ArrowRight className="w-6 h-6 text-white bg-primary outline-primary" />
                                </div>
                            </>
                        )}
                    </Button>
                </motion.div>


            </form>
        </div>
    );
}
