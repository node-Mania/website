import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogContent } from "@/components/sections/blog/BlogContent";
import { RelatedPosts } from "@/components/sections/blog/RelatedPosts";
import { BlogCTA } from "@/components/sections/blog/BlogCTA";
import {
    getPostBySlug,
    getRelatedPosts,
} from "@/lib/services/wordpress.service";
import type { WPPost } from "@/lib/types/wordpress.types";

export const dynamic = "force-dynamic";

const SITE_URL = "https://nodemania.com";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

/** Dynamic metadata from Yoast SEO */
export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found | nodeMania Blog",
        };
    }

    const seo = post.seo;
    seo.canonical = `${SITE_URL}/blog/${slug}`;
    seo.opengraphUrl = `${SITE_URL}/blog/${slug}`;


    return {
        title: seo?.title || `${post.title} | Blog`,
        description: seo?.metaDesc || post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 160),
        alternates: {
            canonical: seo?.canonical || `${SITE_URL}/blog/${slug}`,
        },
        keywords: seo?.focuskw || "nodeMania, Blog",
        openGraph: {
            title: seo?.opengraphTitle || post.title,
            description: seo?.opengraphDescription || seo?.metaDesc,
            url: seo?.opengraphUrl || `${SITE_URL}/blog/${slug}`,
            siteName: seo?.opengraphSiteName || "nodeMania",
            type: "article",
            publishedTime: seo?.opengraphPublishedTime || post.date,
            modifiedTime: seo?.opengraphModifiedTime || post.modified,
            images: seo?.opengraphImage
                ? [
                    {
                        url: seo.opengraphImage.sourceUrl,
                        alt: seo.opengraphImage.altText,
                    },
                ]
                : post.featuredImage
                    ? [
                        {
                            url: post.featuredImage.node.sourceUrl,
                            alt: post.featuredImage.node.altText,
                        },
                    ]
                    : [],
        },
        twitter: {
            card: "summary_large_image",
            title: seo?.twitterTitle || post.title,
            description: seo?.twitterDescription || seo?.metaDesc,
            images: seo?.twitterImage
                ? [seo.twitterImage.sourceUrl]
                : post.featuredImage
                    ? [post.featuredImage.node.sourceUrl]
                    : [],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    // 404 if post not found
    if (!post) {
        notFound();
    }

    // Fetch related posts from the first category
    let relatedPosts: WPPost[] = [];
    try {
        const firstCategory = post.categories.nodes[0];
        if (firstCategory) {
            relatedPosts = await getRelatedPosts(
                firstCategory.slug,
                post.slug,
                3
            );
        }
    } catch (error) {
        console.error("[Blog] Failed to fetch related posts:", error);
    }

    const postUrl = `${SITE_URL}/blog/${slug}`;




    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: post.seo.schema.raw }}
            />
            <main className="min-h-screen bg-[#f7fbff] font-sans overflow-x-hidden">
                <Navbar />
                <BlogContent post={post} url={postUrl} />
                <RelatedPosts posts={relatedPosts} />
                <BlogCTA />
                <Footer />
            </main>
        </>
    );
}
