"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { BlogCard } from "./BlogCard";
import type { WPPost } from "@/lib/types/wordpress.types";

interface BlogGridProps {
    posts: WPPost[];
    hasNextPage: boolean;
    isLoading: boolean;
    onLoadMore: () => void;
}

export function BlogGrid({
    posts,
    hasNextPage,
    isLoading,
    onLoadMore,
}: BlogGridProps) {
    if (!isLoading && posts.length === 0) {
        return (
            <div className="py-20 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">
                    No articles found
                </h3>
                <p className="text-slate-500">
                    Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
            </div>
        );
    }

    return (
        <section className="pb-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
                    ))}
                </div>

                {/* Load More */}
                {hasNextPage && (
                    <div className="flex justify-center mt-12">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={onLoadMore}
                            disabled={isLoading}
                            className="px-8 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Load More Articles"
                            )}
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
}
