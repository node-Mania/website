"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import type { WPPost } from "@/lib/types/wordpress.types";

interface BlogCardProps {
    post: WPPost;
    index?: number;
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
        >
            <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
            >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    {post.featuredImage ? (
                        <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
                            <span className="text-3xl">📖</span>
                        </div>
                    )}

                    {/* Category badge */}
                    {post.categories.nodes[0] && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold">
                            {post.categories.nodes[0].name}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
                        {stripHtml(post.excerpt)}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(post.date)}
                            </span>
                            {post.seo?.readingTime > 0 && (
                                <span>· {post.seo.readingTime} min</span>
                            )}
                        </div>
                        {post.author?.node?.name && (
                            <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                {post.author.node.name}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
