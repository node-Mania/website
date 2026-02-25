import { NextRequest, NextResponse } from "next/server";
import { getPosts, getCategories } from "@/lib/services/wordpress.service";

/**
 * GET /api/blog
 * Proxy for client-side blog filtering & search.
 *
 * Query params:
 *  - search   (string)  – search term
 *  - category (string)  – category slug
 *  - after    (string)  – cursor for pagination
 *  - first    (number)  – items per page (default 12)
 *  - type     (string)  – "categories" to fetch categories instead
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type");

    try {
        // Return categories list
        if (type === "categories") {
            const categories = await getCategories();
            return NextResponse.json({ categories });
        }

        // Return filtered posts
        const search = searchParams.get("search") || null;
        const category = searchParams.get("category") || null;
        const after = searchParams.get("after") || null;
        const first = parseInt(searchParams.get("first") || "12", 10);

        const posts = await getPosts(first, after, category, search);

        return NextResponse.json(posts);
    } catch (error) {
        console.error("[API /blog]", error);
        return NextResponse.json(
            { error: "Failed to fetch blog data" },
            { status: 500 }
        );
    }
}
