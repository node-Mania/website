'use client';

import { motion } from 'framer-motion';
import { Bell, Mail, MessageSquare, Hash, Zap, Send, Phone, MessageCircle } from 'lucide-react';

const alertChannels = [
    { name: 'Email', icon: Mail, color: 'blue' },
    { name: 'SMS', icon: Phone, color: 'green' },
    { name: 'Discord', icon: MessageSquare, color: 'indigo' },
    { name: 'Slack', icon: Hash, color: 'amber' },
    { name: 'Telegram', icon: Send, color: 'sky' },
    { name: 'Microsoft 365', icon: MessageCircle, color: 'blue' },
];

export function MonitoringAlerting() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center lg:text-left">
                    {/* Background elements */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-600/10 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-600/10 blur-[80px] rounded-full" />

                    <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                                    Get Alerts via Your <span className="text-primary-400">Favorite App</span>
                                </h2>
                                <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                                    Don't wait for your customers to tell you your site is down. Receive instant notifications the second issues are detected through any channel you choose.
                                </p>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {alertChannels.map((channel, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 group hover:bg-white/10 transition-all">
                                            <channel.icon className={`w-5 h-5 text-${channel.color}-400 group-hover:scale-110 transition-transform`} />
                                            <span className="text-white text-sm font-bold tracking-tight">{channel.name}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex items-center gap-4 text-slate-500 text-xs font-mono uppercase tracking-widest">
                                    <span>+ PagerDuty</span>
                                    <span>•</span>
                                    <span>OpsGenie</span>
                                    <span>•</span>
                                    <span>Webhooks</span>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl"
                            >
                                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <div className="ml-2 text-[10px] text-slate-500 font-mono">ALERT_SYSTEM_ACTIVE</div>
                                </div>

                                <div className="space-y-4">
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 0.2, repeat: 3, repeatDelay: 5 }}
                                        className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4 flex items-center gap-4 shadow-lg shadow-red-500/10"
                                    >
                                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                                            <Bell className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm tracking-tight">CRITICAL: Site Offline</div>
                                            <div className="text-red-200 text-xs">example.com is unreachable (Error 500)</div>
                                        </div>
                                        <div className="ml-auto text-[10px] text-red-300 font-bold uppercase">Now</div>
                                    </motion.div>

                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 opacity-60">
                                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm tracking-tight">Notification Sent</div>
                                            <div className="text-slate-400 text-xs">Multi-channel alerts delivered</div>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 opacity-40">
                                        <div className="w-10 h-10 bg-slate-500/20 rounded-full flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm tracking-tight">Manual Check Required</div>
                                            <div className="text-slate-400 text-xs">Log in to dashboard for details</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
