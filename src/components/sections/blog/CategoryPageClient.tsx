"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { WPPost, WPCategory } from "@/lib/types/wordpress.types";
import { BlogHero } from "./BlogHero";
import { CategoryFilter } from "./CategoryFilter";
import { BlogGrid } from "./BlogGrid";

const POSTS_PER_PAGE = 9;

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
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    /**
     * Cursor history for pagination.
     */
    const [cursors, setCursors] = useState<(string | null)[]>(
        initialHasNextPage ? [null, initialEndCursor] : [null]
    );

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Fetch posts from API route
    const fetchPage = useCallback(
        async (
            page: number,
            search: string,
            cursorHistory: (string | null)[]
        ) => {
            setIsLoading(true);
            try {
                const params = new URLSearchParams();
                if (search) params.set("search", search);
                params.set("category", category.slug);

                const afterCursor = cursorHistory[page - 1] ?? null;
                if (afterCursor) params.set("after", afterCursor);

                params.set("first", String(POSTS_PER_PAGE));

                const res = await fetch(`/api/blog?${params.toString()}`);
                if (!res.ok) throw new Error("Failed to fetch posts");

                const data = await res.json();
                setPosts(data.nodes ?? []);

                const hasNext: boolean = data.pageInfo?.hasNextPage ?? false;
                const endCursor: string | null = data.pageInfo?.endCursor ?? null;

                setCursors((prev) => {
                    const updated = [...prev];
                    if (hasNext && updated.length <= page) {
                        updated[page] = endCursor;
                    }
                    return updated;
                });
            } catch (error) {
                console.error("Failed to fetch blog posts:", error);
            } finally {
                setIsLoading(false);
            }
        },
        [category.slug]
    );

    const resetAndFetch = useCallback(
        (search: string) => {
            const freshCursors: (string | null)[] = [null];
            setCursors(freshCursors);
            setCurrentPage(1);
            fetchPage(1, search, freshCursors);
        },
        [fetchPage]
    );

    // Search with debounce
    const handleSearchChange = useCallback(
        (query: string) => {
            setSearchQuery(query);

            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                resetAndFetch(query);
            }, 400);
        },
        [resetAndFetch]
    );

    const handlePageChange = useCallback(
        (page: number) => {
            setCurrentPage(page);
            fetchPage(page, searchQuery, cursors);
            
            // Update URL dynamically
            const url = new URL(window.location.href);
            url.searchParams.set("page", page.toString());
            window.history.pushState(null, "", url.toString());

            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        [cursors, searchQuery, fetchPage]
    );

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    const totalPages = cursors.length;

    return (
        <>
            <BlogHero
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                title={
                    <>
                        <span className="text-slate-900">Category:</span>{" "}
                        <span className="text-primary-600">{category.name}</span>
                    </>
                }
                subtitle={category.description || `Browse all articles in ${category.name}.`}
            />

            <CategoryFilter
                categories={categories}
                activeCategory={category.slug}
            />

            <div className="container mx-auto px-4 md:px-6 pt-10 pb-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        {searchQuery
                            ? `Results for "${searchQuery}"`
                            : "Latest in " + category.name}
                    </h2>
                    {totalPages > 1 && !isLoading && (
                        <span className="text-sm text-slate-400 font-medium">
                            Page {currentPage} of {totalPages}
                        </span>
                    )}
                </div>
            </div>

            <BlogGrid
                posts={posts}
                isLoading={isLoading}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}
