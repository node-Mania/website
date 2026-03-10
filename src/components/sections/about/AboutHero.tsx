'use client';

import { motion } from 'framer-motion';
import { Server, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';

export default function AboutHero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring' as const,
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-[#f7fbff]">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent blur-3xl opacity-30" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-[100px] opacity-20" />
            <div className="absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(rgba(37, 99, 235, 0.05) 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />

            <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wider uppercase mb-6 shadow-sm border border-primary/10">
                                Who We Are
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                                Empowering the <br />
                                <span className="text-gradient">Next-Gen Web.</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-slate-600 leading-relaxed max-w-xl"
                        >
                            NodeMania is a cloud-first hosting provider delivering enterprise-grade infrastructure for businesses, developers, and agencies worldwide.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-8 pt-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-slate-100">
                                    <Server className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Cloud-First</h4>
                                    <p className="text-sm text-slate-500">Global Coverage</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-slate-100">
                                    <ShieldCheck className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Secure</h4>
                                    <p className="text-sm text-slate-500">Enterprise Grade</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-slate-100">
                                    <Zap className="w-6 h-6 text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Speed</h4>
                                    <p className="text-sm text-slate-500">NVMe SSD Tier-1</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative aspect-square w-full max-w-lg mx-auto">
                            {/* Glass Frame */}
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl z-0 transform rotate-3" />
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl z-10" />

                            <div className="relative z-20 w-full h-full p-4 overflow-hidden rounded-3xl group">
                                <Image
                                    src="/images/server-farm-705448.jpg"
                                    alt="Enterprise Infrastructure"
                                    fill
                                    className="object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-[2s] scale-110 group-hover:scale-100"
                                />
                            </div>

                            {/* Floating elements moved outside overflow-hidden */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-12 left-0 md:-left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 z-30"
                            >
                                <p className="text-xl font-bold text-primary">99.9%</p>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Uptime Guarantee</p>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-12 right-0 md:-right-2 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 z-30"
                            >
                                <p className="text-xl font-bold text-accent">24/7</p>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Expert Support</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
