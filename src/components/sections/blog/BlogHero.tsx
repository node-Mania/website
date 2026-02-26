"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface BlogHeroProps {
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
    title?: React.ReactNode;
    subtitle?: string;
    showSearch?: boolean;
}

export function BlogHero({
    searchQuery = "",
    onSearchChange = () => { },
    title,
    subtitle,
    showSearch = true
}: BlogHeroProps) {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b border-slate-200">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-100/50 rounded-full blur-[100px] opacity-50 animate-pulse" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-[100px] opacity-30" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            </div>

            <div className="container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 border border-blue-100">
                        Blog & Resources
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-slate-900">
                        {title ? (
                            title
                        ) : (
                            <>
                                <span className="text-primary-600">nodeMania</span>{" "}
                                <span className="text-slate-900">Blog</span>
                            </>
                        )}
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {subtitle || "Insights, tutorials, and news about web hosting, security, performance, and everything in between."}
                    </p>
                </motion.div>

                {/* Search bar */}
                {showSearch && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-xl mx-auto"
                    >
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm hover:shadow-md text-base"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
