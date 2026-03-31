"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import { BlogCard } from "./BlogCard";
import type { WPPost } from "@/lib/types/wordpress.types";

interface BlogGridProps {
    posts: WPPost[];
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function generatePageNumbers(current: number, total: number): (number | "...")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: (number | "...")[] = [1];

    if (current > 3) pages.push("...");

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 2) pages.push("...");
    pages.push(total);

    return pages;
}

export function BlogGrid({
    posts,
    isLoading,
    currentPage,
    totalPages,
    onPageChange,
}: BlogGridProps) {
    const pages = generatePageNumbers(currentPage, totalPages);

    if (!isLoading && posts.length === 0) {
        return (
            <div className="py-24 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-5 shadow-inner">
                    <SearchX className="w-7 h-7 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                    No articles found
                </h3>
                <p className="text-slate-500 max-w-xs text-sm">
                    Try adjusting your search or selecting a different category.
                </p>
            </div>
        );
    }

    return (
        <section className="pb-20">
            <div className="container mx-auto px-4 md:px-6">

                {/* Loading skeleton */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm animate-pulse"
                            >
                                <div className="aspect-[16/10] bg-slate-200" />
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                                    <div className="h-5 bg-slate-200 rounded w-full" />
                                    <div className="h-5 bg-slate-200 rounded w-4/5" />
                                    <div className="h-3 bg-slate-200 rounded w-2/5 mt-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.35 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {posts.map((post, index) => (
                                <BlogCard key={post.id} post={post} index={index} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* ── Pagination ── */}
                {!isLoading && totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="flex items-center justify-center gap-2 mt-14"
                    >
                        {/* Prev */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                            className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:shadow-md shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </motion.button>

                        {/* Page numbers */}
                        {pages.map((page, i) =>
                            page === "..." ? (
                                <span
                                    key={`ellipsis-${i}`}
                                    className="w-10 h-10 flex items-center justify-center text-slate-400 text-sm font-medium select-none"
                                >
                                    …
                                </span>
                            ) : (
                                <motion.button
                                    key={page}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.94 }}
                                    onClick={() => onPageChange(page as number)}
                                    aria-label={`Go to page ${page}`}
                                    aria-current={currentPage === page ? "page" : undefined}
                                    className={`relative w-10 h-10 rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer overflow-hidden ${
                                        currentPage === page
                                            ? "text-white shadow-blue-500/30 shadow-md"
                                            : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:shadow-md"
                                    }`}
                                >
                                    {currentPage === page && (
                                        <span className="absolute inset-0 bg-gradient-to-br from-blue-600 to-primary rounded-xl" />
                                    )}
                                    <span className="relative">{page}</span>
                                </motion.button>
                            )
                        )}

                        {/* Next */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                            className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:shadow-md shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </motion.button>
                    </motion.div>
                )}

                {/* Results count */}
                {!isLoading && totalPages > 1 && (
                    <p className="text-center text-sm text-slate-400 mt-4">
                        Page {currentPage} of {totalPages}
                    </p>
                )}
            </div>
        </section>
    );
}
