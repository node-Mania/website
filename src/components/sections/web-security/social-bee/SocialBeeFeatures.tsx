'use client';

import { motion } from 'framer-motion';
import { Sparkles, Calendar, Inbox, Users, BarChart, Globe, Zap, Shield, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        title: "AI-Powered Content",
        description: "Generate captions and images in seconds with AI, and get access to over 1,000 premade prompts to save time.",
        icon: Sparkles,
        colorClass: "bg-amber-100 text-amber-600"
    },
    {
        title: "Visual Content Calendar",
        description: "Organize your posts with a visual calendar that shows your entire social media strategy at a glance.",
        icon: Calendar,
        colorClass: "bg-blue-100 text-blue-600"
    },
    {
        title: "unified Social Inbox",
        description: "Respond to all your comments, mentions, and DMs across social media platforms from a single, easy-to-manage inbox.",
        icon: Inbox,
        colorClass: "bg-purple-100 text-purple-600"
    },
    {
        title: "Team Collaboration",
        description: "Share feedback, tag colleagues directly on content drafts, and approve posts before they go live.",
        icon: Users,
        colorClass: "bg-emerald-100 text-emerald-600"
    },
    {
        title: "Advanced Analytics",
        description: "Track engagement, impressions, and follower growth with easy-to-understand metrics and visual charts.",
        icon: BarChart,
        colorClass: "bg-rose-100 text-rose-600"
    },
    {
        title: "Multi-Platform Support",
        description: "Schedule posts for Facebook, Instagram, LinkedIn, TikTok, Pinterest, and more, all from one place.",
        icon: Share2,
        colorClass: "bg-indigo-100 text-indigo-600"
    },
    {
        title: "Evergreen Content",
        description: "Reuse successful content by rescheduling posts to keep your feed fresh without constant manual work.",
        icon: RefreshCcw,
        colorClass: "bg-teal-100 text-teal-600"
    },
    {
        title: "Social Monitoring",
        description: "Monitor mentions of your brand to see what people are saying, keeping track of conversations and feedback.",
        icon: Shield,
        colorClass: "bg-cyan-100 text-cyan-600"
    },
    {
        title: "Fast Automation",
        description: "Plan and queue posts ahead of time to keep your accounts active without needing to post manually.",
        icon: Zap,
        colorClass: "bg-orange-100 text-orange-600"
    }
];

import { RefreshCcw } from 'lucide-react';

export function SocialBeeFeatures() {
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
                            Everything You Need to <span className="text-amber-600 italic">Grow</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            SocialBee gives you the tools to manage, grow, and automate your social media presence with ease.
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
                            className="p-8 rounded-3xl bg-slate-50 border border-slate-200 transition-all hover:bg-white hover:shadow-xl hover:shadow-amber-500/5 group"
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
