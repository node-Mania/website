'use client';

import { motion } from 'framer-motion';
import { Mail, Globe, Shield, RefreshCw, Layers, Calendar } from 'lucide-react';

const features = [
    {
        title: 'Professional Webmail',
        description: 'A powerful, intuitive webmail interface that provides easy access to all your emails, contacts, and tasks.',
        icon: Mail,
        color: 'text-blue-500',
        bg: 'bg-blue-100',
    },
    {
        title: 'Sync Across Devices',
        description: 'Native setup on any client (Outlook, Apple Mail) and mobile synchronization so your data goes wherever you do.',
        icon: RefreshCw,
        color: 'text-teal-500',
        bg: 'bg-teal-100',
    },
    {
        title: 'Premium Anti-Spam',
        description: 'Our AI-driven anti-spam and anti-virus filter protects your inbox from malicious threats before they ever arrive.',
        icon: Shield,
        color: 'text-purple-500',
        bg: 'bg-purple-100',
    },
    {
        title: 'Advanced Calendaring',
        description: 'Share calendars, schedule team meetings, and organize resources natively within the OX App Suite interface.',
        icon: Calendar,
        color: 'text-orange-500',
        bg: 'bg-orange-100',
    },
    {
        title: 'Custom Domains',
        description: 'Look professional by matching your email address with your domain name (you@yourcompany.com).',
        icon: Globe,
        color: 'text-indigo-500',
        bg: 'bg-indigo-100',
    },
    {
        title: 'Scalable Mailboxes',
        description: 'Start with 10GB or expand to massive 50GB storage limits without skipping a beat.',
        icon: Layers,
        color: 'text-blue-500',
        bg: 'bg-blue-100',
    }
];

export function OXAppSuiteFeatures() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            Everything You Need to <span className="text-blue-600">Connect</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            OX App Suite delivers far more than just standard email—it’s a fully-integrated communication hub.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.bg}`}>
                                    <Icon className={`w-7 h-7 ${feature.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
