'use client';

import { motion } from 'framer-motion';
import {
    ShieldCheck,
    Lock,
    Globe,
    FileCheck,
    Layers,
    UserCheck,
    Shield,
    Zap,
    CheckCircle2,
    Server,
    ZapIcon,
    Fingerprint,
    AlertTriangle,
    Smartphone,
    MousePointer2,
    ShieldAlert,
    Settings2
} from 'lucide-react';
import Image from 'next/image';

const HIGHLIGHTS = [
    { title: "Daily Malware Scanning", icon: ShieldCheck, description: "Automated daily scans to detect and remove threats before they impact your site." },
    { title: "FTP Security Lock", icon: Lock, description: "Lock down FTP access to specific IP addresses to prevent unauthorized file transfers." },
    { title: "Block Visitors by IP", icon: Globe, description: "Easily block malicious IPs or entire countries from accessing your web applications." },
    { title: "File Permissions Checker", icon: FileCheck, description: "Automatically audit and correct file permissions to maintain a secure environment." },
    { title: "Integrated WAF", icon: Layers, description: "A robust Web Application Firewall filters harmful traffic before it reaches your site." },
    { title: "Two-Factor Auth", icon: UserCheck, description: "Secure your control panel and FTP with industry-standard 2FA protection." },
    { title: "Hotlink Protection", icon: MousePointer2, description: "Prevent other sites from stealing your bandwidth by embedding your hosted assets." },
    { title: "Brute-Force Protection", icon: ShieldAlert, description: "Intelligent filtering block multiple failed login attempts to keep your accounts safe." },
];

const STACKCP_FEATURES = [
    "Free Wildcard SSL",
    "Brute-force login protection",
    "IP address block manager",
    "FTP lock",
    "File permissions checker",
    "Website password manager",
    "Website application firewall"
];

export function HostingSecurity() {
    return (
        <section id="security" className="py-24 bg-white overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest mb-4 inline-block border border-primary-100"
                    >
                        Enterprise-Grade Security
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6"
                    >
                        Total Peace of Mind <br />
                        <span className="text-primary-600">Built-in by Default</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600 leading-relaxed"
                    >
                        Guaranteed peace of mind with built-in security features and DDoS protection.
                        Protection against volumetric Layer 3/4 and advanced Layer 7 attacks is fully integrated into the nodeMaina platform.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Enterprise DDoS Protection Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-12 lg:col-span-7 bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm overflow-hidden group"
                    >
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="flex-1">
                                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-lg shadow-primary-600/20 group-hover:scale-110 transition-all duration-500">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-primary-700 transition-colors">Filtering Evil Traffic</h3>
                                <p className="text-slate-600 text-base md:text-lg mb-6 leading-relaxed">
                                    Every website hosted on our platform receives this totally free of charge, automatically filtering evil traffic while ensuring legitimate traffic is not compromised.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold shadow-sm">Layer 3/4 Filtering</span>
                                    <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold shadow-sm">Layer 7 Protection</span>
                                    <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold shadow-sm">Zero Latency Mitigation</span>
                                </div>
                            </div>
                            <div className="relative w-full md:w-64 aspect-square flex items-center justify-center">
                                <div className="absolute inset-0 bg-primary-200 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
                                <div className="relative z-10 p-8 bg-white rounded-3xl border border-slate-100 shadow-xl group-hover:rotate-6 transition-transform duration-500">
                                    <ShieldCheck className="w-24 h-24 text-primary-600" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CMS Protection Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-12 lg:col-span-5 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 -m-12 w-64 h-64 bg-primary-600/20 rounded-full blur-[80px]" />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
                                <ZapIcon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Zero-Day Attacks Protection</h3>
                            <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
                                Optimized CMS specific rules protect against zero-day attacks against WordPress, Joomla and Drupal.
                            </p>

                            <div className="mt-auto grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                                <div className="space-y-2">
                                    <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center font-bold text-xs">WP</div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">WordPress</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center font-bold text-xs">JM</div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Joomla</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center font-bold text-xs">DP</div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Drupal</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Highlights Grid */}
                    <div className="md:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {HIGHLIGHTS.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-600/5 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-5 group-hover:bg-primary-50 transition-colors">
                                    <item.icon className="w-6 h-6 text-slate-600 group-hover:text-primary-600 transition-colors" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2 leading-snug">{item.title}</h4>
                                <p className="text-slate-500 text-xs leading-relaxed group-hover:text-slate-600">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* StackCP Management Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-12 lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden group"
                    >
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-50 rounded-full blur-[100px] opacity-60 group-hover:bg-primary-50 transition-colors duration-700" />

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">Plus, offer your customers access to manage these features in StackCP</h3>
                            <p className="text-slate-600 mb-10 max-w-2xl text-lg">
                                Give your clients the power to manage their own security settings through our intuitive white-label control panel.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                {STACKCP_FEATURES.map((feat, i) => (
                                    <div key={i} className="flex items-center gap-4 group/item">
                                        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center group-hover/item:bg-primary-100 transition-colors">
                                            <CheckCircle2 className="w-4 h-4 text-teal-600 group-hover/item:text-primary-600" />
                                        </div>
                                        <span className="text-slate-700 font-medium">{feat}</span>
                                    </div>
                                ))}
                                <div className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                                        <Settings2 className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <span className="text-slate-500 text-sm font-medium italic">...and more!</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Compliance Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-12 lg:col-span-4 bg-teal-600 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col justify-between group"
                    >
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 group-hover:scale-110 transition-transform duration-500">
                                <Fingerprint className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">ISO 27001 & PCI Compliant</h3>
                            <p className="text-teal-50/80 leading-relaxed mb-10 text-lg">
                                Our hosting is fully PCI (payment card industry) compliant, and we use ISO 27001-approved data centers.
                            </p>
                        </div>
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            <div className="px-6 py-4 bg-white/10 rounded-2xl text-center font-black text-xs uppercase tracking-[0.2em] border border-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all">
                                ISO 27001
                            </div>
                            <div className="px-6 py-4 bg-white/10 rounded-2xl text-center font-black text-xs uppercase tracking-[0.2em] border border-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all">
                                PCI COMPLIANT
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
