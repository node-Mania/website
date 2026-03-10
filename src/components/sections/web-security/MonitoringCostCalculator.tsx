'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, AlertTriangle, ShieldCheck, Globe } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export function MonitoringCostCalculator() {
    const { currencies, selectedCurrency } = useCurrency();
    const activeCurrency = currencies.find(c => c.code === selectedCurrency);
    const prefix = activeCurrency?.prefix ?? '$';

    const defaultRevenue = selectedCurrency === 'USD' ? 1000000 : (selectedCurrency === 'AED' ? 3670000 : 800000);
    const [revenue, setRevenue] = useState<number>(defaultRevenue);
    const [downtimeHours, setDowntimeHours] = useState<number>(24); // Default 24h per year

    const estimatedLoss = (revenue / 8760) * downtimeHours;

    return (
        <section className="py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-slate-100">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                                What is <span className="text-red-600">Downtime</span> Costing You?
                            </h2>
                            <p className="text-slate-600 mb-10 leading-relaxed">
                                Use our calculator to estimate the potential revenue loss from unmonitored downtime. Every minute counts when your business is offline.
                            </p>

                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Annual Revenue ({prefix})</label>
                                        <span className="text-primary-600 font-mono font-bold">{prefix}{revenue.toLocaleString()}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="10000"
                                        max="10000000"
                                        step="10000"
                                        value={revenue}
                                        onChange={(e) => setRevenue(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Estimated Yearly Downtime (Hours)</label>
                                        <span className="text-red-600 font-mono font-bold">{downtimeHours} Hours</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="168"
                                        step="1"
                                        value={downtimeHours}
                                        onChange={(e) => setDowntimeHours(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600"
                                    />
                                    <div className="mt-2 flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                        <span>1 Hour (99.99%)</span>
                                        <span>1 Week (98.1%)</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 bg-slate-900 text-white flex flex-col justify-center relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/10 blur-[100px] rounded-full" />

                        <div className="relative z-10 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-8">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Potential Annual Loss</span>
                            </div>

                            <motion.div
                                key={estimatedLoss}
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="mb-10"
                            >
                                <div className="text-5xl md:text-7xl font-black text-white tracking-tighter flex items-center justify-center lg:justify-start">
                                    <span className="text-slate-500 mr-2 text-3xl">{prefix}</span>
                                    {Math.round(estimatedLoss).toLocaleString()}
                                </div>
                                <p className="text-slate-400 mt-4 text-lg">Revenue lost per year due to downtime.</p>
                            </motion.div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-600/20">
                                        <ShieldCheck className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1 tracking-tight">Protect Your Bottom Line</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">360 Monitoring pays for itself by reducing downtime by up to 90% through proactive health checks.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center lg:justify-start">
                                <a href="#pricing" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20 inline-flex items-center gap-2">
                                    Secure My Website Now
                                    <TrendingDown className="w-4 h-4 rotate-180" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
