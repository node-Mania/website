'use client';

import { motion } from 'framer-motion';
import { User, Building2, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const SSL_TYPES = [
    {
        id: 'dv',
        name: 'Domain Validation (DV)',
        level: 'Standard Security',
        description: 'The quickest and most common type of SSL. Verifies owner and control of the domain name only.',
        longDesc: 'Think of DV like getting a library card—no confirmation of who you really are, minimal requirements to obtain and issued very quickly.',
        idealFor: 'Personal websites, blogs, and non-critical pages.',
        features: ['Issued in minutes', 'Https & Padlock icon', '99% Browser Compatibility'],
        icon: User,
        color: 'blue'
    },
    {
        id: 'ov',
        name: 'Organization Validation (OV)',
        level: 'High Security',
        description: 'Enhanced validation including authenticating the identity of the applicant or business.',
        longDesc: 'Think of OV like getting a driver’s license—more hoops to jump through but more trusted as a form of identification.',
        idealFor: 'Business websites, login pages, and corporate sites.',
        features: ['Identity Authenticated', 'Issued within 1-3 days', 'Dynamic Site Seal'],
        icon: Building2,
        color: 'teal'
    },
    {
        id: 'ev',
        name: 'Extended Validation (EV)',
        level: 'Maximum Security',
        description: 'The highest level of authentication available, representing the ultimate trust for visitors.',
        longDesc: 'Think of EV like getting a passport—much more stringent verification. Internationally recognized as the most trusted way to verify identity.',
        idealFor: 'E-commerce, Online Banking, and sensitive platforms.',
        features: ['Highest Trust Indicator', 'Strict Identity Vetting', 'Max Warranty Protection'],
        icon: ShieldCheck,
        color: 'green'
    }
];

export function SSLTypes() {
    return (
        <section className="py-24 bg-slate-50 border-y border-slate-200">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
                    >
                        Choose the Right <span className="text-primary-600">Level of Security</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600"
                    >
                        Not all SSL Certificates are created equal. Use our guide below to decide which type of certificate is right for your needs.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {SSL_TYPES.map((type, index) => (
                        <motion.div
                            key={type.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col h-full bg-white border border-slate-200 rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className="p-8 pb-0">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="p-3 rounded-2xl bg-primary-50">
                                        <type.icon className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase">
                                        {type.level}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{type.name}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                                    "{type.longDesc}"
                                </p>
                            </div>

                            <div className="px-8 flex-grow">
                                <div className="space-y-4 mb-8">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Ideal For</p>
                                        <p className="text-slate-700 text-sm font-medium">{type.idealFor}</p>
                                    </div>
                                    <ul className="space-y-2">
                                        {type.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="p-8 pt-0 mt-auto">
                                <Link
                                    href="#pricing"
                                    className="w-full py-4 px-6 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2 group-hover:bg-primary-600 transition-colors"
                                >
                                    Browse {type.id.toUpperCase()} Certificates
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
