"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, ChevronRight, Tag } from "lucide-react";
import { ShareButtons } from "./ShareButtons";
import type { WPPost } from "@/lib/types/wordpress.types";

interface BlogContentProps {
    post: WPPost;
    url: string;
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function BlogContent({ post, url }: BlogContentProps) {
    return (
        <article className="pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-1.5 text-sm text-slate-400 mb-8 flex-wrap">
                    <Link
                        href="/"
                        className="hover:text-blue-600 transition-colors"
                    >
                        Home
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <Link
                        href="/blog"
                        className="hover:text-blue-600 transition-colors"
                    >
                        Blog
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-slate-600 line-clamp-1">
                        {post.title}
                    </span>
                </nav>

                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-10">
                    {/* Categories */}
                    <div className="flex items-center justify-center gap-2 mb-5">
                        {post.categories.nodes.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-colors"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Meta info */}
                    <div className="flex items-center justify-center gap-4 text-slate-500 text-sm flex-wrap">
                        {post.author?.node && (
                            <span className="flex items-center gap-1.5">
                                {post.author.node.avatar?.url ? (
                                    <Image
                                        src={post.author.node.avatar.url}
                                        alt={post.author.node.name}
                                        width={24}
                                        height={24}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <User className="w-4 h-4" />
                                )}
                                <span className="font-medium text-slate-700">
                                    {post.author.node.name}
                                </span>
                            </span>
                        )}
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.date)}
                        </span>
                        {post.seo?.readingTime > 0 && (
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {post.seo.readingTime} min read
                            </span>
                        )}
                    </div>

                    {/* Share buttons */}
                    <div className="flex justify-center mt-6">
                        <ShareButtons url={url} title={post.title} />
                    </div>
                </div>

                {/* Featured image */}
                {post.featuredImage && (
                    <div className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={
                                post.featuredImage.node.altText || post.title
                            }
                            width={
                                post.featuredImage.node.mediaDetails?.width || 1200
                            }
                            height={
                                post.featuredImage.node.mediaDetails?.height || 630
                            }
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Post content */}
                <div
                    className="max-w-3xl mx-auto prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-slate-800 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags.nodes.length > 0 && (
                    <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-slate-100">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                                <Tag className="w-4 h-4" />
                                Tags:
                            </span>
                            {post.tags.nodes.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom share */}
                <div className="max-w-3xl mx-auto mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        Enjoyed this article? Share it with your network.
                    </p>
                    <ShareButtons url={url} title={post.title} />
                </div>
            </div>
        </article>
    );
}
