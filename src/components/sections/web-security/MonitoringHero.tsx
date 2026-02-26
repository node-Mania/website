'use client';

import { motion } from 'framer-motion';
import { Activity, Bell, Search, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function MonitoringHero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b border-slate-200">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl opacity-30" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="lg:w-1/2 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-6">
                                <Activity className="w-3 h-3" />
                                <span>Real-Time Performance Tracking</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                                360° Monitoring: <br />
                                <span className="text-primary-600 italic">Because Uptime is Money!</span>
                            </h1>

                            <p className="text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">
                                Identify and resolve website problems before your users do. Safeguard your server and website health today with real-time alerts and comprehensive scans.
                            </p>

                            <ul className="grid sm:grid-cols-2 gap-3 mb-10">
                                {[
                                    'Uptime Monitoring (HTTP/S, TCP)',
                                    'Full Site Check & Health Scans',
                                    'Global Performance Metrics',
                                    'Multi-channel Instant Alerts',
                                    'SSL Certificate Expiry Alerts',
                                    'Custom Keywords & Error Detection'
                                ].map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + (index * 0.1) }}
                                        className="flex items-center gap-2 text-slate-700 text-sm font-medium"
                                    >
                                        <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <a
                                    href="#pricing"
                                    className="px-8 py-3.5 bg-primary hover:bg-primary-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/25 flex items-center gap-2 group w-full sm:w-auto justify-center"
                                >
                                    Get Started Free
                                    <Bell className="w-4 h-4" />
                                </a>
                                <Link
                                    href="#features"
                                    className="px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-xl font-bold transition-all w-full sm:w-auto text-center"
                                >
                                    Explore Features
                                </Link>
                            </div>

                            {/* <div className="mt-12 p-2 bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg mx-auto lg:mx-0 flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter your website URL (e.g. example.com)"
                                    className="flex-1 px-4 py-3 bg-transparent text-slate-900 focus:outline-none text-sm font-medium"
                                />
                                <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 text-nowrap">
                                    Check Now
                                    <Search className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="mt-3 text-xs text-slate-500 font-medium">✨ Get a fast and free assessment of your website health.</p> */}
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 w-full relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative aspect-video max-w-[600px] mx-auto flex items-center justify-center"
                        >
                            {/* Animated Background Blob */}
                            <div className="absolute inset-0 bg-slate-100 rounded-full blur-[100px] animate-pulse" />

                            <div className="relative z-10 w-full h-full bg-white/80 rounded-[2.5rem] border border-slate-200 backdrop-blur-xl shadow-2xl overflow-hidden p-6 flex flex-col gap-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-50" />

                                <div className="relative z-20 flex justify-between items-center bg-slate-100/50 p-3 rounded-2xl border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-2 bg-slate-200 rounded-full" />
                                        <div className="w-16 h-2 bg-slate-200 rounded-full" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
                                        <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest text-nowrap">Status: Operational</span>
                                    </div>
                                </div>

                                <div className="relative z-20 grid grid-cols-3 gap-4">
                                    {[
                                        { label: 'Latency', value: '42ms', color: 'blue' },
                                        { label: 'Uptime', value: '99.98%', color: 'green' },
                                        { label: 'Errors', value: '0', color: 'red' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/50 rounded-2xl border border-slate-100 p-4">
                                            <div className="text-[10px] text-slate-400 uppercase font-black tracking-tighter mb-1">{stat.label}</div>
                                            <div className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="relative z-20 flex-1 bg-white/30 rounded-2xl border border-slate-100 p-4 relative overflow-hidden flex flex-col justify-end">
                                    <div className="absolute inset-0 p-4">
                                        <svg viewBox="0 0 100 30" className="w-full h-full text-primary-500/20 stroke-current fill-none">
                                            <motion.path
                                                d="M0,15 L10,12 L20,18 L30,5 L40,25 L50,15 L60,10 L70,22 L80,18 L90,25 L100,10"
                                                strokeWidth="1.5"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-auto relative z-10 uppercase tracking-tighter">
                                        <span>12:00</span>
                                        <span>15:00</span>
                                        <span>18:00</span>
                                        <span>21:00</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Icons */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 p-4 bg-white border border-slate-100 rounded-2xl shadow-xl z-20"
                            >
                                <Bell className="w-6 h-6 text-primary-600" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-6 -left-6 p-4 bg-white border border-slate-100 rounded-2xl shadow-xl z-20"
                            >
                                <Search className="w-6 h-6 text-blue-600" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
