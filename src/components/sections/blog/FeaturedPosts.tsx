"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
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

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
    if (!posts || posts.length === 0) return null;

    const [featured, ...secondary] = posts;

    return (
        <section className="py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                        Featured Articles
                    </h2>
                    <Link
                        href="/blog"
                        className="hidden md:flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                    >
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Main featured post */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href={`/blog/${featured.slug}`}
                            className="group block rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
                        >
                            <div className="relative aspect-[16/9] overflow-hidden">
                                {featured.featuredImage ? (
                                    <Image
                                        src={featured.featuredImage.node.sourceUrl}
                                        alt={featured.featuredImage.node.altText || featured.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-50 flex items-center justify-center">
                                        <span className="text-4xl text-blue-300">📖</span>
                                    </div>
                                )}
                                {featured.categories.nodes[0] && (
                                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                                        {featured.categories.nodes[0].name}
                                    </span>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(featured.date)}
                                    {featured.seo?.readingTime > 0 && (
                                        <span className="ml-2">· {featured.seo.readingTime} min read</span>
                                    )}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {featured.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                                    {stripHtml(featured.excerpt)}
                                </p>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Secondary featured posts */}
                    <div className="flex flex-col gap-6">
                        {secondary.slice(0, 2).map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group flex flex-col sm:flex-row gap-4 rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
                                >
                                    <div className="relative w-full sm:w-48 md:w-56 aspect-[16/9] sm:aspect-auto shrink-0 overflow-hidden">
                                        {post.featuredImage ? (
                                            <Image
                                                src={post.featuredImage.node.sourceUrl}
                                                alt={post.featuredImage.node.altText || post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 640px) 100vw, 224px"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
                                                <span className="text-2xl text-blue-300">📖</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col justify-center">
                                        {post.categories.nodes[0] && (
                                            <span className="inline-block w-fit px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-2">
                                                {post.categories.nodes[0].name}
                                            </span>
                                        )}
                                        <h3 className="text-base md:text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(post.date)}
                                            {post.seo?.readingTime > 0 && (
                                                <span>· {post.seo.readingTime} min read</span>
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
