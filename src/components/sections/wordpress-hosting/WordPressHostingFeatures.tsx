'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Zap, Cloud, Cpu, RefreshCw, Layers, Leaf, Settings, Rocket, Headphones, HardDrive, Layout } from 'lucide-react';

const FEATURES = [
    {
        title: "Optimised for WordPress",
        description: "Our platform is specifically built to provide a robust, secure hosting environment with consistently excellent speeds for WordPress.",
        icon: Rocket,
        color: "bg-blue-500"
    },
    {
        title: "StackCache Caching",
        description: "Developed by us to edge-cache your content, making sure that your web pages load at lightning speed for every visitor.",
        icon: Cpu,
        color: "bg-teal-500"
    },
    {
        title: "Global CDN & Acceleration",
        description: "Includes a state-of-the-art CDN and Website Acceleration Suite to minify code and optimise images automatically.",
        icon: Globe,
        color: "bg-indigo-500"
    },
    {
        title: "Green Hosting",
        description: "Powered by 100% renewable energy (wind and solar) in our award-winning data centres with PUE as low as 1.12.",
        icon: Leaf,
        color: "bg-green-500"
    },
    {
        title: "Automatic WP Updates",
        description: "We update the WordPress core for you automatically whenever updates are released, keeping your site secure effortlessly.",
        icon: RefreshCw,
        color: "bg-amber-500"
    },
    {
        title: "One-click Staging",
        description: "Test changes, themes, and plugins in a safe environment before pushing them live with our easy one-click staging tool.",
        icon: Layers,
        color: "bg-purple-500"
    },
    {
        title: "100% SSD Storage",
        description: "High-quality hardware including enterprise-grade SSD storage ensures your database and files are always fast.",
        icon: HardDrive,
        color: "bg-rose-500"
    },
    {
        title: "WordPress Tools",
        description: "A suite of custom-built tools directly in your control panel to manage your WordPress installations with ease.",
        icon: Settings,
        color: "bg-slate-500"
    }
];

export function WordPressHostingFeatures() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary-600 font-bold tracking-wider text-sm uppercase">Key Features</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-6">
                        Designed just for <span className="text-primary-600">WordPress</span>
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        We've developed our own hosting platform just for WordPress websites, so you'll get a robust, secure environment and consistently excellent speeds.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className={`w-6 h-6 text-${feature.color.split('-')[1]}-600`} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
