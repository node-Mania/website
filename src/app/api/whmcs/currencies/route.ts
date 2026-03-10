import { NextResponse } from 'next/server';
import { getCurrencies } from '@/lib/services/whmcs.service';

export async function GET() {
    try {
        const currencies = await getCurrencies();
        return NextResponse.json({ success: true, currencies });
    } catch (error) {
        console.error('API Error fetching currencies:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
