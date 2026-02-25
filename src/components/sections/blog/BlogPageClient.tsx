"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { WPPost, WPCategory } from "@/lib/types/wordpress.types";
import { BlogHero } from "./BlogHero";
import { FeaturedPosts } from "./FeaturedPosts";
import { CategoryFilter } from "./CategoryFilter";
import { BlogGrid } from "./BlogGrid";

interface BlogPageClientProps {
    initialPosts: WPPost[];
    featuredPosts: WPPost[];
    categories: WPCategory[];
    initialHasNextPage: boolean;
    initialEndCursor: string | null;
}

export default function BlogPageClient({
    initialPosts,
    featuredPosts,
    categories,
    initialHasNextPage,
    initialEndCursor,
}: BlogPageClientProps) {
    const [posts, setPosts] = useState<WPPost[]>(initialPosts);
    const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
    const [endCursor, setEndCursor] = useState<string | null>(initialEndCursor);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Fetch posts from API route
    const fetchPosts = useCallback(
        async (
            search: string,
            category: string | null,
            after: string | null = null,
            append: boolean = false
        ) => {
            setIsLoading(true);
            try {
                const params = new URLSearchParams();
                if (search) params.set("search", search);
                if (category) params.set("category", category);
                if (after) params.set("after", after);
                params.set("first", "12");

                const res = await fetch(`/api/blog?${params.toString()}`);
                if (!res.ok) throw new Error("Failed to fetch posts");

                const data = await res.json();

                if (append) {
                    setPosts((prev) => [...prev, ...data.nodes]);
                } else {
                    setPosts(data.nodes);
                }
                setHasNextPage(data.pageInfo?.hasNextPage ?? false);
                setEndCursor(data.pageInfo?.endCursor ?? null);
            } catch (error) {
                console.error("Failed to fetch blog posts:", error);
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    // Search with debounce
    const handleSearchChange = useCallback(
        (query: string) => {
            setSearchQuery(query);

            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                fetchPosts(query, activeCategory);
            }, 400);
        },
        [activeCategory, fetchPosts]
    );

    // Category filter change
    const handleCategoryChange = useCallback(
        (slug: string | null) => {
            setActiveCategory(slug);
            fetchPosts(searchQuery, slug);
        },
        [searchQuery, fetchPosts]
    );

    // Load more
    const handleLoadMore = useCallback(() => {
        if (endCursor) {
            fetchPosts(searchQuery, activeCategory, endCursor, true);
        }
    }, [endCursor, searchQuery, activeCategory, fetchPosts]);

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    return (
        <>
            <BlogHero searchQuery={searchQuery} onSearchChange={handleSearchChange} />

            {/* Only show featured posts when no search/filter is active */}
            {!searchQuery && !activeCategory && (
                <FeaturedPosts posts={featuredPosts} />
            )}

            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
            />

            <BlogGrid
                posts={posts}
                hasNextPage={hasNextPage}
                isLoading={isLoading}
                onLoadMore={handleLoadMore}
            />
        </>
    );
}
