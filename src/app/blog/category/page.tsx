import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { CategoryList } from "@/components/sections/blog/CategoryList";
import { BlogCTA } from "@/components/sections/blog/BlogCTA";
import { getCategories } from "@/lib/services/wordpress.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Blog Categories | nodeMania",
    description: "Browse all nodeMania blog categories and topics to find the latest articles on hosting, security, and more.",
};

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <main className="min-h-screen bg-[#f7fbff] font-sans">
            <Navbar />
            <div className="pt-20">
                <BlogHero
                    title="Explore Topics"
                    subtitle="Find expert advice and tips across our various categories."
                    showSearch={false}
                />
                <CategoryList categories={categories} />
                <BlogCTA />
            </div>
            <Footer />
        </main>
    );
}
