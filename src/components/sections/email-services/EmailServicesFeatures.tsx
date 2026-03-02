'use client';

import {
    motion
} from 'framer-motion';
import {
    ShieldAlert,
    Send,
    HardDrive,
    Search,
    ServerOff,
    Activity
} from 'lucide-react';

const features = [
    {
        title: 'Incoming Filtering',
        description: 'Eliminate spam and viruses before these threats reach your network at a nearly 100% accuracy rate. Out-of-the-box protection.',
        icon: ShieldAlert,
        color: 'text-blue-500',
        bg: 'bg-blue-100',
    },
    {
        title: 'Outgoing Filtering',
        description: 'Block spam and viruses from leaving your network and prevent your IP(s) from being blacklisted. Safeguard your infrastructure reputation.',
        icon: Send,
        color: 'text-teal-500',
        bg: 'bg-teal-100',
    },
    {
        title: 'Email Archiving',
        description: 'Preserve and protect all inbound and outbound email messages. Ideal for accelerated audit response and "eDiscovery" purposes.',
        icon: HardDrive,
        color: 'text-purple-500',
        bg: 'bg-purple-100',
    },
    {
        title: 'Email Continuity',
        description: 'If your email server is down, your email will be queued. Access, read, and reply via a web-interface until you are back online.',
        icon: ServerOff,
        color: 'text-orange-500',
        bg: 'bg-orange-100',
    },
    {
        title: 'Compromised Account Detection',
        description: 'Gain full reporting and tools to detect compromised accounts, allowing you to lock-down spamming users before lasting damage.',
        icon: Activity,
        color: 'text-red-500',
        bg: 'bg-red-100',
    },
    {
        title: 'Legal Compliance',
        description: 'Email exchanges hold judicial power. Maintain a secure, tamper-proof backup to remain legally compliant in strict industries.',
        icon: Search,
        color: 'text-indigo-500',
        bg: 'bg-indigo-100',
    }
];

export default function EmailServicesFeatures() {
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
                            Security <span className="text-blue-600">Features</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Professional protection securing your email flows against inbound and outbound threats.
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
