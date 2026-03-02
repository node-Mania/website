'use client';

import { motion } from 'framer-motion';
import { Cloud, Calendar, Mail, FileText, AppWindow, ShieldCheck } from 'lucide-react';

const features = [
    {
        icon: Cloud,
        title: 'Cloud File Storage',
        description: "Store and share your important documents safely in the cloud. And with (up to) 50 GBs, you'll have plenty of room for years to come."
    },
    {
        icon: Calendar,
        title: 'Calendaring & Contacts',
        description: 'Communicate like an enterprise with shared calendaring, scheduling wizard, iCal support and Global Address List!'
    },
    {
        icon: Mail,
        title: 'Lots of Email Features',
        description: 'Your favorite email features are all here including Forwarders, Aliases, Auto-Responders, Filters, Signatures, Notifications and more!'
    },
    {
        icon: FileText,
        title: 'Add Productivity Apps!',
        description: "Create, edit and share Microsoft Office docs like Word, Excel and PowerPoint with App Suite's powerful online Apps."
    },
    {
        icon: AppWindow,
        title: 'Bring your Apps',
        description: 'Easily add your favorite email services and/or apps into App Suite; like Gmail, Dropbox, Zoom (coming soon) and more!'
    },
    {
        icon: ShieldCheck,
        title: 'Privacy Matters',
        description: 'App Suite, nor ourselves, will ever read, scan or share any of your personal or email information with any 3rd parties. Ever.'
    }
];

export function BusinessEmailFeatures() {
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
                            Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Work Smart</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            OX App Suite has every essential tool your business requires to communicate effectively and stay organized.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all hover:shadow-lg group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-all">
                                <feature.icon className="w-7 h-7 text-slate-700 group-hover:text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
