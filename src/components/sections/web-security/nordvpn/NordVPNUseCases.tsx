'use client';

import { motion } from 'framer-motion';
import { Wifi, Router, Users, Shield, Tv, MonitorOff } from 'lucide-react';

const USE_CASES = [
    {
        title: 'Wi-Fi in Public Places',
        description: 'Public Wi-Fi networks in Hotels, Airports, & Coffee Shops are the perfect targets for hackers due to often low security measures.',
        icon: Wifi,
    },
    {
        title: 'Shield Browsing From Third Parties',
        description: 'Prevent third parties such as Internet Service Providers from seeing and tracking your day-to-day online activity.',
        icon: Users,
    },
    {
        title: 'Access Social Media Anywhere',
        description: 'Avoid regional and political restrictions on platforms like Facebook, Twitter, WhatsApp and more.',
        icon: Shield,
    },
    {
        title: 'Secure Smart Home Gadgets',
        description: 'Smart home technologies and in particular unsecure IoT devices can create vulnerabilities for home networks.',
        icon: Router,
    },
    {
        title: 'Enjoy Online Entertainment',
        description: 'Certain broadcasts, shows or sporting events are often restricted based on location. With a VPN, watch home shows from abroad.',
        icon: Tv,
    },
    {
        title: 'Protect From Malicious Ads',
        description: 'Online ads clutter websites, slow downloading speeds, and might be sources of malware. Protect your browsing experience.',
        icon: MonitorOff,
    }
];

export function NordVPNUseCases() {
    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            Protect Your Everyday <span className="text-primary-600">Use Cases</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Even if you have nothing to hide, you probably don&apos;t like the idea of being watched and tracked. Overcome restrictions and maintain peace of mind.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {USE_CASES.map((uc, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <uc.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                    {uc.title}
                                </h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {uc.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
