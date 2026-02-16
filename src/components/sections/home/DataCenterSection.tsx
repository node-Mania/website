'use client';

import { motion } from 'framer-motion';
import { MapPin, Globe, Server, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const locations = [
    { region: 'North America', cities: ['New York', 'Los Angeles', 'Chicago', 'Dallas'] },
    { region: 'Europe', cities: ['London', 'Frankfurt', 'Amsterdam', 'Paris'] },
    { region: 'Asia Pacific', cities: ['Singapore', 'Tokyo', 'Sydney', 'Mumbai'] },
];

export function DataCenterSection() {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Map Effect (CSS Dots) */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="bg-gradient-to-r from-green-500 to-cyan-400 bg-clip-text text-transparent font-bold tracking-widest uppercase text-sm">Global Infrastructure</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-white max-w-3xl mx-auto">
                        Ultra-Low Latency, <span className="bg-gradient-to-r from-green-500 to-cyan-400 bg-clip-text text-transparent">Everywhere.</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Our premium network spans 20+ data centers across 4 continents, ensuring your content is always close to your audience.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Locations List */}
                    <div className="space-y-8">
                        {locations.map((loc, idx) => (
                            <motion.div
                                key={loc.region}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700 hover:border-primary/50 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Globe className="w-6 h-6 text-primary" />
                                    <h3 className="text-xl font-bold">{loc.region}</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {loc.cities.map((city) => (
                                        <div key={city} className="flex items-center gap-2 text-slate-300">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
                                            {city}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Interactive Visual / Map Placeholder */}
                    <div className="relative aspect-square md:aspect-video lg:aspect-square bg-slate-800/30 rounded-3xl border border-slate-700/50 p-8 flex items-center justify-center overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        {/* Central Animated Globe/Server */}
                        <div className="relative z-10 text-center">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-primary blur-[100px] opacity-20 animate-pulse"></div>
                                <Globe className="w-64 h-64 text-slate-700 opacity-20 animate-[spin_60s_linear_infinite]" strokeWidth={0.5} />
                                <Server className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-primary drop-shadow-[0_0_30px_rgba(37,99,235,0.5)]" />
                            </div>
                            <p className="mt-8 text-xl font-semibold text-slate-300">
                                <span className="text-white font-bold">99.99%</span> Network Uptime
                            </p>
                        </div>

                        {/* Floating Stats */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute top-10 right-10 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl"
                        >
                            <div className="text-xs text-slate-400 uppercase font-bold mb-1">Total Capacity</div>
                            <div className="text-2xl font-bold text-white">10 Tbps+</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-10 left-10 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl"
                        >
                            <div className="text-xs text-slate-400 uppercase font-bold mb-1">DDoS Protection</div>
                            <div className="flex items-center gap-2 text-green-400 font-bold">
                                <CheckCircle2 className="w-5 h-5" />
                                Active
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
