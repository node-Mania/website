'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WhmcsCurrency } from '@/lib/types/whmcs.types';

interface CurrencyContextType {
    currencies: WhmcsCurrency[];
    selectedCurrency: string;
    setCurrency: (code: string) => void;
    selectedCurrencyId: number;
    setCurrencyId: (id: number) => void;
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
    const [selectedCurrencyId, setSelectedCurrencyId] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(initialCurrencies.length === 0);

    // Load from localStorage on mount
    useEffect(() => {
        let currencyParam = '';
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            currencyParam = params.get('currency')?.toUpperCase() || '';
        }

        const stored_currency = localStorage.getItem('node_mania_currency');
        const stored_currency_id = localStorage.getItem('node_mania_currency_id');

        if (currencyParam && initialCurrencies.some(c => c.code.toUpperCase() === currencyParam)) {
            const currObj = initialCurrencies.find(c => c.code.toUpperCase() === currencyParam);
            if (currObj) {
                setSelectedCurrency(currObj.code);
                setSelectedCurrencyId(currObj.id);
                localStorage.setItem('node_mania_currency', currObj.code);
                localStorage.setItem('node_mania_currency_id', currObj.id.toString());
            }
        } else if (stored_currency) {
            setSelectedCurrency(stored_currency);
            if (stored_currency_id) {
                setSelectedCurrencyId(parseInt(stored_currency_id));
            }
        } else if (initialCurrencies.length > 0) {
            // Need geolocation
            const fetchGeoCurrency = async () => {
                try {
                    const req = await fetch('https://ipapi.co/currency/');
                    if (req.ok) {
                        const geoCurrency = (await req.text()).trim().toUpperCase();
                        const currObj = initialCurrencies.find(c => c.code.toUpperCase() === geoCurrency);
                        if (currObj) {
                            setSelectedCurrency(currObj.code);
                            setSelectedCurrencyId(currObj.id);
                            localStorage.setItem('node_mania_currency', currObj.code);
                            localStorage.setItem('node_mania_currency_id', currObj.id.toString());
                            return;
                        }
                    }
                } catch (e) {
                    console.error('Failed to fetch geo currency:', e);
                }
                
                // Fallback to USD or default
                const defaultCurr = initialCurrencies.find(c => c.code === 'USD') || initialCurrencies.find(c => c.default) || initialCurrencies[0];
                if (defaultCurr) {
                    setSelectedCurrency(defaultCurr.code);
                    setSelectedCurrencyId(defaultCurr.id);
                    localStorage.setItem('node_mania_currency', defaultCurr.code);
                    localStorage.setItem('node_mania_currency_id', defaultCurr.id.toString());
                }
            };
            fetchGeoCurrency();
        }
    }, [initialCurrencies]);

    // Fetch currencies if not provided (fallback)
    useEffect(() => {
        if (currencies.length === 0) {
            const fetchCurrencies = async () => {
                try {
                    const response = await fetch('/api/whmcs/currencies');
                    const data = await response.json();
                    if (data.success && data.currencies.length > 0) {
                        setCurrencies(data.currencies);
                        
                        let currencyParam = '';
                        if (typeof window !== 'undefined') {
                            const params = new URLSearchParams(window.location.search);
                            currencyParam = params.get('currency')?.toUpperCase() || '';
                        }
                        
                        const urlCurr = currencyParam ? data.currencies.find((c: WhmcsCurrency) => c.code.toUpperCase() === currencyParam) : null;
                        
                        if (urlCurr) {
                            setSelectedCurrency(urlCurr.code);
                            setSelectedCurrencyId(urlCurr.id);
                            localStorage.setItem('node_mania_currency', urlCurr.code);
                            localStorage.setItem('node_mania_currency_id', urlCurr.id.toString());
                        } else if (!localStorage.getItem('node_mania_currency')) {
                            // Try Geo
                            try {
                                const req = await fetch('https://ipapi.co/currency/');
                                if (req.ok) {
                                    const geoCurrency = (await req.text()).trim().toUpperCase();
                                    const geoCurrObj = data.currencies.find((c: WhmcsCurrency) => c.code.toUpperCase() === geoCurrency);
                                    if (geoCurrObj) {
                                        setSelectedCurrency(geoCurrObj.code);
                                        setSelectedCurrencyId(geoCurrObj.id);
                                        localStorage.setItem('node_mania_currency', geoCurrObj.code);
                                        localStorage.setItem('node_mania_currency_id', geoCurrObj.id.toString());
                                        return;
                                    }
                                }
                            } catch (e) {
                                console.error('Failed geo currency:', e);
                            }
                            
                            // Fallback USD -> default -> first
                            const defaultCurr = data.currencies.find((c: WhmcsCurrency) => c.code === 'USD') || data.currencies.find((c: WhmcsCurrency) => c.default) || data.currencies[0];
                            if (defaultCurr) {
                                setSelectedCurrency(defaultCurr.code);
                                setSelectedCurrencyId(defaultCurr.id);
                                localStorage.setItem('node_mania_currency', defaultCurr.code);
                                localStorage.setItem('node_mania_currency_id', defaultCurr.id.toString());
                            }
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

    const setCurrencyId = (id: number) => {
        setSelectedCurrencyId(id);
        localStorage.setItem('node_mania_currency_id', id.toString());
    };

    return (
        <CurrencyContext.Provider value={{ currencies, selectedCurrency, setCurrency, selectedCurrencyId, setCurrencyId, isLoading }}>
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
