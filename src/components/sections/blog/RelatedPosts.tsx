import Link from "next/link";
import { BlogCard } from "./BlogCard";
import type { WPPost } from "@/lib/types/wordpress.types";

interface RelatedPostsProps {
    posts: WPPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="py-16 bg-slate-50/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                        Related Articles
                    </h2>
                    <Link
                        href="/blog"
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                    >
                        View All →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
