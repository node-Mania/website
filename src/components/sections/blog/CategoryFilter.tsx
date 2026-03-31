"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    LayoutGrid,
    Briefcase,
    BarChart2,
    ShieldCheck,
    BookOpen,
    Zap,
    Globe,
    Tag,
    ChevronRight,
    type LucideIcon,
} from "lucide-react";
import type { WPCategory } from "@/lib/types/wordpress.types";

interface CategoryFilterProps {
    categories: WPCategory[];
    activeCategory: string | null;
}

// Map common category slugs to icons
const categoryIcons: Record<string, LucideIcon> = {
    business: Briefcase,
    infrastructure: BarChart2,
    security: ShieldCheck,
    tutorials: BookOpen,
    performance: Zap,
    web: Globe,
    comparison: LayoutGrid,
    ecommerce: Tag,
};

function getCategoryIcon(slug: string): LucideIcon {
    return categoryIcons[slug.toLowerCase()] || Tag;
}

const categoryAccents: Record<string, string> = {
    business: "from-amber-500 to-orange-500",
    infrastructure: "from-violet-500 to-indigo-600",
    security: "from-red-500 to-rose-600",
    tutorials: "from-blue-500 to-cyan-500",
    performance: "from-emerald-500 to-teal-500",
    web: "from-sky-500 to-blue-600",
    comparison: "from-purple-500 to-violet-600",
    ecommerce: "from-pink-500 to-rose-500",
    default: "from-blue-600 to-primary",
};

function getCategoryAccent(slug: string): string {
    return categoryAccents[slug.toLowerCase()] || categoryAccents.default;
}

export function CategoryFilter({
    categories,
    activeCategory,
}: CategoryFilterProps) {
    // Show top 6 categories, and link to "More" pages
    const displayCategories = categories.slice(0, 6);

    return (
        <div className="py-8 border-b border-slate-100 bg-white/70 backdrop-blur-sm sticky top-[65px] z-30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-wrap items-center gap-2.5">

                    {/* "All" pill */}
                    <Link href="/blog" passHref legacyBehavior>
                        <motion.a
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className={`relative shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${activeCategory === null
                                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                        >
                            <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                            All Posts
                        </motion.a>
                    </Link>

                    {/* Category pills */}
                    {displayCategories.map((category) => {
                        const Icon = getCategoryIcon(category.slug);
                        const isActive = activeCategory === category.slug;
                        const accent = getCategoryAccent(category.slug);

                        return (
                            <Link href={`/blog/category/${category.slug}`} key={category.id} passHref legacyBehavior>
                                <motion.a
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    className={`relative shrink-0 flex items-center gap-2 pl-3.5 pr-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer overflow-hidden ${isActive
                                            ? "text-white shadow-lg"
                                            : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                        }`}
                                >
                                    {/* Active gradient bg */}
                                    {isActive && (
                                        <span
                                            className={`absolute inset-0 bg-gradient-to-r ${accent}`}
                                        />
                                    )}

                                    <span className="relative flex items-center gap-2">
                                        <Icon className="w-3.5 h-3.5 shrink-0" />
                                        {category.name}
                                        {category.count != null && (
                                            <span
                                                className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold ${isActive
                                                        ? "bg-white/20 text-white"
                                                        : "bg-slate-100 text-slate-500"
                                                    }`}
                                            >
                                                {category.count}
                                            </span>
                                        )}
                                    </span>
                                </motion.a>
                            </Link>
                        );
                    })}

                    {/* "Show more" button */}
                    <Link href="/blog/category" passHref legacyBehavior>
                         <motion.a
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="relative shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all duration-200 cursor-pointer"
                        >
                            More
                            <ChevronRight className="w-3.5 h-3.5" />
                        </motion.a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
