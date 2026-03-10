'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WhmcsCurrency } from '@/lib/types/whmcs.types';

interface CurrencyContextType {
    currencies: WhmcsCurrency[];
    selectedCurrency: string;
    setCurrency: (code: string) => void;
    isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({
    children,
    initialCurrencies = []
}: {
    children: ReactNode;
    initialCurrencies?: WhmcsCurrency[];
}) {
    const [currencies, setCurrencies] = useState<WhmcsCurrency[]>(initialCurrencies);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
    const [isLoading, setIsLoading] = useState(initialCurrencies.length === 0);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('node_mania_currency');
        if (stored) {
            setSelectedCurrency(stored);
        } else if (initialCurrencies.length > 0) {
            const defaultCurr = initialCurrencies.find(c => c.default) || initialCurrencies[0];
            if (defaultCurr) {
                setSelectedCurrency(defaultCurr.code);
            }
        }
    }, [initialCurrencies]);

    // Fetch currencies if not provided (fallback)
    useEffect(() => {
        if (currencies.length === 0) {
            const fetchCurrencies = async () => {
                try {
                    const response = await fetch('/api/whmcs/currencies');
                    const data = await response.json();
                    if (data.success) {
                        setCurrencies(data.currencies);
                        if (!localStorage.getItem('node_mania_currency')) {
                            const defaultCurr = data.currencies.find((c: WhmcsCurrency) => c.default) || data.currencies[0];
                            if (defaultCurr) setSelectedCurrency(defaultCurr.code);
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch currencies in context:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCurrencies();
        }
    }, [currencies.length]);

    const setCurrency = (code: string) => {
        setSelectedCurrency(code);
        localStorage.setItem('node_mania_currency', code);
    };

    return (
        <CurrencyContext.Provider value={{ currencies, selectedCurrency, setCurrency, isLoading }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
