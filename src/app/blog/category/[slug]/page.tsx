import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import CategoryPageClient from "@/components/sections/blog/CategoryPageClient";
import { BlogCTA } from "@/components/sections/blog/BlogCTA";
import {
    getCategoryBySlug,
    getPosts,
    getCategories,
} from "@/lib/services/wordpress.service";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        return {
            title: "Category Not Found | nodeMania Blog",
        };
    }

    return {
        title: `${category.name} | nodeMania Blog`,
        description: category.description || `Read the latest articles about ${category.name} on the nodeMania blog.`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;

    // Fetch category info, posts, and all categories for the filter
    const [category, categoriesData] = await Promise.all([
        getCategoryBySlug(slug),
        getCategories(),
    ]);

    if (!category) {
        notFound();
    }

    const postsData = await getPosts(9, null, slug);

    return (
        <main className="min-h-screen bg-[#f7fbff] font-sans overflow-x-hidden">
            <Navbar />
            <div className="pt-20">
                <CategoryPageClient
                    category={category}
                    initialPosts={postsData.nodes}
                    categories={categoriesData}
                    initialHasNextPage={postsData.pageInfo?.hasNextPage}
                    initialEndCursor={postsData.pageInfo?.endCursor}
                />
                <BlogCTA />
            </div>
            <Footer />
        </main>
    );
}
