'use client';

import { motion } from 'framer-motion';
import { Globe, HardDrive, LayoutTemplate, Cloud, Zap, ShieldAlert, Cpu, Database, Mail } from 'lucide-react';

const specialties = [
    {
        title: 'Shared Web Hosting',
        icon: Globe,
        desc: 'Cost-effective solutions for small businesses and personal projects.',
        color: 'blue',
        span: 'col-span-1 md:col-span-2',
        bg: 'bg-blue-50/50',
        iconColor: 'bg-blue-100 text-blue-600',
        barColor: 'bg-blue-600',
    },
    {
        title: 'Business Hosting',
        icon: Zap,
        desc: 'High-performance shared hosting with dedicated resources for demanding sites.',
        color: 'teal',
        span: 'col-span-1',
        bg: 'bg-teal-50/50',
        iconColor: 'bg-teal-100 text-teal-600',
        barColor: 'bg-teal-600',
    },
    {
        title: 'WordPress Hosting',
        icon: LayoutTemplate,
        desc: 'Optimized managed WordPress environments with auto-updates and security.',
        color: 'indigo',
        span: 'col-span-1',
        bg: 'bg-indigo-50/50',
        iconColor: 'bg-indigo-100 text-indigo-600',
        barColor: 'bg-indigo-600',
    },
    {
        title: 'Cloud VPS',
        icon: Cloud,
        desc: 'Scalable virtual servers with full root access and rapid deployment.',
        color: 'sky',
        span: 'col-span-1 md:col-span-2',
        bg: 'bg-sky-50/50',
        iconColor: 'bg-sky-100 text-sky-600',
        barColor: 'bg-sky-600',
    },
    {
        title: 'Managed Cloud Servers',
        icon: HardDrive,
        desc: 'Fully managed enterprise cloud servers for maximum performance.',
        color: 'slate',
        span: 'col-span-1 md:col-span-2',
        bg: 'bg-slate-50/50',
        iconColor: 'bg-slate-100 text-slate-700',
        barColor: 'bg-slate-600',
    },
    {
        title: 'Security & Productivity',
        icon: ShieldAlert,
        desc: 'Comprehensive SSL, VPN, and email solutions to protect your brand.',
        color: 'emerald',
        span: 'col-span-1',
        bg: 'bg-emerald-50/50',
        iconColor: 'bg-emerald-100 text-emerald-600',
        barColor: 'bg-emerald-600',
    },
];

export default function SpecialtiesGrid() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                        Our <span className="text-gradient">Core Specialties</span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        From simple websites to complex enterprise cloud architectures, we specialize in delivering high-availability solutions for every need.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
                    {specialties.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
                            className={`${item.span} bg-white relative p-8 rounded-3xl border border-slate-100 shadow-md overflow-hidden group hover:shadow-xl hover:border-primary/20 transition-all duration-500`}
                        >
                            <div className={`w-14 h-14 ${item.iconColor} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                <item.icon className="w-8 h-8" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </div>

                            <div className={`absolute top-0 right-0 p-8 opacity-5 blur-sm transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-10 transition-opacity duration-500`}>
                                <item.icon className="w-32 h-32" />
                            </div>

                            <div className={`absolute inset-0 bg-gradient-to-br from-current to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`} />

                            {/* Bottom Accent Bar */}
                            <div className={`absolute bottom-0 left-0 h-1 w-0 ${item.barColor} group-hover:w-full transition-all duration-500`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
