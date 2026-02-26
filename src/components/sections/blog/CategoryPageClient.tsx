"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { WPPost, WPCategory } from "@/lib/types/wordpress.types";
import { BlogHero } from "./BlogHero";
import { CategoryFilter } from "./CategoryFilter";
import { BlogGrid } from "./BlogGrid";

interface CategoryPageClientProps {
    category: WPCategory;
    initialPosts: WPPost[];
    categories: WPCategory[];
    initialHasNextPage: boolean;
    initialEndCursor: string | null;
}

export default function CategoryPageClient({
    category,
    initialPosts,
    categories,
    initialHasNextPage,
    initialEndCursor,
}: CategoryPageClientProps) {
    const [posts, setPosts] = useState<WPPost[]>(initialPosts);
    const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
    const [endCursor, setEndCursor] = useState<string | null>(initialEndCursor);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Fetch posts from API route
    const fetchPosts = useCallback(
        async (
            search: string,
            after: string | null = null,
            append: boolean = false
        ) => {
            setIsLoading(true);
            try {
                const params = new URLSearchParams();
                if (search) params.set("search", search);
                params.set("category", category.slug);
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
        [category.slug]
    );

    // Search with debounce
    const handleSearchChange = useCallback(
        (query: string) => {
            setSearchQuery(query);

            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                fetchPosts(query);
            }, 400);
        },
        [fetchPosts]
    );

    // Load more
    const handleLoadMore = useCallback(() => {
        if (endCursor) {
            fetchPosts(searchQuery, endCursor, true);
        }
    }, [endCursor, searchQuery, fetchPosts]);

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
            <BlogHero
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                title={
                    <>
                        <span className="text-slate-800">Category:</span>{" "}
                        <span className="text-gradient">{category.name}</span>
                    </>
                }
                subtitle={category.description || `Browse all articles in ${category.name}.`}
            />

            <CategoryFilter
                categories={categories}
                activeCategory={category.slug}
                onCategoryChange={(slug) => {
                    if (slug === null) {
                        window.location.href = "/blog";
                    } else if (slug !== category.slug) {
                        window.location.href = `/category/${slug}`;
                    }
                }}
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
