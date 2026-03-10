'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { cn } from '@/lib/utils';

interface CurrencySelectorProps {
    className?: string;
    variant?: 'nav' | 'footer';
}

export function CurrencySelector({ className, variant = 'nav' }: CurrencySelectorProps) {
    const { currencies, selectedCurrency, setCurrency, isLoading } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const activeCurrency = currencies.find(c => c.code === selectedCurrency) || { code: selectedCurrency, prefix: '$' };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (isLoading && currencies.length === 0) {
        return <div className="w-20 h-8 animate-pulse bg-slate-100 rounded-lg" />;
    }

    return (
        <div className={cn("relative z-[60]", className)} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200",
                    variant === 'nav'
                        ? "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                )}
            >
                <Globe className="w-3.5 h-3.5 opacity-60" />
                <span>{activeCurrency.code}</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isOpen ? "rotate-180" : "")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className={cn(
                            "absolute right-0 mt-2 min-w-[140px] rounded-xl shadow-xl p-1.5 border backdrop-blur-md",
                            variant === 'nav'
                                ? "bg-white/95 border-slate-200"
                                : "bg-slate-900/95 border-white/10"
                        )}
                    >
                        <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                            {currencies.map((curr) => (
                                <button
                                    key={curr.code}
                                    onClick={() => {
                                        setCurrency(curr.code);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center justify-between gap-4 px-3 py-2 rounded-lg text-left text-sm transition-colors",
                                        selectedCurrency === curr.code
                                            ? (variant === 'nav' ? "bg-primary/5 text-primary font-bold" : "bg-primary/20 text-white font-bold")
                                            : (variant === 'nav' ? "text-slate-600 hover:bg-slate-50" : "text-white/60 hover:bg-white/5 hover:text-white")
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="opacity-60">{curr.prefix}</span>
                                        <span>{curr.code}</span>
                                    </div>
                                    {selectedCurrency === curr.code && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
