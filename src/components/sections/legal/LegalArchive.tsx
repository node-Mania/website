"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, ArrowRight, ShieldCheck, Scale, ScrollText } from "lucide-react";
import Link from "next/link";
import { LEGAL_DOCS, LegalDocument } from "@/lib/legal-data";
import { cn } from "@/lib/utils";

const CategoryIcon = ({ category }: { category: string }) => {
    switch (category) {
        case "Legal":
            return <Scale className="w-5 h-5" />;
        case "Agreement":
            return <ShieldCheck className="w-5 h-5" />;
        case "Policy":
        default:
            return <ScrollText className="w-5 h-5" />;
    }
};

export default function LegalArchive() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDocs = useMemo(() => {
        return LEGAL_DOCS.filter((doc) =>
            doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <section className="py-20 bg-background min-h-[60vh]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6"
                    >
                        Legal <span className="text-primary">Center</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 mb-10"
                    >
                        Find all our legal documents, policies, and service agreements in one place.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative max-w-2xl mx-auto"
                    >
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search legal documents..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredDocs.map((doc, index) => (
                            <motion.div
                                key={doc.slug}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    href={`/legal/${doc.slug}`}
                                    className="group block h-full p-8 bg-white border border-slate-100 rounded-3xl hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                            <CategoryIcon category={doc.category} />
                                        </div>
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            {doc.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                                        {doc.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                        {doc.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                        Read Document
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredDocs.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No documents found</h3>
                        <p className="text-slate-500">We couldn't find any legal matches for "{searchQuery}".</p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-6 text-primary font-bold hover:underline"
                        >
                            Clear search
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
