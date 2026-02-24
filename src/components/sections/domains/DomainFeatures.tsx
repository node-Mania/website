"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Globe, Lock, Cpu, Clock, Activity, Headphones, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "Free Privacy Protection",
        desc: "Protect your personal information from scammers and identity thieves. Privacy Protection is free for life with every domain registration.",
        icon: <Shield className="w-8 h-8 text-blue-500" />,
        className: "md:col-span-2 md:row-span-2 bg-blue-50 border-blue-100",
        iconContainer: "bg-white text-blue-500 shadow-blue-200/50",
    },
    {
        title: "DNS Management",
        desc: "Full control over your domain records with our enterprise-grade anycast DNS infrastructure.",
        icon: <Activity className="w-8 h-8 text-emerald-500" />,
        className: "bg-emerald-50 border-emerald-100",
        iconContainer: "bg-white text-emerald-500 shadow-emerald-200/50",
    },
    {
        title: "Email Forwarding",
        desc: "Create professional aliases and forward them to your existing personal mailbox.",
        icon: <Clock className="w-8 h-8 text-purple-500" />,
        className: "bg-purple-50 border-purple-100",
        iconContainer: "bg-white text-purple-500 shadow-purple-200/50",
    },
    {
        title: "Domain Locking",
        desc: "Prevent unauthorized transfers with our advanced registrar domain locking security.",
        icon: <Lock className="w-8 h-8 text-amber-500" />,
        className: "bg-amber-50 border-amber-100",
        iconContainer: "bg-white text-amber-500 shadow-amber-200/50",
    },
    {
        title: "24/7 Expert Support",
        desc: "Our hosting and domain experts are available around the clock to assist you with any setup queries.",
        icon: <Headphones className="w-8 h-8 text-cyan-500" />,
        className: "md:col-span-2 bg-cyan-50 border-cyan-100",
        iconContainer: "bg-white text-cyan-500 shadow-cyan-200/50",
    },
    {
        title: "Automated Renewal",
        desc: "Never lose your domain again. Our automated system handles renewals seamlessly for you.",
        icon: <Zap className="w-8 h-8 text-pink-500" />,
        className: "bg-pink-50 border-pink-100",
        iconContainer: "bg-white text-pink-500 shadow-pink-200/50",
    },
];

export function DomainFeatures() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-4">Domain Benefits</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Everything You Need to <span className="text-primary">Launch</span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto font-medium">
                        We don't just register domains. We provide a complete suite of enterprise-grade tools to manage your digital identity securely.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={cn(
                                "p-8 rounded-[2rem] border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between group bg-white",
                                feature.className
                            )}
                        >
                            <div className="mb-6">
                                <div className={cn(
                                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500",
                                    feature.iconContainer
                                )}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-600 font-medium leading-relaxed">{feature.desc}</p>
                            </div>

                            <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                <CheckCircle2 className="w-4 h-4" />
                                Included Free
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
