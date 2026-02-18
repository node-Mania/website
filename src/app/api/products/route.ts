import { NextRequest, NextResponse } from "next/server";
import {
    getProducts,
    getProductsByGroup,
    getProductsGrouped,
} from "@/lib/services/whmcs.service";
import type { ProductsApiResponse } from "@/lib/types/whmcs.types";

/**
 * GET /api/whmcs/products
 *
 * Query parameters:
 *   - gid       (optional) Filter products by WHMCS product group ID
 *   - grouped   (optional) If "true", returns products grouped by their gid
 *
 * Examples:
 *   GET /api/whmcs/products              → all products (flat list)
 *   GET /api/whmcs/products?gid=1        → products in group 1
 *   GET /api/whmcs/products?grouped=true → all products grouped by gid
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const gidParam = searchParams.get("gid");
        const grouped = searchParams.get("grouped") === "true";

        // If a specific group ID is requested
        if (gidParam) {
            const gid = parseInt(gidParam, 10);
            if (isNaN(gid)) {
                return NextResponse.json<ProductsApiResponse>(
                    { success: false, data: [], error: "Invalid gid parameter" },
                    { status: 400 }
                );
            }

            const products = await getProductsByGroup(gid);
            return NextResponse.json<ProductsApiResponse>(
                { success: true, data: products },
                {
                    status: 200,
                    headers: {
                        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
                    },
                }
            );
        }

        // If grouped view is requested
        if (grouped) {
            const groups = await getProductsGrouped();
            return NextResponse.json<ProductsApiResponse>(
                { success: true, data: groups },
                {
                    status: 200,
                    headers: {
                        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
                    },
                }
            );
        }

        // Default: return all products as a flat list
        const products = await getProducts();
        return NextResponse.json<ProductsApiResponse>(
            { success: true, data: products },
            {
                status: 200,
                headers: {
                    "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
                },
            }
        );
    } catch (error) {
        console.error("[WHMCS API Error]:", error);

        const message =
            error instanceof Error ? error.message : "Unknown error occurred";

        return NextResponse.json<ProductsApiResponse>(
            { success: false, data: [], error: message },
            { status: 500 }
        );
    }
}
