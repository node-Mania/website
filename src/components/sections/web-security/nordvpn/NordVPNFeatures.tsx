'use client';

import { motion } from 'framer-motion';
import {
    Zap, Laptop, Globe2, Shield,
    FileWarning, Link2Off, Bug, EyeOff
} from 'lucide-react';

const NORDVPN_FEATURES = [
    {
        title: 'No Bandwidth Limits',
        description: 'There are no speed limits at our end. Enjoy your full-speed VPN connection without any throttling.',
        icon: Zap,
    },
    {
        title: 'Works on All Devices',
        description: 'Compatible with Windows, macOS, Linux, Android, and iOS. Secure up to 6 devices with a single account, including your router.',
        icon: Laptop,
    },
    {
        title: 'Global Server Network',
        description: 'Choose among 5500+ ultra-fast VPN servers across 59 countries. Enjoy a stable connection wherever you are.',
        icon: Globe2,
    },
    {
        title: 'Ultimate Security',
        description: 'Safeguard your connection with next-generation encryption, so you can shop and bank without worries, even on public Wi-Fi.',
        icon: Shield,
    },
    {
        title: 'No-Logs Policy',
        description: "It's nobody's business what you do online. We don't track, collect, or share your private data.",
        icon: EyeOff,
    },
    {
        title: 'Extra Security Features',
        description: 'Includes an automatic Kill Switch, Double VPN for extreme privacy, and full protection from DNS leaks.',
        icon: Link2Off,
    },
    {
        title: 'Malware Protection',
        description: 'Get warnings about unsafe sites and automatically scan all downloaded files and attachments to prevent device damage.',
        icon: Bug,
    },
    {
        title: 'Tracker & Ad Blocker',
        description: 'Block annoying ads, pop-ups, and banners. Stop third-party websites from tracking your online activity.',
        icon: FileWarning,
    }
];

export function NordVPNFeatures() {
    return (
        <section id="features" className="py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            More Than Just <span className="text-primary-600">A VPN</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-10">
                            NordVPN&apos;s Threat Protection feature is a game changer that offers even more security benefits and better protection with a single extra click.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {NORDVPN_FEATURES.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary-300 hover:shadow-xl transition-all group shadow-sm flex flex-col"
                        >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-teal-50 border border-teal-100">
                                <feature.icon className="w-6 h-6 text-teal-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm flex-grow">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
