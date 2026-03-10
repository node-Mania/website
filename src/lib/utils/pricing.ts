import type { CleanProduct, BillingCycle, CleanPricing } from '@/lib/types/whmcs.types';

export interface ResolvedPricing {
    price: string;
    displayPrice: string; // The per-month equivalent if billed annually, etc.
    prefix: string;
    suffix: string;
    cycle: BillingCycle | undefined;
    pricing: CleanPricing | undefined;
}

export function resolvePricing(
    product: CleanProduct,
    currencyCode: string,
    billingMode: string = 'monthly' // monthly, annually, biennially, triennially
): ResolvedPricing {
    if (!product || !product.pricing || product.pricing.length === 0) {
        return {
            price: '0.00',
            displayPrice: '0.00',
            prefix: '$',
            suffix: ' USD',
            cycle: undefined,
            pricing: undefined,
        };
    }

    const pricing = product.pricing.find(p => p.currency === currencyCode) ?? product.pricing[0];
    const prefix = pricing?.prefix ?? '$';
    const suffix = pricing?.suffix ?? '';

    // Find the requested billing cycle, fallback to monthly, then fallback to first available
    let activeCycle = pricing?.cycles.find(c => c.cycle === billingMode);

    // If exact billing mode not found, try reasonable fallbacks
    if (!activeCycle) {
        activeCycle = pricing?.cycles.find(c => c.cycle === 'monthly') || pricing?.cycles[0];
    }

    const price = activeCycle?.price ?? '0.00';
    let displayPrice = price;

    // Calculate "per-month" equivalent for longer terms
    if (activeCycle?.cycle === 'annually') {
        displayPrice = (parseFloat(price) / 12).toFixed(2);
    } else if (activeCycle?.cycle === 'biennially') {
        displayPrice = (parseFloat(price) / 24).toFixed(2);
    } else if (activeCycle?.cycle === 'triennially') {
        displayPrice = (parseFloat(price) / 36).toFixed(2);
    }

    return {
        price,
        displayPrice,
        prefix,
        suffix,
        cycle: activeCycle,
        pricing
    };
}
