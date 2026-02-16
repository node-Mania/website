'use client';

import { Check, X, HelpCircle } from 'lucide-react';

const comparisonData = [
    { feature: 'Storage Technology', us: 'NVMe SSD (5x Faster)', others: 'Standard HDD/SSD' },
    { feature: 'Web Server', us: 'LiteSpeed (Enterprise)', others: 'Apache / Nginx' },
    { feature: 'Daily Backups', us: 'Included Free', others: 'Paid Add-on' },
    { feature: 'SSL Certificates', us: 'Free Unlimited', others: 'Limited / Paid' },
    { feature: 'Uptime Guarantee', us: '99.99%', others: '99.9%' },
    { feature: 'Support Response', us: '< 15 Minutes', others: '24+ Hours' },
    { feature: 'Free Migration', us: 'Included', others: 'Paid Service' },
];

export function ComparisonSection() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm">Unbeatable Value</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
                        Why Choose nodeMania?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Don't settle for less. See how we stack up against standard hosting providers.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-[800px] bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-3 p-6 bg-slate-900 text-white items-center">
                            <div className="col-span-1 pl-4 text-lg font-semibold">Features</div>
                            <div className="col-span-1 text-center">
                                <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-cyan-400 bg-clip-text text-transparent mb-1">nodeMania</div>
                                <div className="text-xs text-slate-400 uppercase tracking-widest">Premium</div>
                            </div>
                            <div className="col-span-1 text-center opacity-100">
                                <div className="text-xl font-semibold">Other Hosts</div>
                                <div className="text-xs text-slate-400 uppercase tracking-widest">Standard</div>
                            </div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-slate-100">
                            {comparisonData.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`grid grid-cols-3 p-5 items-center transition-colors hover:bg-slate-50/80 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                                >
                                    <div className="col-span-1 pl-4 flex items-center gap-2 font-medium text-slate-700">
                                        {item.feature}
                                        <HelpCircle className="w-4 h-4 text-slate-300 cursor-help" />
                                    </div>

                                    <div className="col-span-1 flex justify-center items-center gap-2 text-center">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Check className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-slate-900">{item.us}</span>
                                    </div>

                                    <div className="col-span-1 flex justify-center items-center gap-2 text-center opacity-70">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                            {item.others.includes('Paid') || item.others.includes('Standard') ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                                        </div>
                                        <span className="font-medium text-slate-500">{item.others}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer / CTA */}
                        <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
                            <p className="text-slate-600 mb-4">Ready to experience the difference?</p>
                            <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 hover:scale-105 transition-all">
                                Get Started Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
