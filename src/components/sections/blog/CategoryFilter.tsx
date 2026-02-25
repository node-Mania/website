"use client";

import { motion } from "framer-motion";
import type { WPCategory } from "@/lib/types/wordpress.types";

interface CategoryFilterProps {
    categories: WPCategory[];
    activeCategory: string | null;
    onCategoryChange: (slug: string | null) => void;
}

export function CategoryFilter({
    categories,
    activeCategory,
    onCategoryChange,
}: CategoryFilterProps) {
    return (
        <div className="py-6">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {/* "All" pill */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onCategoryChange(null)}
                        className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border cursor-pointer ${activeCategory === null
                                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                            }`}
                    >
                        All Posts
                    </motion.button>

                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onCategoryChange(category.slug)}
                            className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border cursor-pointer ${activeCategory === category.slug
                                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                                }`}
                        >
                            {category.name}
                            {category.count != null && (
                                <span className={`ml-1.5 text-xs ${activeCategory === category.slug
                                        ? "text-blue-200"
                                        : "text-slate-400"
                                    }`}>
                                    ({category.count})
                                </span>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
}
