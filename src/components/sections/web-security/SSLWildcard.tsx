'use client';

import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Mail, Server, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const WILDCARD_BENEFITS = [
    {
        title: 'Unlimited Subdomains',
        description: 'Secure your root domain and every subdomain you have now and in the future.',
        icon: Globe
    },
    {
        title: 'Email & Control Panel',
        description: 'Protect critical services like mail.yourdomain.com and cpanel.yourdomain.com.',
        icon: Mail
    },
    {
        title: 'Future-Proof',
        description: 'No need to buy new certificates as you add new services or subdomains.',
        icon: Lock
    },
    {
        title: 'Max Trust',
        description: 'End-to-end encryption for every corner of your website infrastructure.',
        icon: ShieldCheck
    }
];

export function SSLWildcard() {
    return (
        <section className="py-24 bg-slate-900 overflow-hidden relative">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Secure Your Entire Site with <span className="text-green-200">Wildcard SSL</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                A wildcard SSL certificate is the easiest and most cost-effective way to secure your main domain and an unlimited number of subdomains. Protect everything from email servers to dev environments with a single certificate.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 mb-10">
                                {WILDCARD_BENEFITS.map((benefit, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0">
                                            <benefit.icon className="w-5 h-5 text-green-200" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm mb-1">{benefit.title}</h4>
                                            <p className="text-slate-500 text-xs leading-relaxed">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="#pricing"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-slate-500 text-white rounded-xl font-bold transition-all"
                            >
                                Get Wildcard SSL
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                                        <Lock className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div className="font-mono text-sm text-slate-300">https://yourdomain.com</div>
                                    <div className="ml-auto flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/20" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-primary-500/30">
                                    <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                                        <Lock className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div className="font-mono text-sm text-slate-300">https://<span className="text-primary-400">mail</span>.yourdomain.com</div>
                                    <div className="ml-auto flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/20" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-primary-500/30">
                                    <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                                        <Lock className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div className="font-mono text-sm text-slate-300">https://<span className="text-primary-400">dev</span>.yourdomain.com</div>
                                    <div className="ml-auto flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/20" />
                                    </div>
                                </div>
                                <div className="text-left pt-4">
                                    <p className="text-slate-500 text-sm italic">...and unlimited more subdomains protected instantly!</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-teal-500 text-white p-6 rounded-2xl shadow-2xl rotate-3 hidden sm:block">
                            <p className="text-xs uppercase tracking-widest font-bold mb-1 opacity-80">Highly Recommended</p>
                            <p className="text-lg font-extrabold italic">"Secure Everything"</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
