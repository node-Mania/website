'use client';

import { motion } from 'framer-motion';
import { Cloud, FileText, Share2, PlaySquare, Calculator, FileEdit } from 'lucide-react';

const features = [
    {
        title: 'OX Drive',
        description: 'Secure enterprise cloud storage for all your files. Sync, share, and collaborate securely across the globe.',
        icon: Cloud,
        color: 'text-teal-500',
        bg: 'bg-teal-100',
    },
    {
        title: 'OX Documents',
        description: 'Create and edit documents directly inside your browser. No local software installations required.',
        icon: FileText,
        color: 'text-blue-500',
        bg: 'bg-blue-100',
    },
    {
        title: 'Real-time Collaboration',
        description: 'Edit the same file simultaneously with other team members, seeing changes happen instantly.',
        icon: Share2,
        color: 'text-purple-500',
        bg: 'bg-purple-100',
    },
    {
        title: 'OX Spreadsheets',
        description: 'Powerful online spreadsheets with full MS Excel compatibility, built right into your email dashboard.',
        icon: Calculator,
        color: 'text-orange-500',
        bg: 'bg-orange-100',
    },
    {
        title: 'OX Presentations',
        description: 'Present to your team effortlessly with native presentation editing tools and PowerPoint compatibility.',
        icon: PlaySquare,
        color: 'text-indigo-500',
        bg: 'bg-indigo-100',
    },
    {
        title: 'Native MS Compatibility',
        description: 'Edit DOCX, XLSX, and PPTX files instantly without corrupting formatting or losing important data.',
        icon: FileEdit,
        color: 'text-teal-500',
        bg: 'bg-teal-100',
    }
];

export function OXAppSuiteProductivityFeatures() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            Unleash Team <span className="text-teal-600">Productivity</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Upgrade beyond email. Bring your entire office into the cloud with OX App Suite + Productivity.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5 hover:border-teal-200"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.bg}`}>
                                    <Icon className={`w-7 h-7 ${feature.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
