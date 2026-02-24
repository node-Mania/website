'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Search, UserCheck, Zap, RefreshCw } from 'lucide-react';

const SSL_FEATURES = [
    {
        title: 'Bulletproof Encryption',
        description: 'Establish a secure connection and encrypt all communication between your visitors and your server.',
        icon: Lock,
    },
    {
        title: 'Boost SEO Rankings',
        description: 'Google prioritizes secure websites with HTTPS. Stand out in search results and gain more traffic.',
        icon: Search,
    },
    {
        title: 'Inspire Customer Trust',
        description: 'The padlock icon and "Secure" label in browsers reassure visitors that their data is safe.',
        icon: UserCheck,
    },
    {
        title: 'Protect Sensitive Data',
        description: 'Crucial for e-commerce. Secure credit card details, passwords, and personal information.',
        icon: Shield,
    },
    {
        title: 'Lightning-Fast Issuance',
        description: 'Most certificates are issued within minutes, allowing you to secure your site instantly.',
        icon: Zap,
    },
    {
        title: 'Automated Management',
        description: 'We handle renewals and configuration automatically so your security never lapses.',
        icon: RefreshCw,
    }
];

export function SSLFeatures() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
                    >
                        Why Your Website <span className="text-primary-600">Needs SSL</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600"
                    >
                        SSL Certificates are fundamental to internet security. They establish an encrypted connection and allow data to be transmitted securely.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SSL_FEATURES.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group"
                        >
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-primary-50">
                                <feature.icon className="w-7 h-7 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
