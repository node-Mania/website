"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface BlogHeroProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export function BlogHero({ searchQuery, onSearchChange }: BlogHeroProps) {
    return (
        <section className="relative pt-32 pb-16 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-100 rounded-full blur-[100px] opacity-60" />
                <div className="absolute top-40 right-1/4 w-64 h-64 bg-teal-100 rounded-full blur-[100px] opacity-50" />
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

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        <span className="text-gradient">nodeMania</span>{" "}
                        <span className="text-slate-800">Blog</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Insights, tutorials, and news about web hosting, security,
                        performance, and everything in between.
                    </p>
                </motion.div>

                {/* Search bar */}
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
            </div>
        </section>
    );
}
