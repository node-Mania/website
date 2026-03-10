'use client';

import { motion } from 'framer-motion';
import { Target, Rocket, Compass } from 'lucide-react';

export default function MissionSection() {
    const missionText = "To deliver high-performance cloud infrastructure that scales effortlessly while maintaining uncompromised security and uptime.";

    const words = missionText.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
        },
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 z-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(var(--primary) 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
                <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-16 h-16 bg-primary/10 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-10 shadow-sm border border-primary/10"
                >
                    <Target className="w-8 h-8 text-primary" />
                </motion.div>

                <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-slate-500 mb-8">
                    Our Mission
                </h2>

                <motion.div
                    className="flex flex-wrap justify-center gap-x-3 gap-y-4"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {words.map((word, index) => (
                        <motion.span
                            key={index}
                            variants={child}
                            className={`text-3xl md:text-5xl lg:text-6xl font-bold ${word.includes('performance') || word.includes('security') || word.includes('uptime')
                                ? 'text-primary'
                                : 'text-slate-900'
                                }`}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="flex flex-col items-center">
                        <Rocket className="w-6 h-6 text-primary mb-4" />
                        <h4 className="font-bold text-slate-900 text-lg">Scalable</h4>
                    </div>
                    <div className="flex flex-col items-center">
                        <Compass className="w-6 h-6 text-primary mb-4" />
                        <h4 className="font-bold text-slate-900 text-lg">High Availability</h4>
                    </div>
                    <div className="flex flex-col items-center">
                        <Target className="w-6 h-6 text-primary mb-4" />
                        <h4 className="font-bold text-slate-900 text-lg">Uncompromised Security</h4>
                    </div>
                </div>
            </div>
        </section>
    );
}
