// ─────────────────────────────────────────────
// WHMCS API Types
// ─────────────────────────────────────────────

/** Pricing breakdown for a single currency */
export interface WhmcsCurrencyPricing {
    prefix: string;
    suffix: string;
    msetupfee: string;
    qsetupfee: string;
    ssetupfee: string;
    asetupfee: string;
    bsetupfee: string;
    tsetupfee: string;
    monthly: string;
    quarterly: string;
    semiannually: string;
    annually: string;
    biennially: string;
    triennially: string;
}

/** Pricing object keyed by currency code (e.g. "USD", "PKR") */
export type WhmcsPricing = Record<string, WhmcsCurrencyPricing>;

/** A single WHMCS product from the GetProducts API */
export interface WhmcsProduct {
    pid: number;
    gid: number;
    type: string;
    name: string;
    slug: string;
    "product-url": string;
    description: string;
    module: string;
    paytype: string;
    allowqty: number;
    pricing: WhmcsPricing;
    customfields?: {
        customfield: Array<{
            id: number;
            name: string;
            description: string;
            required: string;
        }>;
    };
    configoptions?: {
        configoption: Array<{
            id: number;
            name: string;
            type: string;
            options: {
                option: Array<{
                    id: number;
                    name: string;
                    pricing: WhmcsPricing;
                }>;
            };
        }>;
    };
}

/** Raw WHMCS GetProducts API response */
export interface WhmcsGetProductsResponse {
    result: "success" | "error";
    message?: string;
    totalresults?: number;
    products?: {
        product: WhmcsProduct[];
    };
}

// ─────────────────────────────────────────────
// Cleaned / Frontend-Friendly Types
// ─────────────────────────────────────────────

/** A billing cycle with its price */
export interface BillingCycle {
    cycle: string;
    price: string;
    setupFee: string;
}

/** Cleaned pricing for a single currency */
export interface CleanPricing {
    currency: string;
    prefix: string;
    suffix: string;
    cycles: BillingCycle[];
}

/** Cleaned product for frontend consumption */
export interface CleanProduct {
    pid: number;
    gid: number;
    name: string;
    slug: string;
    description: string;
    type: string;
    paytype: string;
    productUrl: string;
    pricing: CleanPricing[];
}

/** A product group with its products */
export interface ProductGroup {
    gid: number;
    groupName: string;
    products: CleanProduct[];
}

/** The API response our Next.js route sends to the frontend */
export interface ProductsApiResponse {
    success: boolean;
    data: ProductGroup[] | CleanProduct[];
    error?: string;
}
