'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Zap } from 'lucide-react';

const FEATURES = [
    {
        title: "Autoscaling Cloud Hosting",
        description: "Our hosting dynamically adjusts resources in real-time, ensuring your websites stay lightning-fast even during traffic surges. No LVE limits, no artificial resource caps.",
        icon: CloudScaleIcon,
        color: "bg-blue-500"
    },
    {
        title: "State-of-the-Art Security",
        description: "Real-time DDoS protection, intelligent WAF, and automated malware scanning shield your site. Free SSL certificates ensure data integrity with end-to-end encryption.",
        icon: SecurityIcon,
        color: "bg-teal-500"
    },
    {
        title: "Global Content Delivery Network",
        description: "Free CDN with edge caching ensures near-instant page loads worldwide. Built-in image and code optimization means you don't need bloated plugins.",
        icon: GlobeIcon,
        color: "bg-indigo-500"
    },
    {
        title: "Built For Business",
        description: "PCI compliant platform meeting strict security standards for ecommerce. Perfect for handling sensitive payment data and critical business operations.",
        icon: BusinessIcon,
        color: "bg-purple-500"
    }
];

function CloudScaleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M12 4L8 8M12 4L16 8M4 12H20M4 12L8 8M4 12L8 16M20 12L16 8M20 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function SecurityIcon({ className }: { className?: string }) {
    return <ShieldCheck className={className} />;
}

function GlobeIcon({ className }: { className?: string }) {
    return <Globe className={className} />;
}

function BusinessIcon({ className }: { className?: string }) {
    return <Zap className={className} />;
}

export function WebHostingFeatures() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary-600 font-bold tracking-wider text-sm uppercase">Why Choose Us</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-6">
                        Performance Without Compromise
                    </h2>
                    <p className="text-slate-500 text-lg">
                        We've built a platform that handles the technical heavy lifting, so you can focus on building your business.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {FEATURES.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${feature.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <div className={`text-${feature.color.replace('bg-', '')} text-opacity-100`}>
                                    <feature.icon className={`w-7 h-7 text-white`} />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
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
