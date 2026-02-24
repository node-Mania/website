'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Zap, Server, Leaf, MousePointer2, Gauge, RefreshCw } from 'lucide-react';
import Image from 'next/image';

export function WordPressHostingDetails() {
    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
            <div className="container mx-auto px-6">

                {/* UK & US Data Centres */}
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">UK and US Data Centres</h2>
                        <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                            Our state-of-the-art data centres offer the latest in security technologies and are manned 24/7, ensuring your data and websites are secure and monitored at all times.
                        </p>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            We have a resilient national network and enterprise level cloud platform so you get the best possible hosting experience. Our email servers are kept separate from our web hosting servers, so there is no chance of either affecting performance.
                        </p>
                    </motion.div>
                    <motion.div
                        className="lg:w-1/2 relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center bg-slate-800">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-teal-500/10 to-transparent z-10 opacity-60" />
                            <Server className="w-24 h-24 text-primary-400 opacity-20 relative z-0" />
                            <div className="relative z-20 text-center px-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Enterprise Infrastructure</h3>
                                <p className="text-slate-400 text-sm">UK & US Sovereign Data Centres</p>
                            </div>
                        </div>
                        {/* Floating Indicator */}
                        <div className="absolute -bottom-6 -right-6 bg-primary p-6 rounded-2xl shadow-xl z-20 hidden md:block">
                            <Server className="w-8 h-8 text-white mb-2" />
                            <p className="text-xs font-bold uppercase tracking-widest text-white/70">Uptime</p>
                            <p className="text-2xl font-black">99.9%</p>
                        </div>
                    </motion.div>
                </div>

                {/* Hands-free WordPress */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Hands-free WordPress</h2>
                        <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                            We pre-install WordPress for you so you can get started right away. Simply purchase a WordPress package, choose your settings, and you’re all set.
                        </p>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            If you install any third party themes or plugins, you can update them yourself quickly and easily from your WordPress dashboard. We update the WordPress core for you automatically whenever updates are released, leaving you free to concentrate on your business.
                        </p>
                    </motion.div>
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center hover:bg-white/10 transition-colors">
                                <MousePointer2 className="w-10 h-10 text-primary-400 mb-4" />
                                <h4 className="font-bold mb-2">Pre-Installed</h4>
                                <p className="text-xs text-slate-500">Ready to go out of the box</p>
                            </div>
                            <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center hover:bg-white/10 transition-colors">
                                <RefreshCw className="w-10 h-10 text-teal-400 mb-4" />
                                <h4 className="font-bold mb-2">Auto-Updates</h4>
                                <p className="text-xs text-slate-500">Always on the latest version</p>
                            </div>
                            <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center hover:bg-white/10 transition-colors">
                                <ShieldCheck className="w-10 h-10 text-indigo-400 mb-4" />
                                <h4 className="font-bold mb-2">Hardened</h4>
                                <p className="text-xs text-slate-500">Security-first platform</p>
                            </div>
                            <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center hover:bg-white/10 transition-colors">
                                <Zap className="w-10 h-10 text-amber-400 mb-4" />
                                <h4 className="font-bold mb-2">Fast Setup</h4>
                                <p className="text-xs text-slate-500">Deploy in minutes</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Designed for Speed */}
                <div className="rounded-[40px] bg-gradient-to-br from-primary/10 via-slate-800 to-teal-500/10 border border-white/5 p-8 md:p-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <Gauge className="w-16 h-16 text-primary-400 mx-auto mb-8 animate-pulse" />
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-8">Designed for speed</h2>
                        <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                            Your WordPress installation includes the StackCache plugin, which was created by us to edge-cache your content. This makes sure that your web pages load at lightning speed.
                        </p>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                <h4 className="font-bold text-xl mb-3 text-primary-300">StackCache</h4>
                                <p className="text-sm text-slate-400">Edge-caching directly on our edge servers for near-instant loads.</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                <h4 className="font-bold text-xl mb-3 text-teal-300">Global CDN</h4>
                                <p className="text-sm text-slate-400">Caching your public content at data centres around the world.</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                <h4 className="font-bold text-xl mb-3 text-indigo-300">Acceleration</h4>
                                <p className="text-sm text-slate-400">Minifying code and optimising images automatically with one click.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
