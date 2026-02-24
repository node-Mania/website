'use client';

import { motion } from 'framer-motion';
import { Activity, Globe, Search, ShieldCheck, Zap, BarChart3, Clock, Layout, MousePointer2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        title: "Uptime Monitoring",
        description: "Check responsiveness of HTTP/S for web traffic, TCP for network connectivity, and ICMP (ping) for availability. Get instant alerts when your website goes offline.",
        icon: Activity,
        className: "md:col-span-2 md:row-span-2 bg-blue-50 border-blue-100",
        iconClassName: "text-blue-600 bg-blue-100"
    },
    {
        title: "Full Site Check",
        description: "Find broken links, missing files, and JavaScript errors before they affect your SEO and user experience.",
        icon: Search,
        className: "md:col-span-2 bg-slate-50 border-slate-200",
        iconClassName: "text-slate-600 bg-slate-100"
    },
    {
        title: "Global Reach",
        description: "Monitor performance from 26 global locations to ensure a fast experience for everyone.",
        icon: Globe,
        className: "bg-teal-50 border-teal-100",
        iconClassName: "text-teal-600 bg-teal-100"
    },
    {
        title: "SSL Security",
        description: "Never miss an expiration with automated SSL/TLS certificate monitoring and alerts.",
        icon: ShieldCheck,
        className: "bg-primary-50 border-primary-100",
        iconClassName: "text-primary-600 bg-primary-100"
    },
    {
        title: "Keyword Tracking",
        description: "Monitor for specific words or phrases like 'error' or 'out of stock' on your pages.",
        icon: Layout,
        className: "md:col-span-2 bg-amber-50 border-amber-100",
        iconClassName: "text-amber-600 bg-amber-100"
    },
    {
        title: "Advanced Metrics",
        description: "Track TTFB, DNS lookup, and connection times with historical reporting.",
        icon: BarChart3,
        className: "md:col-span-2 bg-indigo-50 border-indigo-100",
        iconClassName: "text-indigo-600 bg-indigo-100"
    }
];

export function MonitoringFeatures() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Complete Visibility into <span className="text-primary-600">Site Health</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Our all-in-one monitoring solution gives you the tools to provide your customers with peace of mind and reliable performance.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "relative overflow-hidden rounded-[2rem] p-8 border transition-all hover:shadow-xl hover:-translate-y-1 group",
                                feature.className
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500",
                                feature.iconClassName
                            )}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate-500 text-sm font-medium flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4 text-primary-500" />
                        Built for performance. Scale with 360 Monitoring.
                    </p>
                </div>
            </div>
        </section>
    );
}
