'use client';

import { motion } from 'framer-motion';
import { Database, Lock, Globe, Server, Code, Repeat, Clock, Cpu } from 'lucide-react';

const TECH_SPECS = [
    {
        title: "NVMe SSD Storage",
        description: "Enterprise-grade NVMe storage delivers up to 10x faster I/O compared to standard SSDs, ensuring your database-heavy apps fly.",
        icon: Database,
    },
    {
        title: "Safe & Isolated",
        description: "CloudLinux OS ensures your resources are dedicated. One bad neighbor can't slow down your business critical sites.",
        icon: Lock,
    },
    {
        title: "Premium CDN Included",
        description: "Accelerate content delivery globally with our enterprise CDN integration, reducing latency for your international clients.",
        icon: Globe,
    },
    {
        title: "Redis Object Caching",
        description: "Supercharge WordPress and other CMS performance with server-side Redis object caching included on all business plans.",
        icon: Server,
    },
    {
        title: "Developer Friendly",
        description: "Git integration, WP-CLI, SSH access, and staging environments standard. Deploy your code your way.",
        icon: Code,
    },
    {
        title: "Automated Daily Backups",
        description: "We back up your entire account daily to off-site storage. Restore files or databases with a single click.",
        icon: Repeat,
    },
    {
        title: "99.99% Uptime SLA",
        description: "We back our reliability with a financially backed 99.99% uptime guarantee. Your business stays online.",
        icon: Clock,
    },
    {
        title: "High RAM & CPU Limits",
        description: "More processing power and memory per account to handle complex plugins, large databases, and high traffic spikes.",
        icon: Cpu,
    }
];

export function BusinessHostingTechSpecs() {
    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">

            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
                        Enterprise Specifications
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Unleash the full potential of your websites with our high-performance technical stack.
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
                            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <spec.icon className="w-6 h-6 text-slate-300 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">{spec.title}</h3>
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
