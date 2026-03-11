'use client';

import { useCurrency } from '@/context/CurrencyContext';
import { resolveProductUrl } from '@/lib/utils';
import type { CleanProduct } from '@/lib/types/whmcs.types';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface OrderButtonProps {
    product: CleanProduct;
    billingMode?: string;
    className?: string;
    children: ReactNode;
}

export function OrderButton({ product, billingMode = 'annually', className, children }: OrderButtonProps) {
    const { selectedCurrencyId } = useCurrency();
    const productUrl = resolveProductUrl(product, selectedCurrencyId, billingMode);

    return (
        <a
            href={productUrl}
            className={cn(className)}
        >
            {children}
        </a>
    );
}
