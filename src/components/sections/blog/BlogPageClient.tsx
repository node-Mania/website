"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { WPPost, WPCategory } from "@/lib/types/wordpress.types";
import { BlogHero } from "./BlogHero";
import { FeaturedPosts } from "./FeaturedPosts";
import { CategoryFilter } from "./CategoryFilter";
import { BlogGrid } from "./BlogGrid";

const POSTS_PER_PAGE = 9;

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
    const [isLoading, setIsLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);

    /**
     * Cursor history for pagination.
     * cursors[i] = the 'after' cursor required to fetch page (i + 1).
     * cursors[0] is always null (page 1 needs no cursor).
     * When a fetch returns hasNextPage=true the endCursor is pushed so the
     * next page number can be rendered immediately.
     */
    const [cursors, setCursors] = useState<(string | null)[]>(
        initialHasNextPage ? [null, initialEndCursor] : [null]
    );

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ─── Core fetch ───────────────────────────────────────────────────────────
    const fetchPage = useCallback(
        async (
            page: number,
            search: string,
            category: string | null,
            cursorHistory: (string | null)[]
        ) => {
            setIsLoading(true);
            try {
                const params = new URLSearchParams();
                if (search) params.set("search", search);
                if (category) params.set("category", category);

                const afterCursor = cursorHistory[page - 1] ?? null;
                if (afterCursor) params.set("after", afterCursor);

                params.set("first", String(POSTS_PER_PAGE));

                const res = await fetch(`/api/blog?${params.toString()}`);
                if (!res.ok) throw new Error("Failed to fetch posts");
                const data = await res.json();

                setPosts(data.nodes ?? []);

                // Expand cursor history if this page revealed a new one
                const hasNext: boolean = data.pageInfo?.hasNextPage ?? false;
                const endCursor: string | null = data.pageInfo?.endCursor ?? null;

                setCursors((prev) => {
                    const updated = [...prev];
                    if (hasNext && updated.length <= page) {
                        updated[page] = endCursor; // index `page` = cursor for page+1
                    }
                    return updated;
                });
            } catch (err) {
                console.error("[Blog] Failed to fetch posts:", err);
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    // ─── Reset & re-fetch when search/category changes ───────────────────────
    const resetAndFetch = useCallback(
        (search: string, category: string | null) => {
            const freshCursors: (string | null)[] = [null];
            setCursors(freshCursors);
            setCurrentPage(1);
            fetchPage(1, search, category, freshCursors);
        },
        [fetchPage]
    );

    // Debounced search
    const handleSearchChange = useCallback(
        (query: string) => {
            setSearchQuery(query);
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                resetAndFetch(query, activeCategory);
            }, 400);
        },
        [activeCategory, resetAndFetch]
    );

    // ─── Pagination ───────────────────────────────────────────────────────────
    const handlePageChange = useCallback(
        (page: number) => {
            setCurrentPage(page);
            fetchPage(page, searchQuery, null, cursors);
            
            // Update URL without triggering SSR reload
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
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const totalPages = cursors.length; // grows as we discover more pages

    return (
        <>
            <BlogHero searchQuery={searchQuery} onSearchChange={handleSearchChange} />

            {/* Only show featured posts when no search/filter is active */}
            {!searchQuery && (
                <FeaturedPosts posts={featuredPosts} />
            )}

            <CategoryFilter
                categories={categories}
                activeCategory={null}
            />

            {/* Article grid section label */}
            <div className="container mx-auto px-4 md:px-6 pt-10 pb-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        {searchQuery
                            ? `Results for "${searchQuery}"`
                            : "Latest Articles"}
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
