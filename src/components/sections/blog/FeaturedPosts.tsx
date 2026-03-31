"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import type { WPPost } from "@/lib/types/wordpress.types";

interface FeaturedPostsProps {
    posts: WPPost[];
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
}

const categoryColors: Record<string, string> = {
    infrastructure: "from-violet-500 to-indigo-600",
    business: "from-amber-500 to-orange-600",
    security: "from-red-500 to-rose-600",
    performance: "from-emerald-500 to-teal-600",
    tutorials: "from-blue-500 to-cyan-600",
    default: "from-blue-600 to-primary",
};

function getCategoryGradient(name: string): string {
    const key = name.toLowerCase();
    return categoryColors[key] || categoryColors.default;
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
    if (!posts || posts.length === 0) return null;

    const [featured, ...secondary] = posts;

    return (
        <section className="py-14 bg-[#f7fbff]">
            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between mb-8"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-primary text-white shadow-md shadow-blue-500/20">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Featured Articles
                            </h2>
                            <p className="text-sm text-slate-500 mt-0.5">
                                Hand-picked reads for you
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
                    >
                        View all articles
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </motion.div>

                {/* Bento grid: 1 large + 2 stacked */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                    {/* ── Main hero card (full height) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="lg:col-span-3"
                    >
                        <Link
                            href={`/blog/${featured.slug}`}
                            className="group relative flex flex-col h-full min-h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-slate-900"
                        >
                            {/* Background image */}
                            {featured.featuredImage ? (
                                <Image
                                    src={featured.featuredImage.node.sourceUrl}
                                    alt={featured.featuredImage.node.altText || featured.title}
                                    fill
                                    priority
                                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 opacity-70"
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-teal-600" />
                            )}

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

                            {/* Content pinned to bottom */}
                            <div className="relative mt-auto p-7 md:p-8 z-10">
                                {/* Category chip */}
                                {featured.categories.nodes[0] && (
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-4 bg-gradient-to-r ${getCategoryGradient(
                                            featured.categories.nodes[0].name
                                        )} shadow-md`}
                                    >
                                        {featured.categories.nodes[0].name}
                                    </span>
                                )}

                                <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-3 group-hover:text-blue-300 transition-colors line-clamp-3">
                                    {featured.title}
                                </h3>

                                <p className="text-sm text-slate-300 leading-relaxed line-clamp-2 mb-5">
                                    {stripHtml(featured.excerpt)}
                                </p>

                                {/* Meta row */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-slate-400 text-xs">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(featured.date)}
                                        </span>
                                        {featured.seo?.readingTime > 0 && (
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {featured.seo.readingTime} min read
                                            </span>
                                        )}
                                    </div>

                                    {/* CTA pill */}
                                    <span className="flex items-center gap-1.5 text-xs font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full group-hover:bg-blue-600 transition-colors">
                                        Read Article
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* ── Secondary cards (stacked) ── */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        {secondary.slice(0, 2).map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.15 * (index + 1) }}
                                className="flex-1"
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group relative flex flex-col h-full min-h-[190px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-400 bg-slate-900"
                                >
                                    {/* BG image */}
                                    {post.featuredImage ? (
                                        <Image
                                            src={post.featuredImage.node.sourceUrl}
                                            alt={post.featuredImage.node.altText || post.title}
                                            fill
                                            className="object-cover group-hover:scale-[1.05] transition-transform duration-700 opacity-60"
                                            sizes="(max-width: 1024px) 100vw, 40vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-teal-600" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                                    {/* Content */}
                                    <div className="relative mt-auto p-5 z-10">
                                        {post.categories.nodes[0] && (
                                            <span
                                                className={`inline-block px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold mb-2 bg-gradient-to-r ${getCategoryGradient(
                                                    post.categories.nodes[0].name
                                                )}`}
                                            >
                                                {post.categories.nodes[0].name}
                                            </span>
                                        )}

                                        <h3 className="text-base font-bold text-white leading-snug mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(post.date)}
                                            </span>
                                            {post.seo?.readingTime > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {post.seo.readingTime} min
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
