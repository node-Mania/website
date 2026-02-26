import { NextRequest, NextResponse } from "next/server";
import { getTldPricing } from "@/lib/services/whmcs.service";

export async function GET(request: NextRequest) {
    try {
        const tldData = await getTldPricing();
        return NextResponse.json(
            { success: true, ...tldData },
            {
                status: 200,
                headers: {
                    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
                },
            }
        );
    } catch (error) {
        console.error("[WHMCS TLD API Error]:", error);
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        );
    }
}
