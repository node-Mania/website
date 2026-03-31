import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import BlogPageClient from "@/components/sections/blog/BlogPageClient";
import {
    getPosts,
    getLatestPosts,
    getCategories,
} from "@/lib/services/wordpress.service";
import type { WPPost, WPCategory } from "@/lib/types/wordpress.types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Blog - Insights, Tutorials & News | nodeMania",
    description:
        "Stay up to date with the latest hosting tips, security best practices, performance guides, and industry news from the nodeMania team.",
    openGraph: {
        title: "Blog - Insights, Tutorials & News | nodeMania",
        description:
            "Stay up to date with the latest hosting tips, security best practices, performance guides, and industry news.",
        type: "website",
    },
};

export default async function BlogPage() {
    let initialPosts: WPPost[] = [];
    let featuredPosts: WPPost[] = [];
    let categories: WPCategory[] = [];
    let hasNextPage = false;
    let endCursor: string | null = null;

    try {
        const [postsData, featured, cats] = await Promise.all([
            getPosts(9),
            getLatestPosts(3),
            getCategories(),
        ]);

        initialPosts = postsData.nodes;
        hasNextPage = postsData.pageInfo.hasNextPage;
        endCursor = postsData.pageInfo.endCursor;
        featuredPosts = featured;
        categories = cats;
    } catch (error) {
        console.error("[Blog] Failed to fetch data:", error);
    }

    return (
        <main className="min-h-screen bg-[#f7fbff] font-sans overflow-x-hidden">
            <Navbar />
            <BlogPageClient
                initialPosts={initialPosts}
                featuredPosts={featuredPosts}
                categories={categories}
                initialHasNextPage={hasNextPage}
                initialEndCursor={endCursor}
            />
            <Footer />
        </main>
    );
}
