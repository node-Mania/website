import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * Public endpoint to force clear the WHMCS API cache.
 * Access: GET /api/revalidate-whmcs
 */
export async function GET(request: NextRequest) {
    try {
        // Force Next.js to purge all cache data tagged with 'whmcs'
        revalidateTag('whmcs', "max");

        return NextResponse.json({
            success: true,
            message: 'WHMCS cache purged successfully. The next visit will fetch fresh prices from your server.',
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('[Cache Clear Error]:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to clear cache' },
            { status: 500 }
        );
    }
}
