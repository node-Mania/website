'use client';

import { motion } from 'framer-motion';
import { Signal, Calendar, MessageSquare, Users, BarChart, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

const HERO_FEATURES = [
    'AI-Powered Content Creation',
    'Smart Scheduling & Queuing',
    'unified Social Inbox',
    'Advanced Team Collaboration',
    'Detailed Performance Analytics',
    '10+ Social Platform Integrations',
];

export function SocialBeeHero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b border-slate-200">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl opacity-30" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Text Content */}
                    <div className="lg:w-1/2 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-6">
                                <Sparkles className="w-3 h-3" />
                                <span>Powerful Social Media Automation</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                                Handle all of your <span className="text-amber-600">social media</span> tasks from one place.
                            </h1>

                            <p className="text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">
                                SocialBee makes it easier by letting you create and schedule posts in advance, so your accounts stay active even when you’re busy.
                            </p>

                            {/* Feature List */}
                            <ul className="grid sm:grid-cols-2 gap-3 mb-10">
                                {HERO_FEATURES.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + (index * 0.1) }}
                                        className="flex items-center gap-2 text-slate-700 text-sm font-medium"
                                    >
                                        <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="#pricing"
                                    className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-lg shadow-amber-600/25 transition-all hover:-translate-y-1 flex items-center gap-2"
                                >
                                    Get Started Now
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="#features"
                                    className="px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-xl font-bold transition-all hover:-translate-y-1"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hero Visual */}
                    <div className="lg:w-1/2 w-full relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative aspect-square max-w-[550px] mx-auto flex items-center justify-center"
                        >
                            {/* Animated Background Glow */}
                            <div className="absolute inset-0 bg-amber-100 rounded-full blur-[100px] animate-pulse opacity-50" />

                            <div className="relative z-10 w-full aspect-[4/3] bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl flex flex-col overflow-hidden group">
                                <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                    <div className="flex-grow flex justify-center">
                                        <div className="h-6 w-1/2 bg-white rounded-md border border-slate-200 flex items-center px-3 text-[10px] text-slate-400">
                                            app.socialbee.io/dashboard
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow p-6 relative">
                                    <div className="grid grid-cols-4 gap-4 h-full">
                                        <div className="col-span-1 space-y-4">
                                            <div className="h-4 w-full bg-slate-100 rounded-full animate-pulse" />
                                            <div className="h-4 w-3/4 bg-slate-100 rounded-full animate-pulse" />
                                            <div className="h-10 w-full bg-amber-50 rounded-xl border border-amber-100" />
                                            <div className="h-10 w-full bg-slate-50 rounded-xl" />
                                            <div className="h-10 w-full bg-slate-50 rounded-xl" />
                                        </div>
                                        <div className="col-span-3 space-y-4">
                                            <div className="h-8 w-1/3 bg-slate-100 rounded-lg animate-pulse" />
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="aspect-square bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                                                    <Calendar className="w-6 h-6 text-amber-500" />
                                                </div>
                                                <div className="aspect-square bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                                                    <MessageSquare className="w-6 h-6 text-blue-500" />
                                                </div>
                                                <div className="aspect-square bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                                                    <BarChart className="w-6 h-6 text-green-500" />
                                                </div>
                                            </div>
                                            <div className="h-32 w-full bg-slate-50 rounded-2xl border border-slate-100" />
                                        </div>
                                    </div>

                                    {/* Floating Stats */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute top-20 right-10 p-4 bg-white border border-slate-200 rounded-2xl shadow-xl space-y-2 translate-x-12"
                                    >
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Engagement</p>
                                        <p className="text-xl font-bold text-slate-900">+124%</p>
                                        <div className="h-1 w-20 bg-green-100 rounded-full overflow-hidden">
                                            <div className="h-full w-2/3 bg-green-500" />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                        className="absolute bottom-10 left-10 p-4 bg-white border border-slate-200 rounded-2xl shadow-xl flex items-center gap-3 -translate-x-12"
                                    >
                                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                            <Signal className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Tasks</p>
                                            <p className="text-sm font-bold text-slate-900">Automation Live</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
