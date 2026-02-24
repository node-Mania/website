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

// ─────────────────────────────────────────────
// Domain Types
// ─────────────────────────────────────────────

export interface TldPricing {
    extension: string;
    register: Record<string, string>;
    transfer: Record<string, string>;
    renew: Record<string, string>;
    categories: string[];
    addons: {
        dns: boolean;
        email: boolean;
        idprotect: boolean;
    };
    group: string;
    grace_period: {
        days: number;
        price: string;
    };
    grace_period_days: number;
    grace_period_fee: string;
    redemption_period: string | null;
}

export interface WhmcsGetTldPricingResponse {
    result: "success" | "error";
    message?: string;
    currency: {
        id: number;
        code: string;
        prefix: string;
        suffix: string;
    };
    pricing: Record<string, {
        register: Record<string, string>;
        transfer: Record<string, string>;
        renew: Record<string, string>;
        categories: string[];
        addons: {
            dns: boolean;
            email: boolean;
            idprotect: boolean;
        };
        group: string;
        grace_period: {
            days: number;
            price: string;
        };
        grace_period_days: number;
        grace_period_fee: string;
        redemption_period: string | null;
    }>;
}

export interface DomainWhoisResponse {
    result: "success" | "error" | "available" | "unavailable";
    status: "available" | "unavailable" | "error";
    domain: string;
    message?: string;
}

/** The API response for products */
export interface ProductsApiResponse {
    success: boolean;
    data: ProductGroup[] | CleanProduct[];
    error?: string;
}

/** The API response for TLD pricing */
export interface TldPricingApiResponse {
    success: boolean;
    currency: {
        code: string;
        prefix: string;
        suffix: string;
    };
    tlds: TldPricing[];
    error?: string;
}
