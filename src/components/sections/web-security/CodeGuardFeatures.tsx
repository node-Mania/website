'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, Database, RefreshCcw, Search, Lock, Bell, TestTube, Mail, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        title: "Daily Automatic Website Backups",
        description: "Secure your website with automated daily backups stored offsite with built-in redundancy.",
        icon: Database,
        colorClass: "bg-blue-100 text-blue-600"
    },
    {
        title: "Unlimited Files & Databases",
        description: "Backup an unlimited number of files and databases - you are restricted only by the storage space you use.",
        icon: Settings,
        colorClass: "bg-teal-100 text-teal-600"
    },
    {
        title: "One-Click Restores",
        description: "A simple restore process makes it easy to rollback a single file or your entire website to a previous version.",
        icon: RefreshCcw,
        colorClass: "bg-emerald-100 text-emerald-600"
    },
    {
        title: "Malware Monitoring",
        description: "Rest easy knowing CodeGuard is diligently checking your site for changes every day.",
        icon: Search,
        colorClass: "bg-rose-100 text-rose-600"
    },
    {
        title: "Automatic WordPress Updates",
        description: "Automatically update WordPress and its plugins to keep it secure with auto recovery in case of problems.",
        icon: Lock,
        colorClass: "bg-purple-100 text-purple-600"
    },
    {
        title: "File Change Monitoring",
        description: "Get notified by email anytime something changes within the source code of your site.",
        icon: Bell,
        colorClass: "bg-amber-100 text-amber-600"
    },
    {
        title: "Staging of Restores",
        description: "Quickly test any backed up site with simple and automated staging prior to restore.",
        icon: TestTube,
        colorClass: "bg-indigo-100 text-indigo-600"
    },
    {
        title: "Email Backup",
        description: "Get protection for your emails too as they are backed up as part of your websites files.",
        icon: Mail,
        colorClass: "bg-sky-100 text-sky-600"
    },
    {
        title: "Full Automation",
        description: "Completely hands free setup and ongoing backups with automated notifications if things go wrong.",
        icon: ShieldAlert,
        colorClass: "bg-emerald-100 text-emerald-600"
    }
];

export function CodeGuardFeatures() {
    return (
        <section id="features" className="py-24 bg-white border-b border-slate-200">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Complete <span className="text-primary-600 italic">Protection</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Everything you need to keep your online presence safe and secure.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-slate-50 border border-slate-200 transition-all hover:bg-white hover:shadow-xl hover:shadow-primary-500/5 group"
                        >
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all",
                                feature.colorClass,
                                "group-hover:scale-110 group-hover:rotate-3"
                            )}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
