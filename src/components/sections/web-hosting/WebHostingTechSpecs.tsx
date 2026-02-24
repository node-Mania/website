'use client';

import { motion } from 'framer-motion';
import { Database, Download, Leaf, Headphones, Settings, Gauge, RefreshCw, Cpu } from 'lucide-react';

const TECH_SPECS = [
    {
        title: "High-Availability Infrastructure",
        description: "Eliminates single points of failure with automatic failover and globally distributed redundant infrastructure.",
        icon: Database,
    },
    {
        title: "80+ One-Click Installs",
        description: "Deploy WordPress, Joomla!, Magento, and more in seconds. Get your site online without the hassle.",
        icon: Download,
    },
    {
        title: "Sustainability Built In",
        description: "Powered by 100% renewable energy with exceptionally low PUE. Host responsibly with minimal planet impact.",
        icon: Leaf,
    },
    {
        title: "Expert Hosting Support",
        description: "No AI bots, no tiered support. Just seasoned developers ready to help with complex issues 24/7.",
        icon: Headphones,
    },
    {
        title: "Powerful Control Panel",
        description: "Manage everything via StackCP. From DNS to emails and databases, control your hosting effortlessly.",
        icon: Settings,
    },
    {
        title: "Optimised for Speed",
        description: "Autoscaling PHP workers, 100% SSD storage, and server-side optimizations for unlimited concurrent visitors.",
        icon: Gauge,
    },
    {
        title: "Effortless Migrations",
        description: "Automated Migration Centre transfers files, databases, and emails with zero data loss or downtime.",
        icon: RefreshCw,
    },
    {
        title: "High-Frequency Hosting",
        description: "Leverage high-frequency CPUs for quicker data processing and superior responsiveness.",
        icon: Cpu,
    }
];

export function WebHostingTechSpecs() {
    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">

            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
                        Technical Specifications
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Everything you need to run high-performance web applications, built into one powerful platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {TECH_SPECS.map((spec, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="group"
                        >
                            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <spec.icon className="w-6 h-6 text-slate-300 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors">{spec.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {spec.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
